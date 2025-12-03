/* 에이빌더 전용 jquery 프로그램 */

// 에이빌더 게시판용
var cmt_modify_idx = '';
var cmt_reply_idx = '';
var as_interval = null;
//if (typeof(designer_box_url) !== 'undefined') return;	// 디자이너에서 실행되지 않도록 하는 회피용 샘풀

// This hotfix makes older versions of jQuery UI drag-and-drop work in IE9
(function($){var a=$.ui.mouse.prototype._mouseMove;$.ui.mouse.prototype._mouseMove=function(b){if($.browser.msie&&document.documentMode>=9){b.button=1};a.apply(this,[b]);}}(jQuery));
jQuery.fn.extend({ renameAttr: function(name, newName, removeData) { var val; return this.each(function() { val = jQuery.attr(this, name); jQuery.attr(this, newName, val); jQuery.removeAttr(this, name); }); } });

// Autosize 1.15.3 - jQuery plugin for textareas
// (c) 2013 Jack Moore - jacklmoore.com
// license: www.opensource.org/licenses/mit-license.php
(function($){var defaults={className:'autosizejs',append:'',callback:false},hidden='hidden',borderBox='border-box',lineHeight='lineHeight',copy='<textarea name="tmptxtarea" tabindex="-1" style="position:absolute; top:-9999px; left:-9999px; right:auto; bottom:auto; border:0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;"/>',copyStyle=['fontFamily','fontSize','fontWeight','fontStyle','letterSpacing','textTransform','wordSpacing','textIndent'],oninput='oninput',onpropertychange='onpropertychange',mirrored,mirror=$(copy).data('autosize',true)[0];mirror.style.lineHeight='99px';if($(mirror).css(lineHeight)==='99px'){copyStyle.push(lineHeight)}mirror.style.lineHeight='';$.fn.autosize=function(options){options=$.extend({},defaults,options||{});if(mirror.parentNode!==document.body){$(document.body).append(mirror)}return this.each(function(){var ta=this,$ta=$(ta),minHeight=$ta.height(),active,resize,boxOffset=0,callback=$.isFunction(options.callback);if($ta.data('autosize')){return}if($ta.css('box-sizing')===borderBox||$ta.css('-moz-box-sizing')===borderBox||$ta.css('-webkit-box-sizing')===borderBox){boxOffset=$ta.outerHeight()-$ta.height()}resize=($ta.css('resize')==='none'||$ta.css('resize')==='vertical')?'none':'horizontal';$ta.css({overflow:hidden,overflowY:hidden,wordWrap:'break-word',resize:resize}).data('autosize',true);function initMirror(){mirrored=ta;mirror.className=options.className;$.each(copyStyle,function(i,val){mirror.style[val]=$ta.css(val)})}function adjust(){var height,overflow,original;if(mirrored!==ta){initMirror()}if(!active){active=true;mirror.value=ta.value+options.append;mirror.style.overflowY=ta.style.overflowY;original=parseInt(ta.style.height,10);mirror.style.width=$ta.width()+'px';mirror.scrollTop=0;mirror.scrollTop=9e4;height=mirror.scrollTop;var maxHeight=parseInt($ta.css('maxHeight'),10);maxHeight=maxHeight&&maxHeight>0?maxHeight:9e4;if(height>maxHeight){height=maxHeight;overflow='scroll'}else if(height<minHeight){height=minHeight}height+=boxOffset;ta.style.overflowY=overflow||hidden;if(original!==height){ta.style.height=height+'px';if(callback){options.callback.call(ta)}}setTimeout(function(){active=false},1)}}if(onpropertychange in ta){if(oninput in ta){ta[oninput]=ta.onkeyup=adjust}else{ta[onpropertychange]=adjust}}else{ta[oninput]=adjust}$(window).resize(adjust);$ta.bind('autosize',adjust);adjust()})}}(window.jQuery||window.Zepto));

