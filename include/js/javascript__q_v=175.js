// __mouse_xy : jquery-abuilder.js
var os_type, flag_ajax_history;
if (navigator.userAgent.indexOf('Win') != -1) os_type = 'win';
else if (navigator.userAgent.match(/iphone|ipad|ipod/i)) os_type = 'ios';
else if (navigator.userAgent.indexOf('Mac') != -1) os_type = 'mac';
else if (navigator.userAgent.indexOf('Linux') != -1) os_type = 'Linux';
else if (navigator.userAgent.indexOf('SunOS') != -1) os_type = 'sun';
else if (navigator.userAgent.indexOf('BSD') != -1) os_type = 'bsd';
else if (navigator.userAgent.indexOf('OS/2') != -1) os_type = 'os2';
else if (navigator.userAgent.indexOf('BeOS') != -1) os_type = 'BeOS';
else if (navigator.userAgent.indexOf('Bot') != -1) os_type = 'bot';

var browser_type;
if (navigator.userAgent.indexOf('MSIE 5') != -1) browser_type = 'IE5';
else if (navigator.userAgent.indexOf('MSIE 6') != -1) browser_type = 'IE6';
else if (navigator.userAgent.indexOf('MSIE 7') != -1) browser_type = 'IE7';
else if (navigator.userAgent.indexOf('MSIE 8') != -1) browser_type = 'IE8';
else if (navigator.userAgent.indexOf('MSIE 9') != -1) browser_type = 'IE9';
else if (navigator.userAgent.indexOf('MSIE 10') != -1) browser_type = 'IE10';
else if (navigator.userAgent.indexOf('MSIE 11') != -1) browser_type = 'IE11';
else if (navigator.userAgent.indexOf('MSIE 12') != -1) browser_type = 'IE12';
else if (navigator.userAgent.indexOf('MSIE 13') != -1) browser_type = 'IE13';
else if (navigator.userAgent.indexOf('MSIE 14') != -1) browser_type = 'IE14';
else if (navigator.userAgent.indexOf('MSIE 15') != -1) browser_type = 'IE15';
else if (navigator.userAgent.indexOf('MSIE') != -1 || navigator.userAgent.indexOf('Trident') != -1) browser_type = 'IE';
else if (navigator.userAgent.indexOf('Chrome') != -1) browser_type = 'Chrome';
else if (navigator.userAgent.indexOf('Firefox') != -1) browser_type = 'FF';
else if (navigator.userAgent.indexOf('Safari') != -1) browser_type = 'Safari';
else browser_type = 'ETC';

var user_level;
var PU_host = parse_url(document.location.href);

