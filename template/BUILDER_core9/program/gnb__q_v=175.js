// 홈페이지요리사 PC GNB
$(function() {

	// gnb, lnb 마크업 추가
	$('.ABA-gnb a').append('<span class="AB-lleft"></span><span class="AB-rleft"></span>');
	$('.ABA-lnb-box a').append('<span class="AB-lleft"></span><span class="AB-rleft"></span>');
	$('.ABA-head-lnb').append('<div class="AB-lleft"></div><div class="AB-rleft"></div>');
	$('.ABA-body-lnb').after('<div class="ABA-foot-lnb"><div class="AB-lleft"></div><div class="AB-rleft"></div></div>');
	$('.ABA-lnb').wrap('<div class="lnb-2dph">').before('<div class="ABA-bglnb-left"></div>').after('<div class="ABA-bglnb-right"></div>');
	$('.ABA-lnb-sub').wrap('<div class="lnb-3dph">').wrap('<div class="lnb-3dph-inner">').before('<div class="ABA-bglnbsub-left"></div>').after('<div class="ABA-bglnbsub-right"></div>');
	$('.ABA-gnb > li > div > ul').before('<div class="ABA-bggnbsub1-left"></div>').after('<div class="ABA-bggnbsub1-right"></div>');
	$('.ABA-gnb-sub-1 > ul > li > ul').wrap('<div class="ABA-gnb-sub-2 AB-hidden" />').before('<div class="ABA-bggnbsub2-left"></div>').after('<div class="ABA-bggnbsub2-right"></div>');

	// gnb
	var gnb_area = $('#ABA-gnb');
	var gnb_color = /GNB\-color\-[0-9]+/.exec(gnb_area.attr('class'));
	if (gnb_color) gnb_color[0] = gnb_color[0].replace('GNB-color-', '');
	var gnb_wrap = $('.ABA-gnb-wrap');
	var gnb_wrap_width = gnb_wrap.width();
	var gnb_li = $('.ABA-gnb > li'), gnb_sub_1 = $('.ABA-gnb-sub-1'), gnb = gnb_li.parent();
	var gnb_width = gnb.width();
	//var gnb_li_all = $('div.ABA-gnb-sub-1 li');
	var gnb_v = 'N', gnb_s = 'N', gnb_w = 'N', fix_1 = 'N', fix_2 = 'N', fix_leave = 'N', fix_w = 'N', change_w = 'N', sh_g1_g2 = 'N', click_w = 'N', gnb_s1_cs = 'N', gnb_v_cnt = '';
	if (gnb_wrap.is('.GNB-v')) gnb_v = 'Y';
	if (gnb_wrap.is('.GNB-s')) gnb_s = 'Y';
	if (gnb_wrap.is('.GNB-w')) gnb_w = 'Y';
	if (gnb_wrap.is('.fix-1')) fix_1 = 'Y';
	if (gnb_wrap.is('.fix-2')) fix_2 = 'Y';
	if (gnb_wrap.is('.fix-leave')) fix_leave = 'Y';
	if (gnb_wrap.is('.fix-w')) fix_w = 'Y';
	if (gnb_wrap.is('.sh-g1-g2')) sh_g1_g2 = 'Y';
	if (gnb_wrap.is('.change-w')) change_w = 'Y';
	if (gnb_wrap.is('.click-w')) click_w = 'Y';
	if (browser_type == 'IE6') gnb_s = 'N';
	if (gnb_v !== 'Y') gnb_s1_cs = 'Y';
	if (gnb_wrap.attr('data-s1-cs') !== undefined) gnb_s1_cs = gnb_wrap.attr('data-s1-cs');
	if (gnb_wrap.attr('data-v-cnt') !== undefined) gnb_v_cnt = gnb_wrap.attr('data-v-cnt');
	
	$.fn.set_height = function(vars) {
		var ht = 0, htt = 0;
		if (sh_g1_g2 === 'Y') {
			var gnb_sub_1;
			$('div.ABA-gnb-sub-2:visible', this).each(function(i) {
				ht = $(this).height();
				if (ht > 0) {
					$(this).css('height', ht);
					if (gnb_sub_1 === undefined) gnb_sub_1 = $(this).parents('div.ABA-gnb-sub-1');
					$(this).parents('li[id^="AB-gnb-sub-"]').eq(0).css('height', ht);
				}
			});
			if (ht > 0) {
				htt = $('ul.ABA-gnb-sub-1-ul', gnb_sub_1).height();
				$('.AB-wide-gnb-sub').css('height', htt);
			}
		}
		return htt;
	}
	
	// 와이드 gnb 서브인 경우 마크업 추가, 본 위치 유지
	if (gnb_w === 'Y') {
		var keep_class = '';
		var gnb_w_parent = gnb_wrap.attr('wide-parent');
		if (gnb_w_parent === undefined) gnb_w_parent = 'content';
		gnb_area.removeAttr('id');
		gnb_wrap.parents('.ABA-' + gnb_w_parent + '-box').eq(0).css('margin-bottom', '0').wrap('<div id="ABA-gnb"></div>');
		gnb_area = $('#ABA-gnb');
		if (gnb_color) gnb_area.addClass('GNB-color-' + gnb_color[0]);
		if (sh_g1_g2 === 'Y') keep_class += ' sh-g1-g2';
		if (change_w === 'Y') keep_class += ' change-w';
		gnb_area.append('<div class="AB-wide-gnb-sub' + keep_class + '"><div class="ABA-bgwgnb-left"></div><div class="ABA-layout-align"></div><div class="ABA-bgwgnb-right"></div></div>');
		var wide_gnb_sub_ul_wrap = $('.AB-wide-gnb-sub > .ABA-layout-align');
		gnb_sub_1.each(function(index) {
			var obj_clone = $(this).clone();
			if (change_w !== 'Y' || index === 0) obj_clone.css('display', 'block');
			wide_gnb_sub_ul_wrap.append(obj_clone);
		});
		gnb_sub_1.remove();
		gnb_sub_1 = $('.ABA-gnb-sub-1');
		gnb_sub_1.eq(0).addClass('AB-first');
		gnb_sub_1.eq(gnb_sub_1.length-1).addClass('AB-last');
		var wide_gnb_sub = $('.AB-wide-gnb-sub');
		if (fix_w === 'Y') {
			if (change_w !== 'Y') fix_1 = 'Y';
			wide_gnb_sub.css({display:'block',position:'relative'});
			if (sh_g1_g2 === 'Y') wide_gnb_sub.set_height({});
		}
		gnb_sub_1.on('mouseenter focus', function(e) { gnb_li.eq($(this).index()).addClass('AB-current-gnb'); });	// 2차 메뉴에 마우스 올리면 1차 메뉴에 현재 표시
		gnb_sub_1.on('mouseleave blur', function(e) { gnb_li.eq($(this).index()).removeClass('AB-current-gnb'); $('.TCGNB', gnb_li).addClass('AB-current-gnb'); });
	}

	var gnb_sub_2 = $('div.ABA-gnb-sub-2');
	var gnb_sub_2_ul = $('ul.ABA-gnb-sub-2-ul');	
	gnb_sub_2_ul.css('display', 'block');				// IE에서 보였다 사라지는 현상을 없애기 위해 style.css 파일에서 display:none 해 놓은 것을 ABA-gnb-sub-2 를 hidden 으로 감싼 후에 block 처리 함.	

	var current_gnb = $('.AB-current-gnb');
	var current_gnb_sub_1;
	current_gnb_sub_1 = gnb.find('.AB-current-gnb>.ABA-gnb-sub-1');
	
	// effect_1="slide|fade|blind|highlight|bounce|clip|drop|explode|fold|highlight|puff|pulsate|scale|shake|size,up|down|left|right,속도,지연"
	var effect_1 = effect_2 = effect_lnb = sub_w_fit = sub_l_fit = '';	
	if (typeof(mobile_device) !== 'undefined') {
		if (mobile_device !== 'Y' || gnb_wrap.attr('effect-mobile') === 'N') {
			if (gnb_wrap.attr('effect-1') !== undefined) effect_1 = gnb_wrap.attr('effect-1');
			if (gnb_wrap.attr('effect-2') !== undefined) effect_2 = gnb_wrap.attr('effect-2');
			if (gnb_wrap.attr('effect-lnb') !== undefined) effect_lnb = gnb_wrap.attr('effect-lnb');
		}
	}
	effect_1 = effect_1.split(',');
	effect_2 = effect_2.split(',');
	effect_lnb = effect_lnb.split(',');

	// 서브1차메뉴 가로크기 보정 값
	if (gnb_wrap.attr('sub-w-fit') === undefined) sub_w_fit = 0;
	else sub_w_fit = gnb_wrap.attr('sub-w-fit') === 'X' ? gnb_wrap.attr('sub-w-fit') : parseInt(gnb_wrap.attr('sub-w-fit'));
	
	// 서브1차메뉴 좌측위치 보정 값
	if (gnb_wrap.attr('sub-l-fit') === undefined) sub_l_fit = 0;
	else sub_l_fit = gnb_wrap.attr('sub-l-fit') === 'X' ? gnb_wrap.attr('sub-l-fit') : parseInt(gnb_wrap.attr('sub-l-fit'));
	
	if (gnb_w === 'Y' && fix_w !== 'Y') {
		gnb_area.mouseleave(function() {
			setTimeout(function() {
				if (gnb_s === 'Y') wide_gnb_sub.hide_nb(); else wide_gnb_sub.css('display', 'none');
			}, parseInt(effect_1[3]));
		});
	}

	// GNB 메뉴 위치와 가로폭 설정
	var chg_left = 0, vcntw = 0;
	if (gnb_v === 'Y' && gnb_v_cnt != '') {
		var exp_v_cnt = gnb_v_cnt.split(',');	// 한줄에 몇개 (gnb,gnb-sub-1)
		var vcntw = 100 / exp_v_cnt[0];			// 1차
		gnb_li.css('width', vcntw + '%');		// 당초 지혜 요청사항은 .ABA-bggnb-center .ABA-gnb > li 이었으나 gnb_li 로 선택
		vcntw = 100 / exp_v_cnt[1];				// 2차
		$('ul.ABA-gnb-sub-1-ul > li', gnb_sub_1).css('width', vcntw + '%');
	}
	gnb_li.each(function(index) {																// GNB <li> 개수 만큼
		var this_gnb_sub_1 = gnb_sub_1.eq(index);
		if (gnb_v === 'Y' && gnb_v_cnt == '') var this_gnb_sub_1_width = $(this).outerWidth();	// gnb-sub-1 가로폭에 사용할 값 세팅
		else var this_gnb_sub_1_width = this_gnb_sub_1.outerWidth();
		//if (gnb_s === 'Y') this_gnb_sub_1.width(this_gnb_sub_1_width);				// .ui-effects-wrapper 상태시 깨지지 않도록 보정
		var this_left = $(this).position().left;
		if (this_left > 0 && this_left + this_gnb_sub_1_width >= gnb_width) {	// GNB <li> 좌측위치 + GNB 서브 가로폭 >= GNB 가로폭 (GNB 서브메뉴가 GNB 우측 영역을 벗어나는 경우)			
			var xy = this_left + this_gnb_sub_1_width - gnb_width;					// 우측 끝 선에 맞춤
			if (gnb_v !== 'Y') xy += sub_w_fit;
			if (sub_l_fit !== 'X') this_gnb_sub_1.css('left', this_left - xy + sub_l_fit);
		} else {																						// 벗어나지 않는 경우
			//if (gnb_w == 'N') {																// 일반 gnb-sub
				if (sub_l_fit !== 'X') this_gnb_sub_1.css('left', this_left + sub_l_fit);						// 상위 li left 에 맞춤
			/*} else {																				// 와이드 gnb-sub
				if (chg_left == 0) chg_left = this_left;									// 겹치지 않는 경우 상위 li 에 맞춤
				this_gnb_sub_1.css('left', Math.max(chg_left, this_left));			// 겹치는 경우 겹치지 않도록 조정된 left 에 맞춤
				if (this_gnb_sub_1_width != null || this_gnb_sub_1_width > $(this).width()) chg_left += this_gnb_sub_1_width;		// 이전 ul width 값 만큼 더함
				else chg_left = 0;																// 이전 ul 이 없거나 작으면 0 으로 세팅하여 다음 번 루틴 때 상위 li left 값 배정
			}*/
		}
		if (sub_w_fit !== 'X') this_gnb_sub_1_width += sub_w_fit;
		if (gnb_v === 'Y') $('.ABA-gnb-sub-2', this_gnb_sub_1).css({left:this_gnb_sub_1_width-10, top:0});
		this_gnb_sub_1.width(this_gnb_sub_1_width);										// 가로폭 재 설정 (.ui-effects-wrapper 상태시 깨지지 않도록 등등)
		//this_gnb_sub_1.css('z-index', zidx);
		//zidx--;
	});
	/*if (gnb_v === 'Y') {							// 수직으로 펼쳐지는 GNB인 경우
		current_gnb_sub_1.removeClass('AB-hidden').addClass('AB-show');
		gnb.find('div[class*=ABA-gnb-sub]').addClass('AB-live-menu');						// 펼쳐질 서브메뉴(ul) 들에 클래스 주입, 이미 펼쳐진 서브메뉴는 제외
	} else {																									// 수평으로 펼쳐지는 GNB인 경우
		current_gnb_sub_1.removeClass('AB-hidden').addClass('AB-show');
		gnb.find('div[class*=ABA-gnb-sub]:not(.AB-show)').addClass('AB-live-menu');	// 펼쳐질 서브메뉴(ul) 들에 클래스 주입, 이미 펼쳐진 서브메뉴는 제외
	}*/
	if (gnb_s1_cs === 'Y') current_gnb_sub_1.removeClass('AB-hidden').addClass('AB-show');
	gnb.find('div[class*=ABA-gnb-sub]:not(.AB-show)').addClass('AB-live-menu');	// 펼쳐질 서브메뉴(ul) 들에 클래스 주입, 이미 펼쳐진 서브메뉴는 제외

	// 마우스 오버/아웃시 메뉴노출 설정
	var targ_hide = new Array;
	if (gnb_v === 'Y') {
		if (fix_1 !== 'Y') targ_hide.push('div[class*=ABA-gnb-sub-1]');
		if (fix_2 !== 'Y') targ_hide.push('div[class*=ABA-gnb-sub-2]');
	} else {
		if (fix_1 !== 'Y') targ_hide.push('div[class*=ABA-gnb-sub-1]:not(.AB-show)');
		if (fix_2 !== 'Y') targ_hide.push('div[class*=ABA-gnb-sub-2]:not(.AB-show)');
	}
	targ_hide = targ_hide.join(',');
	var gnb_a_all = gnb_area.find('li>a');
	if (gnb_s === 'Y') {														// 슬라이드 메뉴인 경우
		gnb_a_all.mouseenter(m_over_slide).focus(m_over_slide);	// 각 메뉴의 링크에 마우스를 올렸을 때	 m_over_slide 함수 호출
		gnb.mouseleave(function() {										// gnb 영역에서 마우스가 벗어났을 때
			if (gnb_v === 'Y') gnb.find(targ_hide).hide_nb().addClass('AB-live-menu');
			else gnb.find(targ_hide).hide_nb().addClass('AB-live-menu');
			if (gnb_v !== 'Y' && current_gnb_sub_1.is('.AB-show')) current_gnb_sub_1.show_nb().removeClass('AB-live-menu');
		});
	} else {
		gnb_a_all.mouseenter(m_over_display).focus(m_over_display);
		gnb.mouseleave(function() {
			if (gnb_v === 'Y') gnb.find(targ_hide).css('display', 'none').addClass('AB-live-menu');
			else gnb.find(targ_hide).css('display', 'none').addClass('AB-live-menu');
			if (gnb_v !== 'Y' && current_gnb_sub_1.is('.AB-show')) current_gnb_sub_1.css('display', 'block').removeClass('AB-live-menu');
		});
	}
	gnb_li.mouseenter(function() {					// 마우스오버시
		current_gnb.addClass('TCGNB');				// 현재 메뉴 복원 표시 달기
		if (fix_leave !== 'Y') current_gnb.removeClass('AB-current-gnb');		// 현재 메뉴 표시 제거
		$(this).addClass('AB-current-gnb');	// 오버된 메뉴에 현재 메뉴 표시
	});
	if (click_w !== 'Y') {
		gnb_li.click(function() {							// AJAX="Y" 활성시 필요
			$('.TCGNB').removeClass('TCGNB');
			$(this).addClass('TCGNB');
			if (fix_leave !== 'Y') $('.AB-current-gnb').removeClass('AB-current-gnb');
			$(this).addClass('AB-current-gnb');
		});
	}
	gnb_li.mouseleave(function() {					// 마우스 아웃시
		if ($(this).is('.TCGNB')) return;			// 현재 메뉴인 경우 표시 변경 없음
		$(this).removeClass('AB-current-gnb');		// 현재 메뉴 표시 제거
		current_gnb = $('.TCGNB');						// 복원 표시된 메뉴 찾기
		current_gnb.addClass('AB-current-gnb');	// 현재 메뉴 복원
		current_gnb.removeClass('TCGNB');			// 복원표시 제거
		$(this).children('.ABA-gnb-sub-1').addClass('AB-live-menu');
	});
	if (gnb_w === 'Y' && fix_2 != 'Y' ) gnb_sub_1.mouseleave(function() { gnb_sub_2.css('display', 'none'); });    // 와이드gnb의 gnb_sub_1에서 벗어났을 때 - By Jang

	// lnb
	var lnb = $('.ABA-lnb-box');
	var lnb_parent = lnb.parent();
	var lnb_li = $('.ABA-lnb > li'), lnb_sub = $('.ABA-lnb-sub');
	if (lnb_parent.hasClass('LNB-h')) {				// LNB-h 이면 lnb-sub 마크업 변경
		var current_lnb = $('.AB-current-lnb');
		if (current_lnb.length > 0) {
			var current_lnb_3dph = $('.lnb-3dph', current_lnb);
			current_lnb_3dph.attr('left-position', current_lnb.position().left);
			$('.ABA-body-lnb', lnb_parent).append(current_lnb_3dph.clone());
			current_lnb_3dph.remove();
			if (lnb_parent.hasClass('LNB-menu')) {		// LNB-menu 면 3차 위치 지정
				var lnb_width = lnb.width();
				var current_lnb_3dph = $('.lnb-3dph[left-position]');
				var current_lnb_left = parseInt(current_lnb_3dph.attr('left-position'));
				var current_lnb_3dph_inner = $('.lnb-3dph-inner', current_lnb_3dph)
				var current_lnb_3dph_inner_width = current_lnb_3dph_inner.outerWidth();
				if (current_lnb_left > 0 && current_lnb_left + current_lnb_3dph_inner_width >= lnb_width) {
					current_lnb_3dph_inner.css('left', current_lnb_left - (current_lnb_left + current_lnb_3dph_inner_width - lnb_width));	// 우측 끝 선에 맞춤
				} else {
					current_lnb_3dph_inner.css('left', current_lnb_left);
				}
			}
		}
	}
	
	var lnb_wrap = $('.ABA-lnb-wrap');
	var lnb_pos = lnb_wrap.attr('lnb-pos');
	if (lnb_pos !== undefined) {
		var exp_lnb_pos = lnb_pos.split(',');
		lnb.mouseenter(function() { $('.ABA-body-lnb', $(this)).position({of: $(this), my: exp_lnb_pos[0], at: exp_lnb_pos[1], collision: exp_lnb_pos[2]}); });
	}
	lnb_li.mouseenter(function() {
		$('ul', $(this)).eq(0).show_nb();
		$(this).children('a').addClass('_lnb_ov_');
	});
	lnb_li.mouseleave(function() { $(this).children('a').removeClass('_lnb_ov_'); });
	lnb_li.click(function() {							// AJAX="Y" 활성시 필요
		$('.AB-current-lnb').removeClass('AB-current-lnb');
		$(this).addClass('AB-current-lnb');
	});

	function m_over_slide() {
		var gnb_a = $(this);
		var parent_ul_gnb_sub;
		var parent_ul = gnb_a.parent('li').parent('ul');
		var next_gnb_sub = gnb_a.next('div[class*=ABA-gnb-sub]:not(.AB-none)');									// gnb-sub-1(2) 는 마우스가 올려진 a 의 다음 요소로 마크업 되어 있음
		if (next_gnb_sub.length <= 0) next_gnb_sub = gnb_a.next().children('div[class*=ABA-gnb-sub]');	// .ui-effects-wrapper 가 씌워진 상태 일 수 있어 한번 더 찾음
		if (gnb_w !== 'Y') {
			if (fix_2 === 'Y') parent_ul_gnb_sub = parent_ul.find('div[class*=ABA-gnb-sub-1]');
			else parent_ul_gnb_sub = parent_ul.find('div[class*=ABA-gnb-sub]');
			if (next_gnb_sub.is('.AB-live-menu')) {
				parent_ul_gnb_sub.addClass('AB-live-menu');
				if (fix_leave !== 'Y') parent_ul_gnb_sub.hide_nb();
				next_gnb_sub.removeClass('AB-live-menu').show_nb();
			} else if (!next_gnb_sub.length) {
				parent_ul_gnb_sub.addClass('AB-live-menu');
				if (fix_leave !== 'Y') parent_ul_gnb_sub.hide_nb();
			}
		} else {
			if (parent_ul.is('.ABA-gnb')) {															// GNB에 마우스 올린 경우
				if (change_w === 'Y') {																	// 서브1차가 1개씩 노출되는 설정
					parent_ul_gnb_sub = $('div[class*=ABA-gnb-sub-1]', wide_gnb_sub);		// 서브1차메뉴 전체 선택(동적으로 변경된 마크업을 감안)
					parent_ul_gnb_sub.css('display', 'none');
					var this_gnb_sub_1 = parent_ul_gnb_sub.eq(gnb_a.parent().index());
					this_gnb_sub_1.css('display','block');	// 마우스가 올라간 메뉴의 순번에 맞는 gnb-sub-1 을 노출
					this_gnb_sub_1.set_height({});
				}
				if (click_w !== 'Y') {
					if (wide_gnb_sub.css('display') === 'none') wide_gnb_sub.show_nb(function () { wide_gnb_sub.set_height({}); });
				}
			} else if (parent_ul.find('div[class*=ABA-gnb-sub]').length > 0) {			// 서브1차에 마우스 올린 경우
				if (next_gnb_sub.css('display') !== 'block') {
					gnb_sub_2.hide_nb();			// 모두 감추고
					next_gnb_sub.show_nb();		// 필요한 것만 노출 (시간차가 발생할 수 있음)
				}
			}
		}
	}
	
	function m_over_display(){
		var gnb_a = $(this);
		var parent_ul_gnb_sub;
		var parent_ul = gnb_a.parent('li').parent('ul');
		var next_gnb_sub = gnb_a.next('div[class*=ABA-gnb-sub]');
		if (gnb_w !== 'Y') {
			if (fix_2 === 'Y') parent_ul_gnb_sub = parent_ul.find('div[class*=ABA-gnb-sub-1]');
			else parent_ul_gnb_sub = parent_ul.find('div[class*=ABA-gnb-sub]');
			if (next_gnb_sub.is('.AB-live-menu')) {				
				parent_ul_gnb_sub.addClass('AB-live-menu');
				if (fix_leave !== 'Y') parent_ul_gnb_sub.css('display', 'none');
				next_gnb_sub.removeClass('AB-live-menu').css('display', 'block');
			} else if (!next_gnb_sub.length) {
				parent_ul_gnb_sub.addClass('AB-live-menu');
				if (fix_leave !== 'Y') parent_ul_gnb_sub.css('display', 'none');				
			}
		} else {
			if (parent_ul.is('.ABA-gnb')) {
				if (change_w === 'Y') {
					parent_ul_gnb_sub = $('div[class*=ABA-gnb-sub-1]', wide_gnb_sub);
					parent_ul_gnb_sub.css('display', 'none');
					var this_gnb_sub_1 = parent_ul_gnb_sub.eq(gnb_a.parent().index());
					this_gnb_sub_1.css('display','block');
					this_gnb_sub_1.set_height({});
				}
				if (click_w !== 'Y') {
					if (wide_gnb_sub.css('display') === 'none') wide_gnb_sub.css('display', 'block').set_height({});
				}
			} else if (parent_ul.find('div[class*=ABA-gnb-sub]').length > 0) {
				if (next_gnb_sub.css('display') != 'block') {
					gnb_sub_2.css('display', 'none');
					next_gnb_sub.css('display', 'block');
				}
			}
		}
	}

	$.fn.show_nb = function (callback) {
		var this_obj = this;
		//console.log(this_obj);
		if (this_obj.css('display') !== 'none') return this;
		if (effect_1 != '' && effect_2 != '' && effect_lnb != '') {
			setTimeout(function() {
				if (gnb_w === 'Y' || (this_obj.is('.ABA-lnb-sub') && this_obj.parent().parent().prevAll('a').is('._lnb_ov_')) || (!this_obj.is('.AB-live-menu') && (this_obj.is('.ABA-gnb-sub-2') || this_obj.parent().is('.AB-current-gnb') || this_obj.parent().parent().is('.AB-current-gnb')))) {
					var effect_info = effect_1;
					if (this_obj.attr('class') !== undefined) {
						if (this_obj.attr('class').indexOf('ABA-gnb-sub-2') > -1) effect_info = effect_2;
						else if (this_obj.attr('class').indexOf('ABA-lnb-sub') > -1) effect_info = effect_lnb;
					}
					this_obj.show(effect_info[0], {direction : effect_info[1]}, parseInt(effect_info[2]), function() {
						if (callback !== undefined) callback();
					});
				}
			}, parseInt(effect_1[3]));
		} else {
			this.show('fast');
		}
		return this;
	}

	$.fn.hide_nb = function () {
		var this_obj = this;
		//console.log(this_obj);
		if (this_obj.length <= 0 && this_obj.css('display') === 'none') return this;
		if (effect_1 != '' && effect_2 != '' && effect_lnb != '') {
			setTimeout(function() {
				var effect_info = effect_1;
				if (this_obj.attr('class') !== undefined) {
					if (this_obj.attr('class').indexOf('ABA-gnb-sub-2') > -1) effect_info = effect_2;
					else if (this_obj.attr('class').indexOf('ABA-lnb-sub') > -1) effect_info = effect_lnb;
				}
				this_obj.hide(effect_info[0], {direction : effect_info[1]}, parseInt(effect_info[2]));
			}, parseInt(effect_2[3]-10));
		} else {
			this.hide('fast');
		}
		return this;
	}

	// 메뉴고정 옵션 처리
	if (fix_1 === 'Y') {
		gnb_sub_1.removeClass('AB-hidden').addClass('AB-show');
		//gnb.unbind("mouseleave");
		gnb_li.unbind("mouseenter").unbind("mouseleave");
		$('.GNB-a').unbind("mouseenter").unbind("focus");
	}
	if (fix_2 === 'Y') {
		gnb_sub_2.removeClass('AB-hidden').addClass('AB-show');
		//gnb.unbind("mouseleave");
		gnb_sub_1.find('li>a').unbind("mouseenter").unbind("focus");
		//$('.ABA-gnb > li').mouseleave(function() { $('.ABA-gnb-sub-1', $(this)).hide_nb().addClass('AB-live-menu'); });	// 7버전에서 마우스 아웃시 메뉴 감춰지게 임시로 만든 코드, 참고용.
	}
	if (click_w === 'Y') {
		$('.GNB-a').renameAttr('href', 'ehref');
		$('.GNB-a').attr('href', '#;');
		$('.GNB-a').on('click', function(e) {
			if (wide_gnb_sub.css('display') === 'none') wide_gnb_sub.css('display', 'block').set_height({});
			//else wide_gnb_sub.css('display', 'none');
		});
	}
});