jQuery(document).ready(function ($) {
	$("#header").load("./layout/header");
	$("#footer").load("./layout/footer");
	$("#sidebar").load("./layout/sidebar");

	var Category = CheckCategory();

	if (Category == "user") {
		CheckUser();
	}
	if (Category == "sitemap") {
		$.getJSON("json/sitemap.json", function (data) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].type_page == "page") {
					$(".sitemap-container-content .list-page").append('<li class="d-grid gap-2"><a href="' + data[i].url + '" class="single-link"><i class="fa fa-caret-right" aria-hidden="true"></i> ' + data[i].name + '</a></li>')
				}
				if (data[i].type_page == "category") {
					$(".sitemap-container-content .list-page").append('<li class="d-grid gap-2"><a href="' + data[i].url + '" class="multi-link"><i class="fa fa-caret-down" aria-hidden="true"></i> ' + data[i].name + '</a><ul class="insert' + i + '"></ul></li>')
					for (var j = 0; j < data[i].category.length; j++) {
						$(".insert" + i).append('<li class="d-grid gap-2"><a href="' + data[i].category[j].url + '"><i class="fa fa-caret-right" aria-hidden="true"></i> ' + data[i].category[j].name + '</a></li>')
					}
				}
			}
		});
	}

	if (Category.substr(0, 6) == "search") {
		var textSearch = Category.substr(7, (Category.length - 7));
		if (textSearch != "") {
			GetSearch(textSearch);
		} else {
			$(".count-search-post").html("");
		}
	}

	if (Category == "awareness") {
		$(".breadcrumb").html('<a href="index.html" class="home-breadcrumb">Home</a><i class="fas fa-chevron-right"></i><a href="awareness.html" class="current-breadcrumb">' + Category + '</a>');
		$(".breadcrumb-section .title").html("<h1>Archive for Category: " + Category + "</h1>");
	}

	if (Category == "physical" || Category == "nutrition" || Category == "exercise") {
		GetPostJSON();
	}

	if (Category == "alphabet") {
		$(".breadcrumb-section .title").html("<h1>Archive for Category: " + Category + "</h1>");
		$(".breadcrumb").html('<a href="index.html" class="home-breadcrumb">Home</a><i class="fas fa-chevron-right"></i><a href="awareness.html?alphabet" class="current-breadcrumb">' + Category + '</a>');
		$(".pick-post-content").removeClass("hidden");
		$(".pick-post-content h5").html("Pictures & Pronunciation of Alphabets");
		GetJSONAlphabet();
		$(".awareness-button").removeClass("awareness-active");
		$(".awareness-alphabet").addClass("awareness-active");
	}
	if (Category == "color") {
		$(".breadcrumb-section .title").html("<h1>Archive for Category: " + Category + "</h1>");
		$(".breadcrumb").html('<a href="index.html" class="home-breadcrumb">Home</a><i class="fas fa-chevron-right"></i><a href="awareness.html?color" class="current-breadcrumb">' + Category + '</a>');
		$(".pick-post-content").removeClass("hidden");
		$(".pick-post-content h5").html("Pictures & Pronunciation of Colors");
		GetJSONColor();
		$(".awareness-button").removeClass("awareness-active");
		$(".awareness-color").addClass("awareness-active");
	}
	if (Category == "animal") {
		$(".breadcrumb-section .title").html("<h1>Archive for Category: " + Category + "</h1>");
		$(".breadcrumb").html('<a href="index.html" class="home-breadcrumb">Home</a><i class="fas fa-chevron-right"></i><a href="awareness.html?animal" class="current-breadcrumb">' + Category + '</a>');
		$(".pick-post-content").removeClass("hidden");
		$(".pick-post-content h5").html("Pictures & Pronunciation of Animals");
		GetJSONAnimal();
		$(".awareness-button").removeClass("awareness-active");
		$(".awareness-animal").addClass("awareness-active");
	}
	if (Category == "time") {
		$(".breadcrumb-section .title").html("<h1>Archive for Category: " + Category + "</h1>");
		$(".breadcrumb").html('<a href="index.html" class="home-breadcrumb">Home</a><i class="fas fa-chevron-right"></i><a href="awareness.html?time" class="current-breadcrumb">' + Category + '</a>');
		$(".pick-post-content").removeClass("hidden");
		$(".pick-post-content h5").html("Calendar");
		GetCalendar();
		$(".awareness-button").removeClass("awareness-active");
		$(".awareness-time").addClass("awareness-active");
	}

	if (Category == "maths") {
		$("input#sub").click(function () {
			$("#output-caculator-text").html($(this).val());
		});

		$("button#keys").click(function () {
			$("input#sub").attr("disabled", "");
			var caculatorInput = $("#output-caculator-text").html();
			var number = $(this).val();
			if (caculatorInput == "") {
				var numberInput = $("#output-caculator-1").html();
				if (numberInput == 0) {
					$("#output-caculator-1").html(number);
				} else {
					$("#output-caculator-1").html(numberInput + number);
				}
			} else {
				var numberInput = $("#output-caculator-2").html();
				if (numberInput == 0) {
					$("#output-caculator-2").html(number);
				} else {
					$("#output-caculator-2").html(numberInput + number);
				}
				$("input#sub").attr("disabled", "disabled");
			}
		});

		$("#submit-caculator").click(function () {
			if ($("#output-caculator-2").html() != "") {
				$("button#keys").attr("disabled", "disabled");
				$("#clear-caculator").attr("disabled", "disabled");

				var numberOuput = 0;
				var number1 = $("#output-caculator-1").html();
				var number2 = $("#output-caculator-2").html();
				var caculatorInput = $("#output-caculator-text").html();
				$("#output-caculator-text-result").html("=");
				switch (caculatorInput) {
					case "+":
						numberOuput = parseInt(number1) + parseInt(number2);
						break;
					case "-":
						numberOuput = parseInt(number1) - parseInt(number2);
						break;
					case "x":
						numberOuput = parseInt(number1) * parseInt(number2);
						break;
					case "/":
						numberOuput = parseInt(number1) / parseInt(number2);
						break;
					default:
				}
				$("#output-caculator-result").html(numberOuput);
			}
		});

		$("#reset-caculator").click(function () {
			$("#output-caculator-1").html("");
			$("#output-caculator-2").html("");
			$("#output-caculator-text").html("");
			$("#output-caculator-text-result").html("");
			$("#output-caculator-result").html("");

			$("input#sub").attr("disabled", "");
			$("button#keys").attr("disabled", "");
			$("#clear-caculator").attr("disabled", "");
		});

		$("#clear-caculator").click(function () {
			if ($("#output-caculator-text").html() == "") {
				var result = $("#output-caculator-1").html();
				result = parseInt(result / 10);
				if (result <= 1) {
					$("#output-caculator-1").html("");
				} else {
					$("#output-caculator-1").html(result);
				}
			} else {
				var result = $("#output-caculator-2").html();
				result = parseInt(result / 10);
				if (result <= 1) {
					$("#output-caculator-2").html("");
				} else {
					$("#output-caculator-2").html(result);
				}
			}
		});
	}

	if (Category == "events") {
		var countDownDate = new Date("Nov 21, 2021 23:59:59").getTime();
		var x = setInterval(function () {
			var now = new Date().getTime();
			var distance = countDownDate - now;

			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);

			var textTime = '<p class="time-number">' + days + '<br><span>days</span></p><p class="time-number">' + hours + '<br><span>hours</span></p><p class="time-number">' + minutes + '<br><span>minutes</span></p><p class="time-number">' + seconds + '<br><span>seconds</span></p>';
			$("#event-clockdown-time").html(textTime);

			if (distance < 0) {
				clearInterval(x);
				$("#event-clockdown-time").html("");
			}
		}, 1000);
		CarouselIMG();
	}


	var myCarousel = document.querySelector('#recipeCarousel')
	var carousel = new bootstrap.Carousel(myCarousel, {
		interval: 3000,
		wrap: false
	});

});

