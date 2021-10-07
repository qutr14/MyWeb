jQuery(document).ready(function ($) {
  GetPostJSON();
});

function postVideo(data) {
  var data = data.concat(data);
  data = data.concat(data);
  data = data.concat(data);
  
  var currentURL = window.location.href;
  currentURL = currentURL.split("?");
  if (currentURL.length <= 1) {
    for (var i = 0; i < data.length; i++) {
      $("#video-view").append('<div class="col-lg-4 all-video-view"><a href="' + currentURL[0] + '?' + data[i].id + '"><img src="' + data[i].img + '"><i class="fas fa-play"></i></a>\
        <div class="admin-img" width="48"><img src="img/icon/woman_icon.png"></div><div class="video-info">\
        <h5>' + data[i].title + '</h5></a>\
        <p>' + data[i].user + " - " + data[i].view + " - " + data[i].date_post + '</p></div>');
    }
    var items = $(".content-container-video .all-video-view");
		var numItems = items.length;
		var perPage = 21;
		items.slice(perPage).hide();

		$('#pagination-container').pagination({
			items: numItems,
			itemsOnPage: perPage,
			prevText: "&laquo;",
			nextText: "&raquo;",
			onPageClick: function (pageNumber) {
				var showFrom = perPage * (pageNumber - 1);
				var showTo = showFrom + perPage;
				items.hide().slice(showFrom, showTo).show();
				
				$("html, body").animate({ scrollTop: 0 }, 0);
			}
		});
  }
  else {
    $(".content-container-video").addClass("content-container-video-single");

    $("#video-view").append('<div class="single-video-view">\
    <div>\
        <h3>'+ data[currentURL[1] - 1].title + '</h3>\
    </div>\
    <div class="video-container"><video src="'+ data[currentURL[1] - 1].poster_path + '" controls></video></div>\
    <div class="admin-img" width="48"><img src="./img/icon/woman_icon.png"></div>\
    <div class="video-info">\
        <h5>'+ data[currentURL[1] - 1].description + '</h5>\
        <p>'+ data[currentURL[1] - 1].user + ' - ' + data[currentURL[1] - 1].view + ' - ' + data[currentURL[1] - 1].date_post + '</p>\
    </div>\
  </div>\
  <div class="video-sidebar">\
    <div>\
        <h3>Up next</h3>\
    </div>\
    <div class="video-wrapper" style="height: 580px; overflow: auto;">\
    <div>\
      <a href="videos.html?'+ data[currentURL[1] * 2 % 3].id + '">\
      <img src="'+ data[currentURL[1] * 2 % 3].img + '"><i class="fas fa-play"></i>\
      <h6>'+ data[currentURL[1] * 2 % 3].title + '</h6>\
      </a>\
    </div>\
    <div>\
      <a href="videos.html?'+ data[currentURL[1] * 3 % 4].id + '">\
      <img src="'+ data[currentURL[1] * 3 % 4].img + '"><i class="fas fa-play"></i>\
      <h6>'+ data[currentURL[1] * 3 % 4].title + '</h6>\
      </a>\
    </div>\
    <div>\
      <a href="videos.html?'+ data[currentURL[1] * 4 % 5].id + '">\
      <img src="'+ data[currentURL[1] * 4 % 5].img + '"><i class="fas fa-play"></i>\
      <h6>'+ data[currentURL[1] * 4 % 5].title + '</h6>\
      </a>\
    </div>\
    <div>\
      <a href="videos.html?'+ data[currentURL[1] * 5 % 6].id + '">\
      <img src="'+ data[currentURL[1] * 5 % 6].img + '"><i class="fas fa-play"></i>\
      <h6>'+ data[currentURL[1] * 5 % 6].title + '</h6>\
      </a>\
    </div>\
    <div>\
      <a href="videos.html?'+ data[currentURL[1] * 7 % 8].id + '">\
      <img src="'+ data[currentURL[1] * 7 % 8].img + '"><i class="fas fa-play"></i>\
      <h6>'+ data[currentURL[1] * 7 % 8].title + '</h6>\
      </a>\
    </div>\
    <div>\
      <a href="videos.html?'+ data[currentURL[1] * 8 % 9].id + '">\
      <img src="'+ data[currentURL[1] * 8 % 9].img + '"><i class="fas fa-play"></i>\
      <h6>'+ data[currentURL[1] * 8 % 9].title + '</h6>\
      </a>\
    </div>\
    <div>\
      <a href="videos.html?'+ data[currentURL[1] * 9 % 10].id + '">\
      <img src="'+ data[currentURL[1] * 9 % 10].img + '"><i class="fas fa-play"></i>\
      <h6>'+ data[currentURL[1] * 9 % 10].title + '</h6>\
      </a>\
    </div>\
    </div>\
  </div>');

  }


}
function GetPostJSON() {
  $.getJSON("json/video.json", function (data) {
    postVideo(data);
  });
}
