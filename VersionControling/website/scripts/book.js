var BOOKs = (function(){

	var expose = {

	}, hide = {
		handleNoSupplierSetUpYet: handleNoSupplierSetUpYet,
		loadItems: loadItems,
		printItems: printItems
	};

	(function init(){
		console.log("book.js init()");
		loadItems();
	})();
	
	function loadItems(){
		if(window.BOOK_CONFIG.API_GW_BASE_URL_STR === null)
		{
			handleNoSupplierSetUpYet("Live coffee information coming shortly");
		}
		else
		{
			$.get(window.BOOK_CONFIG.API_GW_BASE_URL_STR + "/books", printBeans).fail(function(){
					handleNoSupplierSetUpYet("Live coffee supply information coming <u>very soon</u>!");
				});
		}
	}


	function handleNoSupplierSetUpYet(msg_str){
		var html_str = '';
		// html_str += '<section>';
		html_str += 	'<output>';
		html_str += 		msg_str;
		html_str += 	'</output>';
		// html_str +=	'</section>';
		$("[data-role='browse_coffee_content']")
				.append(html_str);
	}

	

	function printBeans(all_beans_obj_arr){
		
		/*console.log(all_beans_obj_arr);
		console.log(all_beans_obj_arr.books);
		console.log(all_beans_obj_arr.books[0]);*/

		var html_str = '';
		html_str += '<section data-role="bean_container">';
		for(var i_int = 0, o = {}; i_int < all_beans_obj_arr.books.length; i_int += 1)
		{
			o = all_beans_obj_arr.books[i_int];
			console.log(o);
			html_str += '<div class="col-md-3" id="kartya"><div class="card p-3 mb-2"><div class="d-flex justify-content-between"><div class="d-flex flex-row align-items-center"><div class="icon"> <img src="favicon.ico"></img> </div> <div class="ms-2 c-details">'
            html_str += '<h6 class="mb-0">Dribbble</h6> <span>4 days ago</span></div></div><div class="reading"> <span>Reading</span> </div></div><div class="mt-5">'
            html_str += '<h3 class="heading">Junior Product<br>Designer-Singapore</h3><div class="mt-5"><div class="progress"><div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div></div><div class="mt-3"> <span class="text1">42 Applied <span class="text2">of 70 capacity</span></span> </div></div></div></div></div>'
		}
		html_str += '</section>';
		$("[data-role='browse_coffee_content']")
				.append(html_str);
	}

	function printItems(all_products_obj_arr){
		var html_str = '';
		html_str += '<section>';
		for(var i_int = 0, o = {}; i_int < all_products_obj_arr.length; i_int += 1){
			o = all_products_obj_arr[i_int];
			html_str += '<div data-product_id="' + o. product_id_str + '">';
			html_str += 	'<h3>';
			html_str += 		o.product_name_str;
			html_str += 	'</h3>';
			html_str += 	'<h4>$' + (o.price_in_cents_int/100).toFixed(2) + '</h4>';
			html_str += 	'<section>';
			for(var k_int = 0; k_int < o.tag_str_arr.length; k_int += 1){
				html_str += '<span>' + o.tag_str_arr[k_int] + '</span>';
			}
			html_str += 	'</section>';
			html_str += 	'<figure>';
			html_str += 		'<img src="images/items/' + formatWithUnderscores(o.product_name_str) + '.png" alt="Image for our ' + o.product_name_str + '" />';
			html_str += 		'<figcaption>';
			html_str += 			o.description_str;
			html_str += 		'</figcaption>';
			html_str += 	'</figure>';
			html_str += '</div>';
		}
		html_str += '</section>';
		$("[data-role='browse_coffee_content']").append(html_str);
	}

	return expose;

})();