//Page Events
$(".form-event-reg button").click(function () {
	$(".modal-body").html("");
	var contentInput = $(".form-event-reg input").val();
	var count = CheckInputMail(contentInput);
	var mess = "";
	if (count == 0) {
		mess = '<h6>Fail!!!</h6><p>Invalid email</p>';
	} else {
		mess = '<h6>Success!!!</h6><p>Thank you for subscribing</p>';
	}
	$(".modal-body").html(mess);
	$(".form-event-reg input").val("");
});

//Page Contact
$(".form-contact button").click(function () {
	$(".modal-body").html("");
	var txtName = $(".form-contact input#username").val();
	var checkFailName = false;
	if (txtName == "") {
		checkFailName = true;
	}
	var contentMail = $(".form-contact input#email").val();
	var count = CheckInputMail(contentMail);
	var checkFailMail = false;
	if (count == 0) {
		checkFailMail = true;
	}
	var txtTitle = $(".form-contact input#title").val();
	var checkFailTitle = false;
	if (txtTitle == "") {
		checkFailTitle = true;
	}
	var txtMess = $(".form-contact textarea#mess").val();
	var checkFailMess = false;
	if (txtMess == "") {
		checkFailMess = true;
	}
	var Mess = '<h6>Success!!!</h6><p>Thanks for your feedback<br>We will respond as soon as possible</p>';
	if (checkFailName == true || checkFailMail == true || checkFailTitle == true || checkFailMess == true) {
		Mess = '<h6>Fail!!!</h6>';
	}
	if (checkFailName == true) {
		Mess += '<p>Invalid Name</p>';
	}
	if (checkFailMail == true) {
		Mess += '<p>Invalid Mail</p>';
	}
	if (checkFailTitle == true) {
		Mess += '<p>Invalid Title content</p>';
	}
	if (checkFailMess == true) {
		Mess += '<p>Invalid Messenger</p>';
	}
	$(".modal-body").html(Mess);
	$(".form-contact input#username").val("");
	$(".form-contact input#email").val("");
	$(".form-contact input#title").val("");
	$(".form-contact textarea#mess").val("");
});

