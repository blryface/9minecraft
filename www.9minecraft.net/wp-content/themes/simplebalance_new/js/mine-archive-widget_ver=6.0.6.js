(function($) {

	"use strict";

	$(document).ready(function() {
		$('.mine-archive-select').on('change', function() {
			var $select = $(this);
			var value = $select.val();
			var label = $select.find('option[value="' + value + '"]').text();
			var ajaxData = {
				action: 'mine-archive-load',
				month: label,
				number: $select.data('number'),
			};
			// console.log(MineArchiveWidget.ajaxUrl);
			$.post( MineArchiveWidget.ajaxUrl, ajaxData, function(res) {
				$select.next('ul.month-post').html(res);
			} );
		});
	});

})(jQuery);