// base64 함수
function base64_encode(str) { return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) { return String.fromCharCode('0x' + p1); })); }
function base64_decode(str) { return decodeURIComponent(atob(str).split('').map(function(c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join('')); }

// htmlspecialchars, decode
function htmlspecialchars(str) { var map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }; return str.replace(/[&<>"']/g, function(m) { return map[m]; }); }
function htmlspecialchars_decode(str) { var map = {'&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'" }; return str.replace(/(&amp;|&lt;|&gt;|&quot;|&#039;)/g, function(m) { return map[m]; }); }

/*// json 줄바꿈 치환 (오류방지목적)function jsonEscape(str)  { return str.replace(/\n/g, '\\n').replace(/\r/g, "\\r").replace(/\t/g, "\\t"); }*/

// 단일분류값을 단계별로 나누는 함수
function get_ctg1_slice(ctg_info, saved_value) {
	var saved_ctgs = [];
	saved_value = saved_value.replace('\$', '');
	saved_ctgs.push(saved_value.substring(0, 4));
	for (var i_substr=ctg_info.ctg_root.length+ctg_info.ctg_length; i_substr<ctg_info.ctg_depth*ctg_info.ctg_length; i_substr+=ctg_info.ctg_length) {
		var ctg_part = saved_value.substring(i_substr, i_substr+ctg_info.ctg_length);
		if (ctg_part != '') saved_ctgs.push(saved_ctgs[saved_ctgs.length-1] + ctg_part);
	}
	return saved_ctgs;
}

// 카운트업 시키는 함수
// new count_up("숫자를 감싸는 객체 id", 카운팅숫자, 시작딜레이밀리초, 카운팅시간밀리초, 콤마사용이면'Y');
function count_up(targ_frm, targ_num, s_delay, c_delay, comma) {
	this.count = 0; this.diff = 0; this.targ_cnt = parseInt(targ_num); this.targ_frm = document.getElementById(targ_frm);
	if (c_delay >= 1000) c_delay = (targ_num / 1000) * (c_delay / 1000); // 1000 기준의 딜레이 시간을 구하고 1000기준 몇배의 로딩시간인지 구해 곱해서 최종 딜레이 시간을 구한다.
	this.delay = c_delay; this.comma = comma; this.timer = null; var obj_this = this; setTimeout(function() { obj_this.counter(); }, s_delay);
}
count_up.prototype.counter = function() {
	var self = this; this.diff = this.targ_cnt - this.count; if(this.diff > 0) self.count += Math.ceil(this.diff / 5);
	var value = this.count.toString(); if (this.comma === 'Y') value = number_format(value); this.targ_frm.innerHTML = value;
	if(this.count < this.targ_cnt) this.timer = setTimeout(function() { self.counter(); }, this.delay); else clearTimeout(this.timer);
}

function get_ajax_history(nm_aaw_history) {
	//console.log('get : ' + nm_aaw_history);
	if (flag_ajax_history !== 'G') eval(nm_aaw_history + '.pop()');
	flag_ajax_history = 'G';
	return eval(nm_aaw_history + '.pop()');
}

function set_ajax_history(nm_aaw_history, load_url) {
	if (nm_aaw_history.substr(0, 1) !== '-') {	// 실시간으로 생성되는 aaw 는 제외
		//console.log('set : ' + nm_aaw_history);
		if (eval('typeof(' + nm_aaw_history + ')') === 'undefined') eval(nm_aaw_history + ' = ["' + load_url + '"]');
		else eval(nm_aaw_history + '.push("' + load_url + '")');
		flag_ajax_history = 'S';
	}
}

function remove_ajax_history(nm_aaw_history) {
	//console.log('remove : ' + nm_aaw_history);
	if (eval('typeof(' + nm_aaw_history + ')') !== 'undefined') eval(nm_aaw_history + ' = undefined');
}

function str_to_json(str) {
	var result = {};
	if (str.substring(0, 1) === '{' && str.substring(str.length-1, str.length) === '}') result = jQuery.parseJSON(str);
	return result;
}

// obj(iframe) 높이조절
function resizeIframe(obj) {
	//console.log(obj.contentWindow.document.body.scrollWidth + ' ' + obj.contentWindow.document.body.scrollHeight);
	obj.style.width = obj.contentWindow.document.body.scrollWidth + 'px';
	obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
	//console.log(obj.style.width + ' ' + obj.style.height);
}

// iframe 리사이즈
function ifr_resize(obj) { 
  var ch = obj.contentWindow.document.body.scrollHeight; 
  obj.style.height = ch; 
}

// 숫자키만 허락하는 함수
function is_number_key(e) {
	e = (e) ? e : window.event;
	var charCode = (e.which) ? e.which : e.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
	return true;
}

// 다음 문자를 찾는 함수
function next_char(c) {
	var u = c.toUpperCase();
	if (same(u,'Z')) {
		var txt = '';
		var i = u.length;
		while (i--) txt += 'A';
		return (txt + 'A');
	} else {
		var p = '';
		var q = '';
		if (u.length > 1) {
			p = u.substring(0, u.length - 1);
			q = String.fromCharCode(p.slice(-1).charCodeAt(0));
		}
		var l = u.slice(-1).charCodeAt(0);
		var z = next_letter(l);
		if (z==='A') return p.slice(0,-1) + next_letter(q.slice(-1).charCodeAt(0)) + z;
		else return p + z;
	}
}
function next_letter(l) { if (l < 90) return String.fromCharCode(l + 1); else return 'A'; }
function same(str,char) { var i = str.length; while (i--) if (str[i]!==char) return false; return true; }

function replace_include_string(str, select) {
	var sel_cnt = 0;
	str = str.replace("\\\\", "\\");
	if (select !== undefined) sel_cnt = select.length;
	if (sel_cnt == 0 || in_array('|', select)) str = str.replace(/_\\TDV\\_/g, '|');
	if (sel_cnt == 0 || in_array('~', select)) str = str.replace(/_\\TIL\\_/g, '~');
	if (sel_cnt == 0 || in_array(':', select)) str = str.replace(/_\\COL\\_/g, ':');
	if (sel_cnt == 0 || in_array(';', select)) str = str.replace(/_\\SEM\\_/g, ';');
	if (sel_cnt == 0 || in_array(',', select)) str = str.replace(/_\\COM\\_/g, ',');
	if (sel_cnt == 0 || in_array('=', select)) str = str.replace(/_\\EQU\\_/g, '=');
	if (sel_cnt == 0 || in_array(' ', select)) str = str.replace(/_\\BLA\\_/g, ' ');
	return str;
}

function rev_include_string(str, select) {
	var sel_cnt = 0;
	if (select !== undefined) sel_cnt = select.length;
	if (sel_cnt == 0 || in_array('|', select)) str = str.replace(/\|/g, "_\\TDV\\_");
	if (sel_cnt == 0 || in_array('~', select)) str = str.replace(/~/g, "_\\TIL\\_");
	if (sel_cnt == 0 || in_array(':', select)) str = str.replace(/:/g, "_\\COL\\_");
	if (sel_cnt == 0 || in_array(';', select)) str = str.replace(/;/g, "_\\SEM\\_");
	if (sel_cnt == 0 || in_array(',', select)) str = str.replace(/,/g, "_\\COM\\_");
	if (sel_cnt == 0 || in_array('=', select)) str = str.replace(/=/g, "_\\EQU\\_");
	if (sel_cnt == 0 || in_array(' ', select)) str = str.replace(/ /g, "_\\BLA\\_");
	return str;
}

function MM_preloadImages() { //v3.0
  var d=document; if (d.images){ if (!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if (!d) d=document; if ((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if (!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if (!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if (!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_jumpMenu(targ,selObj,restore,link_head){ //v3.0
	if (selObj.value == '') return;
	if (link_head == undefined) link_head = '';
	eval(targ+".location='"+link_head+selObj.options[selObj.selectedIndex].value+"'");
	if (restore) selObj.selectedIndex=0;
}

function MM_jumpMenu_window(targ,selObj,restore){ //v3.0
	if (selObj.value == '') return;
	window.open(selObj.options[selObj.selectedIndex].value, 'window_quick', 'top=0,left=0,width=900,height=700,resizable=yes,scrollbars=yes,menubar=yes');
	if (restore) selObj.selectedIndex=0;
}

function MM_jumpMenu_radio(targ,selObj,restore){ //v3.0
	if (selObj.value == '') return;
	eval(targ+".location='"+selObj.value+"'");
	if (restore) selObj.selectedIndex=0;
}

function MM_showHideLayers() { //v3.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
}

function MM_showHideBoards() { //v6.0
  var i,p,v,obj,args=MM_showHideBoards.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='block')?'block':(v=='none')?'none':v; }
    obj.display=v; }
}

function MM_toggleBoards() {
	var i,obj,args=MM_toggleBoards.arguments;
	for (i=0; i<(args.length); i++) {
		if ((obj=MM_findObj(args[i]))!=null) {
			if (obj.style.display != "none") obj.style.display = "none";
			else obj.style.display = "";
		}
	}
}

function show_layer(lname, flag) {
	layer = (navigator.appName == 'Netscape') ? document.layers[lname] : document.all[lname];
	if (typeof(layer) == 'undefined' || lname == '') return;
	if (navigator.appName == 'Netscape') layer.visibility = (flag == 0) ? 'show' : 'hide';
	else layer.style.visibility = (flag == 0) ? 'visible' : 'hidden';
}

// 마우스 위치에 새 창을 여는 함수
function open_window_mouse(ref, x_control, y_control, width, height, name) {
	x_owm = __mouse_xy[2];
	y_owm = __mouse_xy[3];
	if (typeof(x_control) == "number") x_owm = x_owm + x_control;
	if (typeof(y_control) == "number") y_owm = y_owm + y_control;
	if (name == '') name = 'OWM';
	window.open(ref,name,'width=' + width + ',height=' + height + ',status=0,resizable=1,scrollbars=1,top=' + y_owm + ',left=' + x_owm + '').focus();
}

// 새 창을 여는 함수
function open_window(ref, left, top, width, height, name) {
	if (name == '') name = 'OW';	
	if (top != '') top = ',top=' + top;
	if (left != '') left = ',left=' + left;
	window.open(ref,name,'width=' + width + ',height=' + height + ',status=0,resizable=1,scrollbars=1' + top + left + '').focus();
}

// obj : 객체, len: 최대길이, gb: 입력여부체크
function get_str_byte(obj) {
	var j = k = 0;
	var tempStr = tempStr2 = '';
	for(i = 0; i < obj.value.length; i++  )	{
		tempStr = obj.value.charCodeAt(i);
		tempStr2 = tempStr.toString();
		if (tempStr2.length >= 5) j++;		// 한글
		else k++;									// 영문
	}
	ln = k+(j*2);
	return ln;
}
function chkTxarea(obj, len, gb, obj_print_len_box, len_min, msg) {
	var return_value = true;
	var ln = get_str_byte(obj);
	//obj.value = trim(obj.value);
	if (gb == "D" && ln == 0) {
		alert(lang_core[5]);
		obj.focus();
		obj.select();
		return_value = false;
	}
	if (obj_print_len_box != '') obj_print_len_box.value = ln;
	if (len_min != '') {
		if (ln < len_min) {
			if (msg != '' && msg != undefined) alert(msg);
			else alert(len_min+lang_core[6]+ ln +" Byte)");			
			obj.focus();
			return_value = false;
		}
	}
	if (ln > len) {
		if (msg != '' && msg != undefined) alert(msg);
		else alert(len+lang_core[6]+ ln +" Byte)");
		obj.focus();
		return_value = false;
	} else {
		if (obj_print_len_box != '') obj_print_len_box.value = ln;
		//return true;
	}
	if (obj_print_len_box != '') $(obj_print_len_box).change();
	return return_value;
}

/*function coloring_box(obj, color) {
	if (color == '') color = "#EDFBFF;";
	obj.style.background = color;
}

function focus_msg(obj, msg, color) {
	if (msg != '') alert(msg);
	if (color != '') coloring_box(obj, color);
	obj.focus();
}*/

// 입력상자에 숫자만 입력되도록 걸러주는 함수
function ck_number(obj, min, max, msg, r_type) {
	var minus = '';
	if (obj.value == '') return;
	if (typeof(msg) == 'undefined') msg = '';
	x = no_comma(obj.value);									// 콤마제거
	if (x.charAt(0) == '-') {									// 음수인 경우
		minus = '-';												// minus flag 에 - 지정
		x = x.substring(1, x.length);							// 양수로 변환
	}
	if (isNaN(x)) {												// 1. 숫자가 아닌경우 메시지 후 원위치
		alert(lang_core[7]);
		obj.value = obj.defaultValue;
		obj.focus();
	} else {															// 숫자인경우
		if (typeof(min) != 'undefined' && !isNaN(min) && min != 0) {	// 2. 최소 입력 값 처리 (최소 입력값 보다 작으면 원위치)
			if (minus + x < min) {								// 음수반영
				if (msg == '') {
					if (typeof(max) != 'undefined' && !isNaN(max) && max != 0) msg = min + ' ~ ' + max + lang_core[8];
					else msg = min + lang_core[9];
				}
				alert(msg);
				obj.value = obj.defaultValue
				obj.focus();
				return;
			}
		}
		if (typeof(max) != 'undefined' && !isNaN(max) && max != 0) {	// 3. 최대 입력 값 처리 (최대 입력값 보다 크면 원위치)
			if (minus + x > max) {								// 음수반영
				if (msg == '') {
					if (typeof(min) != 'undefined' && !isNaN(min) && min != 0) msg = min + ' ~ ' + max + lang_core[8];
					else msg = max + lang_core[10];
				}
				alert(msg);
				obj.value = obj.defaultValue
				obj.focus();
				return;
			}
		}
		var sosu = 0;
		if (obj.getAttribute('data-sosu') !== null) sosu = obj.getAttribute('data-sosu');
		var r_value = minus + number_format(x, sosu);	// 콤마 찍어서
		if (r_type === 'R') return r_value;
		else obj.value = r_value;
	}
}

function ck_number_1(obj) {
	x = obj.value;
	if (x !== '-' && isNaN(x)) {
		alert(lang_core[7]);
		obj.value = obj.defaultValue;
		obj.focus();
	}
}

// 주어진 문자열의 콤마를 없애는 함수
function no_comma(data) { if (data == '' || data == undefined) data = 0; return data.toString().replace(/[^0-9\.\-]/g, ''); }
/*function no_comma(data) {
	T_data = '';
	targ_str = ',';
	for (NC_i=0; NC_i<data.length; NC_i++) {
		if (data.charAt(NC_i) != targ_str) T_data += data.charAt(NC_i);
	}
	return T_data;
}*/


// 3자리마다 콤마를 찍어줌
// http://phpjs.org/functions/number_format/
function number_format(number, decimals, dec_point, thousands_sep) {
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, dec = (typeof dec_point === 'undefined') ? '.' : dec_point, s = '', toFixedFix = function (n, prec) {
		var k = Math.pow(10, prec);
		return '' + Math.round(n * k) / k;
	};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[0].length > 3) s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}

function check_number(value, min, max) {
	reg_express = new RegExp('^[0-9]{' + min + ',' + max + '}$');
	if (!reg_express.test(value)) return false;
}

function check_digit(checkval) {
	val = new String(checkval);
	len = val.length;
	for (idx=0; idx<len; idx++) {
		if (val.charAt(idx) != '0' && val.charAt(idx) != '1' && val.charAt(idx) != '2' && val.charAt(idx) != '3' && val.charAt(idx) != '4' && val.charAt(idx) != '5' && val.charAt(idx) != '6' && val.charAt(idx) != '7' && val.charAt(idx) != '8' && val.charAt(idx) != '9' )  return 
		false;
	}
	return true;
}

// 주민등록번호 체크
function social_no_chk(socialno) {
	if ( socialno.length != 13 ) return false;
	lastid	= parseFloat(socialno.substring(12,13));
	value0 	= parseFloat(socialno.substring(0,1))	* 2;
	value1 	= parseFloat(socialno.substring(1,2))	* 3;
	value2 	= parseFloat(socialno.substring(2,3))	* 4;
	value3 	= parseFloat(socialno.substring(3,4))	* 5;
	value4 	= parseFloat(socialno.substring(4,5))	* 6;
	value5 	= parseFloat(socialno.substring(5,6))	* 7;
	value6 	= parseFloat(socialno.substring(6,7))	* 8;
	value7 	= parseFloat(socialno.substring(7,8))	* 9;
	value8 	= parseFloat(socialno.substring(8,9))	* 2;
	value9 	= parseFloat(socialno.substring(9,10))  * 3;
	value10	= parseFloat(socialno.substring(10,11)) * 4;
	value11	= parseFloat(socialno.substring(11,12)) * 5;
	value12 = 0;
	value12 = value0+value1+value2+value3+value4+value5+value6+value7+value8+value9+value10+value11+value12;
	li_mod = value12 % 11;
	li_minus = 11 - li_mod;
	li_last = li_minus % 10;
	if (li_last != lastid) return false;
 	return true;
}

// 다중 선택상자의 선택된 항목값의 조합을 만듬
function multi_select(form, new_name, name, divider) {
	var select_flag = 0;						
	var multi_value = divider;
	var T_name = eval("form." + name);
	var T_new_name = eval("form." + new_name);
	for (var i=0; i<T_new_name.length; i++) {
		if (T_new_name.options[i].selected && T_new_name.options[i].value != '') {
			multi_value += T_new_name.options[i].value + divider;
			select_flag = 1;
		}
	}
	if (select_flag == 1) T_name.value = multi_value;
	else T_name.value = '';
	$('input[name=' + name + ']').trigger('change');
}

// 다중 체크상자의 선택된 항목값의 조합을 만듬
// targ(V:값적용, T:라벨적용, A:둘다적용/입력상자 있어야 함)
// fix_value : 유지할 값(옵션), fix_value_name : targ 'A' 경우 유지할 값(옵션)
function multi_check(form, new_name, name, divider, obj_this, fix_value, targ, fix_value_name, chk_limit) {
	var chk_array = [], chk_name_array = [], fix_array = [], fix_array_name = [], otp;
	if (obj_this !== undefined) { if (name.substr(name.length-2, 2) !== '[]') otp = obj_this.closest('form'); } else { otp = form; } if (otp === null || otp === undefined) otp = obj_this.closest('div,table,td');//console.log(otp);
	var frm_els = Array.from(otp.getElementsByTagName('input')), cnt = frm_els.length, nm_cnt = new_name.length, otpjq = $(otp); if (fix_value !== undefined && fix_value != '') fix_array = fix_value.substr(1, fix_value.length-2).split(';');
	if (fix_value_name !== undefined && fix_value_name != '') fix_array_name = fix_value_name.substr(1, fix_value_name.length-2).split(';'); if (chk_limit === undefined || chk_limit == '') chk_limit = 0; if (targ !== 'T' && targ !== 'A') targ = 'V';
	for (i=0; i<cnt; i++) {
		if ((frm_els[i].type == 'checkbox' || frm_els[i].type == 'radio') && frm_els[i].name.substring(0, nm_cnt) == new_name) {
			var targ_value_name = '';
			var targ_value = frm_els[i].value;
			var targ_text = $('label[for="' + frm_els[i].id + '"]', otpjq).text();//console.log(targ_text);
			if (targ === 'T') targ_value = targ_text;
			else if (targ === 'A') targ_value_name = targ_text;
			if (frm_els[i].disabled != true && frm_els[i].checked && targ_value != '') {
				chk_array.push(targ_value);
				if (targ === 'A' && targ_value_name != '') chk_name_array.push(targ_value_name);
			} else if (obj_this !== undefined && obj_this.name === frm_els[i].name) {
				if (fix_array.length > 0) fix_array[array_search(targ_value, fix_array)] = '';	// 저장된 값으로 넘어온 값중 클릭한 자신은 제외
				if (targ === 'A' && fix_array_name.length > 0) fix_array_name[array_search(targ_value_name, fix_array_name)] = '';
			}
		}
	}
	if (chk_limit > 0 && chk_array.length > chk_limit) {
		alert(chk_limit + lang_core[11]);
		obj_this.checked = false;
		return false;
	}
	/*var T_name = eval("form." + name);
	chk_array = array_unique(fix_array.concat(chk_array));
	chk_array = chk_array.filter(function(idx){return idx != ''});
	if (chk_array.length > 0) T_name.value = trim(divider + chk_array.join(divider) + divider);
	else T_name.value = ''; $('input[name=' + name + ']').trigger('change');*/
	var obj_hid = otpjq.find('input[name="' + name + '"][type="hidden"],input[name="' + name + '"][type="text"]');// console.log(obj_hid);
	chk_array = array_unique(fix_array.concat(chk_array)); chk_array = chk_array.filter(function(idx){return idx != ''});
	if (chk_array.length > 0) obj_hid.val(trim(divider + chk_array.join(divider) + divider)); else obj_hid.val(''); obj_hid.trigger('change');
	if (targ === 'A') {
		var T_name = eval("form." + name + '_name');
		chk_name_array = array_unique(fix_array_name.concat(chk_name_array));
		chk_name_array = chk_name_array.filter(function(idx){return idx != ''});
		if (chk_name_array.length > 0) T_name.value = trim(divider + chk_name_array.join(divider) + divider);
		else T_name.value = ''; $('input[name=' + name + '_name]').trigger('change');
	}
}

// 라디오 버튼 값을 돌려주는 함수 (체크가 안된 상태면 false 리턴)
//function submit_radio_check(form, name) {
function submit_radio_check(form, name) {
	frm_els = document.getElementsByName(name);
	cnt = frm_els.length ;
	for (i_radio_check=0; i_radio_check<cnt; i_radio_check++) {
		if (frm_els[i_radio_check].checked) return frm_els[i_radio_check].value;
	}
	return false;
}

// 멀티 체크상자에서 '전체' 항목을 체크하면 나머지는 비활성되도록 하는 함수
function chk_box_tog_all(form, chk_box_name, hdn_box_name, idx_all, divider) {
	var FL_all_chk = true;																																	// 전체이외의 나머지가 모두 체크되었는지 확인 하는 플래그
	var obj_checkbox = document.getElementsByName(chk_box_name);
	var obj_hidden_box = document.getElementsByName(hdn_box_name);
	var cnt_chk_box = obj_checkbox.length;
	if (obj_checkbox[idx_all].checked) {
		for (i=0; i<cnt_chk_box; i++) {
			if (i == idx_all) continue;
			obj_checkbox[i].disabled = true;
		}
	} else {
		for (i=0; i<cnt_chk_box; i++) {
			if (i == idx_all) continue;
			obj_checkbox[i].disabled = false;
			if (obj_checkbox[i].checked == true) FL_all_chk = false;									// 한번이라도 체크되었으면 플래그변수 값 변경
		}
	}
	if (FL_all_chk == false) obj_checkbox[idx_all].disabled = true;								// 한번이라도 체크된 경우 '전체' 항목 체크상자는 비활성
	else obj_checkbox[idx_all].disabled = false;
	multi_check(form, chk_box_name, hdn_box_name, divider);											// 체크상자 실제(모음)값 적용
}

// 폼내부 객체중 제외한 것들만 빼고 모두 비활성 시킴 (GET 방식의 검색에서 검색에 활용될 입력상자만 유지할때 활용됨)
// except_head 제외할 객체명의 헤더값 (입력 예 : SCH_)
// excepts : 비활성 예외 객체명을 담은 배열변수
function disabled_except_obj(form, except_head, excepts) {
	var frm_els = form.elements;
	var cnt = frm_els.length;
	var cnt_except_head = except_head.length;
	var flag;
	for (i=0; i<cnt; i++) {
		flag = 'Y';
		if (typeof(frm_els[i].name) !== 'string') continue;
		for (j=0; j<excepts.length; j++) {													// 제외목록 처리 (name 값이 넘어오지 않는 객체도 비활성화 제외, fieldset 태그등)
			if (frm_els[i].name == '' || frm_els[i].name == excepts[j]) {
				flag = 'N';
				break;
			}
		}
		if (frm_els[i].name.substring(frm_els[i].name.length-8) !== '_multi[]') {
			if (frm_els[i].name.substring(0, cnt_except_head) == except_head && frm_els[i].value != '') {		// 제외 헤더처리
				flag = 'N';
				continue;
			}
			if (frm_els[i].name.substring(frm_els[i].name.length-cnt_except_head) == except_head && frm_els[i].value != '') {		// 제외 푸터처리
				flag = 'N';
				continue;
			}
		}
		if (flag == 'Y' || (frm_els[i].value == '' && frm_els[i].defaultValue == '')) {
			frm_els[i].setAttribute('rtd', 'Y');
			frm_els[i].disabled = true;
		}
	}
}

// 폼내부 객체를 비활성 시킴 (GET 방식의 검색에서 불필요한 입력상자를 제거할 때 활용됨)
// except_head 비활성 객체명의 헤더값 (입력 예 : _multi)
function disabled_obj(form, except_head, excepts) {
	var frm_els = form.elements;
	var cnt = frm_els.length;
	var cnt_except_head = except_head.length;
	var flag;
	for (i=0; i<cnt; i++) {
		flag = 'N';
		if (typeof(frm_els[i].name) !== 'string') continue;															// name 값이 넘어오지 않는 객체도 비활성화 제외, fieldset 태그등
		if (flag == 'N' && in_array(frm_els[i].name, excepts)) flag = 'Y';
		if (flag == 'N' && frm_els[i].name.substring(0, cnt_except_head) == except_head) flag = 'Y';		// 비활성 헤더 처리
		if (flag == 'N' && frm_els[i].name.substring(frm_els[i].name.length-cnt_except_head) == except_head) flag = 'Y';	// 비활성 푸터 처리
		if (flag == 'Y') frm_els[i].disabled = true;
	}
}

// 다수의 체크상자가 체크되었는지 여부 (개수리턴)
function submit_multi_checkbox(checkbox_name) {
	var obj_checkbox = document.getElementsByName(checkbox_name);
	var cnt = obj_checkbox.length;
	var flag = 0;
	for (i=0; i<cnt; i++) {
		if (obj_checkbox[i].checked) flag++;
	}
	return flag;
}

function get_radio_value(obj) {
	if (typeof(obj) == 'undefined') return;
	if (obj.type === 'select-one' || obj.type === 'hidden') return obj.value;
	cnt = obj.length;
	if (cnt > 1) { for (i=0; i<cnt; ++i) if (obj[i].checked) return obj[i].value; }
	else { if (obj.checked) return obj.value; }
}

/*function callColorPicker(tmpx, tmpy, d, e, str_btn, str_input) {
	x = __mouse_xy[2] + tmpx;
	y = __mouse_xy[3] + tmpy;
	showColorPicker(x, y, d, str_btn, str_input);
	return;
}

function showColorPicker(x, y, d, str_btn, str_input) {
	var Selcol = showModalDialog('./include/js/palbas.html','palbas','font-family:Verdana; font-size:12px; dialogWidth:215px; dialogHeight:150px; dialogLeft:' + x + 'px; dialogTop:' + y + 'px; status:no; help:no; scroll:no'); 
	if (Selcol != '') {
		var valid_color = /[0-9a-fA-F]{6}/;
		if (!valid_color.test(Selcol)) return;
		if (d == 1) {
			//c1 = Selcol;			
			btn = eval(str_btn);
			input_box = eval(str_input);
			btn.style.backgroundColor = Selcol;
			input_box.style.backgroundColor = Selcol;
			input_box.value = Selcol;
		}
	}
	return;
}*/

/* div 태그 등의 스타일 속성을 실시간으로 설정 하는 함수
pp_info
pp_info = new Array();
pp_info[href] = 'A'; ... */
function chg_tag_property(tag_name, pp_info, except_id_header) {
	tags = document.getElementsByTagName(tag_name);
	for (i=0; i<tags.length; i++) {
		if (tags[i].id.substring(0, except_id_header.length) == except_id_header) continue;
		for (key in pp_info) {			
			switch (key) {
				case 'onclick' :												// 예외적인 경우 객체 자체 속성을 변경
					obj = tags[i];
				break;
				default :															// 보통의 경우를 스타일속성 변경요청으로 보고 style 객체를 얻어 가변 속성의 값을 지정함
					obj = eval('tags[i].style');					
				break;
			}
			obj.setAttribute(key, pp_info[key]);
		}
	}
}

/* 객체 id 를 받아 속성을 변경시켜주는 함수
pp_info
pp_info = new Array();
pp_info[href] = 'A'; ... */
function chg_obj_property(obj_id, pp_info) {
	obj = document.getElementById(obj_id);
	for (key in pp_info) {			
		switch (key) {
			case 'onclick' :													// 예외적인 경우 객체 자체 속성을 변경
				T_obj = obj;
			break;
			default :																// 보통의 경우를 스타일속성 변경요청으로 보고 style 객체를 얻어 가변 속성의 값을 지정함
				T_obj = obj.style;					
			break;
		}
		T_obj.setAttribute(key, pp_info[key]);
	}
}

// 윗쪽에 있는 레이어를 아래로 내리기 위해 z-index 값을 낮추는 함수
// 문법 익혀두기 : tags[i].setAttribute("onclick", new Function("down_zindex(this)"));			// tags[i].onclick = function(){ down_zindex(this); } 로도 가능
function down_zindex(obj) {
	z_index = obj.style.zIndex;
	if (z_index > -3) obj.style.zIndex = obj.style.zIndex - 1;
	else obj.style.zIndex = 5;
}

// 태그 감추는 함수
function set_display_tag(tag_name, mode, except_id_header) {
	tags = document.getElementsByTagName(tag_name);
	for (i=0; i<tags.length; i++) {
		if (tags[i].id.substring(0, except_id_header.length) == except_id_header) continue;
		tags[i].style.display = mode;
	}
}

// 지정한 id 값이 설정된 엘리먼트를 보이게 또는 보이지 않게 하는 함수
// 활용 : enable_child_id('FIRSTTABLE', document.getElementsByTagName('table'), '')
function enable_child_id(parent_id, layer_child, excepts, reverse, header) {
	if (typeof(excepts) == "undefined") excepts = '';								// 제외목록이 없으면 널.
	if (typeof(parent_id) != "undefined") enables = parent_id.split('_');	// 선택된 입력상자의 id 값으로 보여줄 레이어 들을 배열로 저장
	else enables = '';
	for (i=0; i<layer_child.length; i++) {												// 넘어온 레이어 개수만큼 반복
		layer_child_id = layer_child[i].id
		if (layer_child_id == '') continue;												// 아이디가 없으면 건너뜀.
		if (typeof(header) != "undefined") {
			if (layer_child_id.substring(0, header.length) != header) continue;
		}
		T_flag_excepts = 'N';
		for (k=0; k<excepts.length; k++) {												// 제외목록 처리
			if (layer_child_id == excepts[k]) {
				T_flag_excepts = 'Y';
				break;
			}
		}
		if (T_flag_excepts == 'Y') continue;
		T_flag = 'N';
		for(j=0; j<enables.length; j++) {												// 보여줄 id 값들만큼 반복
			if (enables[j] == layer_child_id) {											// 레이어 id 와 동일 하면 출력 아니면 출력안함.
				T_flag = 'Y';
				break;
			}
		}
		if (reverse != 'Y') {
			if (T_flag == 'Y') layer_child[i].style.display = '';
			else layer_child[i].style.display = 'none';
		} else{
			if (T_flag == 'Y') layer_child[i].style.display = 'none';
			else layer_child[i].style.display = '';
		}
	}
}

function disable_child_radio(parent_id, obj_child) {
	enables = parent_id.split('_');
	for (i=0; i<obj_child.length; i++) {	// 하위 라디오 개수만큼 반복
		T_flag = 'N';
		for(j=0; j<enables.length; j++) {	// 선택(상위)된 입력상자의 아이디를 _ 로 분리(아이디 값에 활성화 시킬 하위 라디오의 값이 _ 구분자로 설정되어 있어야함)
			if (enables[j] == obj_child[i].value) {
				T_flag = 'Y';
				break;
			}
		}
		if (T_flag == 'Y') obj_child[i].disabled = false;
		else  obj_child[i].disabled = true;
	}
}

function deletePrevCate(form, obj) {		// 상위 카테고리가 변경될때 하위 카테고리 리스트를 삭제하는 함수
	var optionCount = eval('document.createInsiteForm.categoryList_' + depth + '.length');	// 제거해야할 select의 option 태그의 수를 얻어온다.
	for (var i=0; i<optionCount; i++) {
		eval('document.createInsiteForm.categoryList_' + depth + '.remove(0)');	// 모든 option 태그를 제거한다.
	}
}

// 상위 카테고리 리스트의 항목을 선택할때 하위 카테고리 항목을 보여주는 함수
// SELECTOPTION, SELECTVALUE 는 php 에서 출력함
// library_common.class.php 의 get_item_select_box 함수에서 본 함수를 사용함
function select_category_1(form, obj_name, obj_parent, form_name, category_2_title, code_div) {
	if (code_div == undefined) code_div = '';
	var obj = eval('form.' + obj_name);
	var optionCount = obj.length;								// 제거해야할 select의 option 태그의 수를 얻어온다.
	for (i=0; i<optionCount; i++) obj.remove(0);			// 모든 option 태그를 제거한다.
	var newOption = document.createElement('OPTION');	// 출력할 option 요소를 만든다.
	newOption.text = category_2_title;						// text 구성
	newOption.value = '';										// value 구성
	obj.add(newOption);											// 현재 선택된 카테고리 리스트의 다음 리스트에 만들어진 option 요소를 추가한다.
	if (obj_parent.value == '') return false;
	var temp1 = obj_parent.selectedIndex;
	var temp2 = obj_parent.options[temp1].value;
	var SELECTOPTION = eval('option_name_' + form_name + '_' + temp2);
	var SELECTVALUE = eval('option_value_' + form_name + '_' + temp2);
	for (var k=0; k<SELECTVALUE.length; k++) {			// 새로 나타날 하위 카테고리 목록수만큼 반복
	//for (var k=SELECTVALUE.length-1; k>=0; k--) {		// 새로 나타날 하위 카테고리 목록수만큼 반복 (먼저 세팅된 항목이 위로 나오도록)
		newOption = document.createElement('OPTION');	// 출력할 option 요소를 만든다.
		newOption.text = SELECTOPTION[k];					// text 구성
		newOption.value = SELECTVALUE[k];					// value 구성
		if (code_div != '' && temp2 == newOption.value.substring(0, temp2.length)) newOption.value = newOption.value.substring(temp2.length);
		try {
			obj.add(newOption,obj.options[null]);			// for IE earlier than version 8
		} catch (e) {
			obj.add(newOption,null);
		}
	}
}

/* 선택상자의 요소를 추가함 (연관배열이용)
option_array = { 
'a' : 'A', 
'b' : 'B', 
'c' : 'C', 
'd' : 'D' 
}
또는
option_array = new Array();
option_array[a] = 'A';
option_array[b] = 'B';
*/
function select_box_add_option(obj, option_array) {
	for (key in option_array) {
		value = option_array[key];
		newOption = document.createElement('OPTION');																				// 출력할 option 요소를 만든다.
		newOption.text = value;																																		// text 구성
		newOption.value = key;																																		// value 구성			
		obj.add(newOption);																																			// 현재 선택된 카테고리 리스트의 다음 리스트에 만들어진 option 요소를 추가한다.
	}
}

// 선택상자의 요소를 삭제함
function select_box_delete_option(obj) {
	var cnt = obj.length;															// 제거해야할 select의 option 태그의 수를 얻어온다.
	for (var i=0; i<cnt; i++) obj.remove(0);					// 모든 option 태그를 제거한다.
}

// php implode 함수
function implode(glue, pieces) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Waldo Malqui Silva
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld' 
    return ((pieces instanceof Array) ? pieces.join ( glue ) : pieces);
}

/*
bias_name : span 태그의 id
node_array : 연관배열
예 : set_radio_nodes(form, 'category_6', 'svc_term', node_array, \"class='IB_radio' onclick='chg_price(form, this);'\", 'N');
*/
function set_radio_nodes(form, name, bias_name, node_array, property, node_swap, label_head) {
	if (typeof(label_head) == 'undefined') label_head = 'label_';
	var objs = eval('form.' + name);
	bias_obj = document.getElementById(bias_name);
	for (i=0,cnt=objs.length; i<cnt; i++) {																												// 기존 노드 모두 삭제
		obj = objs[0];
		new_id = name + '_' + i;
		label_obj = document.getElementById(label_head + new_id);
		obj.removeNode();
		label_obj.innerHTML = '';
		label_obj.removeNode();
	}
	var i= 0;
	for (key in node_array) {																																	// 새 노드 삽입
		if (node_swap != 'Y') {
			radio_value = key;
			radio_label = node_array[key];
		} else {
			radio_value = node_array[key];
			radio_label = key;			
		}		
		new_id = name + '_' + i;
		new_node = document.createElement("<input type='radio' name='" + name + "' value='" + radio_value + "' id='" + new_id + "' " + property + ">");
		new_label = document.createElement("<label for='" + new_id + "' id='label_" + new_id + "'></label>");
		bias_obj.appendChild(new_node);
		bias_obj.appendChild(new_label);
		new_label.innerHTML = radio_label;
		//node_array[value] = '';
		i++;
	}
}

// 선택된 라디오버튼의 라벨명을 얻는 함수
function get_radio_label(form, name, checked_value, label_head) {
	if (typeof(label_head) == 'undefined') label_head = 'label_';
	var objs = eval('form.' + name);
	for (i=0,cnt=objs.length; i<cnt; i++) {
		new_id = name + '_' + i;
		label_obj = document.getElementById(label_head + new_id);
		if (objs[i].value == checked_value) return label_obj.innerHTML;
	}
	return '';
}

// 마우스 클릭시 레이어 메뉴 펼쳐지게 하는 함수 (아래2개)
var select_obj;
function open_mouse_layer(name, status, left_move, top_move, ignore_mp) {
	var obj = $('#' + name);
	if (ignore_mp === undefined || ignore_mp == '') ignore_mp = 'N';
	if (status == '' || status === 'block') {
		if (select_obj) {
			select_obj.css('display', 'none');
			select_obj = null;
		}
		select_obj = obj;
		if (ignore_mp === 'N' || ignore_mp === 'Y') {
			if (ignore_mp === 'Y') T_left = left_move;
			else T_left = __mouse_xy[0] + left_move;
			obj.css('left', T_left + 'px');
			if (ignore_mp === 'Y') T_top = top_move;
			else T_top = __mouse_xy[1] + top_move;
			obj.css('top', T_top + 'px');
		} else {
			var obj_parent, my_p, at_p;
			if (ignore_mp === 'C') {
				obj_parent = obj.parents('#global_dialog').length > 0 ? ('#global_dialog') : $('body');
				my_p = at_p = 'center center';
			} else if (ignore_mp === 'BC') {
				obj_parent = obj.prev();
				my_p = 'center top';
				at_p = 'center bottom';
			} else if (ignore_mp === 'BL') {
				obj_parent = obj.prev();
				my_p = 'left top';
				at_p = 'left bottom';
			}
			obj.css('display', '');
			obj.position({
				of: obj_parent,
				my: my_p,
				at: at_p,
				collision: 'flip flip'
			});
		}
	} else {
		select_obj = null;		
	}
	obj.css('display', status);
}

// 지정된 오브젝트의 left positon 을 얻음
function find_pos_x(obj){
	curleft = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curleft += obj.offsetLeft;
			obj = obj.offsetParent;
		}
	} else if (obj.x) {
		curleft += obj.x;
	}
	return curleft;
}

// 지정된 오브젝트의 top positon 을 얻음
function find_pos_y(obj) {
	curtop = 0;
	if (obj.offsetParent){
		while(obj.offsetParent){
			curtop += obj.offsetTop;
			obj = obj.offsetParent;
		}
	} else if (obj.y) {
		curtop += obj.y;
	}
	return curtop;
}

/*// 움직이는 레이어 처리
var moving_layer_zindex = 20;
function drag_layer(drag_type, evt, divName) {
	if (divName) {
		obj_moving_layer = document.getElementById(divName);
		if (obj_moving_layer.style.position != 'absolute'){
			obj_moving_layer.style.left = find_pos_x(obj_moving_layer);
			obj_moving_layer.style.top = find_pos_y(obj_moving_layer);
			obj_moving_layer.style.position = 'absolute';
		}
		obj_moving_layer.style.zIndex = ++moving_layer_zindex;
	} else {
		return;
	}
	moving_start = 1;
	moving_start_x = (browser_type == 'NS') ? evt.pageX : event.clientX;
	moving_start_y = (browser_type == 'NS') ? evt.pageY : event.clientY;
	if (drag_type < 1) {																																		// 드래그
		temp1 = parseInt(obj_moving_layer.style.left);
		temp2 = parseInt(obj_moving_layer.style.top);
		document.onmousemove = moving_layer;
	} else{																																									// 창 크기조절
		iwindoWidth = parseInt(TntiwindowTable.width); // 가로
		iwindoHeight = parseInt(TntiwindowTable.height); // 세로
		document.onmousemove = resizing_layer;
	}
}

// 마우스를 따라 움직임을 처리
function moving_layer() {
	if (moving_start == 1){
		if (browser_type == 'NS') {
			obj_moving_layer.style.left = temp1+evt.pageX-moving_start_x + 'px';
			obj_moving_layer.style.top = temp2+evt.pageY-moving_start_y + 'px';
		} else {
			obj_moving_layer.style.left = temp1+event.clientX-moving_start_x + 'px';
			obj_moving_layer.style.top = temp2+event.clientY-moving_start_y + 'px';
		}
		return false;
	}
}

// onmouseup 시 드래그 멈춤
function stop_layer() {
	moving_start = 0;
}*/

/*
*기능:특정 문자 변환
*@param text:원본 문자
*@param oldstr:찾는문자
*@param newstr:대체하는 문자
*@return 변환된 문자열
*/
function str_replace(text, oldstr, newstr) {
	cnt = text.length;
	retValue = "";
	for(i=0; i < cnt; i++){
		if (text.charAt(i) == oldstr) retValue += newstr;
		else retValue += text.charAt(i);
	}
	return retValue;
}

function image_preview(form, obj_file, obj_name_img, width, height) {
	obj_image = eval("form." + obj_name_img);
	obj_image.src = obj_file.value;
	if (width != '') obj_image.width = width;
	if (height != '') obj_image.height = height;
}

// 특정 입력상자를 체크상태에 따라 활성 또는 쓰기가능 으로 변경하는 함수
// header_cnt 체크상자 name 앞에 쓰이는 헤더 글자수, 헤더 이후의 name 값은 대상 입력상자명과 동일해야함.
function chk_box_enable(form, obj, header_cnt, mode) {
	obj_name = obj.name;
	obj_name_cnt = obj_name.length;
	obj_target_name = obj_name.substring(header_cnt, obj_name_cnt);
	obj_target = eval('form.' + obj_target_name);
	//console.log(obj_target_name);
	obj_target_select = eval('form.' + obj_target_name + '_select');			// 선택상자 세트인 경우를 대비
	if (obj.checked == true) {		// 체크된경우
		if (mode == 'D') {					// 비활성 모드
			obj_target.disabled = false;
			obj_target.style.background = '#ffffff';
			if (typeof(obj_target_select) != 'undefined') {
				obj_target_select.disabled = false;
				obj_target_select.style.background = '#ffffff';
			}
		} else {										// 읽기전용 모드
			obj_target.readOnly = false;
			//obj_target.style.background = '#ffffff';
		}
	} else {
		if (mode == 'D') {					// 비활성 모드
			obj_target.disabled = true;
			obj_target.style.background = '#fafafa';
			if (typeof(obj_target_select) != 'undefined') {
				obj_target_select.disabled = true;
				obj_target_select.style.background = '#fafafa';
			}
		} else {										// 읽기전용 모드
			obj_target.readOnly = true;
			//obj_target.style.background = '#fefefe';
		}
	}
}

// 날짜 범위 형식이 맞는지 확인
function verify_date_term(form, str) {
	if (str == '') return true;
	reg_express = new RegExp('^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})~([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$');
	if (!reg_express.test(str)) {
		alert(lang_core[12]);
		form.reset();
		return false;
	} else {
		return true;
	}
}

////////////////////////////////////////////////////
// 입력필드에 공백이 있는지 체크
var errmsg = '';
var errfld = '';

// 필드 검사
function check_field(fld, msg, msg_method) {
	//console.log(fld);
	if ((fld.value = trim(fld.value)) == '') return error_field(fld, msg, msg_method);
	else removeClass(fld, 'AB-empty-value');
	return;
}

// 필드 오류 표시
function error_field(fld, msg, msg_method) {
	if (errfld == '') errfld = fld;
	addClass(fld, 'AB-empty-value');
	if (msg != '') {
		if (msg_method == 'P') {
			alert(msg);
			errfld = '';
			return false;
		} else {
			errmsg += msg + "\n";
		}
	}
	if (errfld.type == 'text' || errfld.type == 'textarea' || errfld.type == 'select' || errfld.type == 'password') errfld.focus();
}

// 전화번호, 휴대폰과 같이 여러 필드값을 교차 검사할 때 사용
//objs = new Array();
//objs[0] = [form.phone_1, form.phone_2, form.phone_3];
//objs[1] = [form.phone_mobile_1, form.phone_mobile_2, form.phone_mobile_3];
//check_field_array(objs, '받으시는 분의 전화 또는 휴대폰 번호를 입력하세요.', '');	
function check_field_array(objs, msg, msg_method) {
	var errfld_this = '';
	flag_i = false;
	for (i=0; i<objs.length; i++) {
		flag_j = false;
		for (j=0; j<objs[i].length; j++) {
			if (typeof(objs[i][j]) == 'undefined') {
				flag_j = true;
				continue;
			}
			if (objs[i][j].disabled == false && objs[i][j].value == '') {	// 2차 오브젝트에 공백값이 있는 상태(에러)
				flag_j = true;
				break;
			}
		}
		if (flag_j == false) flag_i = true;											// 공백값이 없는경우 (통과)
	}
	if (flag_i == false) {																// 2차 오브젝트 그룹 모두가 문제가 있는 경우
		for (i=0; i<objs.length; i++) {
			flag_j = false;
			for (j=0; j<objs[i].length; j++) {
				if (typeof(objs[i][j]) == 'undefined') continue;
				if (errfld_this == '') errfld_this = objs[i][j];				// 포커스될 필드
				addClass(objs[i][j], 'AB-empty-value');
			}
		}
		if (error_field(errfld_this, msg, msg_method) == false) return false;
	} else {
		for (i=0; i<objs.length; i++) {
			flag_j = false;
			for (j=0; j<objs[i].length; j++) {
				if (typeof(objs[i][j]) == 'undefined') continue;
				removeClass(objs[i][j], 'AB-empty-value');
			}
		}
	}	
}

// 모든 타입의 객체를 대상으로, 값이 입력되거나 선택되었는지 확인 하는 함수
// 입력이 안되었으면 배경색을 변경함
// 히든 입력상자는 연결되는 선택상자들이 있는지 확인
function chk_obj_input(form, obj_name, obj_err_msg) {
	var is_empty = F_skip = 'N';
	//var form = eval('document.' + form_name);
	var form_jq = $(form);
	var obj = eval('form.' + obj_name);
	var obj_DSF = eval('form.' + obj_name + '_DSF');
	if (!obj) {																				// 날짜 선택상자인지 파악용		
		if (obj_DSF) {
			var DSF_year = eval('form.' + obj_name + '_year');
			var DSF_month = eval('form.' + obj_name + '_month');
			var DSF_day = eval('form.' + obj_name + '_day');
			var DSF_hour = eval('form.' + obj_name + '_hour');
			var DSF_minute = eval('form.' + obj_name + '_minute');
			var DSF_second = eval('form.' + obj_name + '_second');
			if (DSF_year) {
				if (!obj) obj = DSF_year;
				if (DSF_year.value == '') {
					addClass(DSF_year, 'AB-empty-value');
					is_empty = 'Y';
				} else {
					removeClass(DSF_year, 'AB-empty-value');
				}
			}
			if (DSF_month) {
				if (!obj) obj = DSF_month;
				if (DSF_month.value == '') {
					addClass(DSF_month, 'AB-empty-value');
					is_empty = 'Y';
				} else {
					removeClass(DSF_month, 'AB-empty-value');
				}
			}
			if (DSF_day) {
				if (!obj) obj = DSF_day;
				if (DSF_day.value == '') {
					addClass(DSF_day, 'AB-empty-value');
					is_empty = 'Y';
				} else {
					removeClass(DSF_day, 'AB-empty-value');					
				}
			}
			if (DSF_hour) {
				if (!obj) obj = DSF_hour;
				if (DSF_hour.value == '') {
					addClass(DSF_hour, 'AB-empty-value');
					is_empty = 'Y';
				} else {
					removeClass(DSF_hour, 'AB-empty-value');
				}
			}
			if (DSF_minute) {
				if (!obj) obj = DSF_minute;
				if (DSF_minute.value == '') {
					addClass(DSF_minute, 'AB-empty-value');
					is_empty = 'Y';
				} else {
					removeClass(DSF_minute, 'AB-empty-value');
				}
			}
			if (DSF_second) {
				if (!obj) obj = DSF_second;
				if (DSF_second.value == '') {
					addClass(DSF_second, 'AB-empty-value');
					is_empty = 'Y';
				} else {
					removeClass(DSF_second, 'AB-empty-value');
				}
			}
		}
		obj_SCH = eval('form.' + 'SCH_' + obj_name);
		if (obj_SCH) obj = obj_SCH;
	} else {
		if (obj_DSF) {
			var DSF_hour = eval('form.' + obj_name + '_hour');
			var DSF_minute = eval('form.' + obj_name + '_minute');
			var DSF_second = eval('form.' + obj_name + '_second');
			if (DSF_hour) {
				if (!obj) obj = DSF_hour;
				if (DSF_hour.value == '') {
					addClass(DSF_hour, 'AB-empty-value');
					is_empty = 'Y';
				} else {
					removeClass(DSF_hour, 'AB-empty-value');
				}
			}
			if (DSF_minute) {
				if (!obj) obj = DSF_minute;
				if (DSF_minute.value == '') {
					addClass(DSF_minute, 'AB-empty-value');
					is_empty = 'Y';
				} else {
					removeClass(DSF_minute, 'AB-empty-value');
				}
			}
			if (DSF_second) {
				if (!obj) obj = DSF_second;
				if (DSF_second.value == '') {
					addClass(DSF_second, 'AB-empty-value');
					is_empty = 'Y';
				} else {
					removeClass(DSF_second, 'AB-empty-value');
				}
			}
		}
	}
	if (!obj) {
		var exist_box = 'N';

		// 자동 분할된 입력상자 체크
		var multi_boxs = ['PHONE', 'BIZ', 'POST', 'EMAIL'];
		for (i=0,cnt=multi_boxs.length; i<cnt; i++) {
			var T_box_name_1 = eval('form.' + multi_boxs[i] + '1_' + obj_name);
			if (T_box_name_1 != undefined) {
				var exist_box = 'Y';
				var objs = new Array();
				var T_box_name_2 = eval('form.' + multi_boxs[i] + '2_' + obj_name);
				objs[0] = [T_box_name_1, T_box_name_2];
				if (multi_boxs[i] == 'PHONE' || multi_boxs[i] == 'BIZ') {
					T_box_name_3 = eval('form.' + multi_boxs[i] + '3_' + obj_name);
					objs[0][2] = T_box_name_3;
				}
				if (check_field_array(objs, '', 'S') == false) return false;
				break;
			}
		}
		if (exist_box == 'N' && form.getAttribute('chk_exist_box') !== 'N') {	// chk_exist_box 는 필요할 때 js로 주입
			alert(lang_core[13] + obj_name + lang_core[14]);
			return false;
		}
	} else {
		if (obj.type !== undefined) {		// 멀티라디오 제외 입력상자
			if  ((obj.id.indexOf('oEdit-') < 0 && !hasClass(obj, 'bosp-fio-ta') && obj.getAttribute('type') !== 'hidden' && !$(obj).is(':visible')) || obj.disabled == true) return;	// 숨겨져있거나 비활성된 입력상자는 필수입력 패스 (html편집기, hidden 제외)
		} else {									// 멀티라디오 입력상자
			if ((obj[0].getAttribute('type') !== 'hidden' && !$(obj[0]).is(':visible')) || obj[0].disabled == true) return;
		}
		switch (obj.type) {
			case 'radio' :
				if (obj.checked == false) {
					addClass(obj, 'AB-empty-value');
					is_empty = 'Y';
				} else removeClass(obj, 'AB-empty-value');
			break;
			case 'checkbox' :
				if (obj.checked == false) {
					addClass(obj, 'AB-empty-value');
					is_empty = 'Y';
				} else removeClass(obj, 'AB-empty-value');
			break;
			case undefined :																				// 멀티라디오
				if (obj.length != undefined) {
					if (submit_radio_check(form, obj_name, 'radio') === false) {
						for (i=0; i<obj.length ; i++) addClass(obj[i], 'AB-empty-value');
						is_empty = 'Y';
					} else for (i=0; i<obj.length ; i++) removeClass(obj[i], 'AB-empty-value');
				}
			break;
			case 'hidden' :
				var HM = eval('form.' + obj_name + '_multi');
				if (HM === undefined) {																	// 멀티체크 연결
					var obj_sel_box = $('*[data-hid-name="' + obj_name + '"]', form);		// 연관된 단계별선택상자
					var obj_chk_box = $('input[name="' + obj_name + '_multi[]"]', form);	// 연관된 멀티체크상자
					if (obj.value == '') {
						if (obj_sel_box.length > 0) obj_sel_box.addClass('AB-empty-value');
						if (obj_chk_box.length > 0) obj_chk_box.addClass('AB-empty-value');
						is_empty = 'Y';
					} else {
						if (obj_sel_box.length > 0) obj_sel_box.removeClass('AB-empty-value');
						if (obj_chk_box.length > 0) obj_chk_box.removeClass('AB-empty-value');
					}
				} else {																						// 멀티콤보 연결
					if (obj.value == '') {
						addClass(HM, 'AB-empty-value');
						is_empty = 'Y';
					}
				}
			//break;	주석풀지말기
			default :																						// 기타 모든 입력상자
				if ((!hasClass(obj, 'AB-blank-ok') && trim(obj.value) == '') || (hasClass(obj, 'AB-blank-ok') && obj.value == '')) {
					if (obj.id.substring(0, 6) !== 'oEdit-') {
						if (!hasClass(obj, 'bosp-fio-ta')) {
							addClass(obj, 'AB-empty-value');
						} else {
							var emptyTargs = $('input', $(obj).parents('div').eq(0).prev('div'));
							emptyTargs.addClass('AB-empty-value');
						}
					} else {
						addClass(document.getElementById(obj.id + '-iframe'), 'AB-empty-value');
					}
					is_empty = 'Y';
				} else {
					if (obj.id.substring(0, 6) !== 'oEdit-') {
						if (!hasClass(obj, 'bosp-fio-ta')) {
							removeClass(obj, 'AB-empty-value');
						} else {
							var emptyTargs = $('input', $(obj).parents('div').eq(0).prev('div'));
							emptyTargs.removeClass('AB-empty-value');
						}
					} else {
						removeClass(document.getElementById(obj.id + '-iframe'), 'AB-empty-value');
					}
				}
			break;
		}
		if (is_empty == 'Y') {
			if (errfld == '') {
				if (obj.type != undefined) errfld = obj;
				else if (obj.length != undefined) errfld = obj[0];
			}
			if (errfld.style.display == 'none' || errfld.disabled == true) return;
			if (obj_err_msg != '') {																	// 지정된 에러 메시지가 있으면 바로 중지
				alert(obj_err_msg);
				if (errfld.type == 'text' || errfld.type == 'textarea' || errfld.type == 'select' || errfld.type == 'password') errfld.focus();
				errfld = '';
				return false;
			}
		}
	}	
}

function trim(s) { s=s.replace(/^\s+|\s+$/g,''); return s; }
function ltrim(s) { s=s.replace(/^\s+/,''); return s; }
function rtrim(s) { s=s.replace(/\s+$/,''); return s; }
function email_check(email) { if (email.value.search(/(\S+)@(\S+)\.(\S+)/) == -1) return false; else return true; }			// E-Mail 검사

function jumin_number_check(T_jumin_number) {
	var chk =0
	var yy = T_jumin_number.substring(0, 2)
	var mm = T_jumin_number.substring(2, 4)
	var dd = T_jumin_number.substring(4, 6)
	var sex = T_jumin_number.substring(7, 8)
	if ((T_jumin_number.length != 14) || (yy < 25 || mm < 1 || mm > 12 || dd < 1) || (sex != 1 && sex !=2 )) return false;
	T_jumin_number_one = T_jumin_number.substring(0, 6);
	T_jumin_number_two = T_jumin_number.substring(7, 14);
	for (var i = 0; i <=5 ; i++) chk = chk + ((i%8+2) * parseInt(T_jumin_number_one.substring(i,i+1)));
	for (var i = 6; i <=11 ; i++) chk = chk + ((i%8+2) * parseInt(T_jumin_number_two.substring(i-6,i-5)));
	chk = 11 - (chk %11)
	chk = chk % 10
	if (chk != T_jumin_number_two.substring(6,7)) return false;
	return true;
}

// 주민등록번호 검사
function jumin_check(j1, j2) {
	if (j1.value.length<6 || j2.value.length<7) return false;
	var sum_1 = 0;
	var sum_2 = 0;
	var at=0;
	var juminno= j1.value + j2.value;
	sum_1 = (juminno.charAt(0)*2)+
						(juminno.charAt(1)*3)+
						(juminno.charAt(2)*4)+
						(juminno.charAt(3)*5)+
						(juminno.charAt(4)*6)+
						(juminno.charAt(5)*7)+
						(juminno.charAt(6)*8)+
						(juminno.charAt(7)*9)+
						(juminno.charAt(8)*2)+
						(juminno.charAt(9)*3)+
						(juminno.charAt(10)*4)+
						(juminno.charAt(11)*5);
	sum_2=sum_1%11;
	if (sum_2 == 0) {
		at = 10;
	} else {
		if (sum_2 == 1) at = 11;
		else at = sum_2;
	}
	att = 11 - at;
	if (juminno.charAt(12) != att) return false;
	return true
}

// 쿠키 입력
function set_cookie(name, value, expirehours, adom) {
	var today = new Date();
	today.setTime(today.getTime() + (60*60*1000*expirehours)); if (adom === undefined) adom = '.' + PU_host['host'];
	document.cookie = name + "=" + urlencode(value) + ";path=/;expires=" + today.toGMTString() + ";domain=" + adom;//console.log(adom, PU_host, document.cookie);
}

// 쿠키 얻음
function get_cookie(cname, rt) {
	var value = document.cookie.match('(^|;) ?' + cname + '=([^;]*)(;|$)');
	return value ? decodeURIComponent(value[2]) : (rt !== 'U' ? '' : undefined);
}

// 쿠키 지움
function delete_cookie(name) {
	var today = new Date();
	today.setTime(today.getTime() - 1);
	var value = get_cookie(name);
	if (value != '') document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
}

// 같은 레코드에 있는 입력값을 변경 또는 체크 하는 함수
function chg_same_idx_obj(obj_source_name, obj_target_name, idx, mode) {
	obj_source = document.getElementsByName(obj_source_name);
	obj_target = document.getElementsByName(obj_target_name);
	switch (mode) {
		case 'V' :
			obj_target[idx].value = obj_source[idx].value;
		break;
		case 'C' :
			obj_target[idx].checked = true;
		break;
	}
}

// 선택(체크)된 레코드 이외의 레코드의 입력상자를 비활성화 시키는 함수
function disable_other_idx_obj(checkbox_name, target_boxs, target_boxs_readonly) {
	obj_checkbox = document.getElementsByName(checkbox_name);
	cnt = obj_checkbox.length;
	cnt_target_boxs = target_boxs.length;
	for (i=0; i<cnt_target_boxs; i++) {
		obj_taret_box = document.getElementsByName(target_boxs[i]);
		cnt_obj_target_box = obj_taret_box.length;
		for (j=0; j<cnt_obj_target_box; j++) {
			obj_taret_box[j].disabled = false;
			if (obj_checkbox[j].checked == true) continue;
			obj_taret_box[j].disabled = true;
		}
	}
	if (typeof(target_boxs_readonly) != 'undefined') {
		cnt_target_boxs = target_boxs_readonly.length;
		for (i=0; i<cnt_target_boxs; i++) {
			obj_taret_box = document.getElementsByName(target_boxs_readonly[i]);
			cnt_obj_target_box = obj_taret_box.length;
			for (j=0; j<cnt_obj_target_box; j++) {
				obj_taret_box[j].readOnly = false;
				if (obj_checkbox[j].checked == true) continue;
				obj_taret_box[j].readOnly = true;
			}
		}
	}
}

// 선택(체크)된 레코드 이외의 레코드의 입력상자를 비활성화 시키는 함수 (1열만 지정해서 부하를 줄인 함수)
function disable_other_idx_obj_1(checkbox_name, idx, target_boxs, target_boxs_readonly) {
	obj_checkbox = document.getElementsByName(checkbox_name);
	cnt = obj_checkbox.length;
	cnt_target_boxs = target_boxs.length;
	for (i=0; i<cnt_target_boxs; i++) {
		obj_taret_box = document.getElementsByName(target_boxs[i]);
		if (obj_checkbox[idx].checked == true) obj_taret_box[idx].disabled = false;
		else obj_taret_box[idx].disabled = true;
	}
	if (typeof(target_boxs_readonly) != 'undefined') {
		cnt_target_boxs = target_boxs_readonly.length;
		for (i=0; i<cnt_target_boxs; i++) {
			obj_taret_box = document.getElementsByName(target_boxs_readonly[i]);
			if (obj_checkbox[idx].checked == true) obj_taret_box[idx].readOnly = false;
			else obj_taret_box[idx].readOnly = true;
		}
	}
}

// 목록등의 다중 체크상자를 일괄선택, 반전, 선택취소 하는 함수 (배열 형태)
// mode : T(전체선택->전체해제), F(전체해제->전체선택), C(전체선택), N(전체해제), R(선택토글), D(비활성), E(활성)
function chg_checkbox_state(checkbox_name, mode, haystack, form_name, callbacks, callbackm, callbacke) {
	if (typeof(form_name) === 'undefined' || form_name == '') {
		var obj_checkbox = document.getElementsByName(checkbox_name);
	} else {
		var obj_checkbox = new Array;
		var T_obj_checkbox = document.getElementById(form_name).elements[checkbox_name];
		if (T_obj_checkbox === undefined) return;
		else if (T_obj_checkbox.length === undefined) obj_checkbox[0] = T_obj_checkbox;
		else obj_checkbox = T_obj_checkbox;
	}
	cnt = obj_checkbox.length;
	if (mode === 'T' || mode === 'F') {
		var T_flag = (mode === 'T') ? 'Y' : 'N';
		for (i=0; i<cnt; i++) {
			if (obj_checkbox[i].checked == (mode === 'T') ? false : true) {
				T_flag = (mode === 'T') ? 'N' : 'Y';
				break;
			}
		}
		if (T_flag === 'N') mode = 'C';
		else mode = 'N';
	}
	if (callbacks !== undefined) callbacks({});	// 위치만 잡아둠
	for (i=0; i<cnt; i++) {
		var objcb = $(obj_checkbox[i]);
		if (objcb.is(':visible') || objcb.next('label').is(':visible')) {	// 노출되어 있는 것만 적용 (노출설정->페이지선택의 필터링 때문에 추가 함)
			switch (mode) {
				case 'C' :
					obj_checkbox[i].checked = true;
				break;
				case 'N' :
					obj_checkbox[i].checked = false;
				break;
				case 'R' :
					if (obj_checkbox[i].checked == false) obj_checkbox[i].checked = true;
					else obj_checkbox[i].checked = false;
				break;
				case 'D' :
					obj_checkbox[i].disabled = true;
				break;
				case 'E' :
					obj_checkbox[i].disabled = false;
				break;
			}		
			if (typeof(haystack) != 'undefined' && haystack != '') {
				if (obj_checkbox[i].checked == true) {
					if (!in_array(obj_checkbox[i].getAttribute('fn') === undefined ? obj_checkbox[i].value : obj_checkbox[i].getAttribute('fn'), haystack)) obj_checkbox[i].checked = false;
				}
			}
			if (callbackm !== undefined) callbackm({});	// 위치만 잡아둠
			$(obj_checkbox[i]).change();
		}
	}
	if (checkbox_name.substring(checkbox_name.length - 8, checkbox_name.length) === '_multi[]') multi_check(obj_checkbox[0].form, checkbox_name.substring(0, checkbox_name.length - 2), checkbox_name.substring(0, checkbox_name.length - 8),';');
	if (callbacke !== undefined) callbacke({'obja':obj_checkbox});	// 장바구니목록 일괄선택 버튼에서 사용됨
	$('body').set_icr({});
}

// 목록등의 다중 체크상자를 일괄선택, 반전, 선택취소 하는 함수 (배열 아닌 형태)
function chg_checkbox_state_2(checkbox_name, name_type, mode) {
	tags = document.getElementsByTagName('input');
	for (i=0; i<tags.length; i++) {
		obj_name = tags[i].name;
		if (name_type == 'F') cmp_str = obj_name.substring(0, checkbox_name.length);
		else cmp_str = obj_name.substring(checkbox_name.length, obj_name.length);
		if (cmp_str == checkbox_name) {
			switch (mode) {
				case 'C' :
					tags[i].checked = true;
				break;
				case 'N' :
					tags[i].checked = false;
				break;
				case 'R' :
					if (tags[i].checked == false) tags[i].checked = true;
					else tags[i].checked = false;
				break;
			}
			$(tags[i]).change();
		}
	}
}

// 체크되지 않으면 비활성과 동일한 속성을 지닌 체크상자를 보완하는 함수
// <input type='hidden' name='it_sell_enabled[]' value='$value[it_sell_enabled]'> 처럼 실제 입력상자는 hidden 으로 처리 함
function chk_sell_enabled(obj, obj_target_name, index, chk_value, unchk_value) {
	obj_target = document.getElementsByName(obj_target_name);
	if (typeof(chk_value) == 'undefined') chk_value = 'Y';
	if (typeof(unchk_value) == 'undefined') unchk_value = '';
	if (obj.checked == true) obj_target[index].value = chk_value;
	else obj_target[index].value = unchk_value;
}

// 견적계산 프로그램
function get_estimate_price(form, nm_item, nm_item_stan, nm_price, nm_ea, nm_subsum, nm_tax, nm_total_sum, extra_title, total_sum) {
	if (typeof(form) == 'undefined') return;
	total_sum = parseFloat(total_sum);
	exist_alpa = 0;
	item_array = document.getElementsByName(nm_item);
	item_stan_array = document.getElementsByName(nm_item_stan);
	price_array = document.getElementsByName(nm_price);
	ea_array = document.getElementsByName(nm_ea);
	subsum_array = document.getElementsByName(nm_subsum);
	if (nm_tax != '') tax_array = document.getElementsByName(nm_tax);
	cnt_price_array = price_array.length;
	cnt_ea_array = ea_array.length;
	cnt_subsum_array = subsum_array.length;
	if (nm_tax != '') cnt_tax_array = tax_array.length;
	obj_total_sum = eval('form.' + nm_total_sum);
	if (cnt_price_array != cnt_ea_array || cnt_price_array != cnt_subsum_array) {
		alert(lang_core[15]);
		return;
	} else {
		total_item = cnt_price_array;
	}
	for (i=0; i<total_item; i++) {
		obj_item = item_array[i];
		obj_item_stan = item_stan_array[i];
		obj_price = price_array[i];
		obj_ea = ea_array[i];
		obj_subsum = subsum_array[i];
		if (nm_tax != '') obj_tax = tax_array[i];
		split_ea = obj_ea.value.split(':');										// 수량값에 에 '가격:수량' 형식으로 저장된 내용을 분리
		if (split_ea.length == 2) {
			if (isNaN(split_ea[0])) price_value = split_ea[0];				// isNaN : 실제 type 이 문자 라도 숫자(0포함)로만 이루어져 있으면 숫자임을 알리는 false 를 리턴 함
			else price_value = parseFloat(no_comma(split_ea[0]));
			if (isNaN(split_ea[1])) ea_value = split_ea[1];
			else ea_value = parseFloat(no_comma(split_ea[1]));
		} else {
			obj_price_value = no_comma(obj_price.value);
			obj_ea_value = no_comma(obj_ea.value);
			if (isNaN(obj_price_value) || obj_price_value == '') {
				if (obj_price.value != '') price_value = obj_price.value;
				else price_value = obj_ea.value;
			} else {
				price_value = parseFloat(obj_price_value);
			}
			if (isNaN(obj_ea_value) || obj_ea_value == '') {
				if (ea_value.value != '') ea_value = obj_ea.value;
				else ea_value = obj_price.value;
			} else {
				ea_value = parseFloat(obj_ea_value);
			}
		}
		if (typeof(price_value) != 'number') {									// typeof == 'number' : 문자열과 숫자를 엄격히 구분함
			obj_subsum.value = price_value;										// 소계에 개별견적 등의 문구 노출
			if (ea_value != '') exist_alpa++;
		} else if (typeof(ea_value) != 'number') {
			obj_subsum.value = ea_value;
			exist_alpa++;
		} else {																			// 가격, 개수 모두 숫자인 경우만 소계에 계산
			sub_sum = price_value * ea_value;
			obj_ea.value = number_format(ea_value);
			obj_price.value = number_format(price_value);
			obj_subsum.value = number_format(sub_sum);
			total_sum = total_sum + sub_sum;
			if (nm_tax != '') {
				tax = Math.round(sub_sum / 10);
				total_sum = total_sum + tax;
				obj_tax.value = number_format(tax);
			}
		}
		/*if (!isNaN(obj_price.value)) obj_price.value = number_format(obj_price.value);
		else obj_price.value = obj_price.value;*/
	}
	if (exist_alpa == 0 || extra_title == '') obj_total_sum.value = number_format(total_sum) + '원';
	else obj_total_sum.value = obj_total_sum.value + ' / ' + exist_alpa + '건 은 ' + extra_title;
}

function is_even(n) {
	return n % 2 == 0;
}

function is_odd(n) {
	return Math.abs(n % 2) == 1;
}

function confirm_url(msg, url) {
	 if (confirm(msg)) document.location.href = url;
}

// 공급가 부가세를 얻는 함수
function get_tax(sum, method, mode) {
	if (mode == '') mode = 'R';
	var supply = tax = 0;
	switch (method) {
		case 'A' :																		// 면세
			supply = sum;																// 공급가
			tax = 0;																		// 부가세
		break;
		case 'B' :																		// 과세(별도)
			supply = sum;
			tax = supply * 0.1;
		break;
		case 'C' :																		// 과세(포함)
			supply = sum / 1.1;
			tax = sum - supply;
		break;
	}
	if (mode == 'R') {
		supply = Math.round(supply);
		tax = Math.round(tax);
	}
	return [supply, tax];
}

// 원단위처리(R:반올림, C:올림, F:버림)
function chg_1won(amount, mode) {
	if (mode == '') mode = 'R';
	remove_amount = Math.round(amount) / 10;
	if (mode == 'F') remove_amount = Math.floor(remove_amount);
	else if (mode == 'R') remove_amount = Math.round(remove_amount);
	else if (mode == 'C') remove_amount = Math.ceil(remove_amount);
	remove_amount = remove_amount * 10;
	return remove_amount;
}

// 비율로 볼지 금액으로 볼지 파악하는 함수
function get_rate_or_real(sum, adder, type, chg_1won) {
	var result;
	if (type === '%') result = sum * adder / 100;				// 비율
	else if (adder > 0 && adder < 1) result = sum * adder;	// 비율로 판단
	else if (adder >= 1) result = adder;							// 더할금액
	else result = 0;
	if (chg_1won === 'Y') result = chg_1won($result);
	return parseFloat(result);
}

// 날짜 선택상자 선택시 지정된 날짜 이내인지 확인
// form : 폼객체, box_name : 박스이름, 제한날짜/최소 (오늘 기준 +/- 초단위), 제한날짜/최대 (오늘 기준 +/- 초단위)
// onchange="chk_date_limit(this.form, 'close_date', 604800, 0)"
// 최소, 최대일을 적용하지 않으려면 '' 으로 입력해야 함 (0 은 현재 날짜 값으로 판단함)
function chk_date_limit(form, box_name, before_second, after_second, msg_before, msg_after) {
	date_now = new Date();																		// 현재시간
	date_objs = {'year' : 0, 'month' : 0, 'day' : 0, 'hour' : 0, 'minute' : 0, 'second' : 0}
	TS_now = Math.round(date_now.getTime() / 1000);				// 타임스탬프
	T_flag = T_flag_1 = 'T';																			// 날짜 선택이 완료되었는지 확인 하는 플래그
	for (key in date_objs) {																			// 년, 월, 일, 시, 분, 초 .. 
		obj = eval('form.' + box_name + '_' + key);								// 입력상자 존재 여부 파악
		if (typeof(obj) != 'undefined') {
			if (obj.value == '') {																			// 존재하는 입력상자의 값이 선택되지 않은 경우
				T_flag = 'F';																						// 무시
				break;
			}
			date_objs[key] = parseInt(obj.value);									// 선택된 값 파악
		}
	}

	if (T_flag == 'T') {																						// 모든 날짜 선택이 완료된경우
		date_select = new Date(date_objs['year'], date_objs['month']-1, date_objs['day'], date_objs['hour'], date_objs['minute'], date_objs['second']);	// 선택한 날짜 객체생성(월의 인덱스는 0 부터 시작)
		TS_select = date_select.getTime() / 1000;								// 선택 날짜 타임스탬프
		if (before_second !== '') {																		// 최소 날짜 제한이 있는 경우
			TS_compare = TS_now+before_second;								// 최소 날짜 타임스탬프
			if (TS_select < TS_compare) {
				date_compare = new Date(TS_compare * 1000);			// 최소 날짜 객체
				if (typeof(msg_before) == 'undefined' || msg_before == '') msg = date_compare.toLocaleString() + ' 이후 부터 선택 가능합니다.\n\n지금 선택하신 날짜는 ' + date_select.toLocaleString() + '입니다.';
				else msg = msg_before;
				alert(msg);
				T_flag_1 = 'F';
			}
		}
		if (after_second !== '') {																		// 최대 날짜 제한이 있는 경우
			TS_compare = TS_now+after_second;									// 최대 날짜 타임스탬프
			if (TS_select > TS_compare) {
				date_compare = new Date(TS_compare * 1000);			// 최대 날짜 객체
				if (typeof(msg_after) == 'undefined' || msg_after == '') msg = date_compare.toLocaleString() + ' 이전 까지만 선택 가능합니다.\n\n지금 선택하신 날짜는 ' + date_select.toLocaleString() + '입니다.';
				else msg = msg_after;
				alert(msg);
				T_flag_1 = 'F';
			}
		}
		if (T_flag_1 == 'F') {
			for (key in date_objs) {
				obj = eval('form.' + box_name + '_' + key);
				if (typeof(obj) != 'undefined') obj.value = '';
			}
		}
	}
}

/*// text, textarea 상자의 커서위치 파악
function save_cursor_postion(obj_text_box) {
	//if (obj_text_box.createTextRange) obj_text_box.currentPos = document.selection.createRange().duplicate();
	//cursor_position = key_cursor_position(obj_text_box);
}*/

function key_cursor_position(obj) { 
	var pos = 0;
	if (document.selection) {																							// IE
		obj.focus();
		var Sel = document.selection.createRange(); 
		var SelLength = document.selection.createRange().text.length; 
		Sel.moveStart('character', -obj.value.length - 1000000);					// 끝 부분에서 정확한 삽입이 되지 않아 -1000000 을 추가 함... ??
		var fix_pos = 0;
		if (obj.type == 'textarea') fix_pos = 47;														// textarea인 경우 위치값을 보정해 줘야함.. 왜??
		pos = Sel.text.length - SelLength - fix_pos; 
	} else if (obj.selectionStart || obj.selectionStart == '0') {						// FF, Chrome
		pos = obj.selectionStart;
	}
	return pos;
}


// 커서 위치에 텍스트를 입력
function text_box_insert_text(obj_text_box, text) {
	var cursor_position = key_cursor_position(obj_text_box);
	str_old = obj_text_box.value;
	str_new = str_old.substring(0, cursor_position) + text + str_old.substring(cursor_position);
	obj_text_box.value = str_new;
}

// 키보드 입력시 한글인지 확인 하는 함수
// onKeyPress="is_hangul('한글만 입력할 수 있습니다.')" 형식으로 활용
function is_hangul(msg) {
	if (event.keyCode < 12592 || event.keyCode > 12687) {
		if (msg != '') alert(msg);
		event.returnValue = false 
	}
}

// 이메일 제공업체 변경
function chg_email_vendor(form, obj, email_2_box) {	
	email_2_box.value = obj.value;
	EVB_span = document.getElementById(email_2_box.name + '_span');
	if (obj.value == '') {
		email_2_box.readOnly = false;
		EVB_span.style.display = 'inline';
	} else {
		email_2_box.readOnly = true;
		EVB_span.style.display = 'none';
	}
}

function set_box_value(obj, str) {
	obj.value =  str;
}

function show_answer(answer_code) {
	var obj = document.getElementById(answer_code);
	if (obj.style.display != 'none') {	// 클릭한 레이어가 열려 있으면
		hide_answer(obj);
		return;
	} else {
		obj.style.display = '';
	}	
}
function hide_answer(obj) {
	obj.style.display = 'none';
}

// 스카이스크래퍼
function sky_scrapper(obj_id, abs_top, rel_top) {
	var obj = document.getElementById(obj_id);
	var y;
	y = Math.max(document.body.scrollTop, document.documentElement.scrollTop) + abs_top;		// 페에지 로딩시 포지션
	obj.style.top = y + 'px';
	obj.style.visibility = "visible";
	sky_scrapper_exec(obj_id, abs_top, rel_top);
	return true;
}

function sky_scrapper_exec(obj_id, abs_top, rel_top) {
	var obj = document.getElementById(obj_id);
	var yMenu1From, yMenu1To, yButtonFrom, yButtonTo, yOffset, timeoutNextCheck, y;
	yMenu1From   = parseInt (obj.style.top, 10);
	yMenu1To     = Math.max(document.body.scrollTop, document.documentElement.scrollTop) + rel_top; // 위쪽 위치
	timeoutNextCheck = 500;
	if ( yMenu1From != yMenu1To ) {
		yOffset = Math.ceil( Math.abs( yMenu1To - yMenu1From ) / 20);
		if ( yMenu1To < yMenu1From ) yOffset = -yOffset+1;
		if (Math.max(document.body.scrollTop, document.documentElement.scrollTop) > abs_top) {
			y = parseInt (obj.style.top, 10) + yOffset;
			obj.style.top = y + 'px';
		} else {
			obj.style.top = abs_top + 'px';
		}
		timeoutNextCheck = 10;
	}
	setTimeout (function(){ sky_scrapper_exec(obj_id, abs_top, rel_top); }, timeoutNextCheck);
}

// 클립보드로 텍스트를 복사
function copy_to_clip(cp_str, alert_str){
	if (window.clipboardData) {
		window.clipboardData.setData("Text", cp_str);								// IE ..
	} else if (window.netscape) {
		netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if (!clip) return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if (!trans) return;
		trans.addDataFlavor('text/unicode');
		var str = new Object();
		var len = new Object();
		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		var copytext=cp_str;
		str.data=copytext;
		trans.setTransferData("text/unicode",str,copytext.length*2);
		var clipid=Components.interfaces.nsIClipboard;
		if (!clip) return false;
		clip.setData(trans,null,clipid.kGlobalClipboard);
	}
	//alert(alert_str);
	alert(alert_str + "\n" + cp_str);
	//alert("Complete copy_to_clip. Use Ctrl+V\n" + cp_str);
	return false;
}

// _GET 변수 얻기
function get_get_var(var_name, sqs) {
	var params = {};
	//if (var_name === 'vtab_idx') console.log(server_query_string);
	if (sqs === undefined) sqs = typeof(server_query_string) === 'undefined' ? window.location.search : server_query_string;
	sqs.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
	if (var_name === undefined) return params; else if (params[var_name] !== undefined) return params[var_name]; else return '';
}

/*function get_get_var(var_name, sqs) {
	if (sqs === undefined) sqs = server_query_string;
	var strURL = sqs.replace('#;', '');
	var T_var_name = strURL.split('?');
	if (T_var_name.length > 1) T_var_name.shift();		// 첫 번째 인자를 제거한다.
	T_var_name = T_var_name.join('?');
	T_var_name = T_var_name.split('&');
	if (strURL.substring(1).length > 0) {
		var var_names = new Array;
		for (i=0;i<T_var_name.length;i++) {
			var_names = T_var_name[i].split('=');
			if (var_name == var_names[0]) return var_names[1];
		}
	}
	return '';
}*/

// urlencode
function urlencode(str) {
	str = (str+'').toString();
	return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function urldecode(str) {
	return decodeURIComponent(str.replace(/\+/g, '%20'));
}

function rawurlencode(str) {
	str = (str + '').toString();
	return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
}

function rawurldecode(str) {
	return decodeURIComponent((str + '').replace(/%(?![\da-f]{2})/gi, function() { return '%25'; }));
}

function htmlentities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


function in_array(needle, haystack, argStrict) {
	var key = '', strict = !!argStrict; 
	if (strict) {
		for (key in haystack) {
			if (haystack[key] === needle) return true;
		}
	} else {
		for (key in haystack) {
			if (haystack[key] == needle) return true;
		}
	}
	return false;
}

// 현재 시간을 출력하는 함수
function get_now_time(now_sec, view_obj_id, format) {
	var str_time;
	var str_current_time = 'current_time_' + view_obj_id;			// 출력할 객체의 id 에 따라 다른 변수명을 텍스트로 만든다.
	eval("var " + str_current_time + " = now_sec + 1");				// 해당 배열에 값을 배정 (가변변수 개념)
	var n_time = eval(str_current_time);												// 배정된 남은 시간 값을 일반변수에 담는다.
	if (typeof(format) == 'undefined') format = 'Y-m-d H:i:s';

	/*var now_time	= new Date(now_sec * 1000);
	var year = now_time.getYear();
	var month = now_time.getMonth() + 1;											// 월의 인덱스는 0 부터 시작 함
	var date = now_time.getDate();
	var hours = now_time.getHours();
	var minutes = now_time.getMinutes();
	var seconds = now_time.getSeconds();

	format = format.replace('Y', year);
	format = format.replace('m', month);
	format = format.replace('d', date);
	format = format.replace('H', hours);
	format = format.replace('i', minutes);
	format = format.replace('s', seconds);

	str_time = format;*/

	str_time = date(format, n_time);

	// 값 출력
	view_obj = document.getElementById(view_obj_id);
	view_obj.innerHTML = str_time;

	setTimeout("get_now_time(" + n_time + ", '" + view_obj_id + "')", 1000);		// 1초마다 남은시간 갱신
}

// 날짜포맷 함수
function datefm(format, objdt) {
	if (objdt === undefined) objdt = new Date();
	var yr = objdt.getFullYear().toString();
	var mt = (objdt.getMonth() + 1).toString();	// 월의 인덱스는 0 부터 시작 함
	var dt = objdt.getDate().toString();
	var hs = objdt.getHours().toString();
	var ms = objdt.getMinutes().toString();
	var ss = objdt.getSeconds().toString();

	format = format.replace('Y', yr); format = format.replace('y', yr.substr(2));
	format = format.replace('m', mt.padStart(2, '0')); format = format.replace('m', mt);
	format = format.replace('d', dt.padStart(2, '0')); format = format.replace('j', dt);
	format = format.replace('H', hs.padStart(2, '0'));
	format = format.replace('i', ms.padStart(2, '0'));
	format = format.replace('s', ss.padStart(2, '0'));
	return format;
}

// 남은 시간을 출력하는 함수
function get_count_down(r_sec, view_obj_id) {
	var day, hour, min, sec, mod;
	var str_count = '';
	var str_remain_time = 'remain_time_' + view_obj_id;		// 출력할 객체의 id 에 따라 다른 변수명을 텍스트로 만든다.
	eval("var " + str_remain_time + " = r_sec - 1");					// 해당 배열에 값을 배정 (가변변수 개념)
	var r_time = eval(str_remain_time);											// 배정된 남은 시간 값을 일반변수에 담는다.
	if (r_time >= 0) {																					// 남은시간이 1초보다 클때만
		day = Math.floor(r_sec / (3600 * 24));									// 남은일수
		mod = r_sec % (24 * 3600);
		hour = Math.floor(mod / 3600);												// 남은시간
		mod = mod % 3600;
		min = Math.floor(mod / 60);														// 남은분
		sec = mod % 60;																				// 남은초
		str_count = (day > 0) ? day + "일 " : "";								// 보여줄 글자를 셋팅
		str_count = (hour > 0) ? str_count + hour + "시간 " : (str_count.length > 0) ? str_count + hour + "시간 " : str_count;
		str_count = (min > 0) ? str_count + min + "분 " : (str_count.length > 0) ? str_count + min + "분 " : str_count;
		str_count = str_count + sec + "초"
	}

	if (( sec <= 0 && str_count == "0초" ) || ( str_count == "" )) str_count = "종료";												// 목표시간에 도달

	// 값 출력
	view_obj = document.getElementById(view_obj_id);
	view_obj.innerHTML = str_count;
	if (str_count != "종료") setTimeout("get_count_down(" + r_time + ", '" + view_obj_id + "')", 1000);		// 1초마다 남은시간 갱신
}

// 숫자를 제외한 모든문자를 제거하는 함수
function only_number(val){
	var reg=/[^\d]/;
	while(reg.test(val)){
		val=val.replace(reg,"");
	} 
	val = Number(val);
	return val;
}

// 두개의 구분자로 구성된 텍스트를 배열로
function split_to_array(str, div1, div2) {
	if (str === undefined) str = ''; if (str == '') return {};
	var params = {}, splits, temp, i, l; // Split into key/value pairs
	if (div1 === undefined) div1 = '&'; if (div2 === undefined) div2 = '='; splits = str.split(div1);
	for (i=0,l=splits.length; i<l; i++) { temp = splits[i].split(div2); params[temp[0]] = temp[1]; }
	return params;
}

// Parse a URL and return its components, version: 1107.2516, discuss at: http://phpjs.org/functions/parse_url
function parse_url(str, component) {	
	var key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port', 
							'relative', 'path', 'directory', 'file', 'query', 'fragment'],
							ini = (this.php_js && this.php_js.ini) || {},
							mode = (ini['phpjs.parse_url.mode'] && 
							ini['phpjs.parse_url.mode'].local_value) || 'php',
							parser = {
								php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
								strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
								loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
							};
	var m = parser[mode].exec(str),
			uri = {},
			i = 14;
	while (i--) {
		if (m[i]) uri[key[i]] = m[i];
	}
	if (component) return uri[component.replace('PHP_URL_', '').toLowerCase()];
	if (mode !== 'php') {
		var name = (ini['phpjs.parse_url.queryKey'] && 
		ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
		parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
		uri[name] = {};
		uri[key[12]].replace(parser, function ($0, $1, $2) {
			if ($1) {uri[name][$1] = $2;}
		});
	}
	delete uri.source;
	return uri;
}

function encodeURI_all(str) {
	str = encodeURI(str);	// A-Z a-z 0-9 ; , / ? : @ & = + $ - _ . ! ~ * ' ( ) # 는 치환 안되어 필요한 것만 처리
	str = str.replace(/;/g, '%3B').replace(/,/g, '%2C').replace(/:/g, '%3A').replace(/@/g, '%40').replace(/\$/g, '%24');
	str = str.replace(/!/g, '%21').replace(/\*/g, '%2A').replace(/\'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\+/g, '%2B');
	return str;
}

function array_unique(inputArr, r_type) {								// From: http://phpjs.org/functions
	var key = '', val = '';
	var tmp_arr2 = new Array;
	if (r_type === 'O') tmp_arr2 = {};
	for (key in inputArr) {
		if (inputArr.hasOwnProperty(key)) {
			val = inputArr[key];
			if (false === array_search(val, tmp_arr2)) tmp_arr2[key] = val;
		}
	}
	return tmp_arr2;
}

function array_search(needle, haystack) {
	var fkey = '';
	for (fkey in haystack) {
		if (haystack.hasOwnProperty(fkey)) {
			if ((haystack[fkey] + '') === (needle + '')) return fkey;
		}
	}
	return false;
}

//save_value = save_value.filter(function(idx){return idx != ''}); array_filter !!

function hasClass(ele,cls) {
	if (typeof(ele) !== 'object') return null;
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
	if (typeof(ele) !== 'object') return null;
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
 
function removeClass(ele,cls) {
	if (typeof(ele) !== 'object') return null;
	if (hasClass(ele,cls)) {
    	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

function randRange(n_s, n_e) {
  return Math.floor( (Math.random() * (n_e - n_s + 1)) + n_s );
}

function addslashes(str) {
	str = str.replace(/\\/g,'\\\\');
	str = str.replace(/\'/g,'\\\'');
	str = str.replace(/\"/g,'\\"');
	str = str.replace(/\0/g,'\\0');
	return str;
}

function stripslashes(str) {
	str = str.replace(/\\'/g,'\'');
	str = str.replace(/\\"/g,'"');
	str = str.replace(/\\0/g,'\0');
	str = str.replace(/\\\\/g,'\\');
	return str;
}

function calc_rate_value(first, second, third) {
	var return_value = new Array();
	return_value[0] = second * third / first;
	return_value[1] = second / first;
	return return_value;
}

function add_to_favorites(obj, title, url) {
	if (_VM_ === 'p') {
		var ctrl_key = 'Ctrl';
		if (os_type === 'mac') ctrl_key = 'Command';
		if (window.sidebar) {										// Mozilla Firefox Bookmark		
			window.sidebar.addPanel(title, url, '');
		} else if (window.opera && window.print) {			// Opera Hotlist		
			obj.setAttribute('href', url);
			obj.setAttribute('title', title);
			obj.setAttribute('rel', 'sidebar');
			obj.click();
		} else if (browser_type === 'Chrome') {
			alert(ctrl_key + lang_core[16]);
		} else if (browser_type === 'Safari') {
			alert(ctrl_key + lang_core[16]);
		} else {															// IE Favorite
			window.external.AddFavorite(url, title);
		}
	} else {
		document.location.href = 'insiter.php?design_file=mobile_shortcut.php';
	}
	var url = '/visit_log/visit_etc_action.php?proc_mode=fav&fav=' + urlencode(title + ':' + url);
	$.get(url, {}, function(data) {
		var scts = [];
		var tag = $.parseHTML(data, document, true);																					// 태그를 배열로(스크립트 포함)
		if (tag !== null) {
			for (var i=0; i<tag.length; i++) if ($(tag[i]).hasClass('after_process_script')) scts.push(tag[i]);	// 클래스가 마크업된 태그를 찾아서 배열에 담는다
			var objdt = $('<tmptag>').append(scts);
			$('body').append(objdt);
		}
	});
	return false;
}

function strip_tags(input, allowed) {
	//  discuss at: http://phpjs.org/functions/strip_tags/
	allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
	return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) { return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''; });
}

function get_money_format(vars) {
	var uf = ur = '';
	vars.money = no_comma(vars.money);
	if (vars.pu === undefined) vars.pu = price_unit;
	if (vars.pul === undefined) vars.pul = price_unit_loc;
	if (vars.proc_1 === undefined) vars.proc_1 = price_chg_1won;
	if (vars.ps === undefined) vars.ps = price_sosu;
	if (vars.pul == 'R') ur = vars.pu; else uf = vars.pu;
	if (vars.proc_1 != '') vars.money = chg_1won(vars.money, vars.proc_1);
	return uf + number_format(vars.money, vars.sosu) + ur;
}

//var errmsg = '';
//var errfld = '';

// 보관용
/*
function save_current_pos(objTextArea) {
	if (objTextArea.createTextRange) objTextArea.currentPos = document.selection.createRange().duplicate();
}
function input_special_char(text) {
	if (objTextArea.createTextRange && objTextArea.currentPos) {
		var currentPos = objTextArea.currentPos;
		currentPos.text = currentPos.text.charAt(currentPos.text.length - 1) == ' ' ? text + ' ' : text;
	}
}

if (objForm.bc[objForm.bc.selectedIndex].text == '투명') objForm.is_transparency.value = 'Y';

// 실시간 링크 주소 변경
TTT_link.href='insiter.php?design_file=4763.php';
<a href="insiter.php?design_file=4750.php" id='TTT_link'>

// 선택상자 텍스트 참조
 onFocus="this.form.email.value=this.form.category_1.options[this.form.category_1.selectedIndex].text;this.form.homepage.value=this.form.relation_serial_1.options[this.form.relation_serial_1.selectedIndex].text"
*/

// 클립보드로 복사
function copyTo(vars, rmtxt, msg){
	if (vars === undefined) vars = 'txt_url';
	copyToClipboard(document.getElementById(vars), rmtxt);
	if (typeof(msg) == 'undefined') msg = lang_core[17]
	alert(msg);
}
function copyToClipboard(obj, rmtxt) {
	var targ, okcp, src_ss, src_se;
	var targId = '_hiddenCopyText_' + obj.getAttribute('id');
	var isInput = obj.tagName === 'INPUT' || obj.tagName === 'TEXTAREA';
	var s_top = $(window).scrollTop(); var s_left = $(window).scrollLeft();
	if (isInput) {		// 복사대상이 텍스트객체면 현재 선택 영역 파악
		targ = obj;
		src_ss = obj.selectionStart;
		src_se = obj.selectionEnd;
	} else {				// 다른객체면 텍스트객체 생성&마크업
		targ = document.createElement("textarea");
		document.body.appendChild(targ); targ.textContent = obj.textContent.replace(/\\r\\n/g, "\r\n").replace(/\\n/g, "\n");//console.log(targ.textContent);
	}
	targ.focus();		// 대상객체로 포커스 이동
	if (rmtxt !== undefined) targ.value = targ.value.replace(rmtxt, '');	// 지정된 문자열 제거
	targ.setSelectionRange(0, targ.value.length);								// 복사할 텍스트 선택
	try {
		okcp = document.execCommand('copy');	// 복사실행
	} catch(e) {
		okcp = false;
	}
	if (isInput) obj.setSelectionRange(src_ss, src_se);	// 기존 선택 복원	
	else document.body.removeChild(targ);						// 임시객체 제거
	window.scrollTo(s_left, s_top);								// 스크롤 복원
	return okcp;
}

// 키보드 입력시 영문인지 확인 하는 함수, 2018-11-23 금요일 16시57분 By Jang
// onKeyUp="is_english(obj, '영문만 입력할 수 있습니다.')" 형식으로 활용
function is_english(obj, msg) {
	var reg = /[^a-zA-Z]/g;
	if (reg.test(obj.value)) {
		if (msg != '') alert(msg);
		obj.value = obj.defaultValue;
		obj.focus();
	}
}
function is_not_hangul(obj, msg, method) {	// method에 따른 조건모음
	if (method == 'A')	{		// 숫자, 영문만 입력허용
		var reg = /[^a-zA-Z0-9]/g;
		if (reg.test(obj.value)) {
			if (msg != '') alert(msg);
			obj.value = obj.defaultValue;
			obj.focus();
		}
	} else if (method == 'B')	{		// 영문, 특수문자만 입력허용
		var reg = /[0-9가-힣ㄱ-ㅎㅏ-ㅣ]/g;
		if (reg.test(obj.value)) {
			if (msg != '') alert(msg);
			obj.value = obj.defaultValue;
			obj.focus();
		}
	} else if (method == 'C')	{		// 한글만 제외
		var reg = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
		if (reg.test(obj.value)) {
			if (msg != '') alert(msg);
			obj.value = obj.defaultValue;
			obj.focus();
		}
	}
	else {		// 숫자만 입력허용
		var reg = /[^0-9]/g;
		if (reg.test(obj.value)) {
			if (msg != '') alert(msg);
			obj.value = obj.defaultValue;
			obj.focus();
		}
	}
}

function set_html_table(data) {
	var html = '';
	if (typeof (data[0]) === 'undefined') return null;
	if (data[0].constructor === String) {
		html += '<tr>\r\n';
		for (var item in data) html += '<td>' + data[item] + '</td>\r\n';
		html += '</tr>\r\n';
	}
	if (data[0].constructor === Array) {
		for (var row in data) {
			html += '<tr>\r\n';
			for (var item in data[row]) html += '<td>' + data[row][item] + '</td>\r\n';
			html += '</tr>\r\n';
		}
	}
	if (data[0].constructor === Object) {
		for (var row in data) {
			html += '<tr>\r\n';
			for (var item in data[row]) html += '<td>' + item + ':' + data[row][item] + '</td>\r\n';
			html += '</tr>\r\n';
		}
	}
	return html;
}