//Register User


function CheckInputMail(DataInput) {
	var count = 0;
	for (var i = 0; i < DataInput.length; i++) {
		if (DataInput.substr(i, 1) == "@") {
			count = 1;
		}
	}
	if ((DataInput.substr(DataInput.length - 1, 1) == "@") || (DataInput.substr(0, 1) == "@")) {
		count = 0;
	}
	return count;
}

function CarouselIMG() {
	var autoSwap = setInterval(swap, 3500);
	$('ul, span').hover(
		function () {
			clearInterval(autoSwap);
		},
		function () {
			autoSwap = setInterval(swap, 3500);
		}
	);
	var items = [];
	var startItem = 1;
	var position = 0;
	var itemCount = $('.carousel li.items').length;
	var leftpos = itemCount;
	var resetCount = itemCount;

	$('li.items').each(function (index) {
		items[index] = $(this).text();
	});

	function swap(action) {
		var direction = action;

		if (direction == 'counter-clockwise') {
			var leftitem = $('.left-pos').attr('id') - 1;
			if (leftitem == 0) {
				leftitem = itemCount;
			}

			$('.right-pos').removeClass('right-pos').addClass('back-pos');
			$('.main-pos').removeClass('main-pos').addClass('right-pos');
			$('.left-pos').removeClass('left-pos').addClass('main-pos');
			$('#' + leftitem + '').removeClass('back-pos').addClass('left-pos');

			startItem--;
			if (startItem < 1) {
				startItem = itemCount;
			}
		}

		if (direction == 'clockwise' || direction == '' || direction == null) {
			function pos(positionvalue) {
				if (positionvalue != 'leftposition') {
					position++;
					if ((startItem + position) > resetCount) {
						position = 1 - startItem;
					}
				}

				if (positionvalue == 'leftposition') {
					position = startItem - 1;
					if (position < 1) {
						position = itemCount;
					}
				}
				return position;
			}
			$('#' + startItem + '').removeClass('main-pos').addClass('left-pos');
			$('#' + (startItem + pos()) + '').removeClass('right-pos').addClass('main-pos');
			$('#' + (startItem + pos()) + '').removeClass('back-pos').addClass('right-pos');
			$('#' + pos('leftposition') + '').removeClass('left-pos').addClass('back-pos');

			startItem++;
			position = 0;
			if (startItem > itemCount) {
				startItem = 1;
			}
		}
	}
	$('li').click(function () {
		if ($(this).attr('class') == 'items left-pos') {
			swap('counter-clockwise');
		}
		else {
			swap('clockwise');
		}
	});
}