$(function() {
	
	// 날짜입력상자
	now = new Date();

	// 드래그객체
	$('.draggable').draggable({ scroll: true });
	
	// 마우스 좌표 얻음
	__mouse_xy = new Array();
	$(this).bind('mousemove',function(e) { __mouse_xy[0] = e.pageX; __mouse_xy[1] = e.pageY; __mouse_xy[2] = e.screenX; __mouse_xy[3] = e.screenY; });

	// 버튼 커서모양 변경
	$('body').on('change', 'form', function(e) { submit_is_ing = 'N'; $('*[name$=\"[]_multi\"]', $(this)).prop('disabled', false); $(e.srcElement).removeClass('AB-empty-value'); });
	$('body').on('mouseover', 'img[id*=_btn_],p[id*=_btn_],span[id*=_btn_],img[id*=-btn-],p[id*=-btn-],span[id*=-btn-]', function(e) { $(this).css('cursor', 'pointer'); });
	/*if (performance.navigation.type == 2) { window.location.reload(); }	// 뒤로가기(브라우저 캐시로 로딩)할 때 강제로 새로고침 시키는 코드(보관용)*/
	
	$.fn.unveil=function(a,b){function i(){var a=g.filter(function(){var a=$(this);if(!a.is(":hidden")){var b=c.scrollTop(),e=b+c.height(),f=a.offset().top,g=f+a.height();return g>=b-d&&f<=e+d}});h=a.trigger("unveil"),g=g.not(h)}var h,c=$(window),d=a||0,e=window.devicePixelRatio>1,f=e?"data-src-retina":"data-src",g=this;return this.one("unveil",function(){var a=this.getAttribute(f);a=a||this.getAttribute("data-src"),a&&(this.setAttribute("src",a),"function"==typeof b&&b.call(this))}),c.on("scroll.unveil resize.unveil lookup.unveil",i),i(),this};
	$(".unveil img").unveil(200);
  
	// 게시물 제목을 레이아웃의 타이틀에 추가
	var obj_atmtl = $('#ab-title-move-to-layout'); if (obj_atmtl.length > 0) { var atmtl_ttl_sel = obj_atmtl.attr('data-ttl-sel'); if (atmtl_ttl_sel === undefined) atmtl_ttl_sel = 'h3.AB-sj-h3'; var obj_atmtl_ttl_sel = $(atmtl_ttl_sel); if (obj_atmtl_ttl_sel.length > 0) { $(atmtl_ttl_sel).prepend(obj_atmtl.html() + ' '); obj_atmtl.remove(); }}
  
	// 로딩중표시기
	$('body').on('click', '.loading-img', function(e) { $('#loading_img').loading_img({'cobj':$(this)}); });		// 로딩중 표시기 노출 마크업 클릭인 경우
	$.fn.loading_img = function(vars) { if (vars.off === 'Y') { this.css('display', 'none'); $('body').css('cursor', 'default'); } else { if (vars.cobj.attr('data-overlay') === 'Y') this.addClass('overlay-on'); this.css('display', ''); }}
	if ($('#loading_img').length <= 0 && typeof(admin_theme) !== 'undefined') $('<div style="display: none;" id="loading_img" class="core-load-wrap"><img src="./cooker/theme/" + admin_theme + '/images/loading_front.gif" alt="loading..." /></div>').appendTo('body');
	
	$('body').on('click', '.instantMsgWrap .msgClose', function(e) { $(this).parents('div').eq(0).css('display', 'none'); });
	
	// tr을 복사하여 추가하는 버튼
	$('body').on('click', '.AB-copy-tr,.AB-copy-div', function(e) {
		var targT = 'tr', targPT = 'table'; if ($(this).hasClass('AB-copy-div')) targT = 'div', targPT = 'div';
		var exp_data = $(this).attr('data-clone-' + targT).split(','), objT = $('#' + exp_data[0]), targ_cnt = exp_data[1], objTP = objT.parents(targPT).eq(0), curr_cnt = $(targT + '.clone-' + targT, objTP).length;
		if (curr_cnt >= targ_cnt - (objT.is(':visible') ? 1 : 0)) { alert(targ_cnt + lang_core[18]); return; }
		
		var keep_data = [];
		if (exp_data[2] !== undefined) keep_data = exp_data[2].split(';');
		var objTClone = objT.clone().removeAttr('id').addClass('clone-' + targT).css('display', '');
		$('.clone-remove', objTClone).remove();
		$('.clone-show', objTClone).css('display', '');
		$('.clone-hide', objTClone).css('display', 'none');
		$('*[name^="MUL_"],.clone-dv', objTClone).each(function(idx) {
			var obj_box_name = $(this).attr('name');
			if (obj_box_name.substr(obj_box_name.length-6) !== '_DSF[]') {
				if (!in_array(obj_box_name, keep_data)) {
					if ($(this).attr('type') === 'checkbox') $(this).prop('checked', false);
					else if ($(this)[0].tagName !== 'textarea') $(this).val(''); else $(this).html('');
				} else {
					if ($(this)[0].tagName === 'SELECT') $(this).val($('select[name="' + obj_box_name + '"]', objT).val());
				}
				if ($(this).hasClass('hasDatepicker')) $(this).removeClass('hasDatepicker').removeAttr('id');
			}
		});
		var objCllid = $('select[-cll-id]', objTClone);	// 단계별선택상자(단일분류형)
		if (objCllid.length > 0) { var arg = eval('arg_' + objCllid.attr('-cll-id')); objCllid.category_load_next_box(arg[0], arg[1], arg[2], arg[3], arg[4]); }
		
		// +버튼 눌렀을때 해당 라인의 Input 값을 새로 생성될 라인에 똑같이 반영하는 기능
		// +버튼에 data-clone-value="category_1,category_2" 형식으로 입력
		// 값을 가져올 input , 값을 반영할 input에 동일한 class="category_1" 입력 <예시>
		// after_add 클래스가 적용된 +에 사용가능
		if ($(this).data('clone-value') != '' && $(this).hasClass('after-add')) {		
			var this_btn = $(this);
			var clone_value = $(this).data('clone-value').split(',');
			$.each(clone_value, function(index, value) {
				sel = this_btn.parent().find('.'+value).val();
				objTClone.find('.'+value).val(sel);
			});
		}
		// 멀티(hidden)체크상자가 있는 경우 [] -> [숫자]로 치환(MUL_mng_schedule_category_5[0]_multi[]) 되도록 함
		var objApd = objTClone, clnTag = $('<tmptag>').append(objTClone).html(); if (clnTag.indexOf('[]_multi[]') >= 0) { clnTag = clnTag.replace(/(MUL_[\w]+\[)(\]_)/g, '$1' + (curr_cnt+1).toString() + '$2'); objApd = clnTag; }
		if($(this).hasClass('after-add')) $(this).parent(targT).after(objApd); else objTP.append(objApd); ab_date_picker();	// after-add 클래스가 있을경우 해당 버튼의 div 밑에 생성됨 2023-06-20 leejunghyung
	});

	// 복사된 tr을 제거하는 버튼
	$('body').on('click', '.AB-del-tr,.AB-del-div', function(e) {
		var targT = 'tr';
		if ($(this).hasClass('AB-del-div')) targT = 'div';
		var objT = $(this).parents(targT + '.clone-' + targT).eq(0);
		if (objT.hasClass('clone-' + targT)) objT.remove();
		else {
			var msg = objT.attr('data-msg');
			if (msg === undefined) alert(lang_core[19]);
			else if (msg !== 'X') alert(msg);
		}
	});
	
	// 전화걸기 터치시
	$('body').on('click', 'a[href*="tel:"]', function(e) {
		var url = '/visit_log/visit_etc_action.php?proc_mode=tel&tel=' + $(this).attr('href');
		var tail = $(this).attr('data-tail'); if (tail !== undefined) url += '&' + tail;//console.log(url);
		$.get(url, {}, function(data) {
			var scts = [];
			var tag = $.parseHTML(data, document, true);																				// 태그를 배열로(스크립트 포함)
			if (tag !== null) {
				for (var i=0; i<tag.length; i++) if ($(tag[i]).hasClass('after_process_script')) scts.push(tag[i]);	// 클래스가 마크업된 태그를 찾아서 배열에 담는다
				//console.log(scts);
				var objdt = $('<tmptag>').append(scts);
				$('body').append(objdt);
			}
		});
	});
	
	// 문자전송 터치시
	$('body').on('click', 'a[href*="sms:"]', function(e) {
		var url = '/visit_log/visit_etc_action.php?proc_mode=sms&sms=' + $(this).attr('href');
		var tail = $(this).attr('data-tail'); if (tail !== undefined) url += '&' + tail;//console.log(url);
		$.get(url, {}, function(data) {
			var scts = [];
			var tag = $.parseHTML(data, document, true);
			if (tag !== null) {
				for (var i=0; i<tag.length; i++) if ($(tag[i]).hasClass('after_process_script')) scts.push(tag[i]);
				//console.log(scts);
				var objdt = $('<tmptag>').append(scts);
				$('body').append(objdt);
			}
		});
	});
	
	// 특정 배너링크 클릭시 전환스크립트 실행
	$('body').on('click', '.bos-conv-banner-click', function(e) {
		var url = '/visit_log/visit_etc_action.php?proc_mode=ban&name=' + $(this).attr('data-banner-name');
		var tail = $(this).attr('data-tail'); if (tail !== undefined) url += '&' + tail;//console.log(url);
		$.get(url, {}, function(data) {
			var scts = [];
			var tag = $.parseHTML(data, document, true);																				// 태그를 배열로(스크립트 포함)
			if (tag !== null) {
				for (var i=0; i<tag.length; i++) if ($(tag[i]).hasClass('after_process_script')) scts.push(tag[i]);// 클래스가 마크업된 태그를 찾아서 배열에 담는다
				//console.log(scts);
				var objdt = $('<tmptag>').append(scts);
				$('body').append(objdt);
			}
		});
	});
	
	// 링크주소 #; 제거/복원
	$('body').on('click', 'a', function(e) {
		if (!$(this).hasClass('dsbl-tmp')) {
			if ($(this).attr('href') == null && $(this).attr('tmp') != null) $(this).attr('href', $(this).attr('tmp')).removeAttr('tmp');
			if ($(this).attr('href') == '#;' || $(this).attr('href') == '#') $(this).attr('tmp', $(this).attr('href')).removeAttr('href').css('cursor', 'pointer');
		}
		//요 click 이벤트 처리문 바로 아래쪽에 있는 내용$('body').on('mouseout', 'a', function(e) { if ($(this).attr('href') == null && $(this).attr('tmp') != null) $(this).attr('href', $(this).attr('tmp')).removeAttr('tmp'); });
		var form = $(this).parents('form');
		if (form.length > 0) {
			var chg_frma = $(this).attr('data-frma');
			if (chg_frma !== undefined) $.each(str_to_json(chg_frma), function(an, av) {
				if (typeof(av) === 'string') form.attr(an, av);
				else { $.each(av, function(nm, val) { /*console.log(nm); */form.append('<input type="hidden" name="' + nm + '" value="' + val + '">'); }); }
			});
			if ($(this).hasClass('AB-btn-rec-chk')) {
				var chk_idxs = [];
				var dtvan = $(this).attr('data-van');	// 체크값변경 속성
				$('input[name="list_select[]"]', form).each(function(i) {
					if ($(this).is(':checked')) {
						var chk_val = dtvan === undefined ? $(this).val() : $(this).attr(dtvan);
						chk_idxs.push(chk_val);
					}
				});
				if (chk_idxs.length > 0) {
					var jn = $(this).attr('data-jn'); if (jn === undefined) jn = ',';
					var pn = $(this).attr('data-pn'); if (pn === undefined) pn = 'chk';
					if ($(this).attr('data-wl') !== 'N') {	// exec-func="evt,click,#xxxx" 로 클릭 시키는 경우 window.location 으로 해야 진행됨 (엑셀 다운로드 등)
						window.location = $(this).attr('href') + '&' + pn + '=' + chk_idxs.join(jn);
						return false;
					} else $(this).attr('href', $(this).attr('href') + '&' + pn + '=' + chk_idxs.join(jn));
				} else {
					var msg = $(this).attr('data-msg');
					if (msg === undefined) msg = lang_core[22];	// 메시지 설정이 없으면 '항목을 선택하세요' 설정
					if (msg !== 'X') { alert_core(msg); return false; }
				}
			}
		}
	});
	
	// 입력상자 문자 처리
	$('body').on('blur', '.AB-trim', function(e) { $(this).val(trim($(this).val())); });
	$('body').on('blur', '.AB-no-enter', function(e) { $(this).val($(this).val().replace(/[\n\r]/, '')); });
	
	// 버튼클릭전에 메시지 띄우기
	$('*[data-cf-msg]').not('[class*="AB_btn_dialog_"]').each(function(i) {
		console.log('data-cf-msg');
		var tn = $(this).prop('tagName'), oc = $(this).attr('onclick');
		if (oc === undefined || (oc.indexOf('confirm(') < 0 && oc.indexOf('alert_core(') < 0)) {
			var msg = $(this).attr('data-cf-msg'); if (msg != '') {
				if (tn == 'BUTTON') $(this).attr('onclick', "alert_core('" + msg + "', {}, function() { " + oc + " }, function() { }); return false;");
				else if (tn == 'A') $(this).attr('onclick', "alert_core('" + msg + "', {}, function() { document.location.href='" + $(this).attr('href') + "'; }, function() { }); return false;");
				else if (tn == 'INPUT') {
					if ($(this).attr('type') === 'button') $(this).attr('onclick', "alert_core('" + msg + "', {}, function() { " + oc + " }, function() { }); return false;");
					else $(this).attr('onclick', "alert_core('" + msg + "', {}, function() { }, function() { }); return false;");
				}
			}
		}
	});
	
	// 개별 입력상자 값 검증 결과 메시지를 보여주는 함수
	$.fn.real_time_verify_msg = function(vars) {
		var oms;
		var obj_this = $(this);
		if (vars.result === true) vars.result = 'Y';
		if (vars.msc === undefined) vars.msc = 'admin-help-in';
		if (obj_this.attr('data-msg') !== undefined) vars.msg = obj_this.attr('data-msg');
		oms_html = obj_this.attr('oms-html');
		oms = obj_this.next('span.' + vars.msc);
		if (oms.length === 0) {
			oms = obj_this.next('span.realtime-msg.' + vars.cn);
			if (oms.length === 0) {
				obj_this.after('<span class="' + vars.msc + ' realtime-msg ' + vars.cn + '">' + vars.msg + '</span>');
				oms = obj_this.next('span.realtime-msg.' + vars.cn);
			}
		} else {
			if (oms_html === undefined && !oms.hasClass('realtime-msg')) obj_this.attr('oms-html', oms.html());
		}
		oms.removeClass('rtvm-Y').removeClass('rtvm-N');
		if (obj_this.val() != '') {
			if (vars.result !== 'Y') {
				oms.html(vars.msg);
				oms.addClass('rtvm-N');
			} else {
				oms.html('ok');
				oms.addClass('rtvm-Y');
			}
		} else {
			if (oms_html === undefined) oms.html('');
			else oms.html(oms_html);
		}
	}
	$('body').on('keyup', 'input[pattern],[pttrn]', function(e) {
		if (!$(this).hasClass('bos-chk-same-value')) {
			var msg = $(this).attr('data-msg');
			if (msg === undefined) return false;
			var pattern = $(this).attr('pattern');
			if (pattern === undefined) pattern = $(this).attr('pttrn');
			var patt = new RegExp(pattern);
			var result = patt.test($(this).val());console.log(result);
			$(this).real_time_verify_msg({'msg':$(this).attr('data-msg'), 'result':result, 'cn':'join-key', 'msc':(_VM_ === 'p' ? 'admin-help-in' : 'admin-help-in')});
		}
	});
	$('body').on('keyup', '.bos-chk-same-value[name$="_re"]', function(e) {
		var result = 'N';
		var form_jq = $(this).parents('form');
		var other_name = $(this).attr('name').substr(0, $(this).attr('name').length - 3);
		var obj_other = $('input[name=' + other_name + ']', form_jq);
		if ($(this).val() === obj_other.val()) result = 'Y';
		$(this).real_time_verify_msg({'msg':$(this).attr('data-msg'), 'result':result, 'cn':'same-key', 'msc':(_VM_ === 'p' ? 'admin-help-in' : 'admin-help-in')});
	});
	$('body').on('keyup', 'input[name="chk_person"]', function() {
		var obj_this = $(this);
		var rel = obj_this.attr('rel');
		if (rel === undefined) return false;
		var chkln = obj_this.data('chk-length');
		if (chkln !== undefined && chkln > obj_this.val().length) return false;
		$.get(obj_this.attr('rel') + '?_tsss_=' + _tsss_ + '&pcv=' + obj_this.val(), function(d) {
			obj_this.real_time_verify_msg({'msg':'스팸방지코드를 정확히 입력하세요.', 'result':d, 'cn':'spam-key', 'msc':(_VM_ === 'p' ? 'admin-help-in' : 'admin-help-in')});
		});
	});
	
	// 게시판 폼 설정에서 로딩개수를 선택하면 viewer.inc.php 에서 자동 실행함
	// 로딩 개수는 게시물 노출수의 배수 여야 함
	$.fn.evt_load_record = function(vars) {
		//console.log(this);
		var ing = 'N';
		var conn = '?';
		var obj_this = this;
		var obj_idx = obj_this.attr('id') + '-evt-load';
		var data_area = $(obj_this.attr('data-area'));			// 데이터 영역 선택자 (viewer.inc.php 에서 설정됨)
		data_area.after('<div id="' + obj_idx + '"></div>');	// 이벤트 발생 위치용 마크업, 데이터영역 바로 다음에 위치
		var url_head = obj_this.attr('url');
		if (url_head.indexOf('?') > -1) conn = '&';
		var tpl = obj_this.attr('tpl');							// 로딩 개수 : 한번 로딩시 가져올 게시물 수
		var ttg = parseInt(obj_this.attr('ttg')) - 1;		// 로딩 회수
		var more_btn = $('.' + obj_this.attr('id') + '-evt-load-btn');	// 더보기 버튼 찾기 (없으면 스크롤 이벤트 자동 등록)
		var pla = $(obj_this.attr('pla'));						// 페이지링크 영역 (모두 로딩 후 노출)
		var debug = obj_this.attr('debug');
		if (isNaN(ttg) || ttg == 0) {
			more_btn.css('display', 'none');
			return;
		} else {
			pla.css('display', 'none');
			more_btn.css('display', '');
			if (more_btn.length > 0) {
				more_btn.on('click', function(e) { loading(); });
			} else {
				var controller = new ScrollMagic.Controller();
				var scene = new ScrollMagic.Scene({triggerElement: '#' + obj_idx, duration:obj_this.attr('dur')}).addTo(controller).triggerHook('onEnter').on('enter', function(e) { loading(); });
				if (debug === 'Y') scene.addIndicators() // add indicators (requires plugin)
			}
		}
		var ttp = obj_this.attr('ttp');
		if (ttp === undefined || ttp == '') ttp = 0;
		var start_page = (parseInt(obj_this.attr('curp')) - 1) * parseInt(ttp) + 1;	// ttp : ceil($form_config['tpa'] / $form_config['tpl'])
		function loading(callback) {
			if ($(obj_this.selector).attr('data-stop') === 'Y') return;						// 중지표시된 경우 리턴
			if (ttg === 1) { pla.css('display', ''); more_btn.css('display', 'none'); }	// 마지막 페이지 일 때
			if (ttg === 0 || ing === 'Y') return false; 												// 로딩 회수 종료 또는 진행중인 
			ing = 'Y'; start_page++; $('#loading_img').loading_img({'cobj':obj_this});
			var url = url_head + conn + obj_this.attr('tpln') + '=' + tpl + '&' + obj_this.attr('pvn') + '=' + start_page + '&AJAX=Y&SCROLLLOADING=Y';
			$.get(url, {}, function(data) {
				var trs = $(data_area.selector, $(data)).html();	// 데이터 영역의 html 얻음
				data_area.append(trs); $('#loading_img').loading_img({'cobj':obj_this, 'off':'Y'});
				if (obj_this.attr('qt') === 'R') data_area.cmt_markup(); ing = 'N'; ttg--;
				if (debug === 'Y') { console.log(url); console.log(obj_this.attr('qt')); console.log(ttg); }
				if (callback !== undefined) callback();
			});
		}
	}
	
	// ajax 링크 처리
	// ajax_area : 불러온 내용을 넣을 영역(속성이 없으면 AB_contents로 지정됨, return_area : 페이지에서 불러올 영역(속성이 없으면 ajax_area 값으로 지정 됨)
	$('body').on('click', 'a[ajax=Y]', function(e) {
		var href = $(this).attr('href');
		if (href !== undefined) {		// #; 인 경우 tmp 로 옮겨갔다가 복원됨 이때 href 는 제거 되므로 undefined 상태
			var objinex = {				// 내부처리객체
				ex : function(vars) {
					if (vars.obj.hasClass('-hide')) return false;	// 토글이 닫기시 중지
					var load_infos = [], ai = vars.obj.data('ajax-option');
					if (ai === undefined) ai = {}; if (ai.ajax_area === undefined) ai.ajax_area = 'AB_contents';
					if (ai.mode === undefined) ai.mode = 'L'; if (ai.load_type === undefined) ai.load_type = 'D'; ai.load_url = vars.href; load_infos.push(ai);
					if (vars.obj.attr('data-fl') === 'N') {			// 강제로딩이 아닐때 값이 있으면 중지
						var wrap_aa = $('#' + ai.ajax_area);
						if (wrap_aa.length <= 0) wrap_aa = $('#---' + ai.ajax_area + '---');
						if (wrap_aa.length > 0 && wrap_aa.html() != '') return false;
					}
					var doc = eval(vars.obj.attr('doc') === undefined ? 'window' : vars.obj.attr('doc'));
					if (vars.obj.attr('data-ldi') !== 'N') doc.$('#loading_img').loading_img({'cobj':vars.obj});
					if (ai.load_info !== undefined) $.each(ai.load_info, function(idx, str) { load_infos.push(str); });
					$.load_urls(load_infos, doc, vars.obj);
				}
			}
			var cfm = $(this).attr('data-acf-msg');
			if (cfm === undefined) objinex.ex({'obj':$(this), 'href':href});
			//else alert_core(cfm, {}, function() { objinex.ex({'obj':$(this), 'href':href}); }, function() { });		// 이 라인처럼 해도 무방하지만 콜백함수 인자 전달 여부 확인을 위해 아래 라인으로 사용함
			else alert_core(cfm, {'obj':$(this),'objinex':objinex}, function(vars) { vars.objinex.ex({'obj':vars.obj, 'href':vars.obj.attr('href')}); }, function() { });
			return false;
		}
	});
	
	/*// ajax 링크 처리
	// ajax_area : 불러온 내용을 넣을 영역(속성이 없으면 AB_contents로 지정됨, return_area : 페이지에서 불러올 영역(속성이 없으면 ajax_area 값으로 지정 됨)
	$('body').on('click', 'a[ajax=Y]', function(e) {
		var load_infos = [];
		var href = $(this).attr('href');
		if (href !== undefined) {	// #; 인 경우 tmp 로 옮겨갔다가 복원됨 이때 href 는 제거 되므로 undefined 상태
			var cfm = $(this).attr('data-acf-msg');
			if (cfm !== undefined && !confirm(cfm)) return false;		// 메시지 취소시 중지
			//if (cfm !== undefined) alert_core(cfm, {}, function() { }, function() { return false; });
			if ($(this).hasClass('-hide')) return false;					// 토글이 닫기시 중지
			var ai = $(this).data('ajax-option'); if (ai === undefined) ai = {"ajax_area":"AB_contents","mode":"G"}; ai.load_url = href; load_infos.push(ai);
			if ($(this).attr('data-fl') === 'N') {							// 강제로딩이 아닐때 값이 있으면 중지
				var wrap_aa = $('#' + ai.ajax_area);
				if (wrap_aa.length <= 0) wrap_aa = $('#---' + ai.ajax_area + '---');
				if (wrap_aa.length > 0 && wrap_aa.html() != '') return false;
			}
			var doc = eval($(this).attr('doc') === undefined ? 'window' : $(this).attr('doc'));
			if ($(this).attr('data-ldi') !== 'N') doc.$('#loading_img').loading_img({'cobj':$(this)});
			if (ai.load_info !== undefined) $.each(ai.load_info, function(idx, str) { load_infos.push(str); });
			$.load_urls(load_infos, doc, $(this));
			return false;
		}
	});*/
	
	// 줄바꿈 안되게 처리
	$.fn.no_enter = function(vars) { $.each($('textarea.AB-no-enter'), function() { $(this).off('keypress'); $(this).on('keypress', function(e) { if (event.which == 13) e.preventDefault(); }); }); }
	
	// 객체별 적당한 이벤트 종류를 반환
	$.fn.get_box_chg_evt = function() {
		var evt = 'click';
		var tag_name = $(this).prop('tagName');
		if ((tag_name === 'INPUT' && $(this).attr('type').toLowerCase() !== 'radio' && $(this).attr('type').toLowerCase() !== 'checkbox') || tag_name === 'SELECT') evt = 'change';
		return evt;
	}
	
	// 롤오버버튼처리
	$.fn.set_img_rlv = function(vars) {
		$.each($('img[data-rlv=Y]'), function(key, val) {
			var oo = 'N';
			var san = 'src';
			if ($(this).attr('data-src') !== undefined) san = 'data-src';
			var o_src = $(this).attr(san);
			if ($(this).attr('data-rlv-src') === undefined) {
				var exp_o_src = o_src.split('.');
				var f_name = exp_o_src[exp_o_src.length-2];
				if (f_name.substr(f_name.lastIndexOf('_')) !== '_over') {
					exp_o_src[exp_o_src.length-2] = f_name + '_over'
				} else {
					exp_o_src[exp_o_src.length-2] = f_name.substr(0, f_name.length-5)
					oo = 'Y';
				}
				var r_src = exp_o_src.join('.');
			} else {
				var r_src = $(this).attr('data-rlv-src');
			}
			if (oo === 'N' && $(this).attr('data-rlv-d') === 'O') $(this).attr('src', r_src);
			if ($(this).attr('data-rlv-d') !== 'O' || $(this).attr('data-rlv-r') === 'Y') {
				if ($(this).attr('data-rlv-d') === 'O' && $(this).attr('data-rlv-r') !== 'Y') var T_src = r_src, r_src = o_src, o_src = T_src;
				$(this).off('mouseover mouseout');
				$(this).on('mouseover', function(e) { if (!$(this).hasClass('except')) $(this).attr('src', r_src); });
				$(this).on('mouseout', function(e) { if (!$(this).hasClass('except')) $(this).attr('src', o_src); });
			}
			$(this).attr('data-rlv', 'O');
		});
	}
	
	// 숫자용 입력상자 처리
	$.fn.set_number_box = function(e, vars) {
		var val, nn = this.attr('nn');
		if (nn !== undefined && this.val() == '') this.val(nn);
		var min = this.attr('min'); if (min === undefined) min = '';
		if (this.attr('data-fc-pttrn') === undefined) {
			val = ck_number(this[0], parseInt(min), parseInt(this.attr('max')), this.attr('data-msg'), 'R');
		} else {
			val = this[0].value.replace(eval(this.attr('data-fc-pttrn')), '');
			if (val !== this[0].value) {	// 패턴에 위배되는 내용 있는 경우
				if (this.attr('data-msg') !== undefined) alert(this.attr('data-msg'));
			}
		}
		if (val !== undefined) {
			this.val(val);
		} else {
			val = nn;
			if (val === undefined) val = min; if (val === undefined) val = 1;
			if ((e === undefined || e.type !== 'change') && this.attr('data-evt-chg') !== 'N') this.val(val).change();
		}
		//if (isNaN(parseInt(this.val()))) this.val(min);
	}
	
	// 여러 객체중 최대 높이로 높이를 통일 시킴
	$.fn.set_height_max = function(vars) {
		var heights = new Array;
		if (vars === undefined) {
			var vars = {};
			vars.ah = 0;
		}
		this.each(function(i) { heights.push($(this).height()); });
		this.height(heights.reduce(function(pv, cr) { return pv > cr ? pv:cr; }) + vars.ah);
	}
	
	// 커버를 씌워 클릭할 수 없도록 함
	$.fn.set_cover = function(vars) {
		var obj_this = this;
		obj_this.each(function(i) {
			if ($('.click-disable-cover', $(this)).length <= 0) {
				var msg = '';
				var offset = $(this).offset();
				obj_this.css('position', 'relative');
				if ($(this).attr('data-msg') !== undefined) msg = ' onclick=\"alert_core(\'' + $(this).attr('data-msg') + '\')\"';
				$(this).append('<div class="click-disable-cover"' + msg + ' style=\"width:100%;height:' + $(this).outerHeight() + 'px;left:0;top:0;position:absolute;z-index:10000;\"></div>');
			}
		});
	}
	
	// 체크상자 클릭시 같은 범위(div)내 다른 입력상자 및 태그를 en/disable 시킴
	// 사용예 : $('.AB-dis-tog').enable_toggle({wt:'div',wteq:0,dc:'AB-disabled',box:'input,select,textarea',tag:'div,span',evt:'change',rvs:'N',targ_evt:'change',radio_targ:'선택자1,선택자2'});
	$.fn.enable_toggle = function(vars) {
		var obj_this = this;
		if (vars.evt === undefined) vars.evt = 'click';
		obj_this.on(vars.evt, function(e) {
			var toic = $(this).is(':checked');
			var obj_parent = $(this).parents(vars.wt).eq(vars.wteq);
			var obj_targs_tag = $(vars.tag, obj_parent), obj_targs_box = $(vars.box, obj_parent).not($(this));
			if ((toic == true && vars.rvs !== 'Y') || (toic == false && vars.rvs === 'Y')) {
				$(this).removeAttr('dsbl');
				obj_parent.removeAttr('dsbl');
				obj_targs_tag.removeAttr('dsbl');
				obj_targs_box.prop('disabled', false);
				obj_targs_box.removeClass(vars.dc);
				if ($(this).attr('type').toLowerCase() === 'radio') {
					var sidx = obj_this.index($(this));
					var exp_rt = vars.radio_targ.split(',');
					for (i=0; i<exp_rt.length; i++) { if (sidx !== i) { var r_obj = $(exp_rt[i], obj_parent); r_obj.prop('disabled', true); r_obj.addClass(vars.dc); } }
				}
			} else {
				$(this).attr('dsbl', 'dsbl');
				obj_parent.attr('dsbl', 'dsbl');
				obj_targs_tag.attr('dsbl', 'dsbl');
				obj_targs_box.prop('disabled', true);
				obj_targs_box.addClass(vars.dc);
			}
			//if (vars.targ_evt !== undefined && vars.targ_evt != '') obj_targs_box.trigger(vars.targ_evt);	// 쓰면안됨, 교착상태 빠질 수 있음
			//2023.10.18체크상자본인비활성을막기위해작성한것인데같은영역에두개이상의체크상자가있으면본라인때문에비활성자체가안되어위의.not($(this))를추가하는걸로대체함obj_this.prop('disabled', false);
		});
	}

	// 여러 입력상자(그룹)중 하나만 활성화 시키는 함수
	// 하나의 입력상자를 정하고 id="AB-sit-box" grp-box="[&quot;입력상자1-1이름,입력상자1-2이름&quot;,&quot;입력상자2이름&quot;,...]" dis-cls="AB-disabled" 을 마크업(따옴표 안에 콤마로 구분된 입력상자들은 하나의 그룹을 의미) 하고
	// disabled 된 입력상자들이 아예 보이지 않도록 하기 위해서는 감싸는 div 또는 li 등에 obe-none="AB-sit-box-test1-1,test1-2" 와 같은 형식으로 마크업
	// $('#AB-sit-box').one_box_enable(); 를 실행 (grp-box에는 자신도 포함)
	$.fn.one_box_enable = function(vars) {
		var obj_this = this;
		var dis_cls = obj_this.attr('dis-cls');
		if (dis_cls === undefined) dis_cls = 'AB-disabled';
		var grp_boxs = eval(obj_this.attr('grp-box'));
		var omi = 'obe-mark-' + obj_this.attr('id');
		var form = obj_this.parents('form');
		var obj_fmf = form.children('input[name=force_modify_fld]');
		if (obj_fmf.length <= 0) {														// 존재하지 않는 필수입력상자 체크 패스 준비
			form.prepend('<input type="hidden" name="force_modify_fld" value="" />');
			obj_fmf = form.children('input[name=force_modify_fld]');
		}
		set_obe();
		form.on('focusout change', '*[' + omi + '=Y]', function(e) { set_obe(); });
		function set_obe() {
			var grp_sv, all_sv = '';
			var force_modify_fld = new Array;
			for (var i=0, cnt_i=grp_boxs.length; i<cnt_i; i++) {
				grp_sv = '';
				var exp_grp_box = grp_boxs[i].split(',');
				for (var j=0, cnt_j=exp_grp_box.length; j<cnt_j; j++) {		// 그룹지정(콤마)된 입력상자 수 만큼, 그룹 중 하나라도 값이 입력된 경우 활성화 됨
					var obj_box = $('*[name=' + exp_grp_box[j] + ']', form);
					if (grp_sv == '') {
						if (obj_box.attr('type') !== 'radio') grp_sv = obj_box.val();
						else grp_sv = $('*[name=' + exp_grp_box[j] + ']:checked', form).val()
					}
					if (obj_box.attr('type') === 'hidden') {						// 체크상자의 hidden 인지 확인하여 체크상자도 처리
						var obj_box_multi = $('*[name="' + exp_grp_box[j] + '_multi[]"]', form);
						if (obj_box_multi.length > 0) obj_box_multi.attr(omi, 'Y');
					}
					force_modify_fld.push(exp_grp_box[j]);
					obj_box.attr(omi, 'Y');
				}
				if (grp_sv != '' && grp_sv !== undefined) all_sv = exp_grp_box;
			}
			var onn = obj_this.attr('id') + '-';
			if (all_sv != '') {
				$('*[' + omi + '=Y]', form).addClass(dis_cls);
				$('*[' + omi + '=Y]', form).attr('disabled', 'disabled');
				$('*[obe-none*="' + onn + '"]', form).css('display', 'none');
				$('*[obe-none*="' + onn + all_sv.join(',') + '"]', form).css('display', '');
				for (var i=0, cnt_i=all_sv.length; i<cnt_i; i++) {
					var obj_box = $('*[name=' + all_sv[i] + ']', form);
					obj_box.removeClass(dis_cls);
					obj_box.removeAttr('disabled');
					if (obj_box.attr('type') === 'hidden') {
						var obj_box_multi = $('*[name="' + all_sv[i] + '_multi[]"]', form);
						if (obj_box_multi.length > 0) {
							obj_box_multi.removeClass(dis_cls);
							obj_box_multi.removeAttr('disabled');
						}
					}
				}
			} else {
				$('*[' + omi + '=Y]', form).removeAttr('disabled');
				$('*[' + omi + '=Y]', form).removeClass(dis_cls);
				$('*[obe-none*="' + onn + '"]', form).css('display', '');
			}
			force_modify_fld = array_unique(force_modify_fld);
			obj_fmf.val(force_modify_fld.join(','));
			form.attr('chk_exist_box', 'N');
		}
	}
	
	// 객체에 이벤트 발생시 지정한 url qs 변경하기
	// a, radio, select 이벤트를 감지하여 지정한 입력상자의 url 을 변경 한다.
	// 입력값변경 : $('.a_tax_year_type').set_query_string({ evt:'change', to:$('input[name="after_db_script"]', $('#{FC_form_name}')), dqs:'{"A":"cur_num=E","B":"cur_num=F","C":"../kwa-fbar_agent_new-{AY__after_process_article_info[0][serial_num]}?cur_num=C&category_2=C"}', ta:"value" });
	// 링크값변경 : $('input[name="user_link_page"]', $('#{FC_form_name}')).set_query_string({ evt:'change', to:$('#edit-link', $('#{FC_form_name}')), dqs:'page_file', ta:'href' });
	// dqs 는 실행 객체에 data-qs 속성으로 마크업 해도 된다.
	$.fn.set_query_string = function(vars, callback1, callback2) {
		var qs, url;
		var otv = vars.to.attr(vars.ta);											// 대상객체에 저장된 url
		if (vars.to.attr('tv') === undefined) vars.to.attr('tv', otv);	// url 백업
		var tu = parse_url(otv);
		var tu_qs_arr = split_to_array(tu['query']);
		this.each(function(idx) {
			var evt = $(this).get_box_chg_evt();
			if (vars.evt !== undefined) evt = vars.evt;
			var objt = $(this);
			var objt_tn = objt.prop('tagName');
			if (objt_tn === 'INPUT' && objt.attr('type').toLowerCase() === 'checkbox') {
				var objn = objt.attr('name');
				if (objn.substr(objn.length - 8, objn.length) === '_multi[]') objt = $('#hid_' + objn.substr(0, objn.length - 8));
			}
			objt.off(evt); objt.on(evt, function(e) {
				var dqs = vars.dqs === undefined ? objt.attr('data-qs') : vars.dqs;
				if (dqs !== undefined) {
					if (dqs.substring(0, 1) === '{' && dqs.substring(dqs.length-1, dqs.length) === '}') {
						var qs_json = jQuery.parseJSON(dqs);
						url = qs_json[objt.val()];
					} else if (dqs.indexOf('=') <= -1) url = dqs + '=' + objt.val();	// 두번 인코딩 되어 urlencode(objt.val()); 를 제거함 2020-02-22
					else url = dqs;
				}
				if (url === undefined) {
					vars.to.attr(vars.ta, vars.to.attr('tv'));
				} else {
					if (url.indexOf('?') <= -1) qs = url;
					else {
						var exp_url = url.split('?');
						tu['path'] = tu['path'].replace(/(%MOVE%)(.+)/, '\$1' + exp_url[0]) ;
						qs = exp_url[1];
					}
					var qs_arr = split_to_array(qs);
					Object.keys(qs_arr).forEach(function(key) { if (qs_arr[key] != '' && qs_arr[key] !== undefined) tu_qs_arr[key] = urlencode(qs_arr[key]); });
					var nq = decodeURIComponent($.param(tu_qs_arr));
					if (nq != '') nq = '?' + nq;
					var nh = tu['path'] + nq;
					vars.to.attr(vars.ta, nh);
					if (callback2 !== undefined) callback2({'vars':vars, 'tu':tu, 'qs_arr':qs_arr,'tu_qs_arr':tu_qs_arr,'nq':nq,'nh':nh, 'objt':objt, 'objtv':objt.val()});
				}
			});
			if (callback1 !== undefined) callback1({'vars':vars, 'tu':tu, 'tu_qs_arr':tu_qs_arr});
		});
	}
	
	// 체크여부에 따라 다른 체크상자를 비활성 시키는 함수
	// 1. 체크상자에 hid-data-dsbl='{"A,C":"B","B":"A,C"}' 형태를 마크업 하면 hidden 입력상자로 data-dsbl='동일값' 으로 마크업 이동 / hid-data-dsbl='{"!,~":"*","!":"~","~":"!"}'(광포앱,23.07.05)
	// 2. $('#hid_a_account_own_type').set_chk_dsbl({"dv":",","bk":";","mt":"A[or O]","ac":"D[or E]"}); dv:체크상자값구분자, bk:감싸주는문자, mt:여러값조합방법, ac:체크시Disable or Enable
	$.fn.set_chk_dsbl = function(vars, callback) {
		vars.obj_this = this;
		var attr_dsbl = this.attr('data-dsbl');
		vars.obj_name = this.attr('name') + '_multi[]';
		if (vars.wrap === undefined) vars.wrap = this.parents('div').eq(0);
		var chk_objs = $('input[name="' + vars.obj_name + '"]', vars.wrap);
		if (vars.ac === undefined) vars.ac = 'D';
		if (attr_dsbl !== undefined) {
			vars.obj_this.on('change', function(e) {
				var objBias = $();
				var hbv = vars.obj_this.val();
				var dsbl = jQuery.parseJSON(attr_dsbl);
				chk_objs.each(function(idx) { $(this).prop('disabled', false); });	// 모든 체크상자 체크해제
				$.each(dsbl, function(key, val) {			// 조건만큼 반복
					var exp_val = val.split(vars.dv);		// 비활성화 시킬 값들 (여러개를 구분자로 구분하여 요청 할 수 있음)
					if (exp_val[0] === '*') {					// 1:다 처리 요청인 경우
						var isChk = 'N';
						var exp_key = key.split(vars.dv);	// 체크여부 판단을 위한 값들 (여러개를 구분자로 구분하여 요청 할 수 있음)
						chk_objs.each(function(idx) {
							if (in_array($(this).val(), exp_key)) objBias = objBias.add($(this));	// 1(기준) 객체면 보관
							else if ($(this).prop('checked') === true) isChk = 'Y';	// 다(대상) 객체중 하나라도 체크된 경우 파악
						});
						if (vars.mt === 'A') {	// 다(대상) 객체중 하나라도 체크된 경우 1(기준)객체를 비활성 시키는 옵션이면
							if (isChk === 'Y') objBias.prop('disabled', true);			// 체크 확인 후 비활성
							else objBias.prop('disabled', false);							// 체크 없으면 활성
						}
						chk_objs.each(function(idx) {			// 모든 체크상자를 대상으로
							if (objBias.is($(this))) {			// 기준 체크상자면
								//console.log('기준 : ', $(this));
							} else {									// 기준 체크상자 아니면   //체크 여부에 따라 대상 체크상자의 활성/비활성 여부 결정
								//console.log('항목 : ', hbv, vars.bk + key + vars.bk, hbv.indexOf(vars.bk + key + vars.bk), $(this), objBias.prop('disabled') === true);
								if (hbv == '' || hbv.indexOf(vars.bk + key + vars.bk) > 0 || objBias.prop('disabled') === true) $(this).prop('disabled', false);
								else $(this).prop('disabled', true);
							}
						});
					} else {											// 개별 처리 요청인 경우
						for (var j=0; j<exp_val.length; j++) {
							var chk_flag = [];
							var exp_key = key.split(vars.dv);//console.log(exp_key, exp_val);
							var obj_targ = $('input[name="' + vars.obj_name + '"][value="' + exp_val[j] + '"]', vars.wrap);
							for (var k=0; k<exp_key.length; k++) if (hbv.indexOf(vars.bk + exp_key[k] + vars.bk) >= 0) chk_flag.push(vars.ac==='D'?'T':'F'); else chk_flag.push(vars.ac==='D'?'F':'T');
							if (vars.mt === 'A') { if (!in_array('F', chk_flag)) obj_targ.prop('disabled', true); }
							else if (in_array('T', chk_flag)) obj_targ.prop('disabled', true);
						}
					}
				});
				if (callback !== undefined) callback({'vars':vars});
			});
			vars.obj_this.trigger('change');
		}
	}
	
	// 체크한 값을 입력상자에 텍스트로 넣음 (multi_check() 함수 처리 후 후 처리용, 향후 대체용으로 확장될 수 있음)
	// $('#hid_a_account_own_type').chk_to_str({"bk":";","on":"checkbox_multi[]","frm":form_jq});
	$.fn.chk_to_str = function(vars) {
		var tid = this.attr('id');
		var hd_tid = tid.substr(0, 4);
		if (hd_tid === 'hid_') {
			var nval = [], targ_objs = $('input[type="checkbox"][name="' + vars.obj_name + '"]', vars.form); 
			targ_objs.each(function(idx) { if ($(this).is(':checked') && $(this).is(':visible') && !$(this).is(':disabled')) nval.push($(this).val()); });
			if (nval.length > 0) this.val(vars.bk + nval.join(vars.bk) + vars.bk); else this.val('');
		}
	}
	
	// vars.st : 카운트 다운 할 초, ot : 시간 노출 할 객체, odn : 시간 지난 후 display:none 할 대상, kzh : 0시간 유지, kzm : 0분 유지
	// $('.-wrap-otp').set_cd_time({'kzh':'N', 'kzm':'Y', 'st':180, 'ot':$('#otp-time'), 'odn':$('.-wrap-otp')}, function(vars) { alert_core('입력시간이 초과되었습니다. 다시 받아서 진행 주세요.') });
	$.fn.set_cd_time = function(vars, callback_1, callback_2) {
		var ito = null;
		var cd_time = function (init) {
			if (init == true || vars.ot.html() == '') {
				//clearTimeout(ito);
				vars.ot.attr('data-time', vars.st);
			}
			var dt = parseInt(vars.ot.attr('data-time')) - 1;
			vars.ot.attr('data-time', dt);	// 차감된 시간 마크업
			var h = parseInt(dt / 3600), m = parseInt((dt % 3600) / 60), s = dt % 60;
			if (m.toString().length == 1) h = '0' + h; if (m.toString().length == 1) m = '0' + m; if (s.toString().length == 1) s = '0' + s;	// 각 시간을 만들기
			var pt = (h > 0 || vars.kzh !== 'N' ? h + ':' : '') + (m > 0 || vars.kzm !== 'N' ? m + ':' : '') + s;		// 출력값 만들기
			vars.dt = dt; vars.ot.html(pt);
			if (dt == 0) {
				if (vars.odn !== undefined) vars.odn.css('display', 'none');
				if (callback_1 !== undefined) callback_1({'vars':vars});
			} else {
				ito = setTimeout(function () { cd_time(); }, 1000);
				if (callback_2 !== undefined) callback_2({'vars':vars}, ito);
			}
		}
		cd_time(true);
	}
	
	// 특정 이벤트 발생시 다른 입력상자에 값 세팅
	// .AB-chk-tog 이 사용된 입력상자값 세팅일 경우, '직접입력'을 선택할때 빈 값이 세팅되도록 해야 할 경우 라디오 값에 __BLK__ 사용, data-option 에 bracket 값을 마크업 하면 다중값으로 설정할 수 있음
	$('body').on('click focusout change', '.AB-set-value', function(e) {
		var exec_pass = $(this).get_evt_pass(e);
		if (exec_pass === 'N') {
			var obj_this = $(this);
			var form = $(this).parents('form');
			if (form.length <= 0) form = $('body');
			var data_mdf = jQuery.parseJSON($(this).attr('data-mdf'));
			var option = jQuery.parseJSON($(this).attr('data-option'));
			$.each(data_mdf, function(key, val) {
				var mdf_box = $('*[name="' + key + '"]', form);
				if (mdf_box.attr('data-defaultValue') === undefined) mdf_box.attr('data-defaultValue', mdf_box.prop('tagName') !== 'SELECT' ? mdf_box.prop('defaultValue') : mdf_box.val());	// defaultValue 보관
			});
			$.each(data_mdf, function(key, val) {	// 저장될 값(sval) 준비
				var sval, svt; mdf_box = $('*[name="' + key + '"]', form);
				if (val === 'self.val') {
					sval = mdf_box.val(); svt = 'SV';
				} else if (val === 'this.val' && (obj_this.attr('type') !== 'checkbox' || obj_this.prop('checked'))) {
					sval = obj_this.val(); svt = 'TV';
					if (sval === '__BLK__') { sval = mdf_box.attr('data-defaultValue'); svt = 'DV'; }
				} else if (val !== '__BLK__' && ((e.type === 'change' && (obj_this.prop('checked') || obj_this.prop('tagName') === 'SELECT')) || (e.type === 'focusout' && obj_this.val() != '') || e.type === 'click')) {
					sval = val; svt = 'OV';
				} else {
					sval = mdf_box.attr('data-defaultValue'); svt = 'DV';
				}
				//console.log(sval, svt);
				if (option !== null) {
					if (option.bracket !== undefined) {
						var values = mdf_box.attr('data-defaultValue').split(option.bracket).concat(sval.split(option.bracket)); values = array_unique(values.filter(function(idx){return idx != ''}));
						if (values.length > 0) sval = option.bracket + values.join(option.bracket) + option.bracket; else sval = '';
					} if (option.join !== undefined) {
						var sv = mdf_box.val(); sval = sv + (sv != '' ? option.join : '') + sval;
					}
					if (option.callback !== undefined) eval(option.callback);																	// 입력상자 속성에 지정된 callback 함수 적용 (부동산 평수변환 즉시 계산 등)
					if (option.mdfchg === 'Y') { data_mdf[key] = sval; obj_this.attr('data-mdf', JSON.stringify(data_mdf)); }	// 바뀐값이 기준이 되도록 하는 옵션이면 바뀐 값을 반영
				}
				mdf_box.val(sval);	// 값 세팅, 변경 trigger! (우동지기본지게차선택)
				if (option !== null && option.trgchg === 'Y') mdf_box.trigger('change');
				if (option !== null && option.callback1 !== undefined) eval(option.callback1);
			});
		}
	});
	
	// 값이 변경되는 경우 즉시 수정을 실행하는 마크업 처리
	$('body').on('change', '*[data-direct-exec]', function(e) {
		var form = $(this).parents('form'); if (form.length === 0) form = $('body');
		var objTarg = $('#' + $(this).attr('data-direct-exec'), form); if (objTarg.length <= 0) return false;
		var execFunc = objTarg.attr('onclick'), objName = $(this).attr('data-obj-name'), rIdx = $(this).attr('data-obj-idx'), chgVal = objName + '=' + $(this).val();//console.log(objTarg, execFunc + "\n");
		var cmpslt = $(this).attr('data-cmpslt'); if (cmpslt === undefined) cmpslt = 'table,tr,ul,div:has(input[name="list_select[]"])'; if (rIdx === undefined) rIdx = $(this).parents(cmpslt).find('input[name="list_serial[]"]').val();
		execFunc = execFunc.replace(/(SYSTEM_modify_article\([\s]*[^,]+[\s]*,[\s]*[^,]+[\s]*,[\s]*'[^']+'[\s]*,[\s]*')([^']*)('.+)$/, '$1' + (rIdx !== undefined ? rIdx : '$2' ) + '$3').replace('%RESERV%', chgVal).replaceAll("\r\n", "\\n").replaceAll("\n", "\\n");//console.log(execFunc + "\n");// return false;
		eval(execFunc);
	});
	
	// 특정 이벤트 발생시 마크업된 함수를 실행
	// 함수 실행 전 마크업 된 값을 지정하는 등의 처리를 선행 함
	// 참고 : 입력상자에서 엔터키를 누르면 submit 버튼 click 이벤트 발생
	var execFuncDelay;
	$('body').on('click focusout change keypress', '*[exec-func]', function(e) {
		if (e.type === 'keypress' && (e.which !== 13 || $(this).is('textarea'))) return;
		if ($(this).attr('type') === 'image' && os_type === 'mac' && browser_type === 'Chrome' && e.clientX === 0 && e.clientY === 0) return false;	// 맥OSX+Chrome에서 input type=image 버튼 클릭시 두번 클릭되는 현상 확인되어 부득이 발생좌표 0,0을 차단함 (입력폼 내부에서 엔터키를 누르면 0,0 이 되어 동작 안하는 부작용이 있음, 20190305)
		var exec_pass = $(this).get_evt_pass(e);
		if (exec_pass === 'N') {
			$.fn.exec_func_call = function(vars) {
				var exec_func = this.attr('exec-func');
				if (exec_func.substring(0, 4) === 'evt,') {
					var exp_ef = exec_func.split(',');
					$(exp_ef[2]).trigger(exp_ef[1]);
				} else {
					if (exec_func === 'submit') exec_func = form.attr('submit-func'); exec_func = exec_func.replace(/_submit\(this, ['"]['"]\)/, "_submit(this, 'text')");	// setTimeout 내에서 호출될 때는 image, submit 버튼도 자동 submit()되지 않아 강제로 text 세팅함
					if (exec_func.substring(0, 7) === 'return ') exec_func = exec_func.substring(7); eval(exec_func);
				}//if (e.type === 'keypress' && e.which === 13) e.preventDefault();	// 엔터 이벤트 실행 후 종료
			}
			var objThis = $(this);
			var form = objThis.parents('form');
			var data_mdf = objThis.attr('data-mdf');
			if (data_mdf !== undefined) {
				var dnm = objThis.attr('data-not-mk');
				var modify_flds = jQuery.parseJSON(data_mdf);
				$.each(modify_flds, function(key, val) {		// 수정할 값 처리 ==> 태그에 값을 넣을 때 .val() 함수 vs .append() + value 속성 사용에 차이가 있음을 주의 (아래 hidden 추가 참고)
					if (typeof(val) !== 'string') val = JSON.stringify(val);
					if (form.find('input[name=' + key + ']').length > 0) form.find('input[name=' + key + ']').val(val);
					else if (form.find('select[name=' + key + ']').length > 0) form.find('select[name=' + key + ']').val(val);
					else if (form.find('textarea[name=' + key + ']').length > 0) form.find('textarea[name=' + key + ']').val(val);
					else if (dnm !== 'Y') form.append('<input type="hidden" name="' + key + '" value="' + val.replace(/"/g, '&quot;') + '">');	// 입력상자 없으면 hidden 으로 생성
				});
			}
			if (objThis.attr('chk-me') === 'Y') {		// 본인 레코드를 체크 하는 옵션
				var cmpslt = objThis.attr('data-cmpslt');
				if (cmpslt === undefined) cmpslt = 'table:has(input[name="list_select[]"]),tr:has(input[name="list_select[]"]),ul:has(input[name="list_select[]"])';
				$('input[name="list_select[]"]', form).prop('checked', false); objThis.parents(cmpslt).eq(0).find('input[name="list_select[]"]').prop('checked', true);
			}
			var objSec = (objThis.attr('data-exec-delay') === undefined ? 0 : parseInt(objThis.attr('data-exec-delay')));
			if (execFuncDelay !== undefined) clearTimeout(execFuncDelay); execFuncDelay = setTimeout(function() { objThis.exec_func_call(); }, objSec); return false;
		}
	});
	
	$.fn.get_evt_pass = function(e) {
		var exec_pass = 'N';
		if (e.type === 'focusout' && $(this).hasClass('AB_datepicker')) exec_pass = 'Y';					// 달력선텍상자는 focusout 무시
		if (e.type === 'click' && !$(this).is('a,button,input[type=submit],input[type=image],input[type=button],button')) exec_pass = 'Y';								// 링크나 버튼이 아니면 click 무시
		if ((e.type === 'focusout' || (e.type === 'keypress' && $(this).is('input[type=text]'))) && !$(this).is('input[type=text],textarea')) exec_pass = 'Y';	// text, textarea 아니면 focusout, text엔터 keypress 무시
		if (e.type === 'change' && !$(this).is('select,input[type=radio],input[type=checkbox],input[type=hidden]') && !$(this).hasClass('AB_datepicker')) exec_pass = 'Y';	// 선택상자, 라디오, 체크상자 아니면 change 무시
		if (e.type === 'focusout' && $(this).val() == $(this).prop('defaultValue')) exec_pass = 'Y';	// 값이 없는 입력상자는 이벤트 무시
		if (exec_pass === 'Y' && $(this).attr('data-epr') === e.type) exec_pass = 'N';					// text상자인데 focusout 없이 change 이벤트 일때도 실행이 처리되어야 하는 경우 등에 강제로 지정함 (예 : 스캠 과목의 선수등록)
		return exec_pass;
	}

	// 풀다운 메뉴 마크업 항목 클릭 시 실행
	$('body').on('click', 'p[id^=ABP-btn-fdmenu-],span[id^=ABP-btn-fdmenu-],img[id^=ABP-btn-fdmenu-]', function(e) {
		var fd_btn_id = $(this).attr('id');
		var fd_btn_exp = fd_btn_id.split('-');
		var fd_btn_idx = $(this).attr('id').replace('ABP-btn-fdmenu-', '');
		//if (fd_btn_idx.indexOf('--') >= 0) return;	// 비회원은 링크 무시
		var link_tail = '&fd_btn_idx=' + fd_btn_idx;
		var link = $(this).attr('link');
		if (!link) link = './insiter.php?design_file=member_fulldown.php' + link_tail;
		else link = link + link_tail;
		var fd_menu_id = 'ABP-fdmenu-' + fd_btn_idx;
		var obj_fd_menu = document.getElementById(fd_menu_id);
		$('div[id^=ABP-fdmenu-]').css('display', 'none');
		if (!obj_fd_menu) {
			$.get(link, {}, function(data) {
				if (data == '') return false;
				var alert_msg = get_alert_msg_in_result(data);
				if (alert_msg == 'null') {
					$('#' + fd_btn_id).after(data);
					$('#' + fd_menu_id).position({my: "left+30 center",of: "#" + fd_btn_id});
				}
				else after_submit_cancel(alert_msg);
			});
		} else {
			if (obj_fd_menu.style.display == '') obj_fd_menu.style.display = 'none';
			else {
				obj_fd_menu.style.display = '';
				$('#' + fd_menu_id).position({my: "left+30 center",of: "#" + fd_btn_id});
			}
		}
		return false;
	});

	// 풀다운 메뉴 닫기
	$('body').on('mouseleave', 'div.ABA-full-down-menu', function(e) { $(this).css('display', 'none'); });
	
	// 선택된 입력상자에 클래스 넣기
	$('body').on('change', '*[data-on-cls]', function(e) {
		var ison = $(this).val(), tgn = $(this).prop('tagName').toLowerCase(), att = $(this).attr('type');
		if (tgn === 'input' && (att === 'radio' || att === 'checkbox') && $(this).is(':checked') === false) ison = '';
		if (ison == '') $(this).removeClass($(this).attr('data-on-cls')); else $(this).addClass($(this).attr('data-on-cls'));
	});

	// 클릭한 div 를 감추고 그와 매핑되는 div 를 보여줌
	// 사용처 : 상태 변경을 위해 출력값을 즉시수정 버튼들로 변경 할 때 등
	// load_url 속성이 있는 경우 해당 url 을 hidden 영역에 load() 함
	$('body').on('click', 'div[id^=AB_dbclick_view_]', function(e) {
		var dbclick_idx = $(this).attr('id').substr(Number($(this).attr('id').lastIndexOf('_')) + 1); $(this).css('display', 'none');
		var hidden_area = $('div[id=AB_dbclick_hidden_' + dbclick_idx + ']'); hidden_area.html('').css('display',''); var load_url = $(this).attr('load_url');
		if (load_url !== undefined) {
			var q_str = r_url = '';
			var form = $(this).parents('form');
			if (form.length > 0) {
				var bd = $(this).attr('bd'), mv = $(this).attr('m_val');
				if (bd === undefined || bd == '') bd = form.children('input[name=board]').val();
				if (mv === undefined) mv = ''; else mv = urlencode(mv);
				if (load_url.indexOf('q_str') < 0) { var qso = form.children('input[name="Q_STRING"]'); if (qso.length > 0) q_str = urlencode(qso.val()); }
				if (load_url.indexOf('r_url') < 0) { var ruo = form.children('input[name="return_url"]'); if (ruo.length <= 0) r_url = ''; else r_url = urlencode(ruo.val()); }
				load_url += '&fn=' + form.attr('id') + '&bd=' + bd + '&m_val=' + mv + '&q_str=' + q_str + '&r_url=' + r_url;
				hidden_area.load(ajax_url_filter(load_url), function(d) { });
			} else {
				alert_core('not found form');
			}
		} else {
			alert_core('not found load_url');
		}
	});
	
	// 기간 검색용 선택상자 이벤트 처리, data-sid-bxn="search_item_date"면 선택상자로 선택한 검색범위 필드로 지정되고 data-sid-bxn="sign_date"처럼 직접 입력할 수도 있음
	// data-sid-bxn : 세팅될 필드명이 선택된 박스 이름, data-targ-block : 변경할 대상(year, month, date), data-only-block : 변경할 대상만 바꾸려면 Y 시작일 범위를 넓히려면 O 종료일 범위를 넓히려면 C 둘다 넓히려면 A를 설정, data-fix-date : 날짜를 오늘로 고정하려면 Y 아니면 N
	$('body').on('change', '.date-auto-set', function(e) {
		var objSid = $('#' + $(this).attr('data-sid-bxn'));	// 날짜입력상자이름이 있는 선택상자 객체(선택값이 birth_date/md[gn|ymd]처럼 표현되어 있으면 /이후 값 제거하고 박스명 지정), 객체 없으면 날짜입력상자이름으로 바로 지정
		var objSidVal = objSid.length > 0 ? objSid.val().replace(/\/[a-z0-9]+/, '') : $(this).attr('data-sid-bxn'); var targ_1_nm = 'SCH_' + objSidVal + '_1', targ_2_nm = 'SCH_' + objSidVal + '_2';
		if ($(this).val() != '') {
			var tv = $(this).val().split(',');
			var date = new Date(), lastDayOfThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0), open_date, close_date, lastDayOfSetMonth;
			var set_year = date.getFullYear(), set_month = date.getMonth(), set_date = date.getDate(), tb = $(this).data('targ-block'), ob = $(this).data('only-block'), fd = $(this).data('fix-date'); if (tb === undefined) tb = 'month'; if (ob === undefined) ob = 'N';if (fd === undefined) fd = 'N';
			var set_open_year, set_close_year, set_open_month, set_close_month, set_open_date, set_close_date; if (tb === 'year') set_year += parseInt(tv[0]); else if (tb === 'month') set_month += parseInt(tv[0]); else if (tb === 'date') set_date += parseInt(tv[0]);
			if (tv[0] <= 0) {
				set_open_year = set_year;//console.log('0과 같거나 작은 분기');
				set_open_month = (tb === 'year' && (ob === 'O' || ob === 'A') ? 0 : set_month);
				set_open_date = ((tb === 'year' || tb === 'month') && (ob === 'O' || ob === 'A') ? 1 : set_date);
				set_close_year = (fd === 'Y' ? date.getFullYear() : set_year); set_close_month = (fd === 'Y' ? date.getMonth() : (tb === 'year' && (ob === 'C' || ob === 'A') ? 11 : set_month));
				lastDayOfSetMonth = new Date(set_close_year, set_close_month + 1, 0); set_close_date = (tv[0] < 0 && fd === 'Y' ? date.getDate() : ((tb === 'year' || tb === 'month') && (ob === 'C' || ob === 'A') ? lastDayOfSetMonth.getDate() : set_date));
			} else {
				set_open_year = (fd === 'Y' ? date.getFullYear() : set_year);//console.log('0보다 큰 분기');
				set_open_month = (fd === 'Y' ? date.getMonth() : (tb === 'year' && (ob === 'C' || ob === 'A') ? 11 : set_month));
				set_open_date = (ob === 'O' || ob === 'A' ? 1 : date.getDate());
				set_close_year = set_year; set_close_month = (tb === 'year' && (ob === 'C' || ob === 'A') ? 11 : set_month); lastDayOfSetMonth = new Date(set_close_year, set_close_month + 1, 0);
				set_close_date = ((tb === 'year' || tb === 'month') && (ob === 'C' || ob === 'A') ? lastDayOfSetMonth.getDate() : set_date);
			}//console.log(open_date, close_date);
			if (tv[1] != undefined) { tv[1] = parseInt(tv[1]); if (tb === 'year') set_close_year += tv[1]; else if (tb === 'month') set_close_month += tv[1]; }
			open_date = new Date(set_open_year, set_open_month, set_open_date); close_date = new Date(set_close_year, set_close_month, set_close_date);
			$('input[name=\"' + targ_1_nm + '\"]').val(open_date.toLocaleDateString('en-CA', {year:'numeric', month:'2-digit', day:'2-digit'}));
			$('input[name=\"' + targ_2_nm + '\"]').val(close_date.toLocaleDateString('en-CA', {year:'numeric', month:'2-digit', day:'2-digit'}));
		} else {
			$('input[name=\"' + targ_1_nm + '\"]').val(''); $('input[name=\"' + targ_2_nm + '\"]').val('');
		}
	});
	
	// 더블클릭으로 두 개의 div 를 번갈아 나오도록 함
	// 사용법 : $('.dblclick-wrap').dblclick_chg({evt:'dblclick',mode:'MC'});
	// 두개의 div 를 함수를 실행할 div로 감싸고 안쪽의 두 div에 dblclick-inner 클래스를 마크업 한다.
	// 출석할 명단과 체크상자를 두고 체크하면 출석으로 체크된 후 더블클릭하면 같은 영역에 보이지 않던 입력상자가 나오도록 하는 기능 등에 활용
	// mode : MC(보이지 않는 입력상자가 폼 밖으로 빠져나감, 같은 이름의 입력상자가 함께 존재해도 됨), TC(같은 공간에 번갈아가며 보이도록 함)
	// MC 인 경우 두개중 하나의 div에 style display:none을 마크업하고 TC인 경우 class AB-hidden을 마크업 한다.
	$.fn.dblclick_chg = function(vars) {
		var obj_this = this;
		$('.dblclick-inner').off('dblclick');
		if (vars.mode === 'TC') {	// 폼안에 display 속성만 번걸아 바뀜, inner에 class="AB-hidden" 마크업
			obj_this.on(vars.evt, '.dblclick-inner', function(e) {
				var obj_parent = $(this).parents(obj_this.selector);
				$('.dblclick-inner', obj_parent).toggleClass('AB-hidden');
			});
		} else {							// 가려질 영역을 폼 밖으로 이동했다가 복원 inner에 style="display:none;" 마크업
			obj_this.each(function(idx) {
				var oih = $('.dblclick-inner:hidden', $(this));
				var oih_id = $(this).attr('id') + '-hid';
				$('#' + oih_id).remove();
				oih.attr('id', oih_id);
				$('body').append(oih);
			});
			obj_this.on(vars.evt, '.dblclick-inner', function(e) {
				$(this).css('display', 'none');
				var obj_parent = $(this).parents(obj_this.selector);
				var idx_inner = obj_parent.attr('id') + '-hid';
				obj_parent.append($('#' + idx_inner));
				$('#' + idx_inner).css('display', '').removeAttr('id');
				$(this).attr('id', idx_inner);
				$('body').append($(this));
			});
		}
	}

	// 정렬 버튼 클릭시 실행
	$('body').on('click', 'a[id^=AB_sort_]', function(e) {
		var doc = eval($(this).attr('doc') === undefined ? 'window' : $(this).attr('doc'));
		doc.$('#loading_img').loading_img({'cobj':$(this)});
		var sort_link = $(this).attr('href'); var move_url = $(this).attr('move_url');
		var ai = $(this).data('ajax-option'); if (ai === undefined) ai = {};
		$.get(sort_link, {}, function(data) {
			//console.log(data);
			var alert_msg = get_alert_msg_in_result(data);									// 경고 메시지 있으면 출력
			if (alert_msg != 'null') after_submit_cancel(alert_msg);
			if (data.indexOf('history.go(') < 0) {												// 뒤로 이동 인 경우 load 안함
				if (move_url === undefined) move_url = get_move_url_in_result(data);	// 이동할 url
				//console.log(move_url);
				after_submit_load($(e.target), move_url, doc, ai);
			}
		});
		return false;
	});
	
	// 코멘트 상자 노출용 토글 버튼
	$('body').on('click', 'p[id*=btn]', function(e) {
		var cmt_box_toggle_idx = $(this).attr('id').substr(Number($(this).attr('id').lastIndexOf('_')) + 1);
		$('#AB_board_comment_set_' + cmt_box_toggle_idx).toggle();
	});
	
	// 코멘트 저장(_COMMENT_), 수정저장(_MODIFY_), 답글저장(_REPLY_) 버튼 클릭시 실행
	$('body').on('click', '.AB_cmt_btn_submit', function(e) {
		var form = $(this).parents('form');
		var submit_action = form.attr('action');
		var submit_function = form.attr('submit-func');
		var T_submit_function = submit_function.substring(7);
		if (submit_action.indexOf('modify.php') < 0 || submit_action.indexOf('reply.php') < 0) {
			var cmt_list = $(this).parents('div.-CL');
			_afo_['cmt_proc_num'] = cmt_list.attr('idx');
			var cmt_list_wrap = $(this).parents('div.ABA-cmt-list-wrap');
			_afo_['cmt_proc_num_parent'] = cmt_list_wrap.attr('ab_p_article_num');
			if (submit_action.indexOf('modify.php') < 0) cmt_modify_idx = _afo_['cmt_proc_num'];
			else if (submit_action.indexOf('reply.php') < 0) cmt_reply_idx = _afo_['cmt_proc_num'];
		}
		form.removeAttr('action', 'submit-func');
		if (eval(T_submit_function)) {
			$('#loading_img').loading_img({'cobj':$(this)});
			$.post(submit_action, form.serialize(), function(data) {
				//console.log(data);
				var alert_msg = get_alert_msg_in_result(data);					// 경고 메시지 있으면 출력
				if (alert_msg != 'null') after_submit_cancel(alert_msg);
				if (data.indexOf('history.go(') < 0) {								// 뒤로 이동 인 경우 load 안함
					_afo_['cmt_proc_num'] = get_get_var('process_num', get_move_url_in_result(data));	// 처리된 댓글 번호 파악하여 url 에 추가 (댓글 쓰기인 경우 저장 후 번호 생성 되므로 이곳에서 세팅 됨)
					var move_url = set_url_tail(get_ajax_reload_url('Y', 'Y'), 'cmt_proc_num=' + _afo_['cmt_proc_num']);	// 이동할 url (무조건 현재 페이지)
					if (move_url != 'null') {
						var ai = form.data('ajax-option'); if (ai === undefined) ai = {};
						after_submit_load(form, move_url, eval(form.attr('doc') === undefined ? 'window' : form.attr('doc')), ai);
					}
				}
				$('*[name$=\"[]_multi\"]', form).prop('disabled', true); submit_is_ing = 'N';
			});
		}
		form.attr('submit-func', submit_function);
		form.attr('action', submit_action);
		return false;
	});

	// 코멘트 수정 버튼 클릭시
	$('body').on('click', 'a[id^=AB_cmt_btn_modify_]', function(e) {
		var chk_pw = $(this).attr('AB_chk_pw');
		if (cmt_modify_idx == '' || chk_pw == 'Y') {
			cmt_modify_idx = $(this).attr('id').substr(Number($(this).attr('id').lastIndexOf('_')) + 1);
			cmt_comment_1 = $('#AB_cmt_comment_1_' + cmt_modify_idx).html();
			var cmt_list_wrap = $(this).parents('div.ABA-cmt-list-wrap');
			var targ_url = 'insiter.php?design_file=' + cmt_list_wrap.attr('ab_page_m') + '&article_num=' + cmt_modify_idx + '&parent_board_name=' + cmt_list_wrap.attr('ab_p_board') + '&board_name=' + cmt_list_wrap.attr('ab_board') + '&AJAX=Y';
			if (chk_pw == 'Y') {																												// 패스워드확인 버튼인 경우
				SYSTEM_on_passwd_input(targ_url, '', '#AB_cmt_comment_1_' + cmt_modify_idx, {reload_url:''});		// 패스워드 창으로 분기
			} else {
				$('#AB_cmt_comment_1_' + cmt_modify_idx).load(set_url_tail(targ_url, 'AJAX=Y'), function(data) {
					var abcibc = $('#AB_cmt_input_box_comment_1_' + cmt_modify_idx);
					if (abcibc.length > 0) {
						var cnt_line_array = abcibc.val().split('\n');
						var cnt_line = cnt_line_array.length;
						if (cnt_line < 3) cnt_line = 52;
						else cnt_line = cnt_line * 17;
						abcibc.css('width', '100%').css('height', cnt_line).autosize();
					}
				});
			}
		} else {
			$('#AB_cmt_comment_1_' + cmt_modify_idx).html(cmt_comment_1);
			cmt_modify_idx = '';
		}
	});

	// 코멘트 답글 버튼 클릭시 노출되는 코멘트 답글쓰기 폼
	$('body').on('click', 'a[id^=AB_cmt_btn_reply_]', function(e) {
		if (cmt_modify_idx != '') {					// 열려 있는 수정입력 상자 제거
			$('#AB_cmt_comment_1_' + cmt_modify_idx).html(cmt_comment_1);
			cmt_modify_idx = '';
		}			
		if ($(this).attr('onclick') == null) {		// 로그인 메시지 등 마크업에 이벤트 없을 때만 분기
			var cmt_list_wrap = $(this).parents('div.ABA-cmt-list-wrap');
			var abpan = cmt_list_wrap.attr('ab_p_article_num');
			var vn_cmt_reply = 'cmt_reply' + abpan;
			var vn_cmt_reply_btn = 'cmt_reply_btn' + abpan;
			cmt_reply_idx = $(this).attr('id').substr(Number($(this).attr('id').lastIndexOf('_')) + 1);
			if (!in_array(cmt_reply_idx, _afo_[vn_cmt_reply])) {
				$.get('insiter.php?design_file=' + cmt_list_wrap.attr('ab_page_r') + '&parent_article_num=' + abpan + '&article_num=' + cmt_reply_idx + '&parent_board_name=' + cmt_list_wrap.attr('ab_p_board') + '&board_name=' + cmt_list_wrap.attr('ab_board') + '&fid=' + $(this).attr('fid') + '&thread=' + $(this).attr('thread') + '&AJAX=Y', {}, function(data) {
					$('#AB_cmt_list_' + cmt_reply_idx).after(data);
					$('#AB_cmt_reply_form_' + cmt_reply_idx).addClass($('a[id^=AB_cmt_btn_reply_' + cmt_reply_idx + ']').attr('AB_thread'));		// 답글 아이콘 표시
					var abcibc = $('#AB_cmt_input_box_comment_1_' + cmt_modify_idx);
					if (abcibc.length > 0) abcibc.val('').autosize();																										// 입력상자 기본값 제거
					if (_afo_['cmt_proc_num'] != '') $('#AB_cmt_list_' + _afo_['cmt_proc_num']).addClass('current');
					if (_afo_[vn_cmt_reply_btn].length > 0) $(_afo_[vn_cmt_reply_btn].shift()).click();
					_afo_['cmt_proc_num_parent'] = cmt_list_wrap.attr('ab_p_article_num');	// 추천/반대의 경우 AB_cmt_btn_submit 를 타지 않으므로 여기서 값 설정을 해 줘야 열린 상태 복원됨
				});
			} else {
				$('#AB_cmt_list_' + cmt_reply_idx).next('.cmt-reply-wrap').remove();
				_afo_[vn_cmt_reply].splice(_afo_[vn_cmt_reply].indexOf(cmt_reply_idx), 1);
			}
		}
	});

	// 코멘트 삭제 버튼 클릭시
	$('body').on('click', 'a[id^=AB_cmt_btn_delete_]', function(e) {
		var T_pu_host = location.href.replace('http://', '');
		T_pu_host = T_pu_host.replace('https://', '');
		T_pu_host = T_pu_host.replace('www.', '');
		pu_host = T_pu_host.split('/');
		var cmt_list_wrap = $(this).parents('div.ABA-cmt-list-wrap');
		var board_name = cmt_list_wrap.attr('ab_board');
		var chk_pw = $(this).attr('AB_chk_pw');
		var targ_url = './board/article_delete.php?_tsss_=' + _tsss_;
		var reload_url = get_ajax_reload_url('Y',	'Y');
		var cmt_delete_idx = $(this).attr('id').substr(Number($(this).attr('id').lastIndexOf('_')) + 1);
		if (chk_pw == 'Y') {
			SYSTEM_on_passwd_input(targ_url, '', '#AB_contents', {article_num:cmt_delete_idx, board:board_name, flag:pu_host[0], reload_url:reload_url});
		} else {
			alert_core('삭제하시겠습니까?', {}, function() {
				$('#loading_img').loading_img({'cobj':$(this)});
				_afo_['cmt_proc_num_parent'] = cmt_list_wrap.attr('ab_p_article_num');
				$.post(targ_url, {article_num:cmt_delete_idx, board:board_name, flag:pu_host[0]}, function(data) {
					console.log(data);
					var alert_msg = get_alert_msg_in_result(data);
					//console.log($(e.target));
					if (alert_msg == 'null') {
						var ai = $(this).data('ajax-option'); if (ai === undefined) ai = {};
						after_submit_load($(e.target), reload_url, eval($(this).attr('doc') === undefined ? 'window' : $(this).attr('doc')), ai);
					} else after_submit_cancel(alert_msg);
				});
			}, function() { });
		}
	});

	// 코멘트 목록 마크업 처리 함수
	$.fn.cmt_markup = function(callback) {
		$('.-CL:not(".complete")', this).each(function(index) {
			var board_name = $(this).parents('div.ABA-cmt-list-wrap').attr('ab_board');
			$(this).attr('id', 'AB_cmt_list_' + $(this).attr('idx'));
			$('.AB-rep-id', $(this)).attr('id', 'ABP-btn-fdmenu-board-' + board_name + '-' + $(this).attr('idx'));
			$('a.-R', $(this)).attr({'id':'AB_cmt_btn_reply_'+$(this).attr('idx')});
			$('a.-M', $(this)).attr({'id':'AB_cmt_btn_modify_'+$(this).attr('idx')});
			$('a.-D', $(this)).attr({'id':'AB_cmt_btn_delete_'+$(this).attr('idx')});
			var record_idx = $(this).attr('idx');
			var vp = $('a.-VP', $(this));
			var vm = $('a.-VM', $(this));
			if (user_level === '99') {
				if ($('span', vp).html() == '') {
					vp.remove();
				} else {
					vp.addClass('AB-rep-up');
					$(this).on('click', 'a.-VP', function(e) { alert_core(lang_core[1]) });
				}
				if ($('span', vm).html() == '') {
					vm.remove();
				} else {
					vm.addClass('AB-rep-down');
					$(this).on('click', 'a.-VM', function(e) { alert_core(lang_core[1]) });
				}
			} else {
				if ($('span', vp).html() == '') {
					vp.remove();
				} else {
					vp.addClass('AB-rep-up');
					$(this).on('click', 'a.-VP', function(e) { return SYSTEM_vote_article(e.target, document.realtime_frm, board_name, record_idx, '', 'v_dup_check=Y,v_point=+1', '%PSELF%', $(this).attr('m-aft'), '', $(this).attr('m-alt')); });
				}
				if ($('span', vm).html() == '') {
					vm.remove();
				} else {
					vm.addClass('AB-rep-down');
					$(this).on('click', 'a.-VM', function(e) { return SYSTEM_vote_article(e.target, document.realtime_frm, board_name, record_idx, '', 'v_dup_check=Y,v_point=-1', '%PSELF%', $(this).attr('m-aft'), '', $(this).attr('m-alt')); });
				}
			}
			$('a.-D', $(this)).attr({'id':'AB_cmt_btn_delete_'+$(this).attr('idx')});
			$('.AB-cmt', $(this)).attr('id', 'AB_cmt_comment_1_'+$(this).attr('idx'));
			$(this).addClass('complete');
		});
		if (callback !== undefined) callback();
	}
	
	$('body').on('click', '.AB_btn_edit_program', function(e) {
		var href = $(this).attr('href');
		if ($(this).attr('href-s') === undefined) $(this).attr('href-s', href)
		var href_s = $(this).attr('href-s');
		var dir_name = $(this).attr('dir-name');
		var file_name = $('#' + $(this).attr('file-box-id')).val();
		if (file_name === undefined || file_name == '') {
			alert_core(lang_core[2]);
			e.stopImmediatePropagation();
			return false;
		}
		$(this).attr('href', href_s + '&file_name=' + urlencode(dir_name + file_name));
	});

	/* ajax dialog rel="가로,세로,제목,url뒤,모달,강제로딩,iframe,리사이즈,닫기시제거,타이틀바,오버레이클릭닫기,드래그이동"
		a href="#" class="AB_btn_dialog_sms" title="타이틀" rel="285,400,창제목[,URL뒤][,true or false][,Y or N][,Y or N][,true or false][N or Y][N or Y][N or Y][,true or false]"
		[method="post" frm="폼이름" chk-name="체크할입력상자이름" err-msg="입력오류메시지" data-pos="{ my: "center", at: "center", of: window }"]
		[data-schkw="파라메타명,입력상자이름[,폼id]"]
		[data-cb-before="띄우기전콜백"]>..</a>*/
	$('body').on('click', '*[class*=AB_btn_dialog_]', function(e) {
		var obj_this = $(this);
		var load_url, method, rt;
		var doc = eval(obj_this.attr('doc') === undefined ? 'window' : obj_this.attr('doc'));
		var size = obj_this.attr('rel').split(',');
		if (obj_this.attr('idx') !== undefined) {
			dialog_idx = obj_this.attr('idx');
		} else {
			var dialog_idx = 'global_dialog';
			var my_dialog = $('div[id^="' + dialog_idx + '"]', obj_this.parents('div'));
			if (my_dialog.length > 0) {
				var my_idx = my_dialog.attr('id').substring(14);
				if (my_idx == '') my_idx = '0';
				var new_idx = parseInt(my_idx) + 1;
				dialog_idx = dialog_idx + '_' + new_idx.toString();
			}
		}
		var obj_global_dialog = doc.$('#' + dialog_idx);
		if (obj_global_dialog.length <= 0) {
			doc.$('body').append('<div id="' + dialog_idx + '" class="sitecook-dialog" style="display:none;clear:both;"></div>');
			obj_global_dialog = doc.$('#' + dialog_idx);
		} else {
			if (obj_global_dialog.css('display') != 'none') obj_global_dialog.dialog('close');
		}
		obj_global_dialog.addClass('sitecook-dialog');
		var add_class = obj_this.attr('data-add-class'); if (add_class !== undefined) obj_global_dialog.addClass(add_class);
		if (obj_this.attr('u-href') !== undefined) {
			load_url = obj_this.attr('u-href');
			rt = 'X';
		}
		
		var cbbfe = obj_this.attr('data-cb-before');	// data-cb-before="function calback_before(vars) { if (...) { ... return false; } }" 형태로 마크업
		if (cbbfe !== undefined) { eval(cbbfe); if (calback_before({'ot':obj_this,'ogd':obj_global_dialog}) === false) return false; }
		
		if (load_url === undefined) load_url = obj_this.attr('href');
		if (load_url !== undefined) {
			var nm_aaw_history = dialog_idx + '_history';
			var title, url_tail = '', is_modal = true, refresh_force = 'Y', ifrm = 'N', rs = true, rm = 'N', tt = 'Y', co = 'N', dgb = false;
			if (size[2] !== undefined) title = size[2];/*타이틀을 한 곳으로 통일함 else title = obj_this.attr('title');*/
			if (size[3] !== undefined && size[3] != '') url_tail = size[3];
			if (size[4] !== undefined) is_modal = eval(size[4]);
			if (size[5] !== undefined) refresh_force = size[5];
			if (size[6] !== undefined) ifrm = size[6];
			if (size[7] !== undefined) rs = eval(size[7]);
			if (size[8] !== undefined) rm = size[8];
			if (size[9] !== undefined) tt = size[9];
			if (size[10] !== undefined) co = size[10];
			if (size[11] !== undefined) dgb = eval(size[11]);
			if (refresh_force !== 'N') obj_global_dialog.html('');
			method = obj_this.attr('method'); if (method === undefined) method = 'get';
			ifrm !== 'Y' ? obj_global_dialog.removeClass('ifrm') : obj_global_dialog.addClass('ifrm');
			load_url = set_url_tail(load_url + url_tail, (ifrm !== 'Y' ? 'DLG=Y' : 'IFRM=Y&DLG=Y'), 'Y', ifrm, 'X');
			var sch_kw_info = obj_this.attr('data-schkw');
			if (sch_kw_info !== undefined) {
				var pfrm = obj_this.parents('form');
				var exp_ski = sch_kw_info.split(',');
				if (exp_ski[2] !== undefined) pfrm = $('#' + exp_ski[2]);
				load_url = set_url_tail(load_url, exp_ski[0] + '=' + urlencode($('*[name="' + exp_ski[1] + '"]', pfrm).val()), 'N', '', 'X', '');
			}
			//console.log(load_url);
			//console.log(obj_this.attr('rel'));
			if (method === 'get') {
				//console.log(load_url);
				if (ifrm === 'Y') {
					obj_global_dialog.html('');
					obj_global_dialog.append('<iframe id="' + dialog_idx + '_ifrm" src="' + load_url + '" class="ifrm_gdlg"></iframe>');
				} else {
					obj_global_dialog.load(load_url, function() { set_ajax_history(nm_aaw_history, load_url); });
				}
			} else {
				var pass;
				var chk_name = obj_this.attr('chk-name');
				var form_jq = $('#' + obj_this.attr('frm'));
				if (chk_name !== undefined && chk_name != '') {
					var chk_box = $('*[name="' + chk_name + '"]');
					if (chk_box.length <= 0) alert_core('not exist ' + chk_name);
					if (chk_box.prop('tagName') === 'INPUT') { if ((chk_box.attr('type') == 'checkbox' || chk_box.attr('type') == 'radio') && submit_radio_check(form_jq[0], chk_name)) pass = 'Y'; else pass = 'N'; }
					if (pass === undefined) { if (chk_box.val() != '') pass = 'Y'; else pass = 'N'; }
				}
				if (pass === 'N') { alert_core(obj_this.attr('err-msg')); return false; }
				var pv = obj_this.attr('pv');
				if (pv !== undefined) {
					var exp_pv = pv.split(',');
					$('input,select,textarea', form_jq).each(function(idx) {
						if (!in_array($(this).attr('name'), exp_pv)) $(this).prop('disabled', true).addClass('realtime-disabled');
					});
				}
				var post_var = form_jq.serialize();
				$.post(load_url, post_var, function(data) {
					obj_global_dialog.html(data);//console.log(post_var);
					if (pv !== undefined) $('.realtime-disabled', form_jq).removeAttr('disabled').removeClass('realtime-disabled');
				});
			}
			var pos = obj_this.attr('data-pos');
			if (pos === undefined) pos = '{my:"center",at:"center",of:window}'; pos = eval('(' + pos + ')');
			//var show = obj_this.attr('data-show'); if (show !== undefined) show = eval('(' + show + ')'), hide = obj_this.attr('data-hide'); if (hide !== undefined) hide = eval('(' + hide + ')');
			var rszopt = obj_this.data('dialog-resize'), rszbtns = '';
			if (rszopt !== undefined) {
				var rszbtna = [], hd = ' ', jn = ' ';
				$.each(rszopt, function(k, v) {
					var exp_sz = k.split(','), w = '', h = '';
					if (exp_sz[0] === 'head' || exp_sz[0] === 'join') { if (exp_sz[0] === 'head') hd = v; if (exp_sz[0] === 'join') jn = v;
					} else {
						if (exp_sz[0] === 'init') { w = ' data-size-width="' + size[0].toString() + '"'; h = ' data-size-height="' + size[1].toString() + '"'; }
						else {
							if (exp_sz[0] !== undefined) w = ' data-size-width="' + exp_sz[0].toString() + '"';
							if (exp_sz[1] !== undefined) { var T_h = exp_sz[1].toString(); if (T_h.substr(T_h.length-1, 1) === '%') T_h = $(document).height() * parseInt(T_h.substr(0, T_h.length-1)) / 100; h = ' data-size-height="' + T_h.toString() + '"'; }
						}
						rszbtna.push('<span class="resize_dialog"' + w + h + ' style="cursor:pointer">' + v + '</span>');
					}
				});
				if (rszbtna.length > 0) rszbtns = hd + rszbtna.join(jn);
				var fp = obj_this.data('fix-pos-rs'); if (fp !== undefined) obj_global_dialog.data('fix-pos-rs', fp);
			}
			obj_global_dialog.dialog({
				modal: is_modal,
				title: title + rszbtns,
				position: pos,
				draggable: dgb,
				resizable: rs/*현재 jquery-ui버전의 효과가 제한적이어서 show() 함수로 대체함 ,
				show: show, hide: hide*/,
				width: size[0], height: size[1],
				create: function(e, ui) {
					if (tt !== 'Y') $('.ui-dialog-titlebar', $(this).parent()).remove();
				},
				open: function(e, ui) {
					$('html').css('overflow-y', 'hidden');
					var ei_show = obj_this.attr('a-show'); if (ei_show !== undefined) {
						ei_show = ei_show.split(',');
						$(this).parent().css('display', 'none').show(ei_show[0], {direction : ei_show[1]}, parseInt(ei_show[2]));
					}
				},
				focus: function(e, ui) {
					$('textarea:not(.no_auto):visible', $(this)).autosize();
				},/*
				beforeClose: function(e, ui) {
					var ei_hide = obj_this.attr('a-hide'); if (ei_hide !== undefined) {
						ei_hide = ei_hide.split(','); console.log(ei_hide);
						$(this).parent().hide(ei_hide[0], {direction : ei_hide[1]}, parseInt(ei_hide[2]));
					}
				},*/
				close: function(e, ui) {
					$('html').css('overflow-y', 'scroll');
					if (rm === 'Y') $(this).dialog('destroy').remove();
					remove_ajax_history(nm_aaw_history);
				}
			}, function() {
				var dialog_link = $('*[dialog-link=Y]', $(this));
				dialog_link.attr('href', dialog_link.attr('onclick')).removeAttr('onclick');
			});
			obj_this.attr('clicked', 'Y');
			if (tt !== 'Y' || co === 'Y') $('.ui-widget-overlay').off('click').one('click', function(e) { $('.sitecook-dialog').dialog('close'); });	// 오버레이 클릭시 창닫기 옵션
			
			var cfmsg = obj_this.attr('data-cf-msg');
			if (cfmsg !== undefined) { alert_core(cfmsg, {}, function() { }, function() { obj_global_dialog.dialog('close'); }); }
		} else {
			alert_core(lang_core[3]);
		}
		if (rt !== 'X') return false;
		/*e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		return false;*/
	});

	/*// 
	$.fn.load_method = function(v) {
		if (v.method === 'get') {
			this.load(v.load_url);
		} else {
			var form_jq = v.obj_btn.parents('form');
			//console.log(form_jq);
			$.post(v.load_url, v.form.serialize(), function(data) { this.html(data);});
		}
	}*/

	/*// <select class="AB-popup-img" title="타이틀" rel="285,400">..</a>
	$('body').on('change', 'select.AB-popup-img', function(e) {
		if ($(this).val() == '') return false;
		var dir_file_size = $(this).attr('rel').split(',');
		var load_url = dir_file_size[2] + $(this).val() + '/' + dir_file_size[3];
		$('#global_dialog').load(load_url).dialog({
			modal: true,
			title: $(this).attr('title'),
			width: dir_file_size[0],
			height: dir_file_size[1]
		});
		return false;
	});*/

	// 선택상자의 항목이 바뀌면 페이지를 이동하는 기능
	// <select class="AB-move-url" rel="insiter.php?category_1=" targ="parent">..</select>
	$('body').on('change', 'select.AB-move-url,input.AB-move-url', function(e) {
		var tov = $(this).val();
		var load_url = $(this).attr('rel');
		if (load_url !== undefined) {
			if (tov != '') {
				if (tov.substring(0, 4) !== 'http' && $(this).attr('data-dne') !== 'Y') tov = urlencode(tov);
				load_url += tov;
				load_url = load_url.replace('%VAL%', tov);
			} else if (load_url.substr(load_url.length-1, 1) === '~' || load_url.substr(load_url.length-1, 1) === '$') {
				load_url = load_url.substr(0, load_url.length-1);
			}
		} else load_url = tov;
		var url_tail = $(this).attr('data-url-tail'); if (url_tail !== undefined) load_url += url_tail;
		var val_tail = $(this).data('val-tail'); if (val_tail !== undefined && val_tail[tov] != undefined) load_url += val_tail[tov];
		if ($(this).attr('ajax') !== 'Y') {
			var targ_frm = 'document';
			if ($(this).attr('targ') !== undefined) targ_frm = $(this).attr('targ');
			if (targ_frm === '_blank') window.open(load_url, targ_frm); else eval(targ_frm).location.href = load_url;
		} else {
			var load_infos = [];
			var doc = eval($(this).attr('doc') === undefined ? 'window' : $(this).attr('doc'));
			doc.$('#loading_img').loading_img({'cobj':$(this)});
			var ai = $(this).data('ajax-option'); if (ai === undefined) ai = {}; ai.load_url = load_url; load_infos.push(ai);
			if (ai.load_info !== undefined) $.each(ai.load_info, function(idx, str) { load_infos.push(str); });
			$.load_urls(load_infos, doc, $(this));
		}
	});

	// ajax submit
	// 새로고침 되어야 할 경우 버튼에 refresh="Y" 마크업, dialog 에서 결과값을 받아야 할 경우 버튼에 ajax_area="global_dialog" 마크업, 처리 후 레이어 창을 유지해야 할 때 dialog="Y" 마크업
	// 처리전 콜백 실행 : data-cbk="$('body').start_sch({});", 콜백 후 딜레이 : data-cbk-time="5000", 처리후 콜백 실행 : data-cbk-a="alert_core('완료!!');"
	$('body').on('click', '*[id^=AB_btn_submit_]', function(e) {
		//var submit_idx_array = $(this).attr('id').split('_');
		var obj_this = $(this);
		var submit_idx = obj_this.attr('id').substring(14);
		var form = $('form:has(#AB_btn_submit_' + submit_idx + ')');
		if (form.length > 1) form = form.eq(form.length-1);
		var submit_action = form.attr('action'), submit_method = form.attr('method'), submit_function = form.attr('submit-func'), after_db_script = form.children('input[name=after_db_script]');
		if (after_db_script.length <= 0) { form.append('<input type="hidden" name="after_db_script" value="%PSELF%">'); after_db_script = form.children('input[name=after_db_script]'); }
		form.removeAttr('action', 'submit-func');
		if (submit_function) {
			var T_submit_function = submit_function;
			if (T_submit_function.substring(0, 7) === 'return ') T_submit_function = T_submit_function.substring(7);
			if (eval(T_submit_function)) {
				var doc = eval(obj_this.attr('doc') === undefined ? 'window' : obj_this.attr('doc'));
				var cbk = obj_this.attr('data-cbk'), cbk_time = obj_this.attr('data-cbk-time'), cbk_a = obj_this.attr('data-cbk-a'); if (cbk_time === undefined) cbk_time = 0;
				doc.$('#loading_img').loading_img({'cobj':obj_this}); if (cbk !== undefined) eval(cbk);
				setTimeout(function() {
					var ai = obj_this.data('ajax-option'); if (ai === undefined) ai = {};
					//var dialog = obj_this.attr('dialog'), refresh = obj_this.attr('refresh');
					//var anchor = obj_this.attr('anchor'), load_info = obj_this.attr('load_info'), ajax_contents = obj_this.attr('ajax_contents'), callback = obj_this.attr('callback');
					if (submit_method === 'post') {
						var afdbsc = after_db_script.val();
						if (form.attr('id').indexOf('_LIST_index') <= 0) {							// 목록폼이 아닌경우
							if (ai.ajax_area === undefined) ai.ajax_area = 'AB_contents';
							if (afdbsc.indexOf('%MOVE%') >= 0 && afdbsc.indexOf('&DLG=') < 0 && ai.ajax_area.substr(0, 13) === 'global_dialog') after_db_script.val(afdbsc + '&DLG=Y');
							if (!obj_this.hasClass('AB-btn-long-exec')) {							// 한번실행
								$.post(submit_action, form.serialize(), function(data) {
									console.log(data);
									var alert_msg = get_alert_msg_in_result(data);					// 경고 메시지 있으면 출력 (중복되지 않도록 출력 후 제거)
									if (alert_msg != 'null') { after_submit_cancel(alert_msg); data = data.replace(alert_msg, ''); }
									if (afdbsc === 'X') { if (ai.callback !== undefined) eval(ai.callback); doc.$('#loading_img').loading_img({'cobj':obj_this, 'off':'Y'}); return; }
									//console.log(opener); console.log(parent);
									if (data.indexOf('history.go(') < 0) {								// 뒤로 이동 인 경우 load 안함
										var move_url;
										if (afdbsc == '%PSELF%' || (afdbsc == '%CLOSEREFRESH%' && opener == null && parent === self)) {	// 현재페이지
											var exp_href = urldecode(document.location.href).split('#');
											if (exp_href[0] != undefined) move_url = exp_href[0]; else move_url = exp_href;
										} else {
											move_url = get_move_url_in_result(data);					// 이동할 url
										}
										//console.log(move_url);
										//console.log(callback);
										if (move_url !== 'null') after_submit_load(obj_this, move_url, doc, ai/*, '', anchor, callback, load_info, dialog, refresh*/);
										else after_submit_html(data, doc, ai/*.ajax_area, ajax_contents, dialog, refresh*/);
										//else if (afdbsc.indexOf('CLOSE') <= -1) after_submit_html(data, ai.ajax_area, ajax_contents, dialog, refresh);
									}
									submit_idx = '';
								});
							} else {				// 여러번 실행
								var st;
								var ec = 0, ei, iaa, rv;
								var pc = obj_this.attr('data-per-cnt');
								var idv = obj_this.attr('data-exec-idx-div');
								var pin = obj_this.attr('data-post-idx-name');
								var ckn = obj_this.attr('data-exec-cookie-name');
								var obj_aa = $('#' + obj_this.attr('data-msg-area')); obj_aa.css('display', ''); obj_this.css('display', 'none');
								var obj_idxs = $('*[name="' + pin + '"]', form), idxs = obj_idxs.val();
								var obj_ec = $('input[name="exec_cnt"]', form);
								if (obj_ec.length === 0) {
									form.append('<input type="hidden" name="exec_cnt" value="0">');
									obj_ec = $('input[name="exec_cnt"]', form);
								}
								var ci = get_cookie(ckn);
								if (ci == '' || $('input[name="sf"]', form).is(':checked') === true) iaa = idxs.split(idv);
								else iaa = ci.split(idv);
								var tc = iaa.length;			// 총 실행 회수
								if (tc > 0) {
									var option = {'pc':1, 'pin':pin, 'iaa':iaa, 'ckn':ckn, 'idv':idv, 'obj_ec':obj_ec, 'obj_idxs':obj_idxs, 'form':form, 'ec':ec, 'po':{'url':set_url_tail(submit_action, 'no_header=Y', 'Y', 'N', 'X', 'Y'), 'pv':form.serializeArray()}}
									rv = $('body').long_exec_post(option, function(vars) { iaa = vars.vars.iaa; ec = vars.vars.ec; ei = vars.vars.ei; obj_aa.prepend($(vars.data).html()); });
									ei = rv[0];
									st = setInterval(function() {
										//console.log('setInterval');
										var ilc = 'N';
										if (ei === 'Y') return; option['iaa'] = iaa; option['ec'] = ec;
										if (iaa.length <= option['pc']) ilc = 'Y';
										if (ilc === 'Y') option['po'].url = set_url_tail(submit_action, 'no_header=Y&last=Y&tc=' + tc, 'Y', 'N', 'X', 'Y');	// 마지막 회차에서는 last=Y 전달
										rv = $('body').long_exec_post(option, function(vars) {
											//console.log(iaa.length);
											if (obj_this.attr('debug') === 'Y') console.log(vars.data);
											iaa = vars.vars.iaa; ec = vars.vars.ec; ei = vars.vars.ei; obj_aa.prepend($(vars.data).html());
											if (ilc === 'Y') {	// 완료
												delete_cookie(ckn); clearInterval(st);
												obj_aa.prepend('<p class=\"result-msg-long-exec\">' + obj_this.attr('data-complete-msg') + '</p>');
												doc.$('#loading_img').loading_img({'cobj':obj_this, 'off':'Y'}); /*obj_aa.css('display', 'none'); */obj_this.css('display', '');
												if (ai.ajax_area !== undefined) {
													var alert_msg = get_alert_msg_in_result(vars.data);			// 경고 메시지 있으면 출력
													if (alert_msg != 'null') after_submit_cancel(alert_msg);
													if (vars.data.indexOf('history.go(') < 0) {						// 뒤로 이동 인 경우 load 안함
														var move_url;
														if (afdbsc == '%PSELF%' || afdbsc == '%CLOSEREFRESH%') {	// 현재페이지
															var exp_href = urldecode(document.location.href).split('#');
															if (exp_href[0] != undefined) move_url = exp_href[0]; else move_url = exp_href;
														} else {
															move_url = get_move_url_in_result(vars.data);			// 이동할 url
														}
														if (move_url !== 'null') after_submit_load(obj_this, move_url, doc, ai/*, '', anchor, callback, load_info, dialog, refresh*/);
														else after_submit_html(vars.data, doc, ai/*.ajax_area, ajax_contents, dialog, refresh*/);
													}
												}
												submit_idx = '';
											}
										});
										ei = rv[0];
									}, 1000);
								}
							}
						} else {	// 목록에서 ajax, post 검색인 경우, com_bos_addr_group_book - 참석인원추가 -> 단어검색시 OTSKIN 제거 되고 submit 되는 현상 있어서 set_url_tail의 exot 인자를 Y로 변경 아래도 동일
							$.post(set_url_tail(submit_action, 'AJAX=Y', 'Y', 'Y', 'X', 'Y'), form.serialize(), function(data) { /*console.log(data);*/ after_post_load(obj_this, data, doc, ai/*.ajax_area, ai.return_area, dialog, refresh*/, 'N', function() { $('*[rtd=Y]', form).removeAttr('disabled'); }); });
						}
					} else {		// 폼에서 ajax get 호출인 경우
						after_submit_load(obj_this, set_url_tail(submit_action, form.serialize(), '', 'Y'), doc, ai/*, '', anchor, callback, load_info, dialog, refresh*/, 'N');
					}
					if (cbk_a !== undefined) eval(cbk_a);
				}, cbk_time);
			}
		}
		submit_is_ing = 'N'; $('*[name$=\"[]_multi\"]', form).prop('disabled', true);
		form.attr('action', submit_action); form.attr('submit-func', submit_function); return false;
	});
	
	$.fn.long_exec_post = function(vars, callback) {
		vars.ei = 'Y';			// 처리중 상태로 표시
		var idx_array = [];
		var cnt_iaa = vars.iaa.length;
		set_cookie(vars.ckn, vars.iaa.join(vars.idv), 24);
		for (i=0; i<cnt_iaa; i++) {
			if (i >= vars.pc) break;
			idx_array.push(vars.iaa.shift());
		}
		//console.log(vars.ec);
		vars.obj_ec.val(vars.ec); vars.obj_idxs.val(idx_array.join(','));
		$.post(vars.po.url, vars.form.serializeArray(), function(data) {		// 처리시작
			vars.ec++; vars.ei = 'N';														// 처리완료되면 실행카운트 하나 올리고, 완료표시
			if (callback !== undefined) callback({'vars':vars, 'data':data});	// 콜백실행
		});
		return [vars.ei];	// 진행상태 리턴 (호출되면 바로 Y리턴 되어 setInterval 실행시 처리중으로 인식, 처리완료되면 N으로 변경되어 다시 처리시작할 수 있음)
	};

	// ajax autocomplete 처리
	$('body').on('focus', 'input[class*=AB_auto_complete]', function(e) { if (!$(this).hasClass('ui-autocomplete-input')) $(this).set_auto_complete({}); });
	
	$.fn.set_auto_complete = function(vars, callback_1, callback_2) {	
		var this_box = this;
		var exp_select_value = exp_label = new Array;
		var sch_query = this_box.attr('sch_query') === undefined ? '' : this_box.attr('sch_query'), grpby_fld = this_box.attr('grpby_fld') === undefined ? '' : this_box.attr('grpby_fld');
		var order_by = this_box.attr('order_by'), sch_limit = this_box.attr('sch_limit'), sch_me = this_box.attr('sch_me'), min_len = this_box.attr('min_len'), src_url = this_box.attr('src_url'), dbl_chk = this_box.attr('dbl_chk');
		var sch_tbl = this_box.attr('sch_tbl'), sch_fld = this_box.attr('sch_fld'), view_fld = this_box.attr('view_fld'), sch_my_id = this_box.attr('sch_my_id'), set_fld = this_box.attr('set_fld'), set_this = this_box.attr('set_this'), return_fld = this_box.attr('return_fld'); if (view_fld === undefined) view_fld = return_fld;
		src_url = src_url + (src_url.indexOf('?') > -1 ? '&' : '?') + 'SUBCALL=Y&sch_tbl=' + sch_tbl + '&sch_fld=' + urlencode(sch_fld) + '&view_fld=' + urlencode(view_fld) + '&sch_query=' + urlencode(sch_query) + '&grpby_fld=' + urlencode(grpby_fld) + '&return_fld=' + urlencode(return_fld) + '&order_by=' + urlencode(order_by) + '&sch_limit=' + sch_limit + '&sch_me=' + sch_me + '&sch_my_id=' + sch_my_id + '&dbl_chk=' + dbl_chk;
		if (this_box.attr('debug') === 'Y') { console.log(src_url); console.log(set_fld); console.log(return_fld); $.get(src_url + '&term=검색어&debug=Y', {}, function(dataJson) { console.log(dataJson); }); }	// 디버깅용
		this_box.autocomplete({
			source: src_url, minLength: min_len,
			/*create: function(e, ui) {console.log('create');},		// 처음 실행될 때
			search: function(e, ui) {console.log('search');},			// 검색 전
			response: function(e, ui) {console.log('response');},		// 검색 후
			open: function(e, ui) {console.log('open');},				// 메뉴 오픈 (검색결과 있음)*/
			focus: function(e, ui) { return false; },						// 검색결과에 포커스 될 때
			select: function(e, ui) {											// 선택할 때 (클릭, 엔터)
				if (set_fld != '') exp_label = ui.item.label.split('­, '); exp_select_value = ui.item.value.split('­');
				var dmu = this_box.data('move-url'); if (dmu !== undefined && dmu != '') { document.location.href = dmu['url'] + exp_select_value[dmu['idx']]; return false; }
			},
			close: function(e, ui) {											// 메뉴닫힐때
				if (set_fld != '' && exp_select_value.length > 0) {	// 선택했을때만 exp_select_value 에 값이 배정됨
					var form = this_box.parents('form'), exp_set_fld = set_fld.split(',');
					if (exp_set_fld.length !== exp_select_value.length) {	// 리턴항목과 세팅항목이 맞지 않으면
						var temp = [];												// 세팅항목 수에 맞도록 리턴항목 뒷 부분을 하나로 합친다.
						for (var i=0; i<exp_select_value.length; i++) if (exp_set_fld.length <= i+1) temp.push(exp_select_value[i].replace(/\\/g, ''));
						exp_select_value.splice(exp_set_fld.length-1, exp_select_value.length-1, temp.join(' '));
					}
					for (var i=0; i<exp_set_fld.length; i++) {
						var set_val = exp_select_value[i].replace(/\\/g, '');
						var set_fld_box = form.find('input[name=' + exp_set_fld[i] + '],select[name=' + exp_set_fld[i] + '],textarea[name=' + exp_set_fld[i] + ']');
						if (set_fld_box.length > 0) {
							if (set_fld_box.hasClass('AB_datepicker')) {
								if (set_val != '' && !isNaN(set_val) && parseInt(set_val) != 0) {
									var date = new Date(set_val * 1000);
									var year = date.getFullYear(), month = (date.getMonth() + 1).toString().padStart(2, '0'), day = date.getDate().toString().padStart(2, '0');
									var hours = date.getHours().toString().padStart(2, '0'), minutes = date.getMinutes().toString().padStart(2, '0'), seconds = date.getSeconds().toString().padStart(2, '0');
									set_val = year + '-' + month + '-' + day; if (set_fld_box.hasClass('AB_datepicker_time')) set_val += ' ' + hours + ':' + minutes + ':' + seconds;
								} else {
									set_val = '';//console.log(exp_set_fld[i], set_val);
								}
							}
							//set_fld_box.val(set_val).trigger('change');console.log(set_fld_box.val(), set_val);
							if (set_fld_box.val() != set_val) set_fld_box.val(set_val).trigger('change'); else set_fld_box.val(set_val);
						} else {
							var set_fld_box = form.find('*[name=PHONE1_' + exp_set_fld[i] + ']');
							if (set_fld_box.length > 0) {
								var exp_value = set_val.split('-');
								set_fld_box.val(exp_value[0]).trigger('change');
								form.find('input[name=PHONE2_' + exp_set_fld[i] + ']').val(exp_value[1]).trigger('change');
								form.find('input[name=PHONE3_' + exp_set_fld[i] + ']').val(exp_value[2]).trigger('change');
							}
							var set_fld_box = form.find('*[name=EMAIL1_' + exp_set_fld[i] + ']');
							if (set_fld_box.length > 0) {
								var exp_value = set_val.split('@');
								set_fld_box.val(exp_value[0]).trigger('change');
								form.find('input[name=EMAIL2_' + exp_set_fld[i] + ']').val(exp_value[1]).trigger('change');
								form.find('select[name=EMAIL3_' + exp_set_fld[i] + ']').val(exp_value[1]).trigger('change');
							}
						}
					}
					if (callback_1 !== undefined) callback_1({tb:this_box, frm:form});
				}
				if (set_this != undefined) { this_box.attr('disabled', 'disabled'); this_box.val(exp_label[parseInt(set_this)]); }
				exp_select_value = exp_label = new Array;
			},
			change: function(e, ui) { this_box.removeAttr('disabled'); }	// 입력상자 포커스아웃시 값이 변경된 경우 (첫 로딩후 아무 값도 없이 포커스 아웃되도 실행됨)
		});
	}
	
	$.fn.alert_layer = function(vars) {	
		var nm_bcam = 'bos-core-alert-msg';
		if (vars.url === undefined || vars.url == '') vars.url = typeof(alert_layer_url) !== 'undefined' ? alert_layer_url : './insiter.php?design_file=alert_msg.php&_preview_ifrm_=Y';
		$.get(vars.url, function(d) {//console.log(d);
			var scts = [], otts = [];
			var resp = $(d.replace(/%CONTENTS%/g, vars.msg.replace(/\n/gm, '<br>')));
			var obj_bcams = $('.' + nm_bcam), cnt_bcams = obj_bcams.length; if (cnt_bcams > 0 && vars.alwmlt !== 'Y') return;
			var idx_bcam = cnt_bcams + 1, idx_bcam = nm_bcam + '-' + idx_bcam.toString();
			for (var i=0; i<resp.length; i++) {
				var obj_d = $(resp[i]);//console.log(obj_d);
				if (obj_d.prop('tagName') !== 'SCRIPT') {	// 스크립트 제외한 태그
					if (vars.next !== undefined) $('.bos-core-close', obj_d).attr('onclick', vars.next);
					otts.push(obj_d[0]);
				} else {
					scts.push(obj_d[0]);							// 스크립트 태그
				}
			}
			$('body').append($('<div id=\"' + idx_bcam + '\" style=\"display:none;z-index:10001\">').append(otts));
			var obw = $('#' + idx_bcam, 'body'); if (scts.length > 0) $('body').append(scts); else obw.css({'display':''});
			if (vars.overlay !== 'X') {
				var uwo = 'ui-widget-overlay', obj_uwo = $('.' + uwo, 'body');
				if (obj_uwo.length === 0) {
					$('body').append('<div class=\"' + uwo + '\" style=\"display:none;\"></div>');
					obj_uwo = $('.' + uwo, 'body');
				}
				obj_uwo.css({'display':'', 'height':$(document).height(),'z-index':obw.zIndex() - 1});
			}
			if (vars.callback_cf !== undefined || vars.callback_cc !== undefined) $('.btnCoreCancel', obw).css('display', '');
			if (vars.callback_cf !== undefined) { obw.off('click', '.btnCoreConfirm'); obw.on('click', '.btnCoreConfirm', function(e) { vars.callback_cf(vars.vars); }); }
			if (vars.callback_cc !== undefined) { obw.off('click', '.btnCoreCancel'); obw.on('click', '.btnCoreCancel', function(e) { vars.callback_cc(vars.vars); }); }
			return obw;
		});
	}
	
	// 페이지 링크
	$('body').on('click', '.sitecook-dialog *[dialog-link=Y],.sitecook-dialog a[class^=LF_page_link]', function(e) {
		if ($(this).attr('ajax') !== 'Y') {
			var url = $(this).attr('href');
			if ($(this).prop('tagName') !== 'A') url = get_move_url_in_result($(this).attr('href'));
			$('.sitecook-dialog', $(this).parents('div')).eq(0).load(set_url_tail(url, 'AJAX=Y', 'Y', 'N', 'X', 'Y'));
			$(this).attr('href', '#;');
			return false;
		}
	});

	// 다이얼로그 사이즈변경
	$('body').on('click', '.resize_dialog', function(e) {
		var this_dialog = $('.sitecook-dialog', $(this).parents()).eq(0);
		if (this_dialog.length > 0) {
			var size_width = $(this).attr('data-size-width'), size_height = $(this).attr('data-size-height');
			if (size_width !== undefined) this_dialog.dialog('option', 'width', size_width); if (size_height !== undefined) this_dialog.dialog('option', 'height', size_height);
			if (this_dialog.data('fix-pos-rs') !== 'Y') { var pos = this_dialog.attr('data-pos'); if (pos === undefined) pos = '{my:"center",at:"center",of:window}'; pos = eval('(' + pos + ')'); this_dialog.dialog('option', 'position', pos); }
		}
	});

	// 다이얼로그 닫기
	$('body').on('click', '.close_dialog', function(e) {
		var close_id = $(this).attr('close-id');
		if (close_id === undefined) {
			$('.sitecook-dialog', $(this).parents()).eq(0).dialog('close');
		} else if (close_id.substr(0, 13) === 'global_dialog') $('#' + close_id).dialog('close');
		else if (close_id === '-sl') $('.' + close_id).css('display', 'none');
		else $('#' + close_id).css('display', 'none');
	});

	// alert 레이어 닫기
	$('body').on('click', '.bos-core-close', function(e) {
		var close_id = $(this).data('close-id');
		var ctl = $(this).data('close-type-layer');
		if (ctl === 'hide') $('*[id^="' + close_id + '"]').css('display', 'none'); else $('*[id^="' + close_id + '"]').remove();
		var cto = $(this).data('close-type-overlay');
		if (cto === 'hide') $('.ui-widget-overlay', 'body').css('display', 'none'); else $('.ui-widget-overlay', 'body').remove();
	});
	
	// 쇼핑몰
	$('body').on('click', '#btn-view-to-input-form', function(e) {
		$('#recv_info').view_to_input({
			r_msg : '저장되었습니다.',
			action : './shop/buy_modify_receiver.php',
			ajax_area : '',
			dialog : '',
			refresh : ''
		});
	});
	
	// 보기를 입력폼으로 변경하는 함수
	$.fn.view_to_input = function(vars) {
		var obj_this = this;
		var _vtf_v = $('.-vtf-v', obj_this);
		var _vtf_i = $('.-vtf-i', obj_this);
		var _vtf_tog = $('.-vtf-tog', obj_this);
		var _vtf_frm_id = obj_this.attr('id') + '_frm';
		var _vtf_btn_submit = $('.-vtf-submit', obj_this);
		var _vtf_form = $('#' + _vtf_frm_id);
		if (_vtf_form.length <= 0) {
			obj_this.wrap('<form id=' + _vtf_frm_id + ' name=' + _vtf_frm_id + '></form>');
			_vtf_form = $('#' + _vtf_frm_id);
		}
		if (_vtf_i.length <= 0) {
			_vtf_v.each(function(index) {
				var exp_rel = $(this).attr('rel').split('|');
				var input_box;
				switch (exp_rel[0]) {
					case 'text' :
						input_box = $("<input type='text' id='" + exp_rel[1] + "' name='" + exp_rel[1] + "' class='-vtf-i AB-text' " + exp_rel[2] + '>').val(strip_tags($(this).html()));
					break;
					case 'textarea' :
						input_box = $("<textarea name='" + exp_rel[1] + "' class='-vtf-i AB-textarea' " + exp_rel[2] + ">").val(strip_tags($(this).html()));
					break;
				}
				$(this).after(input_box);
				$(this).css('display', 'none');
			});
			_vtf_tog.css('display', '');
		} else {
			_vtf_i.remove();
			_vtf_v.css('display', '');
			_vtf_tog.css('display', 'none');
		}
		_vtf_btn_submit.off('click');
		_vtf_btn_submit.on('click', function(e) {
			$.post(vars.action, _vtf_form.serialize(), function(data) {
				var alert_msg = get_alert_msg_in_result(data);
				var reload_url = get_ajax_reload_url('Y');
				if (alert_msg == 'null') {
					if (vars.r_msg != '') alert_core(vars.r_msg);
					after_submit_load($(e.target), reload_url, eval(vars.doc === undefined ? 'window' : vars.doc), vars);
				} else {
					after_submit_cancel(alert_msg);
				}
			});
		});
	}

	// 객체를 화면 정중앙에 배치 (사용법 : 객체.center())
	$.fn.center = function() {
		this.css('position', 'absolute');
		this.css('top', ($(window).height() - this.height()) / 2+$(window).scrollTop() + 'px');
		this.css('left', ($(window).width() - this.width()) / 2+$(window).scrollLeft() + 'px');
		return this;
	}
	
	// 작업완료 처리
	// 호출예 : $('body').chk_complete({'targsel':'.rotate-item-s-wrap', 'delay':30000, 'calbapnd' : function(vars) {}});
	// targsel에 loading-img 를 마크업하면 오버레이 설정, wait-cursor 마크업하면 wait 커서 반영됨
	chk_complete_timer = {};
	$.fn.chk_complete = function(vars) {
		var is_debug = 'N';
		var obj_this = this, load_infos = [];
		if (is_debug === 'Y') console.log('chk_complete() call');
		if (typeof(designer_box_url) !== 'undefined') return false;
		var ing = $(vars.targsel + ':not(".chk-complete-call")', obj_this); if (is_debug === 'Y') console.log('ing : ' + ing.length);
		if (vars.calbapnd === undefined) {
			vars.calbapnd = function(cbvars) {			// 변화가 있을때만 로딩내용이 반영되도록 하는 콜백 함수
				var objt_ritm_cnt = parseInt(cbvars.li.objt.attr('ing-cnt'));	// 화면의 로딩표시기 개수
				var objdt_ritm_cnt = $(vars.targsel, cbvars.objdt).length;		// 로딩 내용의 로딩표시기 개수
				if (is_debug === 'Y') { console.log('objt : ' + objt_ritm_cnt); console.log('objdt : ' + objdt_ritm_cnt); }
				if (objt_ritm_cnt == objdt_ritm_cnt) {	// 같으면 로딩내용 버림
					return false;
				} else {	// 다르면 로딩내용 반영
					cbvars.li.objt.attr('ing-cnt', objdt_ritm_cnt);	// 화면의 로딩표시기 개수 변경
					if (objdt_ritm_cnt <= 0 && typeof(chk_complete_timer[vars.idx]) != 'undefined') {	// 화면에 로딩표시기가 없으면 체크중지
						 if (is_debug === 'Y') { console.log(chk_complete_timer[vars.idx]); console.log("clearTimeout : chk_complete_timer['" + vars.idx + "']"); }
						 clearTimeout(chk_complete_timer[vars.idx]);	//chk_complete_timer[vars.idx] = undefined; console.log(typeof(chk_complete_timer[vars.idx]), chk_complete_timer[vars.idx]);
						 delete chk_complete_timer[vars.idx];			//console.log(typeof(chk_complete_timer[vars.idx]));
						 if (ing.hasClass('wait-cursor')) $('body').css('cursor', 'default');
					}
				}
			}
		}	
		if (ing.length > 0) {
			if (ing.hasClass('loading-img')) ing.trigger('click');
			if (ing.hasClass('wait-cursor')) $('body').css('cursor', 'wait');
			ing.addClass('chk-complete-call'); obj_this.attr('ing-cnt', ing.length);	// 로딩중 표시 개수를 저장 (로딩내용반영 판단을 위해 호출처 콜백함수에서 업데이트 됨)
			var doc = eval(obj_this.attr('doc') === undefined ? 'window' : obj_this.attr('doc'));
			var ai = ing.data('ajax-option'); if (ai === undefined) ai = {"ajax_area":"AB_contents","keep_script":"Y"};	// 로딩처리함수로 보낼 인자들 세팅
			ai.load_url = ajax_url_filter(document.location.href + '&SUBCALL=Y'); ai.ing = ing; ai.objt = obj_this; ai.callvars = vars; load_infos.push(ai); if (is_debug === 'Y') { console.log(ai.load_url); }
			if (ai.load_info !== undefined) $.each(ai.load_info, function(idx, str) { load_infos.push(str); });
			if (typeof(chk_complete_timer[vars.idx]) == 'undefined') {
				if (is_debug === 'Y') { console.log('start timer'); }
				chk_complete_timer[vars.idx] = setTimeout(function trigger_ing() {	// 타이머로 체크 시작
					if (is_debug === 'Y') { console.log('trigger_ing'); }
					$.load_urls(load_infos, doc, obj_this);
					chk_complete_timer[vars.idx] = setTimeout(trigger_ing, vars.delay);
				}, vars.delay);
			} else {
				if (is_debug === 'Y') { console.log("typeof(chk_complete_timer['" + vars.idx + "']): ", typeof(chk_complete_timer[vars.idx])); }
			}
		}
	}
	
	// 페이지 로딩 후
	$(window).load(function() {
	});
	
	// ajax 호출 후
	$('#AB_contents').ajaxStart(function(){
	});

	// ajax 호출 완료 후, 다이얼로그 뜬 후 실행될 부분
	$('#AB_contents').ajaxComplete(function(e, r, s) {
		//if (s.type !== 'GET') return;
		if (s.url.indexOf('SUBCALL=Y') >= 0) return;											// subcall 무조건 패스
		if (s.url.indexOf('__chk_call=Y') >= 0) return;										// __chk_call 무조건 패스
		if (s.url.indexOf('AJAX=Y') < 0 && s.url.indexOf('DLG=Y') < 0) return;		// ajax 호출도 아니고 대화창 열기도 아니면 패스
		
		/* ajax 호출 완료 또는 대화창 열기시 실행할 코드 시작 */
		refresh_exec();
		/*$('*[ajax_area="_td_"]').each(function(i) { $(this).attr('ajax_area', $('.sitecook-dialog', $(this).parents('div')).attr('id')); $(this).attr('dialog', 'Y'); });	// 현재 다이얼로그 영역 치환 (편의상 dialog=Y 강제지정)
		$('*[ajax_area="_pd_"]').each(function(i) {											// 부모 다이얼로그 영역 치환
			var parent_dialog_id = $('.sitecook-dialog', $(this).parents('div')).parents('div.ui-dialog').prev('div.ui-dialog').children('.sitecook-dialog').attr('id');
			if (parent_dialog_id === undefined) parent_dialog_id = 'AB_contents';
			$(this).attr('ajax_area', parent_dialog_id);
		});*/
		/* 끝 */
		
		if (s.url.indexOf('AJAX=Y') < 0) return;												// 순수 ajax 호출 완료 시
		/* ajax 호출 완료 후 실행할 코드 시작 */
		/* 끝 */
	});
	
	/*// 참고, 보관용
	$('#AB_contents').ajaxComplete(function(e, r, s) {
		if (((s.url.indexOf('AJAX=Y') < 0 && s.url.indexOf('DLG=Y') < 0) || s.url.indexOf('SUBCALL=Y') >= 0) && get_get_var('cll_ajax_complete') !== 'Y'하드코딩시 사용할 샘플, 필요하면 이곳에서도 추후 활용) return;
		refresh_exec();
		if (s.type === 'GET') {		// 선택상자의 항목을 ajax 로 변경 하는 것과 같은 부분적인 ajax 는 제외 하기 위한 조건
			if ((s.url.indexOf('AJAX=Y') >= 0 && s.url.indexOf('SUBCALL=Y') < 0) || s.url.indexOf('DLG=Y') >= 0 || get_get_var('cll_ajax_complete') === 'Y'하드코딩시 사용할 샘플, 필요하면 이곳에서도 추후 활용) {
				if (s.url.indexOf('DLG=Y') < 0) form_html_copy = {};	// change_toggle_input() 에 의해서 설정된 변수(반드시 초기화 해야 함)
				refresh_exec();
			}
		} if (s.type === 'POST') {
			refresh_exec();
		}
		//console.log(s);
		$('*[ajax_area="_td_"]').each(function(i) { $(this).attr('ajax_area', $('.sitecook-dialog', $(this).parents('div')).attr('id')); });	// 현재, 부모 다이얼로그 영역 치환
		$('*[ajax_area="_pd_"]').each(function(i) { 
			var parent_dialog_id = $('.sitecook-dialog', $(this).parents('div')).parents('div.ui-dialog').prev('div.ui-dialog').children('.sitecook-dialog').attr('id');
			if (parent_dialog_id === undefined) parent_dialog_id = 'AB_contents';
			$(this).attr('ajax_area', parent_dialog_id);
		});
	});*/

	// 목록에 마우스 올리면 상세내용을 보여주는 플러그인
	$.fn.AB_JQG = function(vars) {
		var random = vars.random;		// 상세 게시물 무작위 노출 또는 첫 게시물로 노출
		var speed = vars.speed;				// 페이드 속도
		var timeout = (vars.playsec != undefined) ? vars.playsec*1000 : 0;	// play 시간
		var playmouse = vars.playmouse;				// 마우스클릭, 오버선택
		var items = this.find('.AB-over');
		var this_obj = this;
		var current_item_idx;
		var m_over = false;
		var sto_fn = null;
		
		var change_item = function(set_item_idx) {
			if (m_over == true) return;
			if (set_item_idx == undefined) set_item_idx = current_item_idx + 1;
			if (set_item_idx == items.length) set_item_idx = 0;
			current_item_idx = set_item_idx;
			items.removeClass('AB-current');
			items.eq(set_item_idx).addClass('AB-current');
			var idx = items.eq(set_item_idx).attr('idx');
			var T_pane_1 = this_obj.find('.AB-pane-1');
			var T_pane_2 = this_obj.find('.AB-pane-2');
			var T_item_1 = this_obj.find('.AB-item-1-' + idx);
			var T_item_2 = this_obj.find('.AB-item-2-' + idx);
			T_pane_1.hide().html(T_item_1.html());
			T_pane_2.hide().html(T_item_2.html());
			if (speed == undefined) {
				T_pane_1.show();
				T_pane_2.show();
			} else {
				T_pane_1.fadeIn(speed);
				T_pane_2.fadeIn(speed);
			}
		}

		if (items.length > 0) {
			if (random != 'Y') current_item_idx = 0;
			else current_item_idx = randRange(0, items.length-1);
			this.find('.AB-pane-1').html(this.find('div[class^=AB-item-1-]').slice(current_item_idx, current_item_idx+1).html());
			this.find('.AB-pane-2').html(this.find('div[class^=AB-item-2-]').slice(current_item_idx, current_item_idx+1).html());

			if (timeout > 0) sto_fn = setInterval(change_item, timeout);
			else change_item();
			
			if (playmouse === 'ck') {
				this.on('click', '.AB-over', function(e) {
					change_item(items.index($(this)));
					m_over = true;
				});
			} else {
				this.on('mouseover', '.AB-over', function(e) {
					change_item(items.index($(this)));
					m_over = true;
				});
			}
			this.on('mouseout', '.AB-over', function(e) {
				if (timeout > 0) {
					clearInterval(sto_fn);
					sto_fn = setInterval(change_item, timeout);
				}
				m_over = false;
			});
		}		
	};

	$('div[id^=AB-jq-gallery-]').each(function(index) {			// 갤러리 박스들 만큼 반복
		$(this).AB_JQG({
			speed : $(this).attr('fade'),
			random : $(this).attr('random'),
			playsec : $(this).attr('playsec'),
			playmouse : $(this).attr('playmouse')
		});
	});

	// 예) b_jq_rolling.tpl.php 의 아코디언
	$('body').on('mouseover', 'div.AB-m-o-d', function(e) {
		var s_h_name = $(this).attr('childtag');
		var toggle_obj = $(this).find(s_h_name);
		var p_at = $(this).attr('p-at');
		var p_my = $(this).attr('p-my');
		var p_collision = $(this).attr('p-collision');
		$('.AB-m-o-d ' + s_h_name).css('display', 'none');
		toggle_obj.css('display', 'block');												// .position 보다 먼저 실행되어야 함.
		toggle_obj.position({ of:$(this),at:p_at,my:p_my,collision:p_collision });
		toggle_obj.bind('mouseout', function(e) { $(this).css('display', 'none') });
	});

	// 아코디언을 자동으로 실행하는 함수
	$.fn.AB_ATAC = function(vars) {
		if (vars.playsec == undefined) return false;
		var random = vars.random;					// 무작위 노출 또는 첫 항목으로 노출
		var timeout = vars.playsec*1000;		// play 시간
		var item_title = (vars.item_title == undefined) ? 'h3' : vars.item_title;
		var items = this.find(item_title);
		if (items.length <= 0) return false;
		var this_obj = this;
		if (random != 'Y') {
			var current_item_idx = 0;
		} else {
			var current_item_idx = randRange(0, items.length-1);
			this_obj.accordion('option', 'active', current_item_idx);
		}
		var m_over = false;
		var sto_fn = null;
		var change_item = function(set_item_idx) {
			if (m_over == true) return;
			if (set_item_idx == undefined) set_item_idx = current_item_idx + 1;
			if (set_item_idx == items.length) set_item_idx = 0;
			current_item_idx = set_item_idx;
			this_obj.accordion("option", "active", set_item_idx);
		}
		sto_fn = setInterval(change_item, timeout);
		this_obj.bind('mouseover', function(e) { m_over = true; });
		this_obj.bind('mouseout', function(e) {
			clearInterval(sto_fn);
			sto_fn = setInterval(change_item, timeout);
			m_over = false;
		});
	};
	
	/*$("#swipe-area").swipe({
		allowPageScroll:"auto",
		swipe:function(event, direction, distance, duration, fingerCount) {
			if (direction === 'left') $(".carousel_1 .forward").trigger('click');
			else if (direction === 'right') $(".carousel_1 .back").trigger('click');
		},
		threshold:0
	});*/
	// jCarouselLite - jQuery plugin to navigate images/any content in a carousel style widget.
	// http://gmarwaha.com/jquery/jcarousellite/
	// 모바일인 경우 가로는 자동 지정 세로는 hr 값을 지정하여 비율을 계산
	$.fn.jCarouselLite = function(o) {
		o = $.extend({hr:0,visible:3,scroll:1,speed:200,auto:null,vertical:false,circular:true,mouseWheel:false,start:0,btnPrev:null,btnNext:null,btnGo:null,easing:null,beforeStart:null,afterEnd:null}, o || {});
		return this.each(function() {
			var carousel_interval;
			var div = $(this), ul = $("ul", div), tLi = $("li", ul), tl = tLi.size(), v = o.visible;
			if (tLi.length === 0) return;
			if (o.hr > 0) tLi.width(div.width()).height(div.width() * o.hr);
			var running = false, animCss=o.vertical?"top":"left", sizeCss=o.vertical?"height":"width";
			if (o.circular) { ul.prepend(tLi.slice(tl-v-1+1).clone()).append(tLi.slice(0,v).clone()); o.start += v; }
			var li = $("li", ul), itemLength = li.size(), curr = o.start; if (o.beforeStart != null || o.afterEnd != null) curr = o.start+1;
			div.css("visibility", "visible");
			li.css({overflow: "hidden", float: o.vertical ? "none" : "left"});
			ul.css({margin: "0", padding: "0", position: "relative", "list-style-type": "none", "z-index": "1"});
			div.css({overflow: "hidden", position: "relative", "z-index": "2", left: "0px"});
			var liSize = o.vertical ? height(li) : width(li);
			var ulSize = liSize * itemLength;
			var divSize = liSize * v;
			var direc = '';
			li.css({width: li.width(), height: li.height()});
			ul.css(sizeCss, ulSize+"px").css(animCss, -(curr*liSize));
			div.css(sizeCss, divSize+"px");
			if (o.btnPrev) $(o.btnPrev).click(function() { direc = 'left'; direc = go(curr+o.scroll); });
			if (o.btnNext) $(o.btnNext).click(function() { direc = 'right'; direc = go(curr-o.scroll); });
			function vis() { return [li.slice(curr).slice(0,v), curr+o.scroll, o.scroll, direc, li] };
			if (o.btnGo) $.each(o.btnGo, function(i, val) { $(val).click(function() { return go(o.circular ? o.visible+i : i); }); });
			if (o.mouseWheel && div.mousewheel) div.mousewheel(function(e, d) { return d>0 ? go(curr-o.scroll) : go(curr+o.scroll); });
			if (o.auto === 'Y') carousel_interval = setInterval(function() {go(curr+o.scroll);}, o.wait+o.speed);
			function go(to) {
				if (!running) {
					if (o.beforeStart) o.beforeStart.call(this, vis());
					if (o.circular) {
						if (to<=o.start-v-1) {
							ul.css(animCss, -((itemLength-(v*2))*liSize)+"px");
							curr = to==o.start-v-1 ? itemLength-(v*2)-1 : itemLength-(v*2)-o.scroll;
						} else if (to>=itemLength-v+1) {
							ul.css(animCss, -( (v) * liSize ) + "px" );
							curr = to==itemLength-v+1 ? v+1 : v+o.scroll;
						} else curr = to;
					} else {
						if (to<0 || to>itemLength-v) return;
						else curr = to;
					}
					running = true;
					ul.animate(animCss == "left" ? { left: -(curr*liSize) } : { top: -(curr*liSize) } , o.speed, o.easing, function() {
						if (o.afterEnd) o.afterEnd.call(this, vis());
						running = false;
					});
					if (!o.circular) {
						$(o.btnPrev + "," + o.btnNext).removeClass("disabled");
						$((curr-o.scroll<0 && o.btnPrev) || (curr+o.scroll > itemLength-v && o.btnNext) || [] ).addClass("disabled");
					}
				}
				return false;
			};
			var evt_on = 'N';
			if (o.auto === 'Y') evt_on = 'Y';
			div.mouseover(function() { if (evt_on === 'Y') clearInterval(carousel_interval); });
			div.mouseout(function() { if (evt_on === 'Y') carousel_interval = setInterval(function() { go(curr+o.scroll); }, o.wait+o.speed); });

			if (o.btnPlay) {
				var btnPlay = $(o.btnPlay);
				if (o.auto !== 'Y') btnPlay.toggleClass('-tog');
				btnPlay.click(function() {
					if (!$(this).hasClass('-tog')) {
						//stop
						clearInterval(carousel_interval);
						evt_on = 'N';
					} else {
						//play
						carousel_interval = setInterval(function() { go(curr+o.scroll); }, o.wait+o.speed);
						evt_on = 'Y';
					}
					$(this).toggleClass('-tog');
				});
			}
		});
	};
	function css(el, prop) { return parseInt($.css(el[0], prop)) || 0; };
	function width(el) { return  el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight'); };
	function height(el) { return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom'); };
	
	// 버튼 그룹을 스위치 시키는 함수
	// 사용예 : ul 태그에 id="tab-switch" on="switch-on" off="", li 태그에는 -sw="매핑 div의 -sw 값" dp=" or none" 마크업 후 아래의 스크립트를 실행
	// <script>$(function() { $('#tab-switch-A').ab_switch({first:'0',evt:'mouseenter',play:{term:1},ait:{sel:'td',str:'...',term:300},sw_wrap:'#wrap-name'}); });</script>
	$.fn.ab_switch = function(vars, callback) {
		if (this.length <= 0) return;
		var playing;
		var play = 'Y';
		var this_obj = this;
		var switch_evt = vars.evt;
		if (switch_evt !== 'mouseenter') switch_evt = 'click';
		var this_view = vars.first;
		var switch_btns = $('li[-sw]', this_obj);
		if (this_view === undefined || this_view == '') this_view = 0;
		else if (this_view === 'random') this_view = Math.floor((Math.random() * switch_btns.length-1) + 1);
		var switch_panel_names = new Array();
		switch_btns.each(function(idx) { switch_panel_names.push('div[-sw="' + $(this).attr('-sw') + '"]'); });
		var switch_on_class = this.attr('on');
		var switch_off_class = this.attr('off');
		var switch_panels = vars.sw_wrap === undefined ? $(switch_panel_names.join(',')) : $(switch_panel_names.join(','), $(vars.sw_wrap));
		_play(this_view, 'Y');
		switch_btns.off(switch_evt);
		switch_btns.on(switch_evt, function(e) { _play(switch_btns.index($(this))); });
		if (vars.play !== undefined && vars.play.term > 0) {
			playing = setInterval(_play, vars.play.term * 1000);
			switch_btns.on('mouseenter', function(e) { play = 'N'; });
			switch_btns.on('mouseleave', function(e) { play = 'Y'; });
			switch_panels.on('mouseenter', function(e) { play = 'N'; });
			switch_panels.on('mouseleave', function(e) { play = 'Y'; });
		}
		function _play(idx, is_first) {
			if (idx !== undefined) this_view = idx;
			else if (play === 'N') return false;
			switch_panels.css('display', 'none');
			if (this_view > switch_btns.length-1) this_view -= switch_btns.length;
			var this_li = switch_btns.eq(this_view);
			var btn_rlv = $('img[data-rlv]', switch_btns);		// 롤오버 버튼 있는 경우 처리
			if (btn_rlv.length > 0) {
				btn_rlv.removeAttr('data-rlv-d').removeClass('except');
				btn_rlv.trigger('mouseout');
				$('img[data-rlv]', this_li).attr('data-rlv-d', 'O').addClass('except');
				this_obj.set_img_rlv();
			}
			//if (!this_obj.is(':visible')) return false;		// 탭영역이 가려져 있는 경우 패스
			var this_sw = vars.sw_wrap === undefined ? $('div[-sw=' + this_li.attr('-sw') + ']') : $('div[-sw=' + this_li.attr('-sw') + ']', $(vars.sw_wrap));
			this_sw.css('display', this_obj.attr('dp'));
			if (switch_off_class != '') { switch_btns.addClass(switch_off_class); this_li.removeClass(switch_off_class); }
			if (switch_on_class != '') { switch_btns.removeClass(switch_on_class); this_li.addClass(switch_on_class); }
			//$('a', switch_btns).eq(this_view).trigger(switch_evt);
			if (vars.ait !== undefined && callback == undefined) callback = function(vars1) { $(vars.ait.sel, switch_panels).ab_ing_tog({"str":vars.ait.str,"term":vars.ait.term}); }
			if (callback !== undefined) callback({tv:this_view, nv:this_view + 1, ts:this_sw});
			this_view++;
		}
	};
	
	// 칸 내부의 값과 진행중 상태를 토글
	$.fn.ab_ing_tog = function(vars) {
		var ait_val = $('.ait-val', this);
		var ait_ing = $('.ait-ing', this);
		if (ait_val.length <= 0) {
			this.wrapInner('<span class="ait-val" style="display:none;"></span>');
			ait_val = $('.ait-val', this);
			ait_val.after('<span class="ait-ing">' + vars.str + '</span>');
			ait_ing = $('.ait-ing', this);
		} else {
			ait_val.css('display', 'none');
			ait_ing.css('display', '');
		}
		setTimeout(function (){
			ait_val.css('display', '');
			ait_ing.css('display', 'none');
		}, vars.term);
	};
	
	// 두개의 div 를 toggle 시키는 함수(쿠키를 이용해서 상태를 저장)
	// 각 div 에 ABA-toggle 클래스를 마크업하고 두개의 토글버튼의 a 태그에 btn-toggle 클래스를 마크업
	// <script>$(function() { $('#quick-consult').ab_toggle(); });</script> 형식으로 헤더에서 호출
	// 바깥쪽 div 에 지정할 추가 속성 id='quick-consult' toggle-hour='1' a-show='blind,up,300' a-hide='blind,down,300'
	// slide, blind, bounce, clip, drop, explode, fold, highlight, puff, pulsate, scale, shake, size
	$.fn.ab_toggle = function() {
		if (this.length <= 0) return;
		var toggle_id = 'abc_' + this.attr('id');
		var toggle_divs = this.children('.ABA-toggle');
		var toggle_div_1 = toggle_divs.eq(0);
		var toggle_div_2 = toggle_divs.eq(1);
		var toggle_hour = parseInt(this.attr('toggle-hour'));
		var toggle_cookie = get_cookie(toggle_id);
		var ei_show = this.attr('a-show').split(',');
		var ei_hide = this.attr('a-hide').split(',');
		if (toggle_cookie == '') toggle_cookie = 1;					// 보여줄 대상
		toggle_divs.eq(toggle_cookie).show(ei_show[0], {direction : ei_show[1]}, parseInt(ei_show[2]));
		$('a.btn-toggle', toggle_div_1).bind('click', function(e) {
			set_cookie(toggle_id, 1, toggle_hour);
			toggle_div_1.hide(ei_hide[0], {direction : ei_hide[1]}, parseInt(ei_hide[2]), function() { toggle_div_2.show(ei_show[0], {direction : ei_show[1]}, parseInt(ei_show[2])); });
		});
		$('a.btn-toggle', toggle_div_2).bind('click', function(e) {
			set_cookie(toggle_id, 0, toggle_hour);
			toggle_div_2.hide(ei_hide[0], {direction : ei_hide[1]}, parseInt(ei_hide[2]), function() { toggle_div_1.show(ei_show[0], {direction : ei_show[1]}, parseInt(ei_show[2])); });
		});
	};
	
	// 외부 버튼으로 div, td 등을 toggle 시키는 함수(쿠키를 이용해서 상태를 저장)
	// <script>$(function() { $('#-btn-toggle').ab_toggle_1(); });</script> 형식으로 헤더에서 호출
	// 버튼에 지정할 추가 속성 예 : id='-btn-toggle' toggle-hour='1' toggle-class='-designer-left' default-view='show' a-show='blind,up,300' a-hide='blind,down,300' easy-close='Y'
	// 여러 버튼으로 toggle 해야 할 경우 다른 버튼의 class에 "id값-trigger" 마크업
	// 객체 전체를 토글하는 것이 아닌 객체의 특정 클래스만 토글 하고자 하는 경우 oc='토글클래스이름,...' 를 마크업
	$.fn.ab_toggle_1 = function(callback1, callback2) {
		var is_first = 'Y';
		var this_obj = this;
		if (this_obj.length <= 0) return;
		var this_obj_id = this_obj.attr('id');
		var toggle_id = 'abc_' + this_obj_id;
		var toggle_class = this_obj.attr('toggle-class');
		var default_view = this_obj.attr('default-view');
		var only_class = this_obj.attr('oc');
		if (only_class !== undefined) var oc_info = only_class.split(',');
		var toggle_obj = $('.' + toggle_class);
		var toggle_hour = parseInt(this_obj.attr('toggle-hour'));
		var toggle_cookie = get_cookie(toggle_id);
		var ei_show = this_obj.attr('a-show').split(',');
		var ei_hide = this_obj.attr('a-hide').split(',');
		if (default_view !== 'show' && toggle_cookie !== 'show') {
			if (only_class === undefined) toggle_obj.css('display', 'none');
			else toggle_obj.addClass(oc_info[0]);
		}
		if (toggle_cookie == '') toggle_cookie = default_view;
		if (toggle_cookie === 'show') {
			if (only_class === undefined) {
				if (ei_show.length === 1) toggle_obj.css('display', ei_show[0]);
				else toggle_obj.show(ei_show[0], {direction : ei_show[1]}, parseInt(ei_show[2]));
			} else {
				toggle_obj.removeClass(oc_info[0]);
			}
			this_obj.removeClass('-hide').addClass('-show');
			$('body').addClass(this_obj_id + '-show');
			$('body').removeClass(this_obj_id + '-hide');
		} else {
			if (only_class === undefined) {
				if (ei_hide.length === 1) toggle_obj.css('display', ei_hide[0]);
				else toggle_obj.hide(ei_hide[0], {direction : ei_hide[1]}, parseInt(ei_hide[2]));
			} else {
				toggle_obj.addClass(oc_info[0]);
			}
			this_obj.removeClass('-show').addClass('-hide');
			$('body').removeClass(this_obj_id + '-show');
			$('body').addClass(this_obj_id + '-hide');
		}
		// 함수호출시 callback2를 실행하되 없으면 callback1을 실행(함수호출시 callback1을 실행하지 않으려면 빈 callback2를 넘겨주자)
		if (callback2 !== undefined) callback2({tob:this_obj,tck:toggle_cookie,tgo:toggle_obj,tgc:toggle_class,es:ei_show,eh:ei_hide}); else if (callback1 !== undefined) callback1({tob:this_obj,tck:toggle_cookie,tgo:toggle_obj,tgc:toggle_class,es:ei_show,eh:ei_hide});
		var cscb; if (this_obj.attr('cs') !== undefined) {	// 무언가 열릴때 다른건 닫는 옵션이 선택된 경우
			cscb = function (vars) {
				if (vars.tck === 'hide') return;
				var close_selector = vars.tob.attr('cs');
				$(close_selector).each (function(idx) { if ($(this).hasClass('-show')) $(this).trigger('click'); });
			}
		}
		this_obj.on('click', function(e) {
			if (toggle_cookie !== 'show') {
				if (only_class === undefined) {
					if (ei_show.length === 1) toggle_obj.css('display', ei_show[0]);
					else toggle_obj.show(ei_show[0], {direction : ei_show[1]}, parseInt(ei_show[2]));
				} else {
					toggle_obj.removeClass(oc_info[0]);
				}
				set_cookie(toggle_id, 'show', toggle_hour);
				this_obj.removeClass('-hide').addClass('-show');
				toggle_cookie = 'show';
			} else {
				if (only_class === undefined) {
					if (ei_hide.length === 1) toggle_obj.css('display', ei_hide[0]);
					else toggle_obj.hide(ei_hide[0], {direction : ei_hide[1]}, parseInt(ei_hide[2]));
				} else {
					toggle_obj.addClass(oc_info[0]);
				}
				set_cookie(toggle_id, 'hide', toggle_hour);
				this_obj.removeClass('-show').addClass('-hide');
				toggle_cookie = 'hide';
			}
			if (toggle_cookie === 'show') {
				$('body').addClass(this_obj_id + '-show');
				$('body').removeClass(this_obj_id + '-hide');
			} else {
				$('body').removeClass(this_obj_id + '-show');
				$('body').addClass(this_obj_id + '-hide');
			}
			if (cscb !== undefined) cscb({tob:this_obj,tck:toggle_cookie,tgo:toggle_obj,tgc:toggle_class,es:ei_show,eh:ei_hide}); if (callback1 !== undefined) callback1({tob:this_obj,tck:toggle_cookie,tgo:toggle_obj,tgc:toggle_class,es:ei_show,eh:ei_hide});
			if (is_first === 'Y') {
				$('textarea:not(.no_auto):visible').autosize();
				is_first = 'N';
			}
		});
		$('.' + this_obj_id + '-trigger').on('click', function(e) {
			var toggle_force = $(this).attr('force');
			if (toggle_force === 'toggle') {
				this_obj.trigger('click');
			} else {
				if (toggle_cookie !== 'show' && toggle_force === 'open') this_obj.trigger('click');
				else if (toggle_cookie === 'show' && toggle_force === 'close') this_obj.trigger('click');
			}
			$('.' + this_obj_id + '-ibs').removeClass(this_obj_id + '-ibs');
			$(this).addClass(this_obj_id + '-ibs');
		});
		if (this_obj.attr('easy-close') === 'Y') {	// 아무곳이나 누르면 닫히도록 하는 옵션
			$('body').on('mousedown touchstart', function(e) {
				if (toggle_cookie === 'hide') return;
				var obj_targ = $(e.target);
				if (obj_targ.attr('id') === this_obj_id || obj_targ.closest('#' + this_obj_id).length) return;
				if (obj_targ.hasClass(toggle_class) || obj_targ.closest('.' + toggle_class).length) return;
				this_obj.trigger('click');
			});
		}
	};
	
	// 클릭 또는 오버시 지정된 위치에 레이어를 띄우는 함수, url 이 지정된 경우 ajax로 호출
	// 1. 바깥쪽 요소 마크업 예 : <div id="-show-layer" event="click" [pos-m="left center" pos_a="center center" pos-c="flip flip" lh="Y or E" fl="1"] />
	// 2. 내용들을 감싸주는 요소(1의 안쪽, 1개) 마크업 예 : <div class="-sl" />
	// 3. 그 안쪽 실제 내용이 들어갈 요소들(2의 안쪽, 여러개) 마크업 예 : <div class="-ac" id="고유값" />
	// 4. 버튼(1의 안쪽, 여러개) 마크업 예 : <li class="-sb" [url="ab-1234(ajax호출)" 또는 url="윗줄고유값" 또는 contents="노출할내용"] />
	// 4번의 버튼이 url="url(ajax호출)" 일 때는 3번 요소는 자동으로 설정됨.
	// 4번의 버튼이 id="고유값" 일 경우 3번 마크업은 필수(첫번째는 고유값으로 고정하고 나머지는 ajax 호출하는 방식도 가능)
	// 보이지 않는 레이어일 경우 상위레이어에 영향 받지 않도록 </body> 앞으로 이동 (이동하게 되면 폼에서 벗어날 수 있으므로 임의의 폼 태그로 감싸주고 레이어를 감출 때 마크업 원위치)
	// 함수인자 : sbs(버튼의 href를 url로 속성이름 변경)
	$.fn.ab_show_layer = function(sbs, rf, callback1, callback2, callback3, callback4) {
		var this_obj = this;
		var ajax_id = new Array;
		var obj_layer, lf_name, flag_first = 'Y';
		var obj_btn = $('.-sb', this_obj);
		var obj_event = this_obj.attr('event');
		var obj_layer_src = $('.-sl', this_obj);
		var form_jq = this_obj.parents('form');
		this_obj.off(obj_event); this_obj.on(obj_event, '.-sb', function(e) {
			if (flag_first === 'Y') {		// obj_layer_src 세팅 후에 마크업이 변경되는 경우가 있어 본 위치에 clone() 정의 함 (노출제한 설정 체크상자 등)
				if (obj_layer_src.css('display') === 'none') {
					obj_layer_src = $('.-sl', this_obj);
					obj_layer = obj_layer_src.clone();
					lf_name = this_obj.attr('id') + '-sl-form';
					obj_layer_src.remove();
				} else {
					obj_layer = obj_layer_src;
				}
				$('.-ac', obj_layer).each(function(idx) { ajax_id[idx] = $(this).attr('id'); });
				if (this_obj.attr('lh') === 'Y') {
					obj_layer.on('mouseleave', function(e) { _hide_layer({'obj_layer': obj_layer}); });
					obj_layer.on('click', '.btn-multi-submit', function(e) { _hide_layer({'obj_layer': obj_layer}); });
				} else if (this_obj.attr('lh') === 'E') {
					$('body').on('click touchstart', function(e) {
						if (obj_layer.css('display') === 'none') return;
						var obj_targ = $(e.target);
						var this_obj_id = this_obj.attr('id');
						if (obj_targ.attr('id') === this_obj_id || obj_targ.closest('#' + this_obj_id).length) return;
						if (obj_targ.hasClass('-sl') || obj_targ.closest('.-sl').length) return;
						_hide_layer({'obj_layer': obj_layer});
					});
				}
				flag_first = 'N';
			}
			_show_layer({
				'obj_layer': obj_layer,
				'obj_btn' : $(this),
				'pos_m' : $(this).attr('pos-m') !== undefined ? $(this).attr('pos-m') : this_obj.attr('pos-m'),
				'pos_a' : $(this).attr('pos-a') !== undefined ? $(this).attr('pos-a') : this_obj.attr('pos-a'),
				'pos_c' : $(this).attr('pos-c') !== undefined ? $(this).attr('pos-c') : this_obj.attr('pos-c')
			}, callback2, callback3, callback4);
		});
		function _show_layer(v, callback2, callback3, callback4) {
			if (lf_name !== undefined) {						// 첫 로딩시 보이지 않는 레이어 였다면
				_hide_layer({'obj_layer': obj_layer});		// 기존 폼이 있다면 중복 생성되지 않도록 제거하고
				$('body').append(obj_layer); obj_layer.wrap('<form id="' + lf_name + '"></form>');				// 폼 밖으로 레이어 이동 한 후 새로운 폼을 씌우고
				var form_ly = $('#' + lf_name); var obj_ls = $('td>input[name="list_select[]"]', form_jq);	// 레코드 체크상자중 체크된게 있으면 새로 씌운 폼 안쪽에 마크업 한다.
				if (obj_ls.length > 0) obj_ls.each(function(i) { if ($(this).is(':checked')) form_ly.append('<input type="hidden" name="list_select[]" value="' + $(this).val() + '">'); });
			}
			$('.-ac', v.obj_layer).css('display', 'none');
			var obj_btn_url = v.obj_btn.attr('url');
			if (obj_btn_url !== undefined) {
				var new_id = obj_btn_url.replace(/[^0-9a-zA-Z-_]/gi, '');
				if (in_array(obj_btn_url, ajax_id) && rf !== 'Y') {
					$('#' + new_id, v.obj_layer).css('display', 'block');
					_position_layer(v);
					if (callback3 !== undefined) callback3(v);
				} else {
					$('#' + new_id).remove();
					v.obj_layer.append('<div id="' + new_id + '" class="-ac"></div>');
					$('#' + new_id, v.obj_layer).load(obj_btn_url + (obj_btn_url.indexOf('?') <= 0 ? '?' : '&') + 'AJAX=Y', function() {
						ajax_id.push(obj_btn_url);
						_position_layer(v);
						if (callback2 !== undefined) callback2(v);
					});
				}
			} else {
				if (v.obj_btn.attr('contents') !== undefined) obj_layer.html(v.obj_btn.attr('contents'));
				_position_layer(v);
				if (callback4 !== undefined) callback4(v);
			}
		}
		function _position_layer(v) {
			if (v.obj_btn !== undefined && v.pos_m !== undefined) {
				v.obj_layer.css({'position':'absolute','display':'block','z-index':-9999});
				v.obj_layer.position({of:v.obj_btn, my:v.pos_m, at:v.pos_a, collision:v.pos_c});
				v.obj_layer.css({'z-index':this_obj.attr('zi') !== undefined ? this_obj.attr('zi') : 1000});
				$('body').set_icr({});	// 체크, 라디오 모양 재세팅
			}
		}
		function _hide_layer(v) {
			v.obj_layer.css({'left':0,'top':0,'display':'none','z-index':0});
			if (lf_name !== undefined) {
				this_obj.append(v.obj_layer);
				$('#' + lf_name).remove();
			}
		}
		if (obj_layer_src.css('display') !== 'none' && this_obj.attr('fl') !== undefined) $('.-sb', this_obj).eq(parseInt(this_obj.attr('fl'))).trigger(obj_event);
		if (sbs === 'Y') {
			obj_btn.renameAttr('href', 'url');
			obj_btn.attr('href', '#;');
		}
		if (callback1 !== undefined) callback1({});
	}
	
	// 미리 마크업된 요소(폼)를 클릭하는 div(td..)등에 넣어주는 함수
	// 넣는 마크업에 존재하는 입력상자의 값을 div(td..)에 지정된 값으로 설정할 수 있음
	// .html() 을 사용했는데 IE(11)에서 두번째 이벤트 부터 나오지 않는 문제가 생겨서 .empty().append() 로 변경함!!! 2017-01-10
	$.fn.ab_move_layer = function(v1) {
		var _in = 'N';
		var this_obj = this.clone();
		var form, targ_obj, targ_obj_html, form_objs, data_mdf;
		var targ_objs = $('.' + this.attr('id') + '-in');
		this_obj.removeAttr('id');
		targ_objs.on(this_obj.attr('evt-type'), function(e) {
			if (_in === 'N') {
				targ_obj = $(this);
				targ_obj_html = targ_obj.html();
				this_obj.css('display', this_obj.attr('disp'));
				targ_obj.empty().append(this_obj);									// 위치 중요
				form = targ_obj.find('form');
				data_mdf = targ_obj.attr('data-mdf');
				if (data_mdf !== undefined) {
					var modify_flds = jQuery.parseJSON(data_mdf);
					$.each(modify_flds, function(key, val) {			// 수정할 값 처리
						$('*[name=' + key + ']', form).val(val);
					});
				}
				form_objs = $('input,select,textarea', form);
				_in = 'Y';
			}
		});
		targ_objs.on('mouseleave', function(e) {
			if (_in === 'Y') {
				if (form_objs.is(':focus') === false) {
					remove({});
				}
			}
		});
		function remove(v) {
			targ_obj.empty().append(targ_obj_html);
			_in = 'N';
		}
		this.remove();
	}
	
	// 1차 선택상자 항목 변경시 2차 선택상자 세팅
	// 1차 선택상자 속성 예 : id="relation_serial_2" tti="gb_group,relation_serial_1" nbi="-ab-next-box,serial_num,subject" ob="subject asc"
	// 2차 선택상자 속성 예 : id="-ab-next-box" s_value="{AV_relation_serial_1}"
	// 두개의 서로 다른 게시판의 게시물을 단계별로 선택하는 용도로 개발 됨.
	$.fn.ab_set_next_select_box = function() {
		var obj_this = this;
		var next_box_info = obj_this.attr('nbi').split(',');
		var next_box = $('#' + next_box_info[0]);
		var get_url = obj_this.attr('url');
		if (get_url === undefined) get_url = 'board/multi_select/get_new_option.json.php';
		if (obj_this.val() == '') next_box.attr('disabled', 'disabled');
		else _get_new_option();
		obj_this.bind('change', function(e) {
			if (obj_this.val() == '') next_box.attr('disabled', 'disabled');
			else _get_new_option();
		});
		function _get_new_option() {
			$.getJSON(get_url + '?idx=' + obj_this.val() + '&nbi=' + urlencode(obj_this.attr('nbi')) + '&tti=' + urlencode(obj_this.attr('tti')) + '&ob=' + urlencode(obj_this.attr('ob')), function(data) {
				next_box.removeAttr('disabled');
				$('option', next_box).remove();
				$.each(data, function(key, val) {next_box.append($("<option></option>").attr('value', key).text(val));});
				next_box.append($("<option></option>").attr('value', '').text('선택'));
				next_box.val(next_box.attr('s_value'));
			});
		}
	}
	
	// 단게별 분류선택상자 처리용 함수, 게시물 이동 기능에서 게시판과 분류 선택상자에도 사용
	// bd-name="{AY_board_info[name]}" ctg-src="O" ctg-end="4" ctg-var-name="ctg_" next-url="{AY_DIRS[board_root]}ctg_next_box.ajax.php" ttl="분류1,분류2..." sv="분류1,분류2..." ilc="N,A,Y" data-hid-name="area_code" data-sch-header=""
	// ilc[0]=Y : 마지막을 체크상자로 함, ilc[1]=A : 텍스트도 함께 저장, ilc[2]=N : 단, 단계별 텍스트는 제외(선택수정 항목용일 때는 N)
	$.fn.category_load_next_box = function(vars, callback1, callback2, callback3, callback_gno_data) {
		var aba_asv = {};
		if (this.length === 0) return false;
		var obj_this = this;											// 처음 호출된 선택상자 객체
		var step_by_step = 'Y';										// 하나씩 순차적으로 노출하는 플래그 (다음 선택상자를 강제로 넣으면 자동 해제 됨)
		if (vars === undefined) vars = {};
		var form_jq = obj_this.parents('form'); vars.frm = form_jq; var otwrap; var obj_ctg_text_first;
		var otwrap_slt = obj_this.attr('data-otwrap'); if (otwrap_slt === undefined) otwrap = form_jq; else otwrap = obj_this.parents(otwrap_slt).eq(0);
		var vars_str = obj_this.attr('vars'); if (vars_str !== undefined) $.extend(true, vars, $.parseJSON(vars_str));
		var ctg_src = obj_this.attr('ctg-src');				// 기본분류(B), 개별분류(I), 단일분류(O)
		var next_url = obj_this.attr('next-url');				// 다음 선택상자의 항목을 만들어 주는 프로그램 url
		var bd_name_src = obj_this.attr('bd-name');			// 게시판 코드명을 저장하는 변수
		var ctg_opt = obj_this.attr('ctg-opt');				// 옵션 (om : 지정된 코드 이하만 선택 가능)
		if (ctg_opt !== undefined) {
			ctg_opt = JSON.parse(obj_this.attr('ctg-opt'));
			ctg_opt.ctgl = parseInt(ctg_opt.ctgl);				// 분류코드 자리수, 몇 단계 까지 감출지 파악하여 처리
			if (obj_this.val() == '') {
				var svd_ctg = [];
				for (var i=ctg_opt.ctgr.length+ctg_opt.ctgl; i<=ctg_opt.om.length; i+=ctg_opt.ctgl) svd_ctg.push(ctg_opt.om.substring(0, i));
				obj_this.attr('sv', svd_ctg.join(','));
				obj_this.val(svd_ctg[0]);
			}
		}
		var ctg_var_name, cll_id = obj_this.attr('-cll-id'), first_box_name = obj_this.attr('name');
		var o_ctg_var_name = obj_this.attr('ctg-var-name'); if (o_ctg_var_name === 'X') o_ctg_var_name = '';
		if (o_ctg_var_name === undefined || o_ctg_var_name == '') {
			var exp_fbn = first_box_name.split('_'), exp_fbn_last = exp_fbn.pop();
			if (exp_fbn_last == '') ctg_var_name = first_box_name; else ctg_var_name = exp_fbn.join('_') + '_';
		} else ctg_var_name = o_ctg_var_name; //console.log(ctg_var_name);
		var hid_name = obj_this.attr('data-hid-name'), sch_header = obj_this.attr('data-sch-header');
		var ctg_title = obj_this.attr('ttl').split(','); if (ctg_title[0] != '') $('option[value=""]', obj_this).text(ctg_title[0]);
		var cls_name = '-' + ctg_var_name + 'abncb', csv = obj_this.attr('sv').split(','); if (obj_this.attr('sv-etc') === undefined) obj_this.attr('sv-etc', '');	// 각 분류상자들의 기본 저장값
		var csv_etc = obj_this.attr('sv-etc').split(',');	// 기타 저장값(체크상자의 라벨값도 함께 저장할 때)
		if (obj_this.attr('fcmt') !== undefined) var ctg_fld_cmt = obj_this.attr('fcmt').split(',');
		var ctg_end = parseInt(obj_this.attr('ctg-end')), ctg_ord = obj_this.attr('ctg-ord'), ctg_ilc = ['N', 'V'];	// 마지막 입력상자를 체크상자로 하려면 Y, 저장값을 텍스트로 하려면 T
		if (obj_this.attr('ilc') !== undefined) ctg_ilc = obj_this.attr('ilc').split(',');
		var rtimpt = obj_this.attr('data-rtimpt');			// 실시간 임포트파일
		var dtnm_head = obj_this.attr('data-name-head'); if (dtnm_head === undefined) dtnm_head = '';		// 이름 앞 부분
		var dtnm_tail = obj_this.attr('data-name-tail'); if (dtnm_tail === undefined) dtnm_tail = '';		// 이름 뒷 부분
		var etc_info = obj_this.attr('data-etc'); etc_info = etc_info === undefined ? '' : btoa(etc_info);	// 기타설정
		obj_this.off('change'); obj_this.on('change', function(e) { /*console.log(obj_this.attr('name'), 'change, ', $(this));*/ _get_new_option($(this), callback1, callback2, callback_gno_data); });	// 첫 입력상자에 이벤트 등록
		var next_all = obj_this.nextAll('select.' + cls_name);	// 바로 옆에 있는 선택상자들 찾기
		if (next_all.length == 0) next_all = obj_this.parents('li.rtl-li-label').parents('ul').eq(0).find('select.-abncb');	// 없으면 li 로 감싸진 다음 상자들 찾기
		if (next_all.length > 0) step_by_step = 'N';	// 다음 단계의 선택상자가 이미 존재하는 경우 //console.log(csv);
		if (ctg_ilc[0] === 'N' && ctg_ilc[1] === 'A') {		// 선택 항목의 텍스트를 모두 저장하는 옵션인 경우, 주의 : ctg-end 값을 1 더해야 함!
			var ttsv_box = {'id':obj_this.attr('name') + '_all_name', 'name':dtnm_head + hid_name + '_all_name' + dtnm_tail};
			var obj_ctg_text_all = $('#hid_' + ttsv_box['id'], otwrap);
			if (obj_ctg_text_all.length <= 0) {
				obj_this.after('<input type="hidden" id="hid_' + ttsv_box['id'] + '" name="' + ttsv_box['name'] + '" value="" class="AB-text rtl-next-box">');	// 모든 텍스트를 저장하는 옵션
				obj_ctg_text_all = $('#hid_' + ttsv_box['id'], otwrap);
			}
			if (ctg_ilc[2] !== 'N') {
				ttsv_box = {'id':obj_this.attr('name') + '_name', 'name':dtnm_head + hid_name + '_name' + dtnm_tail};
				obj_ctg_text_first = $('#hid_' + ttsv_box['id'], otwrap);
				if (obj_ctg_text_first.length <= 0) {
					obj_this.after('<input type="hidden" id="hid_' + ttsv_box['id'] + '" name="' + ttsv_box['name'] + '" value="" class="AB-text rtl-next-box">');	// 첫번째 선택상자 텍스트를 저장하는 옵션
					obj_ctg_text_first = $('#hid_' + ttsv_box['id'], otwrap);
				}
			}
		}
		function _get_new_option(obj_chg, callback1, callback2, callback_gno_data) {	// change 이벤트가 발생되면 다음단계의 선택상자를 세팅하는 내부 함수
			if (obj_chg.attr('data-asv') !== undefined) {// 콜백등에서 임의로 선택을 바꾸고자 하는 경우 마크업된 data-asv 처리 (우동지에 사용)
				aba_asv = JSON.parse(obj_chg.attr('data-asv'));
				obj_chg.removeAttr('data-asv');
			}
			if (Object.keys(aba_asv).length === 0) {		// 자동저장기능에서 마크업된 data-asv 처리
				var aba_as = $('form .ABA-auto-save');
				var aba_as_dj = aba_as.attr('data-asv');
				if (aba_as.length > 0 && aba_as_dj !== undefined) aba_asv = JSON.parse(aba_as_dj); //console.log(aba_asv);
			}
			if (step_by_step === 'Y') {
				obj_chg.nextAll().remove('[class*=' + cls_name + ']');	// 선택한 상자 이후의 선택상자 제거
				obj_chg.parents('li').eq(0).nextAll().remove('[id^=rtl-li-]');
			} else {
				obj_chg.nextAll('[class*=' + cls_name + ']').val('');
			}
			var select_value = obj_chg.val();					// 선택값
			var next_depth, next_name, next_real_name;		// 다음단계, 다음단계 입력상자 이름을 저장할 변수
			var select_box_name = obj_chg.attr('name');		// 선택상자 이름
			var bd_name = obj_chg.attr('bd-name');				// 선택상자에 지정된 게시판 코드명
			if (bd_name === '_SV_') bd_name_src = bd_name = select_value;	// 게시판 코드명이 _SV_ 라면 선택된 값을 게시판 코드명으로 저장, bd_name_src 도 동시저장
			else bd_name = bd_name_src;							// 코드명이 없는경우 bd_name_src 값으로 저장
			var exp_box_name = select_box_name.split('_');	// 선택상자 이름을 분리 //console.log(cll_id, obj_chg);
			var obj_seq = $('select[-cll-id="' + cll_id + '"]', otwrap).index(obj_chg) + 1;	// 현재 선택상자의 순번 (단계가 아닌 것도 포함됨)
			var ctg_depth = exp_box_name.pop();					// 변경된 선택상자의 순번 파악용 (숫자가 아니면 단계 입력상자 아닌 첫 상자)
			if (isNaN(ctg_depth)) next_depth = 1;				// 다음단계 파악, 현재 선택상자가 단계가 아닌 경우 다음 단계는 1
			else next_depth = parseInt(ctg_depth) + 1;		// 현재 선택상자가 단계인 경우 단계 + 1
			var fn_itm_ttl = 'subject'; if (obj_this.attr('data-itm-ttl') !== undefined) fn_itm_ttl = obj_this.attr('data-itm-ttl');
			//console.log('rtimpt : ' + rtimpt + ', obj_seq : ' + obj_seq + ', ctg_depth : ' + ctg_depth + ', select_value : ' + select_value + ', next_depth : ' + next_depth + ', ctg_end : ' + ctg_end);
			var get_url; if (rtimpt !== undefined && rtimpt != '' && select_value != '') {
				var rcf = get_get_var(rtimpt);
				var rdf = obj_this.attr('data-rdf');
				get_url = './board/multi_select/ctg_chg_impt.ajax.php?SUBCALL=Y&pn=' + rtimpt + '&sv=' + select_value + '&bd=' + bd_name + '&rdf=' + rdf; //console.log(get_url);
				$.getJSON(get_url, function(data) { 	//console.log(data.cf);
					if (data.cf === 'X') data.cf = rdf; //console.log(rcf, data.cf);
					if (/*data.cf !== 'S' && */rcf !== data.cf) {
						var sParm = {};
						var doc = eval(obj_this.attr('doc') === undefined ? 'window' : obj_this.attr('doc'));
						if (obj_this.attr('data-loading-img') === 'Y') doc.$('#loading_img').loading_img({'cobj':obj_this});
						sParm[(hid_name.indexOf('SCH_') < 0 ? 'SCH_' : '') + hid_name] = (sch_header === undefined ? '' : sch_header) + select_value;
						sParm[rtimpt] = urlencode(data.cf);
						sParm['SUBCALL'] = 'Y';
						var load_info = jQuery.parseJSON(obj_this.attr('data-load-info'));
						load_info['load_url'] = set_url_parm(obj_this.attr('data-tu'), sParm); //console.log(load_info['load_url']);
						$.load_urls([load_info], doc, obj_this);
						form_jq.attr('chk_exist_box', 'N');
					}
				});
			}
			if (callback1 !== undefined) callback1({'v':vars, 'otwrap':otwrap, 'obj_this':obj_this, 'obj_chg':obj_chg, 'next_depth':next_depth, 'ctg_end':ctg_end});
			if (next_depth <= ctg_end) {											// 종료 단계보다 작거나 같으면 상자 추가 시도
				var next_depth_str = ctg_var_name.substr(ctg_var_name.length - 1, 1) === '_' ? next_depth.toString() : '';
				next_real_name = ctg_var_name + next_depth_str;	// 다음단계 입력상자 실제 이름 설정 (텍스트 저장 입력상자용)
				next_name = o_ctg_var_name === undefined ? exp_box_name.join('_') + '_' + next_depth_str : next_real_name;	// 다음단계 입력상자 이름이 지정되지 않은경우 첫 입력상자의 이름에 번호를 더해 설정 (함께체크할부분 : 게시물이동용 게시판선택 후 분류선택 상자 나오는..)
				ttsv_box = {'id':next_name + '_name', 'name':next_real_name + '_name' + dtnm_tail};
				get_url = next_url + '?SUBCALL=Y&bd_name=' + bd_name + '&first_box_name=' + first_box_name + '&select_box_name=' + select_box_name + '&select_value=' + select_value + '&ctg_src=' + ctg_src + '&ctg_ord=' + ctg_ord + '&etc_info=' + etc_info; //console.log(get_url);
				$.getJSON(get_url, function(data) {				//console.log(data);
					if (callback_gno_data !== undefined) {		// 다음단계 정보에 따른 콜백처리가 정의된 경우
						var cgd = callback_gno_data({'v':vars, 'otwrap':otwrap, 'obj_this':obj_this, 'obj_chg':obj_chg, 'next_depth':next_depth, 'ctg_end':ctg_end, 'data':data});
						if (cgd === false) return false;			// 콜백 결과가 false면 여기서 종료(다음단계 데이터를 받아 필요한 처리만 하고 종료, 우동지 시험문제 설정에서 활용)
					}
					var next_box, option_cnt = 0;
					$.each(data, function(key, val) { option_cnt++ });	// console.log(option_cnt, obj_chg.val());
					if (option_cnt > 0 && obj_chg.val() != '') {
						next_box = otwrap.find('select[name=' + next_name + ']');	// 자동저장 불러오기 선택시 change 이벤트가 한번 더 발생 하므로 두번째에는 생성하지 않고 option 만 갱신되어야 함
						if (next_box.length === 0 || next_box.attr('-cll-id') === undefined) {
							var clone_box = obj_chg.clone(true, true);	// 선택한 박스를 복사
							clone_box.addClass(cls_name);						// 식별용 클래스 추가
							clone_box.attr('name', next_name);				// name 값 변경
							clone_box.removeAttr('sel-tog-name'); if (next_depth_str == '') clone_box.off('change');	// 다음단계 상자에서 불필요한 속성 제거, 번호 없는 상자인 경우 이벤트 제거 //console.log(ctg_fld_cmt[obj_seq]);
							if (step_by_step === 'Y') {						// 다음선택상자들이 없는 경우 다음선택상자를 추가
								next_box = clone_box;
								if (typeof(ctg_fld_cmt) !== 'undefined' && ctg_fld_cmt[obj_seq] != '') {
									var T_nid = 'rtl-li-' + next_name; $('#' + T_nid, otwrap).remove();	// li를 넣고 안쪽 div 에 추가, 기존내용 있으면 제거(마지막단계체크박스인 경우의 중복 방지용)
									obj_chg.parents('li').eq(0).after('<li id="' + T_nid + '" class="rtl-li-label form-group checkbox"><label for="' + next_box.attr('id') + '" class="col-md-2 control-label except-toggle">' + ctg_fld_cmt[obj_seq] + '</label><div class="rtl-li-div -inputCheckRadio col-xs-12 col-sm-12 col-md-10"></div></li>');
									$('div', $('#' + T_nid)).append(next_box);
									ab_form_vi();
								} else {
									obj_chg.after(next_box);						// 복사하여 변경된 박스를 우측에 추가
								}
							} else {														// 있는 경우
								next_box = clone_box.replaceAll(next_box);	// 기존선택상자를 대체
							}
						}
						next_box.removeAttr('id').removeAttr('bd-name').removeAttr('next-url').removeAttr('ctg-src').removeAttr('ctg-var-name').removeAttr('next-url').removeAttr('ctg-end').removeAttr('ttl').removeAttr('sv').removeAttr('asv');
						next_box.attr('id', 'abncb_' + obj_this.attr('id') + '_' + next_name);		// id 값 세팅
						$('option', next_box).remove();	// 선택항목들 제거
						next_box.append($('<option></option>').attr('value', '').text(ctg_title[obj_seq]));
					}
					if (next_box !== undefined && ctg_ilc[0] === 'N' && ctg_ilc[1] === 'A' && obj_ctg_text_first !== undefined) {
						var obj_ctg_text = $('#hid_' + ttsv_box['id'], otwrap);
						if (obj_ctg_text.length <= 0) {
							obj_this.after('<input type="hidden" id="hid_' + ttsv_box['id'] + '" name="' + ttsv_box['name'] + '" value="" class="AB-text rtl-next-box">');	// 모든 텍스트를 저장하는 옵션
							obj_ctg_text = $('#hid_' + ttsv_box['id'], otwrap);
						}
					}
					if (option_cnt > 0 && obj_chg.val() != '') {
						if (next_depth == ctg_end && ctg_ilc[0] === 'Y') {	// 마지막단계 체크상자인 경우
							var i = 0;
							var asv_etc;
							var cbv_array = [];
							var cbv_str = cbv_etc_str = '';
							var asv = next_box.attr('asv');						// 자동저장값 불러오기
							if (asv === undefined && aba_asv[next_name] !== undefined) asv = aba_asv[next_name];
							var next_box_name = next_box.attr('name');
							var bnh_one_ctg = 'onectg_tmp_';
							if (next_box_name.substring(0, bnh_one_ctg.length) === bnh_one_ctg) next_box_name = next_box_name.substring(bnh_one_ctg.length);
							var obj_cbvi = $('input[name="' + next_box_name + '"]', otwrap);	// 체크한 값을 저장하는 입력상자
							var cnt_obj_cbvi = obj_cbvi.length;											// 존재여부 파악용
							if ((typeof(csv[obj_seq]) === 'string' && csv[obj_seq] != '') || asv !== undefined) {	// 저장된 값 세팅
								if (asv !== undefined) cbv_str = asv;	// 자동저장 값
								//else if (cnt_obj_cbvi > 0) cbv_str = obj_cbvi.val();		// db저장 값
								else cbv_str = csv[obj_seq + 1];			// db저장 값
								cbv_array = cbv_str.substr(1, cbv_str.length-2).split(';');	// 저장 값을 배열로 불러옴
								csv[obj_seq] = '';
							}
							if (cnt_obj_cbvi > 0 && obj_cbvi.attr('type') === 'text' && obj_cbvi.val() != '') {
								cbv_str = obj_cbvi.val();				// 선택값이 text(보이는, hidden 아닌) 입력상자라면 상위 선택을 바꿀 때 체크상자 값이 유지되어야 하므로 이미 선택된 값들을 유지시킴 (지게차 품목관리에서 활용)
								cbv_array = cbv_str.substr(1, cbv_str.length-2).split(';');
							}
							if (ctg_ilc[1] === 'A' && obj_ctg_text_first !== undefined) {	// 라벨값도 함께 저장하는 옵션인 경우
								var obj_csn = $('input[name="' + ttsv_box['name'] + '"]', otwrap);	// 체크한 라벨값을 저장하는 입력상자
								var cnt_obj_csn = obj_csn.length;			// 존재여부 파악용
								if (cnt_obj_csn > 0) asv_etc = obj_csn.attr('asv');			// 자동저장값 불러옴
								if ((typeof(csv_etc[obj_seq]) === 'string' && csv_etc[obj_seq] != '') || asv_etc !== undefined) {	// 저장된 값 세팅
									if (asv_etc !== undefined) cbv_etc_str = asv_etc;
									else cbv_etc_str = csv_etc[obj_seq];	// db저장된 값
									csv_etc[obj_seq] = '';
								}
								if (cnt_obj_csn > 0 && obj_csn.attr('type') === 'text' && obj_csn.val() != '') cbv_etc_str = obj_csn.val(); // 상위 선택을 바꿔도 값 유지 (상동)
							}
							$.each(data, function(key, val) {
								key = key.substr(1, key.length);
								var T_id = 'rtl-chk-' + next_box_name + '_' + key;
								var T_checked = in_array((ctg_ilc[1] !== 'T' ? key : val[fn_itm_ttl]), cbv_array) ? ' checked="checked"' : '';
								next_box.after('<li class="col-xs-12 col-sm-6 col-md-3"><input type="checkbox" id="' + T_id + '" name="' + next_box_name + '_multi[]" value="' + key + '" onchange="multi_check(this.form,\'' + next_box_name + '_multi\',\'' + next_box_name + '\',\';\', this, \'' + cbv_str + '\', \'' + ctg_ilc[1] + '\', \'' + cbv_etc_str + '\')" class="AB-checkbox rtl-next-box"' + T_checked + '><label for="' + T_id + '"><span>' + val[fn_itm_ttl] + '</span></label></li>');
								i++;
							});
							if (cnt_obj_cbvi <= 0) {
								next_box.after('<input type="hidden" id="hid_' + next_box_name + '" name="' + next_box_name + '" value="' + cbv_str + '" class="rtl-next-box">');
								obj_cbvi = $('input[name="' + next_box_name + '"]', otwrap);			// 체크한 값을 저장하는 입력상자
							}
							if (ctg_ilc[1] === 'A' && cnt_obj_csn <= 0 && obj_ctg_text_first !== undefined) obj_cbvi.after('<p class="wrap_' + ttsv_box['id'] + '"><input type="hidden" id="hid_' + ttsv_box['id'] + '" name="' + ttsv_box['name'] + '" value="' + cbv_etc_str + '" class="AB-text rtl-next-box"></p>');
							next_box.parents('div').eq(0).wrapInner('<ul class="rtl-next-box-wrap row"></ul>');
							next_box.remove(); next_box = $('input[type="checkbox"].rtl-next-box', otwrap);	next_box.trigger('change'); // select 박스 제거, next 박스 재설정 및 체크 상태 적용
							$('body').set_icr({});
						} else {
							$.each(data, function(key, val) {next_box.append($('<option></option>').attr('value', key.substr(1, key.length)).text(val[fn_itm_ttl]));});	// 넘겨받은 데이터로 항목 추가
							var asv = next_box.attr('asv');
							if (asv === undefined && aba_asv[next_name] !== undefined) asv = aba_asv[next_name];
							if ((typeof(csv[obj_seq]) === 'string' && csv[obj_seq] != '') || asv !== undefined) { //console.log(asv, obj_seq, csv[obj_seq]);
								if (asv !== undefined) next_box.val(asv);
								else next_box.val(csv[obj_seq]);
								csv[obj_seq] = '';
								next_box.trigger('change');
							}
						}
					}
					if (callback2 !== undefined) callback2({'v':vars, 'otwrap':otwrap, 'next_box':next_box, 'data':data, 'option_cnt':option_cnt, 'obj_this':obj_this, 'obj_chg':obj_chg, 'next_depth':next_depth, 'ctg_end':ctg_end});
					if (ctg_opt !== undefined && ctg_opt.om !== undefined) {	// 지정된 분류 하위만 선택가능하도록 하는 옵션
						var rm_idx = -1;
						for (var i=ctg_opt.ctgr.length+ctg_opt.ctgl; i<=ctg_opt.om.length; i+=ctg_opt.ctgl) rm_idx++;
						if ($('select[name^="onectg_tmp_"]', otwrap).index(obj_chg) <= rm_idx && obj_chg.val() != '') obj_chg.css('display', 'none');
					}
				});
			}
			if (ctg_ilc[0] === 'N' && ctg_ilc[1] === 'A') {						// 선택값의 텍스트를 저장하는 옵션인 경우
				var ctg_text_arr = [];
				var txt = $('option:selected', obj_this).text();
				if (obj_ctg_text_first !== undefined) obj_ctg_text_first.val(txt);
				ctg_text_arr.push(txt);
				$('.' + cls_name, otwrap).each(function(i) {
					txt = $('option[value!=""]:selected', $(this)).text();
					$('#hid_' + $(this).attr('name') + '_name', otwrap).val(txt);
					if (txt != '') ctg_text_arr.push(txt);
				});
				obj_ctg_text_all.val(ctg_text_arr.join(' '));
			}
		}
		if (obj_this.val() != '') obj_this.trigger('change');					// 이벤트 한번 실행
		if (callback3 !== undefined) callback3({'v':vars, 'otwrap':otwrap});
		return arguments;
	}
	
	// 이미지 자동으로 줄이기
	// TD는 안에 큰 이미지가 들어간 경우 늘어난 크기가 파악되어 비교 불가함, 하여 편의상 내부의 모든 이미지를 사이즈 조정 함.
	$.fn.img_resize_inner = function() {
		var obj_this = this;
		var resize_width = this.attr('resize-width');
		obj_this.each(function(index) {
			var tag_name = $(this).prop('tagName');
			var box_width = parseInt($(this).css('width').replace('px', ''));
			$('img', $(this)).each(function(index) {
				if (parseInt($(this).css('width').replace('px', '')) > box_width || obj_this.attr('resize-force') === 'Y' || tag_name === 'TD') {
					$(this).attr('width', resize_width);
					$(this).removeAttr('height').css({'width':'','height':''});
				}
			});
		});
	}

	// 선택상자의 값이 바뀔 때 지정된 객체를 toggle 시키는 함수
	// <select ... id="-chg-estm-type" sel-tog-name="-sel-tog">...</select>
	// 호출 예) $("#-estm-step-1").change_toggle_input({});
	// toggle 대상에 class="-sel-tog" 를 마크업하고 -sel-tog 속성을 아래와 같이 지정한다.
	// -sel-tog="only:[category_1]:add,reply" -> 선택상자의 값이 add, reply 일 때만 노출
	// -sel-tog="except:[category_1]:add,reply" -> 선택상자의 값이 add, reply 가 아닐 때만 노출
	// 같은 이름의 입력상자 중복을 방지하기 위해 display:none 되는 객체의 html 을 보관(처음 한 번만, is_first 가 Y 일 때) 하고 html 을 제거 한다.
	// 다시 display 되는 객체의 html 은 form_html_copy 의 html 로 복원한다.
	// 본 함수가 실행되면 존재하지 않는 필수 입력상자 체크를 패스하고, 존재하지 않는 입력상자의 값이 제거 되도록 설정된다.
	// vars.clone : N 이면 복제/삭제 복원 과정없이 단순 노출만 작용/토글 대상에 자동완성기능등이 사용된 경우 사용하되 같은 이름의 입력상자가 없어야 함!!!
	// vars.fInit : Y 이면 매번 강제로 clone (목록의 수정버튼을 다이얼로그로 띄우고 그 안에서 본 함수를 호출할 때 필요)
	// vars.fmf : X 이면 강제수정할필드 지정하지 않음 (감춰진 입력상자의 값 변경을 원하지 않을때 필요)
	var form_html_copy = {};
	$.fn.change_toggle_input = function(vars, callback) {
		if ($(this).length > 0) {obj_this = $(this);} else {return;}
		var is_first = 'N';
		var form_jq = obj_this.parents('form');
		var wrap_cti = form_jq;
		if (vars.wrap_cti !== undefined) wrap_cti = obj_this.parents(vars.wrap_cti).eq(0);
		var class_name = obj_this.attr('sel-tog-name');
		if (class_name === undefined) class_name = '-sel-tog';	// 이름이 지정되지 않은 경우 -sel-tog 를 지정
		var obj_sel_tog = form_jq.find('.' + class_name);
		var force_modify_fld = new Array;
		if (form_html_copy[class_name] === undefined || vars.fInit === 'Y') {
			var T_array = [];
			obj_sel_tog.each(function(i) { T_array[i] = $(this).clone(true); });
			form_html_copy[class_name] = T_array;
			is_first = 'Y';
		}
		var obj_this_value;
		if (obj_this.length === 1) obj_this_value = obj_this.val();
		else if (obj_this.length > 1) obj_this.each(function(i) { if ($(this).is(':checked')) obj_this_value = $(this).val(); });	// 라디오 버튼인 경우
		if (obj_this.is(':visible') || vars.visb === 'Y') {
			obj_sel_tog.each(function(idx) {
				var ost = $(this).attr(class_name);
				if (ost === undefined) ost = $(this).attr('-sel-tog');
				var exp_sel_tog = ost.split(':');
				if (exp_sel_tog[1] != '' && obj_this.attr('name') != exp_sel_tog[1]) {		// 호출한 입력상자와 다른 입력상자 이름이 지정된 경우 다른 입력상자의 값을 찾아 설정함
					if (class_name === '-sel-tog') {
						return;
					} else {
						var obj_chk = $('*[name=' + exp_sel_tog[1] + ']', form_jq);
						if (obj_chk.length === 1) obj_this_value = obj_chk.val();
						else if (obj_chk.length > 1) obj_chk.each(function(i) { if ($(this).is(':checked')) obj_this_value = $(this).val(); });
						else return;
					}
				}
				var exp_sel_tog_targ = exp_sel_tog[2].split(',');
				if (exp_sel_tog[0] === 'only') {
					if (in_array(obj_this_value, exp_sel_tog_targ)) {
						$(this).css('display', '');
						if (is_first !== 'Y') {
							if (vars.clone !== 'N') $(this).html(form_html_copy[class_name][idx].html());
							else {
								var obj_html_editor = $('textarea[id^="oEdit-"]', $(this));
								if (obj_html_editor.length > 0) ab_editor_refresh(obj_html_editor);
							}
						}
					} else {
						$(this).css('display', 'none');
						if (vars.fmf !== 'X') {
							$("input,select", $(this)).each(function(i) {
								var T_name = $(this).attr('name');
								if (T_name !== undefined) { T_name.replace(/[A-Z]+[0-9]{1}_/, ''); if (T_name.indexOf('[]') < 0) force_modify_fld.push(T_name); }
							});
						}
						if (vars.clone !== 'N') $(this).html('');
					}
				} else {
					if (!in_array(obj_this_value, exp_sel_tog_targ)) {
						$(this).css('display', '');
						if (is_first !== 'Y') {
							if (vars.clone !== 'N') $(this).html(form_html_copy[class_name][idx].html());
							else {
								var obj_html_editor = $('textarea[id^="oEdit-"]', $(this));
								if (obj_html_editor.length > 0) ab_editor_refresh(obj_html_editor);
							}
						}
					} else {
						$(this).css('display', 'none');
						if (vars.fmf !== 'X') {
							$("input,select", $(this)).each(function(i) {
								var T_name = $(this).attr('name');
								if (T_name !== undefined) { T_name.replace(/[A-Z]+[0-9]{1}_/, ''); if (T_name.indexOf('[]') < 0) force_modify_fld.push(T_name); }
							});
						}
						if (vars.clone !== 'N') $(this).html('');
					}
				}
			});
			force_modify_fld = array_unique(force_modify_fld);
			var obj_fmf = form_jq.children('input[name=force_modify_fld]');
			if (obj_fmf.length <= 0) form_jq.prepend('<input type="hidden" name="force_modify_fld" value="" />');
			obj_fmf = form_jq.children('input[name=force_modify_fld]');
			obj_fmf.val(force_modify_fld.join(','));
			form_jq.attr('chk_exist_box', 'N');		// 존재하지 않는 필수입력상자 체크를 패스 하도록 설정
			if (vars.rexc === 'Y') refresh_exec();
		} else {
			obj_sel_tog.css('display', 'none');		// 토글 상자가 보이지 않는 상황이면 토글 대상도 모두 감춤
		}
		if (callback !== undefined) callback({'otv':obj_this_value});
	}

	// 클릭된 객체에 저장된 값을 지정한 입력상자에 채워주는 함수
	// 쇼핑몰 나의 배송지 주소 관리에 사용됨(배송지 주소로 선택한 것을 입력 상자들에 설정)
	// 여러 체크를 선택할 때는 버튼주소에 &mode=M 을 넘겨주고 목록에서 적절히 처리
	// 목록 라디오(체크상자) 마크업 : tbv="입력상자1에 들어갈 값;;;입력상자2에 들어갈 값;;;..."
	// 목록 스크립트 예1 : $('.dialog_chk_record').set_value_targ_box({targ_doc:document, form_id:'TCBOARD_ABS_sell_WRITE_index1', input_boxs:['sell_receiver_name','PHONE1_sell_receiver_mobile',...], join:',', bracket:''});
	// 목록 스크립트 예2 : $('.dialog_chk_record').set_value_targ_box({targ_doc:document, form_id:'{AY__SESSION[_GET][frm]}', input_boxs:[{AY__SESSION[_GET][ibs]//BD//1}], rm_dup:'Y', join:',', bracket:''});
	// 버튼 종류를 '게시물찾기'로 선택 해야 함!(버튼 마크업 내용이 get 변수로 전달+세션저장 위해)
	// 버튼 마크업(필수는 아니지만 공용으로 목록을 사용할 때, 스크립트 예2 와 같이 활용) : ibs="'입력상자1이름'" bd="TCMEMBER" frm="TCBOARD_TCSYSTEM_board_list_MODIFY_index24"
	// 체크상자는 하나의 입력상자에 구분자를 이용하여 여러 값을 입력 하는 방식이므로 중복값이 없어야 함, 특히 여러 입력상자의 경우 첫번째 입력상자는 중복값이 없는 필드를 사용해야 함!
	// 자료 구조상 체크가 해제될 때 제거해야 할 값의 순위를 찾아야 하는데 첫번째 입력상자일 때 파악을 하며 해제된 값과 같은 마지막 순위를 제거 순위로 잡게 되므로 중복 값이 있는 경우 엉뚱한 값이 제거될 가능성 있으니 주의 할 것
	// 라디어버튼인 경우 기존 값을 지우고 추가할 수 있도록 하려면 csv에 기존 값의 개수를 넣어주면 추가를 제한 할 수 있음
	// 라디오버튼에 구분자를 설정하고 rm_dup='N' 이면 중복된 값을 계속 넣을 수 있음
	$.fn.set_value_targ_box = function(vars, callback) {
		if (this.length <= 0) return false;
		var fcsv;
		var this_obj = this;	// 클릭할 라디오(또는 체크상자들)
		var join = vars.join === undefined ? ';' : (vars.join !== 'X' ? vars.join : '');
		var bracket = vars.bracket === undefined ? ';' :  (vars.bracket !== 'X' ? vars.bracket : '');
		var form_parent = $('#' + vars.form_id, vars.targ_doc);	// 목록을 연 버튼의 폼 (부모폼)
		var obj_fcsv = form_parent.find('*[name=' + vars.input_boxs[0] + ']');	// for check saved value
		if (obj_fcsv.length === 0) form_parent.append('<input type="hidden" name="' + vars.input_boxs[0] + '">');	// 첫번째 입력상자 없으면 임의로 만듬
		var obj_type = obj_fcsv.attr('type');
		if (obj_type === 'radio' || obj_type === 'checkbox') {	// 첫번째 입력상자가 라디오 또는 체크상자인 경우
			var fcsv_a = new Array;
			obj_fcsv.each(function(idx) { if ($(this).is(':checked')) fcsv_a.push($(this).val()); });
			fcsv = bracket + fcsv_a.join(join) + bracket;
		} else {
			fcsv = obj_fcsv.val();
		}
		if (fcsv != '' && join != '') fcsv = fcsv.split(join);
		$.each(this_obj, function(idx) {									// 출력되는 라디오 또는 체크상자 만큼 반복
			var exp_value = $(this).attr('tbv').split(';;;');		// 저장값 파악하여 체크!
			if (join != '') { if (in_array(exp_value[0], fcsv)) $(this).prop('checked', true).next('label').attr('disabled', 'disabled'); } else { if (exp_value[0] != '' && exp_value[0] === fcsv) $(this).prop('checked', true).next('label').attr('disabled', 'disabled'); }
		});
		this_obj.off('change');
		this_obj.on('change', function(e) {
			if ($(this).attr('type') === 'radio' && vars.csv > 0) { alert_core(vars.msg_csv); $(this).prop('checked', false); return; }
			_set_value($(this));
		});
		$('body').off('click', '.AB-del-svtb');
		$('body').on('click', '.AB-del-svtb', function(e) {	// 목록의 기본타입 삭제버튼 클릭시
			var del_idx, del_val;										// 삭제할 배열의 index와 값
			var form_this = $(this).parents('form');
			var all_del_svtb = $('.AB-del-svtb', form_this);	// 모든 삭제 버튼 (원본줄 포함 / 줄은 유지되고 값만 삭제)
			var uvnv = $('*[name="' + $(this).attr('data-uvn') + '"]').val();	// 고유값 저장 입력상자 이름 (extend.js $.estm_tr() 에서 세팅 됨)
			var del_btn_idx = all_del_svtb.index($(this));
			if (uvnv != '' && bracket != '') uvnv = uvnv.substr(1, uvnv.length - 2);	// bracket 제거
			if (uvnv != '' && join != '') {
				uvnv = uvnv.split(join);	// 고유값 입력상자의 값을 파악하여 삭제할 값과 비교하여 배열 번호를 찾음
				for (var i_arr in uvnv) if (uvnv[i_arr] == $(this).attr('data-tv') && (i_arr == del_btn_idx || vars.dbi === 'N')) { del_val = uvnv[i_arr]; del_idx = i_arr; }
			}
			if ($(this).hasClass('AB-del-tr') && uvnv.length > 1 && del_idx == 0) return false;	// 원본줄 삭제는 마지막에 가능
			var all_dmb = $('*[data-dmb]', form_this);	// 값이 세팅되는 모든 모든 입력상자를 찾아
			all_dmb.each(function(i) {
				if (join == '') $(this).val('');		// 하나만 입력되는 경우 모두 삭제
				else {
					var dmbv = $(this).val();			// 저장된 값을 배열로 만들고
					if (dmbv != '' && bracket != '') dmbv = dmbv.substr(1, dmbv.length - 2);
					dmbv = dmbv.split(join).filter(function(value, idx){return idx != del_idx});	// 삭제할 인덱스 빼고 새로 저장
					var result = dmbv.join(join);
					if (result != '') result = bracket + result + bracket;
					$(this).val(result);
				}
				$(this).change();
			});
			if (this_obj.eq(0).attr('type') === 'radio') this_obj.next('label').removeAttr('disabled');	// 라디오버튼인 경우 disabled 모두 제거
			if (del_val !== undefined && del_idx !== undefined) $('input[tbv^="' + del_val + ';;;"]').prop('checked', false).next('label').removeAttr('disabled');
		});
		
		function _set_value(obj) {
			var objs, obj_targ = tidx = '';			// 체크상자들, 클릭한 체크상자, 체크해제시 몇번째 값을 제거할지 기록되는 변수
			var obj_name = obj.attr('name');			// 클릭한 라디오/체크상자 이름
			var form_this = obj.parents('form');	// 목록의 폼
			if (obj_name === undefined) objs = obj;	// 클릭가능한 요소들(모든 라디오, 즉 레코드 만큼)을 객체로 얻음(다중체크를 위해서 필요하지만 이름이 없으면 하나만 처리로 간주)
			else objs = $(obj.prop('tagName') + '[name="' + obj_name + '"]', form_this);
			var tsv = obj.attr('tbv').split(';;;');	// 체크하면 기록될 값
			$.each(vars.input_boxs, function(idx, box_name) {	// 선택한 정보가 적용될 입력상자 수 만큼 반복
				var result = '';
				var objs_val = [];
				if (typeof(box_name) === 'object') obj_targ = $(box_name);
				else obj_targ = form_parent.find('*[name=' + box_name + ']');
				var fsv = obj_targ.val();				// 이번 입력상자에 입력되어 있는 값
				if (fsv != '' && bracket != '') {
					if (fsv.substr(0, 1) === bracket) fsv = fsv.substr(1, fsv.length);					// 앞 bracket 제거
					if (fsv.substr(fsv.length-1, 1) === bracket) fsv = fsv.substr(0, fsv.length-1);	// 뒤 bracket 제거
				}
				if (fsv != '' && join != '') {		// 입력상자에 값이 있고 여러 값이 구분자로 들어가는 경우 (라디오냐 체크냐 와는 별개임)
					fsv = fsv.split(join);				// 체크 해제인 경우 제거하고 나머지를 배열로 저장, 체크된 항목과 합침
					if (idx === 0 && obj.is(':checked') === false) for (var i_arr in fsv) if (fsv[i_arr] == tsv[idx]) tidx = i_arr;	// 체크해제시 제거될 값이 몇 번째 인지 파악
					fsv = fsv.filter(function(value, f_idx){return f_idx != tidx || obj.is(':checked') === true});	// 해당 되는 순서 제거 (체크해제라면)
				}
				if (obj.is(':checked') === true) {	// 체크인 경우
					if (join == '') fsv = [];			// 여러 값이 구분자로 들어가지 않는 조건이면 저장값 제거
					else {									// 여러 값이 구분자로 들어가는 조건이면
						if (idx === 0 && vars.rm_dup !== 'N' && in_array(tsv[idx], fsv)) {	// 중복 불허 조건 + 중복인 경우 패스
							if (vars.dup_msg !== undefined && vars.dup_msg != '') alert_core(vars.dup_msg);	// 메시지 옵션 출력
							return false;
						}
					}
					objs_val.push(tsv[idx]);			// 현재 체크된 레코드중에서 입력상자 순번에 맞는 값 세팅
				}
				if (fsv != '' && fsv.length > 0 && join != '') objs_val = fsv.concat(objs_val);	// 입력상자에 있는 값과 현재 선택된 값을 합침
				if (objs_val.length > 0) result = bracket + objs_val.join(join) + bracket;			// 입력할 내용이 있는 경우 세팅
				var obj_type = obj_targ.attr('type');
				if (obj_type === 'radio' || obj_type === 'checkbox') {	// 입력상자가 라디오 또는 체크인 경우
					obj_targ.prop('checked', false);								// 모두 체크 해제 한 후 세팅된 값에 맞는 것만 체크
					obj_targ.each(function(idx) {
						if (obj_type === 'radio') if ($(this).val() === result) $(this).prop('checked', true);
						else if (in_array($(this).val(), objs_val)) $(this).prop('checked', true);
					});
					$('body').set_icr({});	// 체크, 라디오 모양 재세팅
				} else {							// 그외 입력상자인 경우
					obj_targ.val(result);	// 값 반영	
				}
				obj_targ.trigger('change');
			});
			if (this_obj.eq(0).attr('type') === 'radio') this_obj.next('label').removeAttr('disabled');	// 라디오버튼인 경우 disabled 모두 제거
			if (obj.is(':checked') === true) obj.next('label').attr('disabled', 'disabled');
			else obj.next('label').removeAttr('disabled');
			if (callback !== undefined) callback({fp:form_parent,v:vars,o:obj});
		}
	}
	
	// 직접입력과 선택을 처리할 수 있도록 하는 함수
	// select 상자 마크업 예) class="AB-select AB-sel-input" id="subject-select" data-sel-input-name="subject" data-sel-input-value="저장값" data-chg-event="X"
	$.fn.ab_sel_input = function(vars) {
		var ab_sel_input = $('.AB-sel-input');
		if (ab_sel_input.length > 0) {
			ab_sel_input.each(function(idx) {
				var obj_si = $(this);
				var obj_input = $('#' + obj_si.attr('data-sel-input-name'));
				var obj_sv = obj_si.attr('data-sel-input-value'); if (obj_sv === undefined) obj_sv = ''; if (obj_sv != '' && obj_si.val() == '') obj_si.val('--dierct-input--');
				var obj_input_wrap = obj_input.parents('.-wrap-si');
				_sel_input(obj_si, obj_input, obj_input_wrap, obj_sv);
				obj_si.off('change'); obj_si.on('change', function(e) { _sel_input($(this), obj_input, obj_input_wrap, obj_sv); });
			});
			function _sel_input(ot, oi, oiw, osv) {
				var val = ot.val();
				if (val === '--dierct-input--') {
					oi.val(osv);
					if (oiw.length > 0) oiw.css('display', '');
					else oi.css('display', '');
				} else {
					oi.val(val);
					if (oiw.length > 0) oiw.css('display', 'none');
					else oi.css('display', 'none');
				}
				if (ot.attr('data-chg-event') !== 'X') oi.trigger('change');
			}
		}
	}
	
	// 현재 마우스가 올라간 영역의 입력상자만 활성화 시키고 다른 곳은 비활성화 시킴
	// $('tr.AB-out-disabled').enable_over_wrap({}); ==> 마우스올린 tr 만 비활성화, 디비원 광고관리 목록 상태변경 에서 사용
	$.fn.enable_over_wrap = function(vars, callback) {
		var this_selector = this.selector;
		$('input,select,textarea', this_selector).prop('disabled', true).addClass('AB-disabled');
		$('body').on('mouseenter', this_selector, function(e) {
			$('input,select,textarea', this_selector).prop('disabled', true).addClass('AB-disabled');
			$('input,select,textarea', $(this)).prop('disabled', false).removeClass('AB-disabled');
			if (callback !== undefined) callback($(this), this_selector);
		});
	}
	
	// 링크 페이지를 원하는 영역에 불러오는 함수
	// 원하는 내용만 가져울 수 있고 여러 페이지를 각 영역에 불러올 수 있다.
	// a 태그에 아래와 같은 속성들이 마크업이 되어 있어야 한다.
	// href="ab-1123-3" ajax="Y" ajax_area="ajax_board_1" return_area="ajax_board_view" anchor="ABA-read-top,-50,1000,N" load_info='{"0":{"load_url":"ab-1125-{AV_serial_num}","ajax_area":"ajax_board_2"},"1":{"load_url":"ab-1123-{AV_serial_num}","ajax_area":"ajax_board_wf","return_area":"ajax_board_view"}}'
	// ajax_area="_mytrbottom_" 인 경우 tr 아래에 영역이 생김 (오픈된 걸 클릭할 때 행동 data-ocm="S:본인것만닫기,C:모두닫기,X:동작없음")
	// load_info 값 안의 큰 따옴표는 &quot; 로 대체하고 큰 따옴표로 감싸주는 것이 제대로 된 방법!
	$.load_urls = function(json_arr, doc, obj_this) {
		var li, load_url;
		$.each(json_arr, function(idx, li) {
			li.ot = obj_this;
			if (li.doc !== undefined) doc = eval(li.doc);
			var ajax_area_wrap = '---' + li.ajax_area.replace(/[^a-zA-Z0-9_\-]/g, '') + '---';
			if (li.ajax_area === '_td_' || li.ajax_area === '_pd_') {
				if (li.ajax_area === '_td_') li.ajax_area = $('.sitecook-dialog', obj_this.parents('div')).attr('id');
				else if (li.ajax_area === '_pd_') li.ajax_area = $('.sitecook-dialog', obj_this.parents('div')).parents('div.ui-dialog').prevAll('div.ui-dialog').eq(0).children('.sitecook-dialog').attr('id');
				if (li.ajax_area === undefined) li.ajax_area = 'AB_contents';
			} else if (li.ajax_area === '_mytrbottom_') {
				var d = new Date();
				var ocm = obj_this.attr('data-ocm');
				var my_tbl = obj_this.parents('table').eq(0), all_tr = $('>tbody>tr', my_tbl), my_tr = obj_this.parents('tr').eq(0);
				if (my_tr.attr('id') === undefined) all_tr.each(function(i) { $(this).attr('id', d.getTime().toString() + '-' + all_tr.index($(this)).toString()) });
				mti = my_tr.attr('id'), mtd = $('>td:visible', my_tr), mtdc = mtd.length;
				var idx_tr = '_rttr_' + mti, idx_div = '_mytrbottom_' + mti;
				if (my_tr.hasClass('-open')) {		// 오픈된 걸 클릭한 경우 닫기 대상 파악하여 처리
					var rttr = $('#' + idx_tr), parent_tr = rttr.prev();
					if (ocm === 'S') { rttr.remove(); my_tr.removeClass('-open'); }
					else if (ocm === 'X') { }
					else { $('._rttr_', my_tbl).remove(); all_tr.removeClass('-open'); }
					doc.$('#loading_img').loading_img({'cobj':li, 'off':'Y'});
					return;
				} else {										// 오픈되지 않은걸 클릭한 경우 모두 닫기만 닫기 처리하고 클릭한 대상 열기
					$('#---_mytrbottom_---', my_tbl).children().unwrap();
					if (ocm === 'C') { $('._rttr_', my_tbl).remove(); all_tr.removeClass('-open'); }
					my_tr.addClass('-open').after('<tr id="' + idx_tr + '" class="_rttr_" style="display:none;"><td colspan="' + mtdc + '"><div id="' + idx_div + '"></div></td></tr>');
					li.callback = "$('#" + idx_tr + "').css('display', '');";
					li.ajax_area = idx_div;
				}
			}
			if (li.ajax_area === 'AB_contents' || li.ajax_area === undefined || li.ajax_area === 'undefined' || li.ajax_area == '') {
				ajax_area_wrap = 'AB_contents';
			} else if (li.ajax_area.substr(0, 13) === 'global_dialog') {
				if (li.ajax_area.indexOf(' ') > -1) {	// #global_dialog idname 형태인경우
					if (doc.$('#' + ajax_area_wrap).length <= 0) doc.$('#' + li.ajax_area).wrap('<div id="' + ajax_area_wrap + '"></div>');
				} else {
					ajax_area_wrap = li.ajax_area;
				}
			} else {
				//console.log(li.ajax_area);
				if (doc.$('#' + ajax_area_wrap).length <= 0) doc.$('#' + li.ajax_area).wrap('<div id="' + ajax_area_wrap + '"></div>');		// 지정된 로딩 영역에 ajax 로딩 할 수 있도록 감싸준다.
			}
			if (li.mode === 'G') {
				$.get(li.load_url, function(data) {
					//console.log(data);
					var alert_msg = get_alert_msg_in_result(data);					// 경고 메시지 있으면 출력
					if (alert_msg != 'null') after_submit_cancel(alert_msg);
					if (data.indexOf('history.go(') < 0) {								// 뒤로 이동 인 경우 load 안함
						if (data.indexOf('window.close();') < 0) {
							li.load_url = get_move_url_in_result(data);				// 이동할 url
							$.load_url(li, doc, ajax_area_wrap);
						}
					}
				});
			} else if (li.mode === 'P') {
				var postd = li.post;
				if (typeof(postd) === 'string') {
					var fst = postd.substr(0, 1);
					if (fst === '#') {
						var objpd = $(postd);
						if (objpd.prop('tagName') !== 'FORM') {
							var objpd_frm = objpd.find('form');
							if (objpd_frm.length > 0) objpd = objpd_frm
							else {
								var T_clone = objpd.clone(); $('body').append(T_clone);
								T_clone.wrapInner('<form id="' + postd.substr(1, postd.length) + '_rtfrm"></form>').css('display', 'none');
								objpd = $(postd + '_rtfrm');	//console.log(postd.substr(1, postd.length), T_clone, objpd);// return;
							}
						}
						postd = objpd.serialize();				//console.log(postd);
					}
				}
				$.post(li.load_url, postd, function(data) {
					//console.log(data);
					var alert_msg = get_alert_msg_in_result(data);					// 경고 메시지 있으면 출력
					if (alert_msg != 'null') after_submit_cancel(alert_msg);
					if (data.indexOf('history.go(') < 0) {								// 뒤로 이동 인 경우 load 안함
						if (data.indexOf('window.close();') < 0) {
							li.data = data; li.load_url = get_move_url_in_result(data);				// 이동할 url
							$.load_url(li, doc, ajax_area_wrap);
						}
					}
				});
			} else {
				$.load_url(li, doc, ajax_area_wrap);
			}
		});
	}
	
	$.load_url = function(li, doc, aaw) {
		//console.log(aaw);
		var nm_aaw_history = aaw + '_history';
		if (li.load_url === '#historyback') {
			li.dialog = 'Y';
			li.load_url = get_ajax_history(nm_aaw_history);
			//console.log(li.load_url);
		}
		//console.log(load_url);
		//console.log(eval(nm_aaw_history));
		//li.load_type = 'G';
		if (li.load_type === 'H') {	// 페이지 이동(url 없으면 로딩중 표시기만 제거되는 용도로도 활용)
			if (li.load_confirm !== undefined && li.load_confirm !== 'undefined' && li.load_confirm != '') {
				var iscs = 'N';
				alert_core(li.load_confirm, {}, function() { }, function() {
					doc.$('#loading_img').loading_img({'cobj':li, 'off':'Y'});
					iscs = 'Y';
				});
				if (iscs === 'Y') return false;
			}//console.log(li);
			if (li.load_url != 'null') {
				doc.location.href = li.load_url;
			} else {
				//console.log(li.callback);
				if (li.callback !== undefined) eval(li.callback);
				if (li.refresh !== 'Y') doc.$('#loading_img').loading_img({'cobj':li, 'off':'Y'});
				else document.location.reload(); return;
			}
		} else {
			var obj_aaw = doc.$('#' + aaw);
			var load_url = set_url_tail(li.load_url, 'AJAX=Y', 'Y', 'N', 'X', 'Y');
			if (li.load_type === 'L') {		// 하나의 id를 리턴영역으로 지정(스크립트 제거됨)
				if (li.return_area !== undefined && li.return_area !== 'undefined' && li.return_area != '') load_url += ' #' + li.return_area;
				obj_aaw.load(load_url, function() { $(this).after_load({'doc':doc,'li':li,'nm_aaw_history':nm_aaw_history,'aaw':aaw}); });
			} else {									// (복수) 선택자로 리턴영역 지정(스크립트 유지, 제거 선택 가능)
				$.get(load_url, {}, function(data) {
					//console.log(data);
					//console.log(li.load_type, li.keep_script === 'Y' ? true : false, li.return_area);
					var scts = [];
					var tag = $.parseHTML(data, document, li.keep_script === 'Y' ? true : false);
					//console.log(tag);
					if (li.keep_script === 'Y') {				// 스크립트를 사용하는 옵션이면
						for (var i=0; i<tag.length; i++) {	// 불러온 태그들 중에
							var sct = $(tag[i]);
							if (sct.prop('tagName') === 'SCRIPT') {	// 스크립트를 찾아서 배열에 담는다
								if (li.sel_script !== undefined && li.sel_script !== 'undefined' && li.sel_script != '') {
									if (sct.hasClass(li.sel_script)) scts.push(tag[i]);	// 지정한 클래스 마크업된 스크립트만 반영
								} else {																	// 지정안한 경우
									scts.push(tag[i]);												// 모든 스크립트 반영
								}
								tag[i] = '';															// 태그에서 제거
							}
						}
					}
					//console.log(tag.concat(scts));
					var objdt = $('<tmptag>').append(tag);	// 임시로 감싼 후에 jQuery 객체로 호출해야 함을 기억! (스크립트 유지여부를 선택할 수 있도록, load() 함수와 병행해서 사용하도록)
					
					if (li.callvars !== undefined) {						// 최초 호출한 함수의 인자값 (예 : chk_complete())
						if (li.callvars.calbapnd !== undefined) {		// 불러온 내용을 반영하기 전에 호출할 콜백 함수가 있는 경우
							var calbapnd = li.callvars.calbapnd({'li':li, 'objdt':objdt});	// 콜백 호출
							if (calbapnd === false) return false;		// 불러온 내용을 반영하지 말아야 할 결과인 경우 멈춤
						}
					}
					//obj_aaw.css('height', obj_aaw.height());
					obj_aaw.html('');	// 영역 초기화
					//console.log(li.keep_script, objdt.html());
					if (li.return_area !== undefined && li.return_area !== 'undefined' && li.return_area != '') {
						var exp_ra = li.return_area.split(',');
						exp_ra.forEach(function(item, index, array) {
							if (index === 0) exp_ra[index] = '#' + exp_ra[index];
							//console.log(exp_ra[index], objdt.find(exp_ra[index]));
							obj_aaw.append(objdt.find(exp_ra[index]));
						});
					} else {
						//console.log(obj_aaw);
						obj_aaw.append(objdt.html());
					}
					//console.log(scts);
					if (scts.length > 0) obj_aaw.append(scts);	// 스크립트 마크업
					$('body').after_load({'doc':doc,'li':li,'nm_aaw_history':nm_aaw_history,'aaw':aaw});	// 마크업 변경 되므로 obj_aaw. 로 호출 하면 안되고 body 로!, chk_complete 호출시 이 라인에서 오류가 생기면 keep_script:N 으로 시도 해 보기
				});
			}
		}
	}
	
	$.fn.after_load = function(vars) {
		var objb = vars.doc.$('body');
		vars.doc.$('textarea:not(.no_auto):visible').autosize();
		vars.doc.$('#loading_img').loading_img({'cobj':vars.li, 'off':'Y'});
		set_ajax_history(vars.nm_aaw_history, vars.li.load_url);
		if (vars.aaw.indexOf('global_dialog') >= 0 && vars.li.dialog !== 'Y' && vars.doc.$('#' + vars.aaw).css('display') !== 'none') vars.doc.$('#' + vars.aaw).dialog('close');
		if (vars.li.as !== 'N') auto_save();
		if (vars.li.anchor !== undefined && vars.li.anchor !== 'undefined' && vars.li.anchor != '') {		// 스크롤 이동 표시
			var exp_anchor = vars.li.anchor.split(',');
			var anchor_obj = vars.doc.$('#' + exp_anchor[0]);
			if (anchor_obj.length > 0) {
				var anc_top;
				if (isNaN(exp_anchor[1]) && exp_anchor[1].substring(0, 1) === '*') anc_top = parseInt(exp_anchor[1].substring(1, exp_anchor[1].length));
				else anc_top = parseInt(anchor_obj.offset().top + exp_anchor[1]);
				if (objb.scrollTop() <= 0 || (exp_anchor[4] === 'Y' && (objb.scrollTop() < anc_top - 50 || objb.scrollTop() > anc_top + 50))) {
					setTimeout(function () {
						if (exp_anchor[3] === undefined) exp_anchor[3] = 0;
						vars.doc.$('html, body').animate({ scrollTop: anc_top }, parseInt(exp_anchor[2]));
					}, exp_anchor[3]);
				}
			}
		}
		if (vars.li.return_area !== undefined && vars.li.return_area !== 'undefined' && vars.li.return_area != '') $('#' + vars.li.return_area, this).removeAttr('id');
		if (vars.li.callback !== undefined) eval(vars.li.callback); if (vars.li.refresh === 'Y') document.location.reload();
	}
			
	// 라디오, 체크상자 라벨 디자인 처리용
	$.fn.set_icr = function(vars) {
		var obj = $('.-inputCheckRadio');
		$('input[type=radio],input[type=checkbox]', obj).next('label').removeClass('chked');
		$('input[type=radio]:checked,input[type=checkbox]:checked', obj).next('label').addClass('chked');
		//$('input[type=radio],input[type=checkbox]', obj).removeClass('active');
		//$('input[type=radio]:checked,input[type=checkbox]:checked', obj).addClass('active');
		obj.off('click'); obj.on('click', function(e) {
			$('input[type=radio],input[type=checkbox]', $(this)).next('label').removeClass('chked');
			$('input[type=radio]:checked,input[type=checkbox]:checked', $(this)).next('label').addClass('chked');
			//$('input[type=radio],input[type=checkbox]', $(this)).removeClass('active');
			//$('input[type=radio]:checked,input[type=checkbox]:checked', $(this)).addClass('active');
		});
	}
	
	// 지정한 자리수 이상이면 다음 상자로 이동
	$('body').on('keyup', '.fm-length', function(e) {
		var len = parseInt($(this).attr('data-len'));
		if ($(this).val().length >= len) $(this).next(':input').focus();
	});
	
	// 전화번호에 하이픈 자동 반영
	$('body').on('keyup input paste focusout', 'input.fm-phone', function(e) { $(this).set_dv_phone({}); });
	$.fn.set_dv_phone = function(vars) {
		var lf, lm, ll, lr;
		var value = this.val().replace(/[^0-9]/g, '');
		var len_1 = value.substring(0, 1);
		var len_2 = value.substring(0, 2);
		var len_3 = value.substring(0, 3);
		var len_full = value.length;
		if (len_2 === '02') lf = 2;
		else if (len_1 === '1' || len_3 === '030' || len_3 === '050') lf = 4;
		else lf = 3;
		if (len_full > lf) {
			lr = len_full - lf;
			if (lr <= 4) lm = lr;				// 국번 빼고 남은 자리수가 있으면 중간 번호 설정
			else { ll = 4;	lm = lr - ll; }	// 국번 빼고 남은 자리수가 4보다 크면 중간번호와 끝 번호 설정
			var pt_str = [], rp_str = [];
			if (lf !== undefined) { pt_str.push('(\\d{' + lf + '})'); rp_str.push('$1'); }
			if (lm !== undefined) { pt_str.push('(\\d{' + lm + '})'); rp_str.push('$2'); }
			if (ll !== undefined) { pt_str.push('(\\d{' + ll + '})'); rp_str.push('$3'); }
			this.val(value.replace(new RegExp(pt_str.join('')), rp_str.join('-')));
		} else {
			this.val(value);
		}
	}
	
	// 년, 월 선택시 해당 월의 날짜만큼만 나오게
	$.fn.set_last_month = function(vars) {
		$('select[name$="_year"],select[name$="_month"]').each(function(idx) {
			var obj_this = $(this);
			if (obj_this.attr('onchange') === undefined) {	// 기본형 캘린더에 사용된 년,월 변경용 선택상자는 제외되어야 함
				var form_jq = $(this).parents('form');
				obj_this.off('change'); obj_this.on('change', function(e) {
					var obj_opt, opt_day, obj_nm = $(this).attr('name');
					var inm = obj_nm.substr(0, obj_nm.length - (obj_nm.substr(obj_nm.length-1) === 'r' ? 5 : 6));
					var vy = $('select[name="' + inm + '_year"]', form_jq).val().replace(/[^0-9]/, '');
					var vm = $('select[name="' + inm + '_month"]', form_jq).val().replace(/[^0-9]/, '');
					if (vy == '' || vm == '') return;
					var lastDay = (new Date(vy,vm, 0)).getDate();					// 월의 마지막날
					var obj_day = $('select[name="' + inm + '_day"]', form_jq);	// 날짜 선택상자
					if (obj_day.length <= 0) return; 									// 없으면 종료
					var day_format = obj_day.html().match(/<option value="([0-9]+)([^0-9"]+)">[^>]+<\/option>/);	// 날짜 단위 추출
					for (var i=28; i<=31; i++) {
						opt_day = i.toString() + (day_format != null ? day_format[2] : '');
						obj_opt = $('option[value="' + opt_day + '"]', obj_day);
						if (i > lastDay && obj_opt.length > 0) obj_opt.remove();
						else if (obj_opt.length <= 0) obj_day.append('<option value="' + opt_day + '">' + opt_day + '</option>');
					}
				});
				var otn = obj_this.attr('name');
				if (obj_this.val() != '' && otn.substr(otn.length-6, otn.length) === '_month') obj_this.trigger('change');
			}
		});
	}

	// 일괄입력폼에서 입력되지 않은 입력라인의 hidden 값을 제거
	$.fn.remove_hidden_line = function(obj_mul) {		
		var f_name, p_name, l_name;
		obj_mul.each(function(i) {
			var obj_name = $(this).attr('name');
			if (i === 0) f_name = obj_name;
			else if (f_name === obj_name) { l_name = p_name; }
			p_name = obj_name;
		});
		var exist_value = 'N';
		var obj_line = new Array;
		obj_mul.each(function(i) {
			obj_line.push($(this));
			if ($(this).attr('type') !== 'hidden' && $(this).val() != '') exist_value = 'Y';
			if ($(this).attr('name') === l_name) {
				if (exist_value !== 'Y') $(obj_line).each(function(j) { $(this).val(''); });
				obj_line = new Array;
				exist_value = 'N';
			}
		});
	};
	
	// 라디오버튼을 값으로 선택
	$.fn.radio_check = function(v, te) {
		this.each(function() {
			if ($(this).val() === v) {
				$(this).prop('checked', true);
				if (te === 'Y') $(this).trigger('change');
			}
		});
		return this;
	};
	
	//input 태그의 값을 로컬스토리지에 저장하여 값을 불러오는 함수
	//텍스트박스, 선택상자, 체크박스, 라디오버튼 모두 가능
	$.fn.localstorage_value_change = function() {
		this.each(function() {
			var element = $(this);
			var elementType = element.prop('type');
			var elementId = element.attr('id');
			var elementName = element.attr('name');

			// 저장된 값 로드
			var storedValue = localStorage.getItem(elementId || elementName);
			if (storedValue) {
				if (elementType === 'checkbox' || elementType === 'radio') {
					if (storedValue === 'true') {
						element.prop('checked', true);
					} else {
						element.prop('checked', storedValue === element.val());
					}
				} else {
					element.val(storedValue);
				}
			}

			// 값이 변경될 때 저장
			element.on('change', function() {
				if (elementType === 'checkbox' || elementType === 'radio') {
					localStorage.setItem(elementId || elementName, element.prop('checked'));
				} else {
					localStorage.setItem(elementId || elementName, element.val());
				}
			});
		});
		return this;
	};

	// 체크상자 클릭시 지정한 버튼의 url에 번호를 세팅하는 함수
	$.fn.set_sms_btn_url = function(vars, callback) {
		var obj_this = this;
		var form_jq = obj_this.parents('form');
		var obj_chk_all = $(vars.obj_chkbox, form_jq);
		obj_this.attr('onclick', 'alert("' + vars.empty_msg + '")');
		$('body').on('change', vars.obj_chkbox, function(e) {
			var phone_nms = [];
			var obj_click = $(this);
			var pn = obj_click.attr(vars.an_phone);
			if (pn === undefined) alert('please set phone number attr name ' + vars.an_phone);
			obj_chk_all.each(function(i) {
				if ($(this).is(':checked')) {
					pn = trim($(this).attr(vars.an_phone).replace(/[^0-9]/gi, ''));
					if (pn.length >= 10) phone_nms.push(pn);
				}
			});
			if (phone_nms.length > 0) {
				var conn = '?';
				var sms_url = 'sms:';
				if (os_type === 'ios' || os_type === 'mac') {	// 모바일 firefox는 mac으로 세팅됨
					sms_url += '/open?addresses='; conn = '&';
					if (vars.div == '') vars.div = ',';
				} else {
					if (vars.div == '') vars.div = ';';
				}
				if (vars.div === 'C') vars.div = ','; else if (vars.div === 'S') vars.div = ';';
				sms_url += phone_nms.join(vars.div); if (vars.msg !== undefined) sms_url += conn + 'body=' + encodeURIComponent(trim(base64_decode(vars.msg)));
				obj_this.attr('href', sms_url).removeAttr('onclick');
			} else {
				obj_this.attr('href', '#;').attr('onclick', 'alert("' + vars.empty_msg + '")');
			}
		});
	}
	
	// 숫자를 카운트업 시키는 함수
	$.fn.set_count_up = function() {
		this.each(function () {
			$(this).prop('Counter', 0).animate({
				Counter: $(this).text().replace(/[^0-9]/, '')
			}, {
				duration: 2000, easing: 'swing',
				step: function (now) { $(this).text(Math.ceil(now)); },
				complete : function(now) { var result = parseInt($(this).text()); $(this).text(number_format(result)); }
			});
		});
	}
	
	refresh_exec();	// ui등 리셋
	auto_save();		// 자동저장 기능 실행
	$('textarea:not(.no_auto):visible').autosize();
});

// ajax 완료 후 ui등 리셋
function refresh_exec() {
	if (typeof(designer_box_url) === 'undefined') {
		ab_form_vi();
		ab_chk_tog();
		ab_date_picker();
		$('body').ab_sel_input({});
		$('body').set_img_rlv();
		$('body').set_icr({});
		$('body').no_enter();
		$('body').set_last_month();
		$('.set-cover').set_cover();
		$('input[type=text].-number').each(function(i) { $(this).set_number_box(); });
		$('body').on('focus', 'input[type=text].-number', function(e) { $(this).val($(this).val().replace(/[^0-9\-\.]/g,'')); });
		$('body').on('change blur', 'input[type=text].-number', function(e) { $(this).set_number_box(e); });
		$('input.fm-phone').each(function(i) { $(this).set_dv_phone({}); });
	}
}

// 체크(선택)상자 클릭으로 입력상자 노출여부 또는 읽기전용, 활성여부 조절 하는 함수
// 입력상자 마크업 예) class="AB-chk-tog" readonly="readonly" disabled="disabled" data-chk-tog='{"category_2_multi[]":"기타"}'
// 입력상자의 상위 div, span 등에 class="-wrap-dct" 를 마크업 하면 div, span 단위로 노출/비노출 시킬 수 있다.
// readonly, disabled, display:none 의 초기 마크업에 따라 자동으로 설정 / data-crvs="Y" 이면 반대로 동작
function ab_chk_tog() {
	//var obj_dcts = {};
	var ab_chk_tog = $('.AB-chk-tog');
	if (ab_chk_tog.length > 0) {
		ab_chk_tog.each(function(idx) {
			var obj_dct = $(this), form = obj_dct.parents('form'), obj_dct_state = [];
			var obj_dct_wrap = obj_dct.parents('.-wrap-dct').eq(0), obj_dct_ws = obj_dct_wrap.attr('style');
			if (obj_dct_ws === undefined) obj_dct_ws = obj_dct.attr('style') === undefined ? '' : obj_dct.attr('style');
			if (obj_dct.is('[disabled]') || obj_dct.is('[dis-abled]')) obj_dct_state.push('D'); if (obj_dct.is('[readonly]') || obj_dct.is('[read-only]')) obj_dct_state.push('R');
			if (!obj_dct.is(':visible') || obj_dct_ws.indexOf('display') >= 0) obj_dct_state.push('N'); var obj_dct_children = obj_dct.find('input,select,textarea'); obj_dct.renameAttr('disabled', 'dis-abled').renameAttr('readonly', 'read-only');
			if (obj_dct_children.length > 0) { obj_dct = obj_dct_children; if (in_array('D', obj_dct_state)) obj_dct.prop('disabled', true); if (in_array('R', obj_dct_state)) obj_dct.prop('readonly', true); }
			var obj_dct_targ = obj_dct.attr('data-chk-tog'); if (obj_dct_targ === undefined) return false;
			$.each(jQuery.parseJSON(obj_dct_targ), function(cbn, cbv) {
				var ocic;
				var obj_cbn = $('*[name="' + cbn + '"]', form); obj_cbn.off('change');
				obj_cbn.off('change'); obj_cbn.on('change', function(e) {
					var dcr = obj_dct.attr('data-crvs');
					if (obj_cbn.prop('tagName') === 'SELECT') {
						ocic = obj_cbn.val() === cbv ? true : false;
						if (cbv.substr(0, 1) === ';' && cbv.substr(cbv.length-1, 1) === ';') ocic = cbv.indexOf(';' + obj_cbn.val() + ';') >= 0 ? true : false;
					} else ocic = $('*[name="' + cbn + '"][value="' + cbv + '"]', form).is(':checked');//console.log(obj_dct_ws, obj_dct, obj_cbn, obj_dct_state, ocic, dcr);
					if ((ocic == true && dcr !== 'Y') || (ocic == false && dcr === 'Y')) {
						if (in_array('D', obj_dct_state)) obj_dct.prop('disabled', false);
						if (in_array('R', obj_dct_state)) obj_dct.prop('readonly', false);
						if (in_array('N', obj_dct_state)) {
							if (obj_dct_wrap.length <= 0) obj_dct.css('display', '');
							else obj_dct_wrap.css('display', '');
						}
					} else {
						if (in_array('D', obj_dct_state)) obj_dct.prop('disabled', true);
						if (in_array('R', obj_dct_state)) obj_dct.prop('readonly', true);
						if (in_array('N', obj_dct_state)) {
							if (obj_dct_wrap.length <= 0) obj_dct.css('display', 'none');
							else obj_dct_wrap.css('display', 'none');
						}
					}
				});
				if (obj_cbn.attr('data-init') === undefined) { obj_cbn.trigger('change'); obj_cbn.attr('data-init', Date.now()); }	// 최초 1회 자동 트리거
			});
			/*$.each(jQuery.parseJSON($(this).attr('data-chk-tog')), function(cbn, cbv) {
				var cbn_cbv = cbn + '_' + cbv;
				obj_dcts[cbn_cbv] = [obj_dct, obj_dct_state, obj_dct_wrap];
				var obj_cbn = $('input[name="' + cbn + '"][value="' + cbv + '"]');
				obj_cbn.off('change');
				obj_cbn.on('change', function(e) {
					if ($(this).is(':checked')) {
						console.log(obj_dcts[cbn_cbv][1]);
						if (in_array('D', obj_dcts[cbn_cbv][1])) obj_dcts[cbn_cbv][0].prop('disabled', false);
						if (in_array('R', obj_dcts[cbn_cbv][1])) obj_dcts[cbn_cbv][0].prop('readonly', false);
						if (in_array('N', obj_dcts[cbn_cbv][1])) {
							if (obj_dcts[cbn_cbv][2].length <= 0) obj_dcts[cbn_cbv][0].css('display', '');
							else obj_dcts[cbn_cbv][2].css('display', '');
						}
					} else {
						if (in_array('D', obj_dcts[cbn_cbv][1])) obj_dcts[cbn_cbv][0].prop('disabled', true);
						if (in_array('R', obj_dcts[cbn_cbv][1])) obj_dcts[cbn_cbv][0].prop('readonly', true);
						if (in_array('N', obj_dcts[cbn_cbv][1])) {
							if (obj_dcts[cbn_cbv][2].length <= 0) obj_dcts[cbn_cbv][0].css('display', 'none');
							else obj_dcts[cbn_cbv][2].css('display', 'none');
						}
					}
				});
			});*/
		});
	}
}

function ab_editor_refresh(ohe) {
	if (browser_type.indexOf('IE') >= 0) {
		ohe.each(function(idx) {
			var atf = $(this).next('iframe:visible');
			if (atf.length > 0) {
				//console.log('aer - ' + $(this).attr('id'));
				atf.height($(this).height() + 50);
				oEditors.getById[$(this).attr('id')].exec('CHANGE_EDITING_MODE', ['WYSIWYG']);
				/*atf.remove();
				var exp_rel = $(this).attr('rel').split(',');
				nhn.husky.EZCreator.createInIFrame({oAppRef: oEditors,elPlaceHolder: $(this).attr('id'),sSkinURI: exp_rel[0], htParams : { enter:'p', auto_link_target:'', bSkipXssFilter:true }, fOnAppLoad : function(){
					//oEditors.getById[$(this).attr('id')].exec('SET_IR', ['']);
					//oEditors.getById[$(this).attr('id')].exec('PASTE_HTML', $(this).val());
				}, fCreator: 'createSEditor2'});*/
			}
		});
	}
}

function auto_save() {			// 자동 저장으로 지정된 영역 처리
	clearInterval(as_interval);
	var as_div = $('form .ABA-auto-save');
	if (as_div.length === 1) {	// 한 페이지에 한개의 영역만 존재해야 함
		var form_jq = as_div.parents('form');
		$.get('./tools/auto_save/load.php', {}, function(dataJson) {	// 기존 저장된 파일이 있는지 확인한다.
			if (dataJson != '' && dataJson != null) {
				var objinex = {
					ex : function(vars) {
						var copy_dj = jQuery.extend({}, vars.dataJson);
						var form_jq_serialize = vars.form_jq.serializeArray();
						$.each(form_jq_serialize, function(i, field) { if (copy_dj[field.name] != undefined && copy_dj[field.name] != '') delete copy_dj[field.name]; });
						vars.as_div.attr('data-asv', JSON.stringify(copy_dj));	// 입력상자가 없는(실시간으로 생성되는) 값을 마크업 해 둠
						$.each(form_jq_serialize, function(i, field){
							var obj = vars.form_jq.find('*[name="' + field.name + '"]');
							if (vars.dataJson[field.name] != undefined && vars.dataJson[field.name] != '' && !obj.is(':radio') && !obj.is(':checkbox') && !obj.is('select[multiple]')) {
								//console.log(field.name);
								var asv = stripslashes(vars.dataJson[field.name]);
								obj.attr('asv', asv).val(asv).trigger('change');	// 임시저장 값을 속성에 마크업하고 적용한다. (속성을 마크업하게 된 이유는 단계별 분류상자값 적용에 필요, 입력상자가 마크업된 경우)
							}
						});
						var fld_name;
						$(':radio', vars.form_jq).each(function(idx) {
							fld_name = $(this).attr('name');
							//console.log(fld_name);
							if (vars.dataJson[fld_name] !== undefined && $(this).attr('value') == vars.dataJson[fld_name]) $(this).attr('checked', 'checked');
						});
						$(':checkbox',  vars.form_jq).each(function(idx) {
							fld_name = $(this).attr('name');
							if (fld_name.substr(fld_name.length-2, 2) === '[]') fld_name = fld_name.substr(0, fld_name.length-2);
							if (vars.dataJson[fld_name] !== undefined) {
								var split_value = vars.dataJson[fld_name].split("\t");
								if (in_array($(this).attr('value'), split_value)) $(this).attr('checked', 'checked');
							}
						});
						$('select[multiple]', vars.form_jq).each(function(idx) {
							var split_value = vars.dataJson[$(this).attr('name').substr(0, $(this).attr('name').length-6)].split(";");
							$('option', $(this)).each(function(idx) {
								if (in_array($(this).attr('value'), split_value)) $(this).attr('selected', 'selected');
							});
						});
						vars.as_div.removeAttr('data-asv');	// 입력상자가 없는 값 마크업 제거
					}
				}	
				if (performance.navigation.type == 2 || as_div.attr('data-msg-off') === 'Y') objinex.ex({'as_div':as_div, 'form_jq':form_jq, 'dataJson':dataJson});
				else alert_core(lang_core[0], {}, function() { objinex.ex({'as_div':as_div, 'form_jq':form_jq, 'dataJson':dataJson}); }, function() { $.get('./tools/auto_save/delete.php', {}, function(data) { }); });
			} else {
			}
		}, 'json');
		as_div.bind('click', function(e) {
			var editor_textarea = as_div.find('textarea[id^=oEdit-]');
			as_interval = setInterval(function() {
				$('#loading_img').loading_img({'cobj':form_jq, 'off':'Y'});
				editor_textarea.each(function(index) { editor_update($(this).attr('id')); });		// editor_update() 는 tools/editor/선택된편집기/view_editor.inc.php 에 정의되어 있음
				$.post('./tools/auto_save/save.php', form_jq.serialize(), function(data) { $('#loading_img').loading_img({'cobj':form_jq, 'off':'Y'}); });
			}, as_div.attr('auto_save_term')*1000);
			as_div.unbind('click');				// 클릭 이벤트 해제
		});
	} else if (as_div.length > 1) {
		alert_core(lang_core[4]);
	}
}

function ab_date_picker() {
	// 날짜 선택박스 호출 처리
	// AB_datepicker 클래스에 캘린더 배정
	// numberOfMonths:3
	// minDate:-20, maxDate:"+1M +10D"
	// showOn:"button|both", buttonImage:"./tools/calendar/form_input_type/cal.gif", buttonImageOnly:true	
	var AB_datepicker = $('.AB_datepicker');
	AB_datepicker.removeClass('hasDatepicker');	// 재설정을 위해 클래스 및 버튼 제거
	$('.ui-datepicker-trigger').remove();
	if (AB_datepicker.length > 0) {
		var year_range; AB_datepicker.datepicker({showOtherMonths:true,selectOtherMonths:true,changeMonth: true,changeYear: true});
		$('img.ui-datepicker-trigger').attr({ 'style' : 'margin:0 0 4px 2px;' }); $('.ui-datepicker').attr({ 'style' : 'width: 17em; padding: .2em .2em 0; font-size:90%;' });
		AB_datepicker.each(function(index) {		// 모든 datepicker 만큼 반목
			var date_saved_value = $(this).val();	// 기본 값 저장
			var date_format = 'yy-mm-dd', time_div = ' ', time_unit = '3';
			if ($(this).attr('time_div') != undefined) time_div = $(this).attr('time_div');
			if ($(this).attr('time_unit') != undefined) time_unit = $(this).attr('time_unit');
			if ($(this).attr('year_range') != undefined) year_range = $(this).attr('year_range'); else year_range = 'c-10:c+10';
			if ($(this).attr('date_format') != undefined) date_format = $(this).attr('date_format');
			if ($(this).hasClass("AB_datepicker_time")) {	// 입력용 추가클래스(AB_datepicker_time) 지정된 경우
				var date_format_full;
				if (time_unit >= 3) date_format_full = date_format + time_div + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
				else if (time_unit >= 2) date_format_full = date_format + time_div + now.getHours() + ':' + now.getMinutes();
				else date_format_full = date_format + time_div + now.getHours();
				if (date_saved_value != '') {
					var split_date = date_saved_value.split(time_div);
					if (split_date[1] == undefined || split_date[1] == '') $(this).datepicker('option', 'dateFormat' , date_format_full);
					else $(this).datepicker('option', 'dateFormat' , date_format + time_div + split_date[1]);
				} else {
					$(this).datepicker('option', 'dateFormat' , date_format_full);
				}
			} else $(this).datepicker('option', 'dateFormat' , date_format);
			if ($(this).hasClass('AB_datepicker_btn')) {		// 입력용 추가클래스(AB_datepicker_time) 지정된 경우
				$(this).datepicker('option', 'showOn' , 'both');
				if (typeof(admin_theme) !== 'undefined') $(this).datepicker('option', 'buttonImage' , './cooker/theme/' + admin_theme + '/images/cal.gif');
				$(this).datepicker('option', 'buttonImageOnly' , 'true');
				$(this).datepicker('option', 'buttonText' , 'calendar');
			}
			if ($(this).attr('data-min-date') != undefined) date_format = $(this).datepicker('option', 'minDate' , $(this).attr('data-min-date'));
			if ($(this).attr('data-max-date') != undefined) date_format = $(this).datepicker('option', 'maxDate' , $(this).attr('data-max-date'));
			$(this).datepicker('option', 'yearRange' , year_range); $(this).val(date_saved_value);
		});
		/*$( "#locale" ).change(function() {
			AB_datepicker.datepicker( "option", $.datepicker.regional[ $( this ).val() ] );
		});*/
	}
	$.datepicker.regional['ko'] = {
		closeText: '닫기', prevText: '이전달', nextText: '다음달', currentText: '오늘',
		monthNames: ['01월(JAN)','02월(FEB)','03월(MAR)','04월(APR)','05월(MAY)','06월(JUN)','07월(JUL)','08월(AUG)','09월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		monthNamesShort: ['01월','02월','03월','04월','05월','06월','07월','08월','09월','10월','11월','12월'], dayNames: ['일','월','화','수','목','금','토'], dayNamesShort: ['일','월','화','수','목','금','토'], dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk', firstDay: 0, isRTL: false, showMonthAfterYear: true, yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
}

// 필수입력항목 클래스 마크업
function ab_form_vi() {
	$('form[vi]:not(".no-v-icon")').each(function(idx) {
		var obj_box, obj_label;
		var vi = $(this).attr('vi');
		var exp_vi = vi.replace(/\+/g, '~').split('~'); exp_vi.push('chk_person');
		for (var i=0, cnt=exp_vi.length; i < cnt; i++) {
			if (exp_vi[i] == '') continue;
			$('*[name="' + exp_vi[i] + '"]', $(this)).addClass('-requiredInput');
			obj_box = $('li *[name*=' + exp_vi[i] + ']', $(this)); if (obj_box.length <= 0) continue;
			obj_label = $('label[for="' + exp_vi[i] + '"]', $(this));
			if (obj_label.length <= 0) obj_label = $('ul:not(".no-v-icon")>li>label[for="' + obj_box.attr('name') + '"]', $(this));
			if (obj_label.length <= 0) obj_label = $('ul:not(".no-v-icon")>li>label[for="' + obj_box.attr('name').replace('_multi[]', '') + '"]', $(this));
			if (obj_label.length <= 0) obj_label = $('ul:not(".no-v-icon")>li>label[for="' + obj_box.attr('id') + '"]', $(this));
			if (obj_label.length > 0) obj_label.addClass('-iconRequiredInput');
		}
	});
}

// 즉시수정, 삭제등을 ajax 전송으로 처리 하는 함수
function submit_direct_ajax(obj, frm, action, board, serial_num, target, chg_values, query_string, after_script, after_msg, frm_attr, flag, p_self, return_url, _isa_, _isap_, callback) {
	var obj_this = $(obj);
	if (typeof(frm) === 'undefined') {
		var obj_append = 'body';
		var obj_dialog = $('.sitecook-dialog', obj_this.parents('div'));
		if (obj_dialog.length > 0) obj_append = '#' + obj_dialog.attr('id');
		$(obj_append).append("<form name='realtime_frm' id='realtime_frm'" + frm_attr + "></form>");
		frm = document.getElementById('realtime_frm');
	}
	var chg_names = {};								// 변경할 항목을 담을 연관배열
	if (chg_values !== undefined && chg_values != '') {
		var chg_vars = chg_values.split(',');	// 변경할 항목의 이름과 값을 , 로 구분	
		for (i=0; i<chg_vars.length; i++) {
			var chg_vars_item = chg_vars[i].split('=');
			if (chg_vars_item[0] != '') chg_names[chg_vars_item[0]] = chg_vars_item[1];	// 변경할 항목의 이름과 값 배열 번수
		}
	}
	var form = $(frm);								// 폼 객체(jquery)
	if (action === undefined || action == '') action = form.attr('action');
	var doc = eval(form.attr('doc') === undefined ? 'window' : form.attr('doc'));
	if (after_script !== 'X' || obj_this.hasClass('loading-img')) doc.$('#loading_img').loading_img({'cobj':obj_this});	// 버튼의 DB처리 후 스크립트에 form.after_db_script.value='X' 라고 설정하면 아무 변화 없이 전송만 함
	
	var ai = obj_this.data('ajax-option') !== undefined ? obj_this.data('ajax-option') : form.data('ajax-option'); if (ai === undefined) ai = {};	
	/*var anchor = obj_this.attr('anchor') !== undefined ? obj_this.attr('anchor') : form.attr('anchor');
	var callback_form = obj_this.attr('callback') !== undefined ? obj_this.attr('callback') : form.attr('callback');
	var load_info = obj_this.attr('load_info') !== undefined ? obj_this.attr('load_info') : form.attr('load_info');
	var dialog = obj_this.attr('dialog') !== undefined ? obj_this.attr('dialog') : form.attr('dialog');
	var refresh = obj_this.attr('refresh') !== undefined ? obj_this.attr('refresh') : form.attr('refresh');*/
	
	var except_wraps = obj_this.attr('except_wraps');
	if (board !== undefined && board != '') {
		if (form.children('input[name=board]').length > 0) form.children('input[name=board]').val(board);
		else chg_names['board'] = board;
	}
	if (serial_num !== undefined && serial_num != '') {
		if (form.children('input[name=article_num]').length > 0) form.children('input[name=article_num]').val(serial_num);
		else chg_names['article_num'] = serial_num;
	}
	if (query_string !== undefined && query_string != '') {
		if (form.children('input[name=Q_STRING]').length > 0) form.children('input[name=Q_STRING]').val(query_string);
		else chg_names['Q_STRING'] = query_string;
	}
	if (after_script !== undefined && after_script != '') {
		if (after_script.indexOf('%MOVE%') >= 0 && after_script.indexOf('&DLG=') < 0 && (ai.ajax_area !== undefined && ai.ajax_area.substr(0, 13) === 'global_dialog')) after_script = after_script + '&DLG=Y';
		if (form.children('input[name=after_db_script]').length > 0) form.children('input[name=after_db_script]').val(after_script);
		else chg_names['after_db_script'] = after_script;
	}
	if (after_msg !== undefined && after_msg != '') {
		if (form.children('input[name=after_db_msg]').length > 0) form.children('input[name=after_db_msg]').val(after_msg);
		else chg_names['after_db_msg'] = after_msg;
	}
	if (flag !== undefined && flag != '' && form.children('input[name=flag]').length <= 0) chg_names['flag'] = flag;
	if (_isa_ !== undefined && _isa_ != '' && form.children('input[name=_isa_]').length <= 0) chg_names['_isa_'] = _isa_;
	if (_isap_ !== undefined && _isap_ != '' && form.children('input[name=_isap_]').length <= 0) chg_names['_isap_'] = _isap_;
	if (p_self !== undefined && p_self != '' && form.children('input[name=P_SELF]').length <= 0) chg_names['P_SELF'] = p_self;
	if (return_url !== undefined && return_url != '' && form.children('input[name=return_url]').length <= 0) chg_names['return_url'] = return_url;
	var obj_mul = form.find('*[name^=MUL_]');
	if (obj_mul.length > 0) form.remove_hidden_line(obj_mul);	// 일괄 입력상자가 포함된 경우 입력되지 않은 라인의 hidden 값을 제거
	if (except_wraps !== undefined && except_wraps != '') {		// submit 전 선택된 입력상자들 비활성 처리(목록 하단의 선택변경 버튼에 except_wraps=".-bdSchWrap" 와 같이 마크업하면 검색용 입력항목은 전송되지 않음
		$(except_wraps, form).find('select, input, textarea').prop('disabled', true).addClass('realtime-disabled');
	}
	$('.-rm-cma', form).each(function(i) { $(this).val($(this).val().replace(/[^0-9\.\-]/g, '')) }); $('*[name*=\"]_multi\"]', form).prop('disabled', true).addClass('realtime-disabled');	// 일괄입력의 체크상자 이름은 MUL_mng_schedule_category_5[0]_multi[] 형태로 실시간 변환되므로 ]_multi 포함된 체크상자를 찾아 비활성 시킴
	$.post(action, form.serialize() + '&' + $.param(chg_names), function(data) {
		console.log(action, ai.ajax_area, after_script, data);
		if (after_script !== 'X') {
			var move_url;
			var alert_msg = get_alert_msg_in_result(data);									// 경고 메시지 있으면 출력
			if (alert_msg != 'null') after_submit_cancel(alert_msg);
			if (data.indexOf('history.go(') < 0) {												// 뒤로 이동 인 경우 load 안함
				if (data.indexOf('window.close();') < 0) {
					if (after_script == '%PSELF%') {												// 현재페이지
						var exp_href = urldecode(doc.location.href).split('#');				
						if (exp_href[0] != undefined) move_url = exp_href[0];
						else move_url = exp_href;
					} else {
						move_url = get_move_url_in_result(data);								// 이동할 url
					}
					if (move_url !== 'null') after_submit_load(obj_this, move_url, doc, ai, '', (except_wraps !== undefined && except_wraps != '' ? 'X' : 'Y'));
				} else {
					if (doc === parent) $('.sitecook-dialog', obj_this.parents('div')).dialog('close');
					else parent.$('.sitecook-dialog:visible').dialog('close'); $('#loading_img').loading_img({'off':'Y'});	// 부모객체가 있는 경우 iframe 으로 간주(부모객체가 없으면 parent = window)
				}
				if (move_url === undefined || move_url === 'null') {
					var scts = []
					var tag = $.parseHTML(data, document, true);
					for (var i=0; i<tag.length; i++) {	// 불러온 태그들 중에
						var sct = $(tag[i]);					// submit 처리 후 실행할 스크립트를 찾아 배열에 담는다
						if (sct.prop('tagName') === 'SCRIPT' && sct.hasClass('after-process')) scts.push(tag[i]);
					}
					if (scts.length > 0) $('body').append($('<tmptag>').append(scts));
				}
			}
		} else {
			$('#loading_img').loading_img({'off':'Y'});
		}
		submit_is_ing = 'N'; if (callback !== undefined) callback(data, move_url);
	});
	$('.realtime-disabled', form).removeAttr('disabled').removeClass('realtime-disabled');
}

// 목록의 검색 submit 후 처리
function after_post_load(obj_this, html_tag, doc, ai/*, return_area, dialog, refresh*/, as, callback) {
	if (ai.ajax_area === '_td_' || ai.ajax_area === '_pd_') {
		if (ai.ajax_area === '_td_') ai.ajax_area = $('.sitecook-dialog', obj_this.parents('div')).attr('id');
		else if (ai.ajax_area === '_pd_') ai.ajax_area = $('.sitecook-dialog', obj_this.parents('div')).parents('div.ui-dialog').prevAll('div.ui-dialog').eq(0).children('.sitecook-dialog').attr('id');
	}
	if (ai.return_area !== undefined && ai.return_area != '') {
		var tempDom = $('<tmptag>').append($.parseHTML(html_tag, document, false));	// 임시로 감싼 후에 jQuery 객체를 불러와야 한다.
		var html_obj = $('#' + ai.return_area, tempDom);
		if (ai.ajax_area === ai.return_area) html_tag = html_obj.html();															// ai.ajax_area 내부에 넣을 html 을 추출 하는 것이므로
		else { html_obj.wrap('<div id="----temp-----"></div>'); html_tag = $('#----temp-----', tempDom).html(); }	// 다른 경우만 ai.return_area id 를 살림
		tempDom.remove(); //$(data).filter('script#bos-main-script').each(function(){ $.globalEval(this.text || this.textContent || this.innerHTML || ''); });	// data에서 스크립트 추출해서 로딩하는 예제(보관용)
	}
	if (ai.ajax_area === undefined) ai.ajax_area = 'AB_contents';
	var ajax_area_wrap = '---' + ai.ajax_area.replace(/[^a-zA-Z0-9_\-]/g, '') + '---';
	if (ai.ajax_area == 'AB_contents' || (doc.$('#' + ai.ajax_area).length <= 0 && doc.$('#' + ajax_area_wrap).length <= 0)) {	// ajax 로딩 영역이 지정되지 않은경우
		if ($('#AB_contents').length == 1 && ai.refresh !== 'Y') {	// #AB_contents 영역이 지정되어 있으면 ajax 호출
			$('#AB_contents').html(html_tag);
			$('textarea:not(.no_auto):visible').autosize();
			$('#loading_img').loading_img({'cobj':obj_this, 'off':'Y'});
			if (ai.dialog !== 'Y') $('.sitecook-dialog', obj_this.parents('div')).dialog('close');
			if (as !== 'N') auto_save();
		} else {																	// 아니면 새로고침
			document.location.reload();
		}
	} else {																		// ajax 로딩 영역이 지정된 경우
		if (ai.ajax_area.substr(0, 13) === 'global_dialog') {
			var aaw = ai.ajax_area;
			if (ai.ajax_area.indexOf(' ') > -1) {						// #global_dialog idname 형태인경우
				if ($('#' + ajax_area_wrap).length <= 0) $('#' + ai.ajax_area).wrap('<div id="' + ajax_area_wrap + '"></div>');
				aaw = ajax_area_wrap;
			}
			$('#' + aaw).html(html_tag);
			$('textarea:not(.no_auto):visible').autosize();
			$('#loading_img').loading_img({'cobj':obj_this, 'off':'Y'});
			var dialog_link = $('*[dialog-link=Y]', $(this));
			dialog_link.attr('href', dialog_link.attr('onclick')).removeAttr('onclick');
			if (as !== 'N') auto_save();
		} else {
			if (ai.refresh === 'Y') {
				document.location.reload();
			} else {
				if ($('#' + ajax_area_wrap).length <= 0) $('#' + ai.ajax_area).wrap('<div id="' + ajax_area_wrap + '"></div>');	// 지정된 로딩 영역에 ajax 로딩 할 수 있도록 감싸준다.
				$('#' + ajax_area_wrap).html(html_tag);				// 지정된 영역의 내용만 넣을지 전체 내용을 넣을지 판단.
				$('textarea:not(.no_auto):visible').autosize();
				$('#loading_img').loading_img({'cobj':obj_this, 'off':'Y'});
				if (ai.dialog !== 'Y') $('.sitecook-dialog', obj_this.parents('div')).dialog('close');
				if (as !== 'N') auto_save();
			}
		}
	}
	cmt_modify_idx = '';
	if (cmt_reply_idx != '' && _afo_['cmt_reply_depth'] > 1) {
		var vn_cmt_reply = 'cmt_reply' + _afo_['cmt_proc_num_parent'];
		if (_afo_[vn_cmt_reply] !== undefined) _afo_[vn_cmt_reply].splice(_afo_[vn_cmt_reply].indexOf(cmt_reply_idx), 1);
	}
	if (callback !== undefined) callback();
}

// 목록 이외의 submit 후 처리
// 개별 사용시 예 : after_submit_load('object', 'url', eval('window'), 'wrap-sch-items', 'wrap-sch-items', '', '', undefined, 'Y');
function after_submit_load(obj_this, move_url, doc, ai/*, nothing, anchor, callback, load_info, dialog, refresh*/, as, ptgq) {
	if (ai.ajax_area === '_td_' || ai.ajax_area === '_pd_') {
		if (ai.ajax_area === '_td_') ai.ajax_area = $('.sitecook-dialog', obj_this.parents('div')).attr('id');
		else if (ai.ajax_area === '_pd_') ai.ajax_area = $('.sitecook-dialog', obj_this.parents('div')).parents('div.ui-dialog').prevAll('div.ui-dialog').eq(0).children('.sitecook-dialog').attr('id');
	}
	if (ai.ptgq !== undefined) ptgq = ai.ptgq;
	if (ai.ajax_area === undefined) ai.ajax_area = 'AB_contents';
	var ajax_area_wrap = '---' + ai.ajax_area.replace(/[^a-zA-Z0-9_\-]/g, '') + '---';
	if (obj_this.attr('data-subcall') === 'Y') move_url = set_url_parm(move_url, {'SUBCALL':'Y'});
	var T_move_url = set_url_tail(move_url, 'AJAX=Y', 'Y', 'Y', ptgq, 'Y');	// otskin 사라지지 않도록 예방차원에서 Y로 변경 (otskin 지정된 페이지에서 ajax 처리 후 페이징 할 때 문제됨, 2018-04-04), 향후 N으로 변경 할 일이 생기면 근본적으로 해당 함수를 개선!
	if (ai.return_area !== undefined && ai.return_area != '') T_move_url += ' #' + ai.return_area;
	//console.log(obj_this);console.log(ai.ajax_area);
	if (ai.ajax_area == 'AB_contents' || (doc.$('#' + ai.ajax_area).length <= 0 && doc.$('#' + ajax_area_wrap).length <= 0)) {	// ajax 로딩 영역이 지정되지 않은경우
		if (doc.$('#AB_contents').length == 1 && ai.refresh !== 'Y') {								// #AB_contents 영역이 지정되어 있으면 ajax 호출
			doc.$('#AB_contents').load(T_move_url, function() {
				doc.$('textarea:not(.no_auto):visible').autosize();
				doc.$('#loading_img').loading_img({'cobj':obj_this, 'off':'Y'});
				if (ai.dialog !== 'Y') {
					var td = $('.sitecook-dialog', obj_this.parents('div'));
					if (td.css('display') !== 'none') td.dialog('close');
				}
				if (as !== 'N') auto_save();
			});
		} else {											// 아니면 새로고침
			doc.location.href = ajax_url_filter(move_url, 'Y', 'Y');
		}
	} else {												// ajax 로딩 영역이 지정된 경우
		if (ai.ajax_area.substr(0, 13) === 'global_dialog' && ai.refresh !== 'Y') {
			var aaw = ai.ajax_area;
			if (ai.ajax_area.indexOf(' ') > -1) {	// #global_dialog idname 형태인경우
				if (doc.$('#' + ajax_area_wrap).length <= 0) doc.$('#' + ai.ajax_area).wrap('<div id="' + ajax_area_wrap + '"></div>');
				aaw = ajax_area_wrap;
			}
			doc.$('#' + aaw).load(T_move_url, function() {
				doc.$('textarea:not(.no_auto):visible').autosize();
				doc.$('#loading_img').loading_img({'cobj':obj_this, 'off':'Y'});
				var dialog_link = doc.$('*[dialog-link=Y]', $(this));
				dialog_link.attr('href', dialog_link.attr('onclick')).removeAttr('onclick');
				if (ai.dialog !== 'Y') {
					var td = $('.sitecook-dialog', obj_this.parents('div'));
					if (td.css('display') !== 'none') td.dialog('close');
				}
				if (as !== 'N') auto_save();
			});
		} else {
			if (ai.refresh === 'Y' && move_url.indexOf('AJAX=Y') < 0) {
				doc.location.href = ajax_url_filter(move_url, 'Y', 'Y');
			} else {
				var load_infos = [];
				if (doc.$('#' + ajax_area_wrap).length <= 0) doc.$('#' + ai.ajax_area).wrap('<div id="' + ajax_area_wrap + '"></div>');		// 지정된 로딩 영역에 ajax 로딩 할 수 있도록 감싸준다.
				ai.load_url = move_url;/* ai.anchor = anchor; ai.callback = callback; ai.dialog = dialog;*/ ai.as = as; load_infos.push(ai);
				if (ai.load_info !== undefined) $.each(ai.load_info, function(idx, str) { load_infos.push(str); });
				//console.log(load_infos);
				$.load_urls(load_infos, doc, obj_this);
			}
		}
	}
	cmt_modify_idx = '';
	//_afo_['cmt_reply_depth'] = 2; console.log(cmt_reply_idx, _afo_['cmt_reply_depth']);
	if (cmt_reply_idx != '' && _afo_['cmt_reply_depth'] > 1) {
		var vn_cmt_reply = 'cmt_reply' + _afo_['cmt_proc_num_parent'];
		if (_afo_[vn_cmt_reply] !== undefined) _afo_[vn_cmt_reply].splice(_afo_[vn_cmt_reply].indexOf(cmt_reply_idx), 1);
	}
}

function after_submit_html(data, doc, ai/*, ajax_contents, dialog*/, as) {
	var hc = data;
	var ajax_area_wrap = '---' + ai.ajax_area.replace(/[^a-zA-Z0-9_\-]/g, '') + '---';
	if (ai.ajax_contents !== undefined) {								// 결과값에서 찾을 id가 지정된 경우
		data = data.replace(/<head[^>]*>([^]*)<\/head>/im, '');	// jQuery script 로딩이 있으면 오류남
		hc = $('#' + ai.ajax_contents, $('<ttt/>').html(data)).html(); //console.log(hc);
	}
	if (ai.ajax_area == undefined || ai.ajax_area == '' || ai.ajax_area == 'AB_contents' || ($('#' + ai.ajax_area).length <= 0 && $('#' + ajax_area_wrap).length <= 0)) {
		if ($('#AB_contents').length == 1) {
			$('#AB_contents').html(hc);
			$('#loading_img').loading_img({'off':'Y'});
			if (ai.dialog !== 'Y' && $('.sitecook-dialog').css('display') !== 'none') $('.sitecook-dialog').dialog('close');
		}
	} else {
		if (ai.ajax_area.substr(0, 13) === 'global_dialog') {
			var aaw = ai.ajax_area;
			if (ai.ajax_area.indexOf(' ') > -1) {							// #global_dialog idname 형태인경우
				if (doc.$('#' + ajax_area_wrap).length <= 0) doc.$('#' + ai.ajax_area).wrap('<div id="' + ajax_area_wrap + '"></div>');
				aaw = ajax_area_wrap;
			}
			$('#' + aaw).html(hc); $('#loading_img').loading_img({'off':'Y'});
		} else {
			if ($('#' + ajax_area_wrap).length <= 0) $('#' + ai.ajax_area).wrap('<div id="' + ajax_area_wrap + '"></div>');
			if (ai.dialog !== 'Y' && $('.sitecook-dialog').css('display') !== 'none') $('.sitecook-dialog').dialog('close');
			$('#' + ajax_area_wrap).html(hc); $('#loading_img').loading_img({'off':'Y'});
		}
	}
}

// alert, confirm() 처리하는 함수
function alert_core(msg, vars, callback_cf, callback_cc) {
	var obw;
	if (vars === undefined) vars = {};
	if (vars.type === undefined) vars.type = alert_type;//vars.type = 'alert';
	if (vars.overlay === undefined) vars.overlay = 'Y';
	if (vars.type === 'alert') {
		if (callback_cf === undefined && callback_cc === undefined) {
			alert(msg);
		} else {
			if (confirm(msg)) {
				if (callback_cf !== undefined) callback_cf(vars);
			} else {
				if (callback_cc !== undefined) callback_cc(vars);
			}
		}
	} else {
		obw = $('body').alert_layer({
			'msg':msg, 'overlay':vars.overlay, 'url':vars.url, 'vars':vars,
			'callback_cf':callback_cf, 'callback_cc':callback_cc
		});
		/* return false;*/
	}
}/*
// alert, confirm() 처리하는 함수
function alert_core(msg, vars, callback_cf, callback_cc) {
	var obw;
	if (vars === undefined) { vars = {}; vars.type = alert_type; vars.overlay = 'Y'; }
	//vars.type = 'alert';
	if (vars.type === 'alert') { if (callback === undefined) alert(msg); else if (confirm(msg)) callback(); }
	else { obw = $('body').alert_layer({'msg':msg, 'overlay':vars.overlay, 'callback_cf':callback_cf, 'callback_cc':callback_cc});}
}*/

/*스크립트 딜레이 시키는 코드, 전체 로딩을 멈출수는 없음function sleep(ms) { return new Promise( resolve => setTimeout(resolve, ms) ); }
async function delayedGreeting() { console.log('1'); await sleep(20000); $('body').alert_layer({'url':'{$DIRS['root']}{$GLOBALS['site_config']['index_file']}?design_file={$option['page']}&_preview_ifrm_=Y', 'msg':'{$msg}', 'overlay':'{$option['overlay']}'}); console.log('2'); } delayedGreeting();*/

function after_submit_cancel(alert_msg) { eval(alert_msg.replace(/\\\\/, '\\')); $('#loading_img').loading_img({'off':'Y'}); }

// 게시물 등록,수정,삭제등의 처리 후 출력되는 문자열을 처리하는 함수
function get_article_num_in_result(data) {
	var result_msg = data.split('=');
	T_msg = result_msg[result_msg.length-1];
	return T_msg.substring(0, T_msg.length-2);
}

// ajax 피드백 data에서 alert 메시지를 찾는 함수
function get_alert_msg_in_result(data) {
	var pattern = /\$\('body'\)\.alert_layer\(\{[^\}]*\}\);/gm, alert_msg = pattern.exec(data);	// 레이어형 alert 결과값 찾기
	if (alert_msg == null)  {	// 레이어형 alert 결과값 없으면 tag, function, if, else 등 조건 내에 있는 alert들 사전 제거 하고 alert_core() 결과값 추출
		data = data.replace(/<[a-zA-Z]+[^>]*>/gim, '').replace(/<\/[a-zA-Z]+[^>]*>/gim, '').replace(/function.+\{[^\}]*\}/gim, '').replace(/if.+\{[^\}]*\}/gim, '').replace(/else.+\{[^\}]*\}/gim, '').replace(/\n/gim, '');
		pattern = /alert\(['"].+['"]\)/g, alert_msg = pattern.exec(data);
	} else {
		alert_msg = alert_msg.toString().replace(/, 'next':'history\.go\(-1\);'/, '');
	}
	if (alert_msg == null) return 'null'; else return alert_msg.toString();
}

// ajax 피드백 data에서  meta url 을 찾는 함수
function get_move_url_in_result(data) {
	var move_url = '';
	var pattern = /;url=(.+)('|")>/g;
	var T_move_url = pattern.exec(data);
	if (T_move_url != null) move_url = T_move_url[1];
	if (move_url == '') {
		pattern = /\.href.*=.*('|")(.+)('|")/g;
		T_move_url = pattern.exec(data);
		if (T_move_url != null) move_url = T_move_url[2];
	}
	if (move_url != '') {
		move_url = move_url.replace(/\.\.\//g, '');
		move_url = move_url.replace(/\.\//g, '');
		return move_url;
	} else {
		return 'null';
	}
}

// ajax 새로고침 등을 위한 url 얻는 함수
function get_ajax_reload_url(filter, urle) {
	var link;
	var exp_href = urldecode(document.location.href).split('#');	// urldecode 필수
	if (exp_href[0] != undefined) link = exp_href[0];
	else link = exp_href;
	if (filter !== 'N') link = ajax_url_filter(link, '', '', urle);
	var frm_pw = $('input[name=passwd]').attr('value');
	if (frm_pw != '' && frm_pw !== undefined) link = set_url_tail(link, 'APT=' + frm_pw, 'N');
	return link;
}

function ajax_url_filter(url, exot, exdlg, urle) {
	var qs = '';
	var exp_url = url.split('?');
	if (exp_url.length > 1) qs = exp_url[1];
	var new_qs = qs.replace(/&*AJAX=Y/, '');
	if (new_qs != '' && exdlg !== 'Y') new_qs = new_qs.replace(/&*DLG=Y/, '');
	if (new_qs != '' && exot !== 'Y') new_qs = new_qs.replace(/&*OTSKIN=.+\.php/, '');
	if (new_qs != '') new_qs = new_qs.replace(/&*_isconfirm_=[0-9]+/, '');
	if (new_qs != '') new_qs = new_qs.replace(/#.+$/, '');
	if (new_qs != '') {
		if (urle === 'Y') new_qs = encodeURI_all(new_qs);		// 모든 인자 url 인코딩
		else new_qs = new_qs.replace(/ /g, '%20');
	}
	if (new_qs != '') {
		if (new_qs.substr(0, 1) === '&') new_qs = new_qs.substr(1);
		if (new_qs != '') new_qs = '?' + new_qs;
	}
	return exp_url[0] + new_qs;
}

// url뒤에 파라메타를 붙여주는 함수
// ptgq : post 검색시 get 변수화 된 값들도 링크에 적용할 때 사용 (예외 : AB_btn_dialog, AB_btn_submit 의 post 전송시 등)
// 댠순 url_tail 하려면 set_url_tail(url, tail, 'N', 'Y', 'X', 'Y');
function set_url_tail(url, tail, filter, exot, ptgq, exdlg, urle) {
	var conn_str = '&';
	var T_ptgq = post_to_get_qs;
	var ut1 = url.substr(url.length-1, 1); if (ut1 === '?' || ut1 === '&') url = url.substr(0, url.length-1);
	if (filter !== 'N') url = ajax_url_filter(url, exot, exdlg, urle); if (url.indexOf('?') < 0 && url.indexOf('&') < 0) conn_str = '?';
	if (T_ptgq != '') {	// post_to_get_qs 값이 있을때 url에 이미 중복된 파라메타 값이 있으면 중복되서 붙지 않도록 제거함
		var ptgqs = JSON.parse('{"' + decodeURI(T_ptgq).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
		Object.keys(ptgqs).forEach(function(k) { if (url.indexOf(k + '=') >= 0) delete ptgqs[k]; });
		var new_ptgq = []; Object.keys(ptgqs).forEach(function(k) { new_ptgq.push(k + '=' + ptgqs[k]); });
		T_ptgq = new_ptgq.join('&');
	}//console.log(url);
	return url + conn_str + (T_ptgq == '' || ptgq === 'X' ? '' : T_ptgq + '&') + tail;
}

function set_url_parm(url, sParm) {
	var qs = '';
	var exp_url = url.split('?');
	if (exp_url.length > 1) qs = exp_url[1];
	$.each(sParm, function(key, val) {
		var patt = new RegExp('[\?&]*' + key + '=[^&]*');
		qs = qs.replace(patt, '') + '&' + key + '=' + val;
	});
	if (qs != '') {
		if (qs.substr(0, 1) === '&') qs = qs.substr(1);
		if (qs != '') qs = '?' + qs;
	}
	return exp_url[0] + qs;
}

function get_srv_var(obj, vn) {
	var dialog = $('.sitecook-dialog', obj.parents('div'));
	if (dialog.length <= 0) return eval(vn);
	else return eval(vn + '_dlg');
}

// 스와이프 방향 파악 함수
function get_direction_swip(obj, callbacks, callbackm, callbacke) {
	// min_dst : 스와이프로 인식할 최소 거리, max_dst_v : 수직 스와이프 최대 거리, limit_dur : 스와이프 시간
	var obj = obj, min_dst = 30, max_dst_v = 30, limit_dur = 1000, duration, stt_point, direction, stt_x, stt_y, dst_x, dst_y;
	obj.addEventListener('touchstart', function(e) {
		var obj_this = e.changedTouches[0];
		direction = 'none'; dist = 0; stt_x = obj_this.pageX; stt_y = obj_this.pageY;
		stt_point = new Date().getTime(); if (callbacks !== undefined) { /*alert(callbacks); */callbacks(e); }
	}, false);
	obj.addEventListener('touchmove', function(e) {
		if (callbackm !== undefined) { /*alert(callbackm); */callbackm(e) };
	}, false);
	obj.addEventListener('touchend', function(e) {
		var obj_this = e.changedTouches[0]
		dst_x = obj_this.pageX - stt_x	// 가로 이동거리
		dst_y = obj_this.pageY - stt_y	// 세로 이동거리
		duration = new Date().getTime() - stt_point // 이동 시간
		if (duration <= limit_dur){ 		// 허용된 이동시간 이내 이면
			if (Math.abs(dst_x) >= min_dst && Math.abs(dst_y) <= max_dst_v) direction = dst_x < 0 ? 'L' : 'R';		// 가로 스와이프, 0보다 작으면 왼쪽 크면 오른쪽
			else if (Math.abs(dst_y) >= min_dst && Math.abs(dst_x) <= max_dst_v) direction = dst_y < 0 ? 'U' : 'D';	// 세로 스와이프, 0보다 작으면 위쪽 크면 아래쪽
		}
		if (callbacke === undefined) callbacke = function(direction){ alert(direction); };
		callbacke(direction);
	}, false);
}

/*// 쇼핑몰 장바구니용
function verify_submit_sbag(act, idx, lets_buy) {
	var ajax_area = 'ABS-sbag';
	var form = document.frmsbaglist;
	var cnt = form.records.value;
	
	form.proc_mode.value = act;
	if (form.is_DB.value !== 'X') form.is_DB.value = '';		// 주문서에서 수정, 삭제시 is_DB 값은 X로 고정되며 변하면 안됨.
	if (lets_buy !== undefined) form.is_DB.value = lets_buy;
	
	switch (act) {
		case 'alldelete' :
			if (!confirm('바구니를 모두 비우시겠습니까?')) return;
		break;
		case 'SAU' :
			for (i=0; i<cnt; i++) {
				var obj_qty = document.getElementById('qty_' + i);
				if (obj_qty.value == '') {
					alert_core('수량을 입력해 주십시오.');
					obj_qty.focus();
					return;
				} else if (isNaN(obj_qty.value)) {
					alert_core('수량을 숫자로 입력해 주십시오.');
					obj_qty.focus();
					return;
				} else if (obj_qty.value < 1) {
					alert_core('수량은 1 이상 입력해 주십시오.');
					obj_qty.focus();
					return;
				}
			}
		break;
		case 'delete_select' :
			if (submit_radio_check(form, 'chk_id[]', 'checkbox') == 0) {
				alert_core('삭제할 상품을 선택하세요');
				return;
			}
		break;
		case 'delete' :
			form.sbag_serial_1.value = idx;
		break;
	}
	if (lets_buy !== '1') submit_direct_ajax(obj, form);
	else form.submit();
}*/

function open_search_post(ref) {
	open_window_mouse(ref, -200, -200, 500, 570, 'win_search_post');
}