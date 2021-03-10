/*
 *  FlagStrap - v1.0
 *  A lightwieght jQuery plugin for creating Bootstrap 3 compatible country select boxes with flags.
 *  http://www.blazeworx.com/flagstrap
 *
 *  Made by Alex Carter
 *  Under MIT License
 */
(function ($) {

    var defaults = {
        buttonSize: "btn-md",
        buttonType: "btn-default",
        labelMargin: "10px",
        scrollable: true,
        scrollableHeight: "250px",
        placeholder: {
            value: '',
            text: 'Please select country'
        }
    };

    var countries = {
        "AF": "",
        "AL": "",
        "DZ": "",
        "AS": "",
        "AD": "",
        "AO": "",
        "AI": "",
        "AG": "",
        "AR": "",
        "AM": "",
        "AW": "",
        "AU": "",
        "AT": "",
        "AZ": "",
        "BS": "",
        "BH": "",
        "BD": "",
        "BB": "",
        "BY": "",
        "BE": "",
        "BZ": "",
        "BJ": "",
        "BM": "",
        "BT": "",
        "BO": "",
        "BA": "",
        "BW": "",
        "BV": "",
        "BR": "",
        "IO": "",
        "BN": "",
        "BG": "",
        "BF": "",
        "BI": "",
        "KH": "",
        "CM": "",
        "CA": "",
        "CV": "",
        "KY": "",
        "CF": "",
        "TD": "",
        "CL": "",
        "CN": "",
        "CO": "",
        "KM": "",
        "CG": "",
        "CD": "",
        "CK": "",
        "CR": "",
        "CI": "",
        "HR": "",
        "CU": "",
        "CW": "",
        "CY": "",
        "CZ": "",
        "DK": "",
        "DJ": "",
        "DM": "",
        "DO": "",
        "EC": "",
        "EG": "",
        "SV": "",
        "GQ": "",
        "ER": "",
        "EE": "",
        "ET": "",
        "FK": "",
        "FO": "",
        "FJ": "",
        "FI": "",
        "FR": "",
        "GF": "",
        "PF": "",
        "TF": "",
        "GA": "",
        "GM": "",
        "GE": "",
        "DE": "",
        "GH": "",
        "GI": "",
        "GR": "",
        "GL": "",
        "GD": "",
        "GP": "",
        "GU": "",
        "GT": "",
        "GG": "",
        "GN": "",
        "GW": "",
        "GY": "",
        "HT": "",
        "HM": "",
        "VA": "",
        "HN": "",
        "HK": "",
        "HU": "",
        "IS": "",
        "IN": "",
        "ID": "",
        "IR": "",
        "IQ": "",
        "IE": "",
        "IM": "",
        "IL": "",
        "IT": "",
        "JM": "",
        "JP": "",
        "JE": "",
        "JO": "",
        "KZ": "",
        "KE": "",
        "KI": "",
        "KP": "",
        "KR": "",
        "KW": "",
        "KG": "",
        "LA": "",
        "LV": "",
        "LB": "",
        "LS": "",
        "LR": "",
        "LY": "",
        "LI": "",
        "LT": "",
        "LU": "",
        "MO": "",
        "MK": "",
        "MG": "",
        "MW": "",
        "MY": "",
        "MV": "",
        "ML": "",
        "MT": "",
        "MH": "",
        "MQ": "",
        "MR": "",
        "MU": "",
        "YT": "",
        "MX": "",
        "FM": "",
        "MD": "",
        "MC": "",
        "MN": "",
        "ME": "",
        "MS": "",
        "MA": "",
        "MZ": "",
        "MM": "",
        "NA": "",
        "NR": "",
        "NP": "",
        "NL": "",
        "NC": "",
        "NZ": "",
        "NI": "",
        "NE": "",
        "NG": "",
        "NU": "",
        "NF": "",
        "MP": "",
        "NO": "",
        "OM": "",
        "PK": "",
        "PW": "",
        "PS": "",
        "PA": "",
        "PG": "",
        "PY": "",
        "PE": "",
        "PH": "",
        "PN": "",
        "PL": "",
        "PT": "",
        "PR": "",
        "QA": "",
        "RE": "",
        "RO": "",
        "RU": "",
        "RW": "",
        "SH": "",
        "KN": "",
        "LC": "",
        "MF": "",
        "PM": "",
        "VC": "",
        "WS": "",
        "SM": "",
        "ST": "",
        "SA": "",
        "SN": "",
        "RS": "",
        "SC": "",
        "SL": "",
        "SG": "",
        "SX": "",
        "SK": "",
        "SI": "",
        "SB": "",
        "SO": "",
        "ZA": "",
        "GS": "",
        "SS": "",
        "ES": "",
        "LK": "",
        "SD": "",
        "SR": "",
        "SZ": "",
        "SE": "",
        "CH": "",
        "SY": "",
        "TW": "",
        "TJ": "",
        "TZ": "",
        "TH": "",
        "TL": "",
        "TG": "",
        "TK": "",
        "TO": "",
        "TT": "",
        "TN": "",
        "TR": "",
        "TM": "",
        "TC": "",
        "TV": "",
        "UG": "",
        "UA": "",
        "AE": "",
        "GB": "",
        "US": "",
        "UM": "",
        "UY": "",
        "UZ": "",
        "VU": "",
        "VE": "",
        "VN": "",
        "VG": "",
        "VI": "",
        "WF": "",
        "EH": "",
        "YE": "",
        "ZM": "",
        "ZW": "",
    };

    $.flagStrap = function (element, options, i) {

        var plugin = this;

        var uniqueId = generateId(8);

        plugin.countries = {};
        plugin.selected = {value: null, text: null};
        plugin.settings = {inputName: 'country-' + uniqueId};

        var $container = $(element);
        var htmlSelectId = 'flagstrap-' + uniqueId;
        var htmlSelect = '#' + htmlSelectId;

        plugin.init = function () {

            // Merge in global settings then merge in individual settings via data attributes
            plugin.countries = countries;

            // Initialize Settings, priority: defaults, init options, data attributes
            plugin.countries = countries;
            plugin.settings = $.extend({}, defaults, options, $container.data());

            if (undefined !== plugin.settings.countries) {
                plugin.countries = plugin.settings.countries;
            }

            if (undefined !== plugin.settings.inputId) {
                htmlSelectId = plugin.settings.inputId;
                htmlSelect = '#' + htmlSelectId;
            }

            // Build HTML Select, Construct the drop down button, Assemble the drop down list items element and insert
            $container
                .addClass('flagstrap')
                .append(buildHtmlSelect)
                .append(buildDropDownButton)
                .append(buildDropDownButtonItemList);

            // Check to see if the onSelect callback method is assigned / callable, bind the change event for broadcast
            if (plugin.settings.onSelect !== undefined && plugin.settings.onSelect instanceof Function) {
                $(htmlSelect).change(function (event) {
                    var element = this;
                    options.onSelect($(element).val(), element);
                });
            }

            // Hide the actual HTML select
            $(htmlSelect).hide();

        };

        var buildHtmlSelect = function () {
            var htmlSelectElement = $('<select/>').attr('id', htmlSelectId).attr('name', plugin.settings.inputName);

            $.each(plugin.countries, function (code, country) {
                var optionAttributes = {value: code};
                if (plugin.settings.selectedCountry !== undefined) {
                    if (plugin.settings.selectedCountry === code) {
                        optionAttributes = {value: code, selected: "selected"};
                        plugin.selected = {value: code, text: country}
                    }
                }
                htmlSelectElement.append($('<option>', optionAttributes).text(country));
            });

            if (plugin.settings.placeholder !== false) {
                htmlSelectElement.prepend($('<option>', {
                    value: plugin.settings.placeholder.value,
                    text: plugin.settings.placeholder.text
                }));
            }

            return htmlSelectElement;
        };

        var buildDropDownButton = function () {

            var selectedText = $(htmlSelect).find('option').first().text();
            var selectedValue = $(htmlSelect).find('option').first().val();

            selectedText = plugin.selected.text || selectedText;
            selectedValue = plugin.selected.value || selectedValue;

            if (selectedValue !== plugin.settings.placeholder.value) {
                var $selectedLabel = $('<i/>').addClass('flagstrap-icon flagstrap-' + selectedValue.toLowerCase()).css('margin-right', plugin.settings.labelMargin);
            } else {
                var $selectedLabel = $('<i/>').addClass('flagstrap-icon flagstrap-placeholder');
            }

            var buttonLabel = $('<span/>')
                .addClass('flagstrap-selected-' + uniqueId)
                .html($selectedLabel)
                .append(selectedText);

            var button = $('<button/>')
                .attr('type', 'button')
                .attr('data-toggle', 'dropdown')
                .attr('id', 'flagstrap-drop-down-' + uniqueId)
                .addClass('btn ' + plugin.settings.buttonType + ' ' + plugin.settings.buttonSize + ' dropdown-toggle')
                .html(buttonLabel);

            $('<span/>')
                .addClass('caret')
                .css('margin-left', plugin.settings.labelMargin)
                .insertAfter(buttonLabel);

            return button;

        };

        var buildDropDownButtonItemList = function () {
            var items = $('<ul/>')
                .attr('id', 'flagstrap-drop-down-' + uniqueId + '-list')
                .attr('aria-labelled-by', 'flagstrap-drop-down-' + uniqueId)
                .addClass('dropdown-menu');

            if (plugin.settings.scrollable) {
                items.css('height', 'auto')
                    .css('max-height', plugin.settings.scrollableHeight)
                    .css('overflow-x', 'hidden');
            }

            // Populate the bootstrap dropdown item list
            $(htmlSelect).find('option').each(function () {

                // Get original select option values and labels
                var text = $(this).text();
                var value = $(this).val();

                // Build the flag icon
                if (value !== plugin.settings.placeholder.value) {
                    var flagIcon = $('<i/>').addClass('flagstrap-icon flagstrap-' + value.toLowerCase()).css('margin-right', plugin.settings.labelMargin);
                } else {
                    var flagIcon = null;
                }


                // Build a clickable drop down option item, insert the flag and label, attach click event
                var flagStrapItem = $('<a/>')
                    .attr('data-val', $(this).val())
                    .html(flagIcon)
                    .append(text)
                    .on('click', function (e) {
                        $(htmlSelect).val($(this).data('val'));
                        $(htmlSelect).trigger('change');
                        $('.flagstrap-selected-' + uniqueId).html($(this).html());
                        e.preventDefault();
                    });

                // Make it a list item
                var listItem = $('<li/>').prepend(flagStrapItem);

                // Append it to the drop down item list
                items.append(listItem);

            });

            return items;
        };

        function generateId(length) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

            if (!length) {
                length = Math.floor(Math.random() * chars.length);
            }

            var str = '';
            for (var i = 0; i < length; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        }

        plugin.init();

    };

    $.fn.flagStrap = function (options) {

        return this.each(function (i) {
            if ($(this).data('flagStrap') === undefined) {
                $(this).data('flagStrap', new $.flagStrap(this, options, i));
            }
        });

    }

})(jQuery);
