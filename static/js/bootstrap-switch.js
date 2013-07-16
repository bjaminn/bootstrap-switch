/* ============================================================
 * bootstrapSwitch v1.4 by Larentis Mattia @spiritualGuru
 * http://www.larentis.eu/switch/
 * ============================================================
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * ============================================================ */

!function ($) {
    "use strict";

    $.fn['bootstrapSwitch'] = function (method) {
        var methods = {
            init: function () {
                return this.each(function () {
                    var $element = $(this)
                      , $div
                      , $switchLeft
                      , $switchRight
                      , $label
                      , myClasses = ""
                      , classes = $element.attr('class')
                      , color
                      , moving
                      , onLabel = "ON"
                      , offLabel = "OFF"
                      , icon = false;

                    $.each(['switch-mini', 'switch-small', 'switch-large'], function (i, el) {
                        if (classes.indexOf(el) >= 0)
                            myClasses = el;
                    });

                    $element.addClass('has-switch');

                    if ($element.data('on') !== undefined)
                        color = "switch-" + $element.data('on');

                    if ($element.data('on-label') !== undefined)
                        onLabel = $element.data('on-label');

                    if ($element.data('off-label') !== undefined)
                        offLabel = $element.data('off-label');

                    if ($element.data('icon') !== undefined)
                        icon = $element.data('icon');

                    $switchLeft = $('<span>')
                      .addClass("switch-left")
                      .addClass(myClasses)
                      .addClass(color)
                      .html(onLabel);

                    color = '';
                    if ($element.data('off') !== undefined)
                        color = "switch-" + $element.data('off');

                    $switchRight = $('<span>')
                      .addClass("switch-right")
                      .addClass(myClasses)
                      .addClass(color)
                      .html(offLabel);

                    $label = $('<label>')
                      .html("&nbsp;")
                      .addClass(myClasses)
                      .attr('for', $element.find('input').attr('id'));

                    if (icon) {
                        $label.html('<i class="icon icon-' + icon + '"></i>');
                    }

                    $div = $element.find(':checkbox').wrap($('<div>')).parent().data('animated', false);

                    if ($element.data('animated') !== false)
                        $div.addClass('switch-animate').data('animated', true);

                    $div
                      .append($switchLeft)
                      .append($label)
                      .append($switchRight);

                    $element.find('>div').addClass(
                      $element.find('input').is(':checked') ? 'switch-on' : 'switch-off'
                    );

                    if ($element.find('input').is(':disabled'))
                        $(this).addClass('deactivate');

                    var changeStatus = function ($this) {
                        //$this.siblings('label').trigger('mousedown').trigger('mouseup').trigger('click');
                        // var $this = $(this), $target = $(e.target), $myCheckBox = $target.siblings('input');
                        // $myCheckBox.prop("checked", !$myCheckBox.is(":checked"));
                    };

                    // $element.on('keydown', function (e) {
                    //     if (e.keyCode === 32) {
                    //         e.stopImmediatePropagation();
                    //         e.preventDefault();
                    //         changeStatus($(e.target).find('span:first'));
                    //     }
                    // });

                    var changefun = function (e) {
                        var $this = $(this), $target = $(e.target), $myCheckBox = $target.siblings('input');
                        console.log("chagefunc");

                        $myCheckBox.prop("checked", !$myCheckBox.is(":checked"));

                        console.log($myCheckBox.prop("checked"));

                        $myCheckBox.trigger("change");
                    }

                    $switchLeft.on('click', function (e) {
                        console.log("$switchLeft click");
                        changefun(e);
                    });

                    $switchRight.on('click', function (e) {
                        console.log("$switchRight click");
                        changefun(e);
                    });

                    $element.on('click', function (e) {
                        console.log("$element click");
                        changefun(e);
                    });

                    $element.find('input').on('change', function (e, skipOnChange) {
                        var $this = $(this)
                          , $element = $this.parent()
                          , thisState = $this.is(':checked')
                          , state = $element.is('.switch-off');

                        e.preventDefault();

                        $element.css('left', '');

                        if (state === thisState) {

                            if (thisState)
                                $element.removeClass('switch-off').addClass('switch-on');
                            else $element.removeClass('switch-on').addClass('switch-off');

                            if ($element.data('animated') !== false)
                                $element.addClass("switch-animate");

                            if (typeof skipOnChange === 'boolean' && skipOnChange)
                                return;

                            $element.parent().trigger('switch-change', { 'el': $this, 'value': thisState })
                        }
                    });
                }
                );
            },
            toggleActivation: function () {
                var $this = $(this);

                $this.toggleClass('deactivate');
                $this.find('input:checkbox').attr('disabled', $this.is('.deactivate'));
            },
            isActive: function () {
                return !$(this).hasClass('deactivate');
            },
            setActive: function (active) {
                var $this = $(this);

                if (active) {
                    $this.removeClass('deactivate');
                    $this.find('input:checkbox').attr('disabled', false);
                }
                else {
                    $this.addClass('deactivate');
                    $this.find('input:checkbox').attr('disabled', true);
                }
            },
            toggleState: function (skipOnChange) {
                var $input = $(this).find('input:checkbox');
                $input.prop('checked', !$input.is(':checked')).trigger('change', skipOnChange);
            },
            setState: function (value, skipOnChange) {
                $(this).find('input:checkbox').prop('checked', value).trigger('change', skipOnChange);
            },
            status: function () {
                return $(this).find('input:checkbox').is(':checked');
            },
            destroy: function () {
                var $div = $(this).find('div')
                  , $checkbox;

                $div.find(':not(input:checkbox)').remove();

                $checkbox = $div.children();
                $checkbox.unwrap().unwrap();

                $checkbox.unbind('change');

                return $checkbox;
            }
        };

        if (methods[method])
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        else if (typeof method === 'object' || !method)
            return methods.init.apply(this, arguments);
        else
            $.error('Method ' + method + ' does not exist!');
    };
}(jQuery);

$(function () {
    $('.switch')['bootstrapSwitch']();
});
