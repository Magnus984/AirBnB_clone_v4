$(function () {
	const amenities = {};
	$("li input[type=checkbox]").change(function () {
		if (this.checked) {
			amenities[this.dataset.name] = this.dataset.id;
		} else {
			delete amenities[this.dataset.name];
		}
		$(".amenities h4").text(Object.keys(amenities).sort().join(", "));
	});

	// get status of API
	$.getJSON("http://127.0.0.1:5001/api/v1/status/", (data) => {
		if (data.status === "OK") {
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}
	});

	// fetch data about places
	function searchPlace () {
	  $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.keys(amenities) })
          }).done(function (data) {
            $('section.places').empty();
            //$('section.places').append('<h1>Places</h1>');
            for (const place of data) {
            const template = `<article>
	    <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
	    <div class="max_guest">${place.max_guest} Guest${
                                    place.max_guest !== 1 ? "s" : ""
                            }</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${
                                    place.number_rooms !== 1 ? "s" : ""
                            }</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
                                    place.number_bathrooms !== 1 ? "s" : ""
                            }</div>
            </div>
	    <div class="description">
            ${place.description}
            </div>
                     </article>`;
          $('section.places').append(template);
	    }
	  });
	};

	// search places
	$(".filters button").bind("click", searchPlace);
	//searchPlace();
});