$("#recipeCarousel").each(function JSONBLogPostSlide() {
	$.getJSON("json/post_content.json", function (data) {
		var currentURL = "";
		for (var i = 0; i < data.length; i++) {
			currentURL = "physical.html?physical-idpost" + data[i].id;
			var content = '<div class="card"><div class="card-img"><div style="background-image: url(' + data[i].poster_path + ');" class="card-img-top"></div></div><div class="card-body"><h5 class="card-title">' + data[i].title + '</h5><p class="card-text">' + data[i].description + '</p><a href="' + currentURL + '" class="dt-sc-button green">Read More <i class="fas fa-chevron-circle-right"></i></a></div></div>';
			$(".blog-entry-" + (i + 1)).html(content);

		}
	});
});

function CheckCategory() {
	var currentURL = window.location.href;
	//Check and Det Categoy
	currentURL = currentURL.replace(".html", "")
	currentURL = currentURL.split("/");
	var maxArr = currentURL.length - 1;
	currentURL = currentURL[maxArr];

	currentURL = currentURL.split("?");
	var Category = currentURL[0];

	if (currentURL.length > 1) {
		Category = currentURL[1];
		Category = Category.split("-idpost");
		Category = Category[0];
	}
	return Category;
}

function GetPostJSON() {
	$.getJSON("json/post_content.json", function (data) {
		//var data2 = data.concat(data);
		PostCategory(data);
	});
}

