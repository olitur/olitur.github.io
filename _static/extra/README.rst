:orphan:

.. _readme:

README
=======

Repo **user.github.io**
----------------------------

Pubication pages html sur branche *master* seulement :


Repo **test**
---------------------

.. note::

   Le contenu de ce repo test est copié du guide "Biologist guide to computing" accessible sur cette page `Github <https://github.com/tjelvar-olsson/biologists-guide-to-computing/>`_

Repo différent de *user*.github.io --> publication pages html sur branches *master* ou *gh-pages* :

.. sidebar:: URLs & CNAME dans le repo *user*.github.io

   Puisque j'ai un :file:`CNAME` qui pointe vers ``canopee.org``
   dans mon repo *olitur.github.io*,
   tous les autres repo auront comme début d'url  ``http://canopee.org/``
   pratique non ?

* création du repo *test* sur la page github, visible

  - ici : `branche master = fichiers sources <https://github.com/olitur/test.git/>`_
  - ou là : `branche gh-pages = fichiers compilés html <http://canopee.org/test/>`_
* clonage en local : ``git clone https://github.com/olitur/test.git``
* initialisation projet **sphinx-doc** :

  - ``cd .\test\``
  - ``sphinx-quickstart.exe``

* Edition des fichiers sources (rest/docutils)

  - édition ...
  - compilation en html : ``.\make.bat html``

.. sidebar:: contenu fichier :file:`.gitignore`

   ``build/*``

   *la commande ``git add`` et suivante ignorera le dossier :file:`build`*

* Ajout de l'ensemble des fichiers à git (selon directives du fichier :file:`.gitignore`):

  - ``git status``
  - ``git add -A``

* Versionning : ``git commit -m "première compilation et synchro"``
* Uploading : ``git push origin master``
* Création et déplacement sur une branche pour publication des pages html uniquement :

  - ``git checkout --orphan gh-pages``
  - ``git rm -rf *``
* récupération des pages html de la branche master : ``git checkout master build/html``
* déplacement de tout le contenu du dossier à la racine de cette branche : ``mv ./build/html/* ./``
* nettoyage : ``git rm -rf build``
* ajout pages html à git (sur cette branche uniquement) :

  - ``git add -A``
  - ``git commit -m "première publication pages html"``
* Upload : ``git push origin gh-pages``

.. sidebar:: changement d'affichage selon les branches

   En fonction des branches, le listing des dossiers & fichiers change, pour refléter ce que git connaît. **c'est virtuel** (ouf! on peut facilement croire que tout est perdu ...)

* Retour sur la branche master pour continuer à éditer : ``git checkout master``
