'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var NUMBER_OF_WIZARDS = 4;

var dialogModule = (function () {
  var querySelector = '';

  return {
    setQuerySelector: function (value) {
      querySelector = document.querySelector(value);
    },

    open: function () {
      querySelector.classList.remove('hidden');
    },

    close: function () {
      querySelector.classList.add('hidden');
    }
  };
})();

var colorChangeModule = (function () {
  function changeColor(_element, _tempArray, _constArray, _input) {
    _element.addEventListener('click', function () {
      if (_tempArray.length === 0) {
        _tempArray = _constArray.slice();
      }
      var randomValue = initModule.getValue(_tempArray);
      if (_constArray.length === FIREBALL_COLORS.length && _constArray.every(function (value, index) {
        return value === FIREBALL_COLORS[index];
      })) {
        _element.style.background = randomValue;
      } else {
        _element.style.fill = randomValue;
      }
      _input.value = randomValue;
    });
  }

  return {
    setValues: function (constArray, selector, inputSelector) {
      changeColor(document.querySelector(selector), constArray.slice(), constArray, document.querySelector(inputSelector));
    }
  };
})();

var initModule = (function () {
  function getValue(array) {
    return deleteUsedArrayValue(array, getRandomArrayValue(array));
  }

  function getRandomArrayValue(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  function deleteUsedArrayValue(array, value) {
    array.splice(array.indexOf(value), 1);
    return value;
  }

  return {
    getValue: function (array) {
      return getValue(array);
    },
    main: function () {
      var setup = document.querySelector('.setup');
      var similarListElement = setup.querySelector('.setup-similar-list');
      var coatColors = WIZARD_COAT_COLOR.slice();
      var eyesColors = WIZARD_EYES_COLOR.slice();

      colorChangeModule.setValues(WIZARD_COAT_COLOR, '.setup-wizard .wizard-coat', '.setup-player input[name=coat-color]');
      colorChangeModule.setValues(WIZARD_EYES_COLOR, '.setup-wizard .wizard-eyes', '.setup-player input[name=eyes-color]');
      colorChangeModule.setValues(FIREBALL_COLORS, '.setup-fireball-wrap', '.setup-fireball-wrap input[name=fireball-color]');

      var similarWizardTemplate = document
        .querySelector('#similar-wizard-template')
        .content
        .querySelector('.setup-similar-item');

      var generateWizard = function () {
        var wizard = similarWizardTemplate.cloneNode(true);
        wizard.querySelector('.setup-similar-label').textContent = getValue(WIZARD_NAMES) + ' ' + getValue(WIZARD_SURNAMES);
        wizard.querySelector('.wizard-coat').style.fill = getValue(coatColors);
        wizard.querySelector('.wizard-eyes').style.fill = getValue(eyesColors);

        return wizard;
      };

      var fragment = document.createDocumentFragment();

      for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
        fragment.appendChild(generateWizard());
      }

      dialogModule.setQuerySelector('.setup');

      similarListElement.appendChild(fragment);

      setup.classList.remove('hidden');
      setup.querySelector('.setup-similar').classList.remove('hidden');

      document.querySelector('.setup-open').addEventListener('click', dialogModule.open());
      document.querySelector('.setup-close').addEventListener('click', function () {
        dialogModule.close();
      });
      document.querySelector('.setup-open').addEventListener('click', function () {
        dialogModule.open();
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          if (document.activeElement.classList.contains('setup-close') ||
            document.activeElement.classList.contains('setup-submit')) {
            dialogModule.close();
          }
          if (document.activeElement.classList.contains('setup-open-icon')) {
            dialogModule.open();
          }
        }
        if (event.key === 'Escape' && !document.activeElement.classList.contains('setup-user-name')) {
          dialogModule.close();
        }
      });
    }
  };
})();

initModule.main();