function PostCategory(data) {
	var data = data.concat(data);
	for (var i = 0; i < 3; i++) {
		data = data.concat(data);
	}
	var currentURL = window.location.href;
	var URLPost = currentURL;
	var Category = CheckCategory();

	//Check Post Yes or No
	currentURL = currentURL.split("-idpost");
	var CheckPost = true;
	if (currentURL.length <= 1) {
		CheckPost = false;
		currentURL = currentURL[0].split('?');
		var PathPost = "?" + Category + "-idpost";
		if (currentURL.length > 1) {
			PathPost = "-idpost";
		}
	} else {
		var IdPost = currentURL[1];
	}

	var content = "";
	$(".breadcrumb").html('<a href="index.html" class="home-breadcrumb">Home</a><i class="fas fa-chevron-right"></i><a href="' + currentURL[0] + '" class="current-breadcrumb">' + Category + '</a>');

	if (CheckPost == false) {
		$(".breadcrumb-section .title").html("<h1>Archive for Category: " + Category + "</h1>");
		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			var ArrCategory = item.category.length;
			for (var j = 0; j < ArrCategory; j++) {
				if ((item.category[j]).toLowerCase() == Category && (i > 10)) {
					var datePost = item.date_post;
					datePost = datePost.split("/");
					content = '<div class="col-12 col-md-6 blog-entry-list"><article class="blog-entry"><div class="blog-inner"><div class="blog-entry-meta"><div class="blog-entry-left"><div class="blog-author"><img src="./img/banner/author.png" class="avatar"></div><div class="date entry-ribbon"><span>' + datePost[0] + '/' + datePost[1] + '</span><p>' + datePost[2] + '</p></div><div class="comments entry-ribbon">' + item.comment[0].count + '<i class="far fa-comments"></i></div></div><div class="entry-thumb"><a class="img-thumb" href="' + URLPost + PathPost + item.id + '" style="background-image: url(' + item.poster_path + ')" class="attachment-full" ></a></div></div><div class="entry-details"><div class="entry-title"><h3>' + item.title + '</h3></div><div class="entry-metadata"><p class="category"><i class="fas fa-folder-open"></i><a href="' + currentURL[0] + '">' + item.category[j] + '</a></p></div><div class="entry-body"><p>' + item.description + '</p></div><button type="button" class="btn btn-danger"><a href="' + URLPost + PathPost + i + '" class="entry-read"> Read More<i class="fas fa-chevron-circle-right"></i></a></button></div></div></article></div>';
					$(".category-post").append(content);
				}
			}
		}
		var items = $(".category-post .blog-entry-list");
		var numItems = items.length;
		var perPage = 8;
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
	} else {
		var ramdom = Math.floor(Math.random() * data.length);
		var item = data[IdPost - 1];
		$(".breadcrumb-section .title").html("<h1> " + item.title + "</h1>");
		content = '<div class="content-blog"><div class="post-header"><div class="post-header-bg" style="background-image: url(' + data[ramdom].poster_path + ')"></div><div class="post-header-info"><span><img src="./img/banner/author.png">' + item.user + '</span><span class="post-header-right"><span class="post-header-date">' + item.date_post + '</span><span class="post-header-comment">' + item.comment[0].count + '<i class="far fa-comments"></i></span></span></div></div><div class="post-content">' + item.content + '</div>';

		content += '<div class="share-handler-wrap"><span class="share-handler"><i class="fas fa-share-alt"></i><b class="text"> Share</b></span><span class="social-item facebook first"><a class="bs-button-el"><span class="icon"><i class="fab fa-facebook-f"></i></span></a></span><span class="social-item twitter"><a class="bs-button-el"><span class="icon"><i class="fab fa-twitter"></i></span></a></span><span class="social-item google_plus"><a class="bs-button-el"><span class="icon"><i class="fab fa-google"></i></span></a></span><span class="social-item pinterest"><a class="bs-button-el"><span class="icon"><i class="fab fa-pinterest-p"></i></span></a></span><span class="social-item email last"><a class="bs-button-el"><span class="icon"><i class="far fa-envelope"></i></span></a></span></div>';
		$(".category-post").append(content);

		$.getJSON("json/post_content.json", function (data) {
			var currentURL = "";
			var content = '<div class="related-news"><h5 class="title-hr">Related News</h5><div id="recipeCarousel" class="carousel slide carousel-post-blog" data-bs-ride="carousel"><div class="carousel-inner"><div class="carousel-item active"><div class="carousel-item-half"><article class="blog-entry blog-entry-1"></article></div><div class="carousel-item-half"><article class="blog-entry blog-entry-2"></article></div><div class="carousel-item-half"><article class="blog-entry blog-entry-3"></article></div></div><div class="carousel-item"><div class="carousel-item-half"><article class="blog-entry blog-entry-4"></article></div><div class="carousel-item-half"><article class="blog-entry blog-entry-5"></article></div><div class="carousel-item-half"><article class="blog-entry blog-entry-6"></article></div></div><div class="carousel-item"><div class="carousel-item-half"><article class="blog-entry blog-entry-7"></article></div><div class="carousel-item-half"><article class="blog-entry blog-entry-8"></article></div><div class="carousel-item-half"><article class="blog-entry blog-entry-9"></article></div></div></div><div class="carousel-indicators"><button type="button" data-bs-target="#recipeCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button><button type="button" data-bs-target="#recipeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button><button type="button" data-bs-target="#recipeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button></div></div></div>';

			$(".category-post").append(content);
			for (var i = 0; i < data.length; i++) {
				currentURL = "physical.html?physical-idpost" + data[i].id;
				var content = '<a href="' + currentURL + '"><div class="card"><div class="card-img"><div style="background-image: url(' + data[i].poster_path + ');" class="card-img-top"></div></div><div class="card-body"><h5 class="card-title">' + data[i].title + '</h5></div></div></a>';
				$(".blog-entry-" + (i + 1)).html(content);
			}
		});
	}
}

