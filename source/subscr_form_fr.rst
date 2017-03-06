Formulaire d'inscription aux cours
-------------------------------------------------------------------------------

.. raw:: html

         <?php
		// set default form values
		$prenom = "";
		$nom = "";
		$adresse = "";
		$telephone = "";
		$email = "";
		$formation = "";
		$date_de_facturation = "";
		$note = "";

		if ($_POST["SUBMIT"]) {

			$found_error = 0;

			// sender data
			$sender_name = 'Canopee';
			$sender_email ="info@canopee.org";

			$sender_name = 'Inscription Formations';
			$sender_email ="info@canopee.org";
			// form data
			$prenom = $_POST["prenom"];
			$nom = $_POST["nom"];
			$adresse = $_POST["adresse"];
			$telephone = $_POST["telephone"];
			$email = $_POST["email"];
			$formation = $_POST["formation"];
			$date_de_facturation = $_POST["date_de_facturation"];
			$note = $_POST["note"];

			// compose submitter mail
			$from = 'From: ' . $sender_email;
			$to = $email;
			$subject = "Inscription réussie à " . $formation . " course";
			$message = "Votre inscription a été enregistrée.\n Merci.";
			$body = "From: $sender_name\n E-Mail: $sender_email\n Message:\n $message";
			$additional_headers = $from . "\r\n" . 'Content-Type: text/plain; charset=UTF-8';
			if ( !mail ($to, $subject, $body, $additional_headers) ) {
				error_log("Error sending inscription receipt email: " . $body);
				$found_error = 1;

			} else {

				// compose internal archive mail
				$from = 'From: ' . $sender_email;
				$to = $sender_email;
				$subject = "Inscription au cours: " . $formation . " per " . $prenom . " " . $nom;

					// key:value message
					// $message = "Timestamp: " . date("c") . "\n" .
							   // "Prénom: " . $prenom . "\n" .
							   // "Nom: " . $nom . "\n" .
							   // "Adresse: " . $adresse  . "\n" .
							   // "Téléphone: " . $telephone  . "\n" .
							   // "Email: " . $email  . "\n" .
							   // "Formation: " . $formation  . "\n" .
							   // "Date de Facturation: " . $date_de_facturation  . "\n" .
							   // "Note: " . $note  . "\n";

					// with header csv message
					$header = "Timestamp;Prenom;Nom;Adresse;Telephone;Email;Formation;Date de Facturation;Note";
					$message =  date("c") .";" .
								$prenom  .";" .
								$nom  .";" .
								$adresse .";" .
								$telephone .";" .
								$email .";" .
								$formation .";" .
								$date_de_facturation  .";" .
								$note;

				$body = "From: $sender_name\n E-Mail: $sender_email\n Message:\n$header\n$message\n";
				$additional_headers = $from . "\r\n" . 'Content-Type: text/plain; charset=UTF-8';
				if ( !mail ($to, $subject, $body, $additional_headers) ) {
					error_log("Error sending internal inscription mail: ". $body);
					$found_error = 1;
				}

				// write message on a local file
				$report_filename = '/var/lib/form_results/training.log';
				if ( !file_exists($report_filename) ) {
					if ( !file_put_contents ( $report_filename , $header.PHP_EOL, FILE_APPEND | LOCK_EX) ) {
						error_log("Error writing inscription log file for this header: ". $header);
						$found_error = 1;
					}
				}
				if ( !file_put_contents ( $report_filename , $message.PHP_EOL, FILE_APPEND | LOCK_EX) ) {
					error_log("Error writing inscription log file for this message: ". $message);
					$found_error = 1;
				}
			}

			if ( $found_error ) {
				echo '<h2>Something went wrong. Try again or contact webmaster!</h2>';
			} else {
				echo '<h2 style="color:red;">Successfully subscribed to ' . $formation . " course</h2>";
			}
		}
	?>
	<form action="subscr_form_fr.html" method="post" class="form-horizontal">
	<div class="form-group">
	<label for="edit-submitted-prenom" class="col-sm-3 control-label">Prénom <span class="form-required" title="This field is mandatory.">*</span></label>
	<div class="col-sm-9">
	<input type="text" id="edit-submitted-prenom" name="prenom" value="<?=$prenom ?>" size="60" maxlength="128" class="form-control" />
	</div>
	</div>
	<div class="form-group">
	<label for="edit-submitted-nom" class="col-sm-3 control-label">Nom <span class="form-required" title="This field is mandatory.">*</span></label>
	<div class="col-sm-9">
	<input type="text" id="edit-submitted-nom" name="nom" value="<?=$nom ?>" size="60" maxlength="128" class="form-control" />
	</div>
	</div>
	<div class="form-group">
	<label for="edit-submitted-adresse" class="col-sm-3 control-label">Adresse <span class="form-required" title="This field is mandatory.">*</span></label>
	<div class="col-sm-9">
	<input type="text" id="edit-submitted-adresse" name="adresse" value="<?=$adresse ?>" size="60" maxlength="128" class="form-control" />
	</div>
	</div>
	<div class="form-group">
	<label for="edit-submitted-telephone" class="col-sm-3 control-label">Telephone <span class="form-required" title="This field is mandatory.">*</span></label>
	<div class="col-sm-9">
	<input type="text" id="edit-submitted-telephone" name="telephone" value="<?=$telephone ?>" size="60" maxlength="128" class="form-control" />
	</div>
	</div>
	<div class="form-group">
	<label for="edit-submitted-e-mail" class="col-sm-3 control-label">E-Mail <span class="form-required" title="This field is mandatory.">*</span></label>
	<div class="col-sm-9">
	<input class="form-control" type="email" value="<?=$email ?>" id="edit-submitted-e-mail" name="email" size="60" />
	</div>
	</div>
	<div class="form-group">
	<label for="edit-submitted-formation" class="col-sm-3 control-label">Formation <span class="form-required" title="This field is mandatory.">*</span></label>
	<div class="col-sm-9">
	<select id="edit-submitted-formation" name="formation" class="form-control">
		<option value="su_init" <?php if ($formation=="su_init") echo 'selected="selected"';?> >Initiation Sketchup</option>
		<option value="su_perf1" <?php if ($formation=="su_perf1") echo 'selected="selected"';?> >Perfectionnement 1 Sketchup</option>
		<option value="acad_init" <?php if ($formation=="acad_init") echo 'selected="selected"';?> >Initiation AutoCAD</option>
		<option value="acad_perf1" <?php if ($formation=="acad_perf1") echo 'selected="selected"';?> >Perfectionnement 1 AutoCAD</option>
		<option value="rhino_init" <?php if ($formation=="rhino_init") echo 'selected="selected"';?> >Initiation Rhinoceros</option>
		<option value="rhino_perf1" <?php if ($formation=="rhino_perf1") echo 'selected="selected"';?> >Perfectionnement 1 Rhinoceros</option>
	</select>
	</div>
	</div>

	<div class="form-group">
	<label for="edit-submitted-dati-per-fatturazione" class="col-sm-3 control-label">Données pour facturation <span class="form-required" title="This field is mandatory.">*</span></label>
	<div class="col-sm-9">
	<textarea id="edit-submitted-dati-per-fatturazione" name="date_de_facturation" cols="60" rows="5" class="form-control"><?php echo htmlspecialchars($date_de_facturation); ?></textarea>
	</div>
	</div

	<div class="form-group">
	<label for="edit-submitted-note" class="col-sm-3 control-label text-right">Notes</label>
	<div class="col-sm-9">
	<textarea id="edit-submitted-note" name="note" cols="60" rows="5" class="form-control"><?php echo htmlspecialchars($note); ?></textarea><br><br>
 	 </div>
	</div>

	<div class="form-group">
	<div class="col-sm-3"></div>
	<div class="col-sm-9">
	<button type="submit" name="SUBMIT" value="Send" class="btn btn-success">Envoi</button>
	</div>
	</div>

	</form>
