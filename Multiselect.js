(function (root, factory) {
  if (typeof exports === 'object') {
	// CommonJS
	factory(exports);
  } else if (typeof define === 'function' && define.amd) {
	// AMD. Register as an anonymous module.
	define(['exports'], factory);
  } else {
	// Browser globals
	factory(root);
  }
} (this, function (exports) {

	var Multiselect = function(selector, params) {

		var wrapper = typeof selector === 'string' ? document.querySelector(selector) : selector;
		var dropdown = wrapper.querySelector('.selections-dropdown');
		var tagsWrapper = wrapper.querySelector('.selections');
		var input = wrapper.querySelector('input');
		var toggler = wrapper.querySelector('.toggler');
		var placeholder = params.placeholder || '';

		var selections = [];

		// Paste placeholder
		if (placeholder && input.value === '') {
			tagsWrapper.textContent = placeholder;
		}

		// Add items
		dropdown.addEventListener('click', function(e) {

			var item = e.target;

			var inputValues = [];

			if (input.value === '') {
				tagsWrapper.innerHTML = '';
			}

    		while (item !== null && item.className !== 'item') {
      			item = item.parentNode;
    		}

			var selection = {
				value: item.getAttribute('data-value'),
				text: item.textContent
			};

			item.classList.add('disabled');

			var tag = document.createElement('span');

			tag.setAttribute('data-value', selection.value);

			tag.classList.add('multiselect-tag');

			tag.textContent = selection.text;

			tagsWrapper.appendChild(tag);

			tagsWrapper.classList.add('has-items');
			
			selections.push(selection);

			selections.forEach(function(item, i) {

				inputValues.push(item.value);

			});

    		input.value = inputValues;

		});

		// Remove items
		tagsWrapper.addEventListener('click', function(e) {

			var tag = e.target;

			// Check that we clicked tag element
			if (tag.className === 'multiselect-tag') {

				var inputValues = [];

				var value = tag.getAttribute('data-value');

				dropdown.querySelector('[data-value="' + value + '"]').classList.remove('disabled');

				tag.parentNode.removeChild(tag);

				selections.forEach(function(item, i) {
					if (item.value === value) {
						selections.splice(i, 1);
					}
				});

				selections.forEach(function(item, i) {

					inputValues.push(item.value);

				});

				input.value = inputValues;

				if (input.value === '') {
					tagsWrapper.classList.remove('has-items');
					tagsWrapper.textContent = placeholder;
				}

			}

		});

		// Toggle visibility
		toggler.addEventListener('click', function(e) {

			var selects = document.querySelectorAll('.multiselect');

			for (i = 0, len = selects.length; i < len; ++i) {
				if (!wrapper.classList.contains('is-open')) {
					selects[i].classList.remove('is-open');
				}
			}

			wrapper.classList.toggle('is-open');
			
		});

		// Prepopulate select
		if (input.value) {

			var values = input.value.split(',');

			values.forEach(function(value, i) {

				dropdown.querySelector('.item:nth-child(' + value + ')').click();

			});

		}

	};

	// Close if clicked outside
	document.addEventListener('click', function(e) {

		var select = document.querySelector('.multiselect.is-open');
	
		if (select !== null) {
			if (select !== e.target && select.contains(e.target) ||
				e.target.className === 'multiselect-tag') {
			} else {
				select.classList.remove('is-open');
			}
		}

	});

	exports.Multiselect = Multiselect;

}));