function GetJSONAlphabet() {
	$.getJSON("json/awareness_alphabet.json", function (data) {
		handleAlphabet(data);
	});
}
function handleAlphabet(data) {
	var content = "";
	for (var i = 0; i < data.length; i++) {
		content = '<div class="box-pick-item box-pick-item-alphabet"><a onclick="settime(' + i * 2 + ')" id="idClick' + i * 2 + '" class="mini-audio"><img src="' + data[i].img + '"><i class="fas fa-volume-up"></i></a><audio id="myaudio' + i * 2 + '" src="./video/english-alphabet-sounds.mp3"></audio></div>';
		$(".box-pick-detail").append(content);
	}
}
function settime(TimeStart) {
	$('#idClick' + TimeStart + ' .fas').removeClass('fa-volume-up').addClass('fa-pause');
	var audio = document.getElementById("myaudio" + TimeStart);
	audio.currentTime = TimeStart;
	audio.play();
	setInterval(function () {
		if (audio.currentTime > (TimeStart + 1)) {
			audio.pause();
			$('#idClick' + TimeStart + ' .fas').removeClass('fa-pause').addClass('fa-volume-up');
			return;
		}
	}, 1000);
}
function GetJSONAnimal() {
	$.getJSON("json/awareness_animal.json", function (data) {
		handleAnimal(data);
	});
}
function handleAnimal(data) {
	var content = "";
	for (var i = 0; i < data.length; i++) {
		content = '<div class="box-pick-item box-pick-item-animal"><a class="mini-audio"><img src="' + data[i].img + '"><p>' + data[i].name + '</p><i class="fas fa-volume-up"></i><audio controls onended="onEnded()"><source src="' + data[i].mp3 + '" type="audio/mpeg"></audio></a></div>';
		$(".box-pick-detail").append(content)
	}
	$('a.mini-audio').click(function () {
		$(this).find('.fas').removeClass('fa-volume-up').addClass('fa-pause');
		$(this).find('audio').trigger('play');
	});
}
function GetJSONColor() {
	$.getJSON("json/awareness_color.json", function (data) {
		handleColor(data);
	});
}
function handleColor(data) {
	var content = "";
	for (var i = 0; i < data.length; i++) {
		content = '<div class="box-pick-item"><a class="mini-audio"><img src="./img/post/color/' + data[i].color + '.jpg"><p style="background:' + data[i].color + '">' + data[i].color + '</p><i class="fas fa-volume-up"></i><audio controls onended="onEnded()"><source src="' + data[i].mp3 + '" type="audio/mpeg"></audio></a></div>';
		$(".box-pick-detail").append(content);
	}
	$('a.mini-audio').click(function () {
		$(this).find('.fas').removeClass('fa-volume-up').addClass('fa-pause');
		$(this).find('audio').trigger('play');
	});
}
function onEnded() {
	$('a.mini-audio .fas').removeClass('fa-pause').addClass('fa-volume-up');
};

function GetCalendar() {
	var content = '<div class="elegant-calencar d-md-flex"><div class="wrap-header d-flex align-items-center"><p id="reset">reset</p><div id="header" class="p-0"><div class="pre-button d-flex align-items-center justify-content-center"><i class="fa fa-chevron-left"></i></div><div class="head-info"><div class="head-day"></div><div class="head-month"></div></div><div class="next-button d-flex align-items-center justify-content-center"><i class="fa fa-chevron-right"></i></div></div></div><div class="calendar-wrap"><table id="calendar"><thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead><tbody><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table></div></div>';
	$(".box-pick-detail").append(content);
}


