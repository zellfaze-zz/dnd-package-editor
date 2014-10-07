/*
================================================================================
Set up the GUI
================================================================================
*/

// Load native UI library
var gui = require('nw.gui');

// Get the current window
var win = gui.Window.get();

// Create a menubar for window menu
var menubar = new gui.Menu({ type: 'menubar' });

// Create our file menu
var filemenu = new gui.Menu();

filemenu.append(new gui.MenuItem({
  "label": 'New Package',
  "click": function() {
    //
  },
  "modifiers": "ctrl",
  "key": 'n'
}));

filemenu.append(new gui.MenuItem({
  "label": 'Save Package',
  "click": function() {
    //
  },
  "enabled": false,
  "modifiers": "ctrl",
  "key": 's'
}));

filemenu.append(new gui.MenuItem({
  "label": 'Load Package',
  "click": function() {
    //
  },
  "modifiers": "ctrl",
  "key": 'o'
}));

filemenu.append(new gui.MenuItem({
  "label": 'Exit',
  "click": function() {
    gui.App.closeAllWindows();
  }
}));

//Create our help menu
var helpmenu = new gui.Menu();

helpmenu.append(new gui.MenuItem({
  "label": 'About',
  "click": function() {
    gui.Shell.openExternal('http://www.example.com/');
  }
}));

helpmenu.append(new gui.MenuItem({
  "label": 'Fork me on Github!',
  "click": function() {
    gui.Shell.openExternal('http://www.example.com/');
  }
}));

helpmenu.append(new gui.MenuItem({
  "label": 'Test',
  "click": function() {
    
  }
}));

// You can has submenu!
menubar.append(new gui.MenuItem({ "label": 'File', "submenu": filemenu}));
menubar.append(new gui.MenuItem({ "label": 'Help', "submenu": helpmenu}));

//assign the menubar to window menu
win.menu = menubar;

/*
================================================================================
Creating some global variables
================================================================================
*/

var maintainersList = new Array();

/*
================================================================================
Functions to generate JSON files
================================================================================
*/

//TODO: Fix license, add support for maintainer and source
function generatePackageManifestJSON() {
  var packageManifest = new Object();
    packageManifest.name = $("#name").val();
    packageManifest.title = $("#title").val();
    packageManifest.description = $("#description").val();
    packageManifest.homepage = $("#homepage").val();
    packageManifest.version = $("#version").val();
    packageManifest.license = $("#licenses").val();
    
  return JSON.stringify(packageManifest, null, "  ");
}

/*
================================================================================
Helper functions for User Interface
================================================================================
*/

var currentPage;
function switchPages(newPage) {
  if (currentPage == newPage) {
    return false;
  }
  
  $(newPage).trigger("pageSwitch");
  
  $(currentPage).fadeOut(350, function() {
    $(newPage).fadeIn(350, function() {
      currentPage = newPage;
    });
  });
}

/*
================================================================================
All stuff that must wait for Document Ready
================================================================================
*/

$( document ).ready(function() {
  currentPage = '#basic-package-info';
  
  $('[data-page-link]').click(function() {
    switchPages('#' + $(this).attr('data-page-link'));
    return false;
  });
  
  $('#sources-list').on('pageSwitch', function() {
    //Rebuild list of sources
  });
  
  $('#maintainers-list').on('pageSwitch', function() {
    //Rebuild list of maintainers
  });
  
  $('#new-maintainer').on('pageSwitch', function() {
    $('#new-maintainer-name').val('');
    $('#new-maintainer-email').val('');
  });
    
});