function GetSearch(textSearch) {
	var search = textSearch;
	search = search.replace("-", " ");

	var content = "";
	$.getJSON("json/post_content.json", function (data) {
		var count = $(".count-search-post strong").html();
		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			var title = item.title.toLowerCase();
			if (title.includes(search) == true) {
				content = '<div class="item-inner"><a href="./physical.html?' + item.category[0] + '-idpost' + item.id + '"><div class="featured-image"><span style="background-image: url(' + item.poster_path + ');"></span></div><p class="featured-title">' + item.title + '</p><span class="featured-category">' + item.category[0] + '</span></a></div>';
				$(".search-post").append(content);
				count++;
			}
		}

		if (count > 0) {
			$(".count-search-post strong").html(count);
		}
	});
	$.getJSON("json/video.json", function (data) {
		var count = $(".count-search-post strong").html();
		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			var title = item.title.toLowerCase();
			if (title.includes(search) == true) {
				content = '<div class="item-inner"><a href="./video.html?' + item.id + '"><div class="featured-image"><span style="background-image: url(' + item.img + ');"></span></div><p class="featured-title">' + item.title + '</p><span class="featured-category">video clips</span></a></div>';
				$(".search-post").append(content);
				count++;
			}
		}

		if (count > 0) {
			$(".count-search-post strong").html(count);
		}
	});
}

function CheckUser() {
	$(".form-reg button").click(function () {
		$(".modal-body").html("");
		var txtName = $(".form-reg input#username").val();
		var checkFailName = false;
		if (txtName == "") {
			checkFailName = true;
		}
		var contentMail = $(".form-reg input#email").val();
		var count = CheckInputMail(contentMail);
		var checkFailMail = false;
		if (count == 0) {
			checkFailMail = true;
		}
		var txtPass = $(".form-reg input#password").val();
		var checkFailPass = false;
		if (txtPass == "") {
			checkFailPass = true;
		}
		var Mess = '';
		if (checkFailName == true || checkFailMail == true || checkFailPass == true) {
			Mess = '<h6>Fail!!!</h6>';
		} else {
			$(".form-reg input#username").val("");
			$(".form-reg input#email").val("");
			$(".form-reg input#password").val("");

			window.localStorage.setItem('kidszone-username', txtName);
			window.localStorage.setItem('kidszone-email', contentMail);
			window.localStorage.setItem('kidszone-password', txtPass);
			window.localStorage.setItem('kidszone-login', "false");

			Mess = '<h6>Success!!!</h6><p>Thank you for signing up for an account</p> \
			<p id="username">Username:<span>' + txtName + '</span></p> \
			<p id="email">Email:<span>' + contentMail + '</span></p> \
			<p id="password">Password:<span>' + txtPass + '</span></p>';
		}
		if (checkFailName == true) {
			Mess += '<p>Invalid Name</p>';
		}
		if (checkFailMail == true) {
			Mess += '<p>Invalid Mail</p>';
		}
		if (checkFailPass == true) {
			Mess += '<p>Invalid Password</p>';
		}
		$(".modal-body").html(Mess);
	});

	$(".form-login button").click(function () {
		$(".modal-body").html("");
		var txtName = $(".form-login input#username").val();
		var checkFailName = false;
		if (txtName == "") {
			checkFailName = true;
		}
		var txtPass = $(".form-login input#password").val();
		var checkFailPass = false;
		if (txtPass == "") {
			checkFailPass = true;
		}
		var Mess = '';
		if (checkFailName == true || checkFailPass == true) {
			Mess = '<h6>Fail!!!</h6>';
		} else {
			var nameLocal = window.localStorage.getItem('kidszone-username');
			var mailLocal = window.localStorage.getItem('kidszone-email');
			var passwordLocal = window.localStorage.getItem('kidszone-password');
			if ((txtName == nameLocal || txtName == mailLocal) && (txtPass == passwordLocal)) {
				$(".form-reg input#username").val("");
				$(".form-reg input#password").val("");

				$(".user-page #nav-tab #nav-home-tab").addClass("hidden");
				$(".user-page #nav-tabContent #nav-home").addClass("hidden");
				$(".user-page #nav-tab #nav-profile-tab").addClass("hidden");
				$(".user-page #nav-tabContent #nav-profile").addClass("hidden");

				$("#nav-tab #nav-contact-tab").removeClass("hidden");
				$(".user-page #nav-tabContent #nav-contact").addClass("active show");
				$(".user-page #nav-tabContent #nav-contact").removeClass("hidden");

				window.localStorage.setItem('kidszone-login', "true");
				Mess = '<h6>Success!!!</h6>';

				$(".form-user #name-user").html(nameLocal);
			} else {
				Mess = '<h6>Fail!!!</h6><p>Invalid Username or Password</p>';
			}
		}
		if (checkFailName == true) {
			Mess += '<p>Invalid Name</p>';
		}
		if (checkFailPass == true) {
			Mess += '<p>Invalid Password</p>';
		}
		$(".modal-body").html(Mess);
	});

	$(".form-user button").click(function () {
		window.localStorage.setItem('kidszone-login', "false");

		$(".user-page #nav-tab #nav-home-tab").removeClass("hidden");
		$(".user-page #nav-tabContent #nav-home").removeClass("hidden");
		$(".user-page #nav-tabContent #nav-home").addClass("active show");

		$(".user-page #nav-tab #nav-profile-tab").removeClass("hidden");
		$(".user-page #nav-tabContent #nav-profile").removeClass("hidden");

		$("#nav-tab #nav-contact-tab").addClass("hidden");
		$(".user-page #nav-tabContent #nav-contact").removeClass("active show");
		$(".user-page #nav-tabContent #nav-contact").addClass("hidden");
	});

	var checkLogin =  window.localStorage.getItem('kidszone-login');
	console.log(checkLogin);
	if (checkLogin == "true") {
		$(".user-page #nav-tab #nav-home-tab").addClass("hidden");
		$(".user-page #nav-tabContent #nav-home").addClass("hidden");

		$(".user-page #nav-tab #nav-profile-tab").addClass("hidden");
		$(".user-page #nav-tabContent #nav-profile").addClass("hidden");

		$("#nav-tab #nav-contact-tab").removeClass("hidden");
		$(".user-page #nav-tabContent #nav-contact").addClass("active show");
		$(".user-page #nav-tabContent #nav-contact").removeClass("hidden");

		var nameLocal =  window.localStorage.getItem('kidszone-username');
		$(".form-user #name-user").html(nameLocal);
	} else {
		$(".user-page #nav-tab #nav-home-tab").removeClass("hidden");
		$(".user-page #nav-tabContent #nav-home").removeClass("hidden");
		$(".user-page #nav-tabContent #nav-home").addClass("active show");

		$(".user-page #nav-tab #nav-profile-tab").removeClass("hidden");
		$(".user-page #nav-tabContent #nav-profile").removeClass("hidden");

		$("#nav-tab #nav-contact-tab").addClass("hidden");
		$(".user-page #nav-tabContent #nav-contact").removeClass("active show");
		$(".user-page #nav-tabContent #nav-contact").addClass("hidden");
	}
}

var mytheme_urls = {
	scroll: 'disable'
	, stickynav: 'enable'
	, is_admin: ''
	, skin: 'turquoise'
	, layout: 'wide'
	, isResponsive: 'enable'
	, layout_pattern: ''
};

$(window).scroll(function () {
	var scrollTop = $(window).scrollTop();
	if (scrollTop > 90) {
		$("#menu-container-sticky-wrapper").addClass("is-sticky");
		$("#menu-container").attr('style', 'position: fixed; top: 0px;');
	} else {
		$("#menu-container-sticky-wrapper").removeClass("is-sticky");
		$("#menu-container").attr('style', '');
	}
});