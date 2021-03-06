



<!DOCTYPE html>
<html lang="en-US" >

<head>

	
	<script>
window.ts_endpoint_url = "https:\/\/slack.com\/beacon\/timing";

(function(e) {
	var n=Date.now?Date.now():+new Date,r=e.performance||{},t=[],a={},i=function(e,n){for(var r=0,a=t.length,i=[];a>r;r++)t[r][e]==n&&i.push(t[r]);return i},o=function(e,n){for(var r,a=t.length;a--;)r=t[a],r.entryType!=e||void 0!==n&&r.name!=n||t.splice(a,1)};r.now||(r.now=r.webkitNow||r.mozNow||r.msNow||function(){return(Date.now?Date.now():+new Date)-n}),r.mark||(r.mark=r.webkitMark||function(e){var n={name:e,entryType:"mark",startTime:r.now(),duration:0};t.push(n),a[e]=n}),r.measure||(r.measure=r.webkitMeasure||function(e,n,r){n=a[n].startTime,r=a[r].startTime,t.push({name:e,entryType:"measure",startTime:n,duration:r-n})}),r.getEntriesByType||(r.getEntriesByType=r.webkitGetEntriesByType||function(e){return i("entryType",e)}),r.getEntriesByName||(r.getEntriesByName=r.webkitGetEntriesByName||function(e){return i("name",e)}),r.clearMarks||(r.clearMarks=r.webkitClearMarks||function(e){o("mark",e)}),r.clearMeasures||(r.clearMeasures=r.webkitClearMeasures||function(e){o("measure",e)}),e.performance=r,"function"==typeof define&&(define.amd||define.ajs)&&define("performance",[],function(){return r}) // eslint-disable-line
})(window);

</script>
<script>


;(function() {
'use strict';


window.TSMark = function(mark_label) {
	if (!window.performance || !window.performance.mark) return;
	performance.mark(mark_label);
};
window.TSMark('start_load');


window.TSMeasureAndBeacon = function(measure_label, start_mark_label) {
	if (start_mark_label === 'start_nav' && window.performance && window.performance.timing) {
		window.TSBeacon(measure_label, (new Date()).getTime() - performance.timing.navigationStart);
		return;
	}
	if (!window.performance || !window.performance.mark || !window.performance.measure) return;
	performance.mark(start_mark_label + '_end');
	try {
		performance.measure(measure_label, start_mark_label, start_mark_label + '_end');
		window.TSBeacon(measure_label, performance.getEntriesByName(measure_label)[0].duration);
	} catch (e) {
		
	}
};


if ('sendBeacon' in navigator) {
	window.TSBeacon = function(label, value) {
		var endpoint_url = window.ts_endpoint_url || 'https://slack.com/beacon/timing';
		navigator.sendBeacon(endpoint_url + '?data=' + encodeURIComponent(label + ':' + value), '');
	};
} else {
	window.TSBeacon = function(label, value) {
		var endpoint_url = window.ts_endpoint_url || 'https://slack.com/beacon/timing';
		(new Image()).src = endpoint_url + '?data=' + encodeURIComponent(label + ':' + value);
	};
}
})();
</script>
 

<script>
window.TSMark('step_load');
</script>	<noscript><meta http-equiv="refresh" content="0; URL=/files/U357THGMB/F7AQZHU49/angular-file.js?nojsmode=1" /></noscript>
<script type="text/javascript">
if(self!==top)window.document.write("\u003Cstyle>body * {display:none !important;}\u003C\/style>\u003Ca href=\"#\" onclick="+
"\"top.location.href=window.location.href\" style=\"display:block !important;padding:10px\">Go to Slack.com\u003C\/a>");

(function() {
	var timer;
	if (self !== top) {
		timer = window.setInterval(function() {
			if (window.$) {
				try {
					$('#page').remove();
					$('#client-ui').remove();
					window.TS = null;
					window.clearInterval(timer);
				} catch(e) {}
			}
		}, 200);
	}
}());

</script>

<script>

(function() {
	'use strict';

	window.callSlackAPIUnauthed = function(method, args, callback) {
		var timestamp = Date.now() / 1000;  
		var version = (window.TS && TS.boot_data && TS.boot_data.version_uid) ? TS.boot_data.version_uid.substring(0, 8) : 'noversion';
		var url = '/api/' + method + '?_x_id=' + version + '-' + timestamp;

		var req = new XMLHttpRequest();

		req.onreadystatechange = function() {
			if (req.readyState == 4) {
				req.onreadystatechange = null;
				var obj;

				if (req.status == 200 || req.status == 429) {
					try {
						obj = JSON.parse(req.responseText);
					} catch (err) {
						TS.warn(8675309, 'unable to do anything with api rsp');
					}
				}

				obj = obj || {
					ok: false,
				};

				callback(obj.ok, obj, args);
			}
		};

		var async = true;
		req.open('POST', url, async);

		var form_data = new FormData();
		var has_data = false;
		Object.keys(args).forEach(function(k) {
			if (k[0] === '_') return;
			form_data.append(k, args[k]);
			has_data = true;
		});

		if (has_data) {
			req.send(form_data);
		} else {
			req.send();
		}
	};
})();
</script>

	<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/webpack.manifest.bc5c709660fb62761b5f.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>

			
	
		<script>
			if (window.location.host == 'slack.com' && window.location.search.indexOf('story') < 0) {
				document.cookie = '__cvo_skip_doc=' + escape(document.URL) + '|' + escape(document.referrer) + ';path=/';
			}
		</script>
	

		<script type="text/javascript">
		
		try {
			if(window.location.hash && !window.location.hash.match(/^(#?[a-zA-Z0-9_]*)$/)) {
				window.location.hash = '';
			}
		} catch(e) {}
		
	</script>

	<script type="text/javascript">
				
			window.optimizely = [];
			window.dataLayer = [];
			window.ga = false;
		
	
				(function(e,c,b,f,d,g,a){e.SlackBeaconObject=d;
		e[d]=e[d]||function(){(e[d].q=e[d].q||[]).push([1*new Date(),arguments])};
		e[d].l=1*new Date();g=c.createElement(b);a=c.getElementsByTagName(b)[0];
		g.async=1;g.src=f;a.parentNode.insertBefore(g,a)
		})(window,document,"script","https://a.slack-edge.com/bv1-1/slack_beacon.4f8039ed407711d94872.min.js","sb");
		sb('set', 'token', '3307f436963e02d4f9eb85ce5159744c');

					sb('set', 'user_id', "U0JDS9QBC");
							sb('set', 'user_' + "batch", "?");
							sb('set', 'user_' + "created", "2016-01-13");
						sb('set', 'name_tag', "myridztechnologies" + '/' + "elavarasan");
				sb('track', 'pageview');

		
		function track(a) {
			if(window.ga) ga('send','event','web', a);
			if(window.sb) sb('track', a);
		}
		

	</script>

	
	<meta name="referrer" content="no-referrer">
		<meta name="superfish" content="nofish">

	<script type="text/javascript">



var TS_last_log_date = null;
var TSMakeLogDate = function() {
	var date = new Date();

	var y = date.getFullYear();
	var mo = date.getMonth()+1;
	var d = date.getDate();

	var time = {
	  h: date.getHours(),
	  mi: date.getMinutes(),
	  s: date.getSeconds(),
	  ms: date.getMilliseconds()
	};

	Object.keys(time).map(function(moment, index) {
		if (moment == 'ms') {
			if (time[moment] < 10) {
				time[moment] = time[moment]+'00';
			} else if (time[moment] < 100) {
				time[moment] = time[moment]+'0';
			}
		} else if (time[moment] < 10) {
			time[moment] = '0' + time[moment];
		}
	});

	var str = y + '/' + mo + '/' + d + ' ' + time.h + ':' + time.mi + ':' + time.s + '.' + time.ms;
	if (TS_last_log_date) {
		var diff = date-TS_last_log_date;
		//str+= ' ('+diff+'ms)';
	}
	TS_last_log_date = date;
	return str+' ';
}

var parseDeepLinkRequest = function(code) {
	var m = code.match(/"id":"([CDG][A-Z0-9]{8})"/);
	var id = m ? m[1] : null;

	m = code.match(/"team":"(T[A-Z0-9]{8})"/);
	var team = m ? m[1] : null;

	m = code.match(/"message":"([0-9]+\.[0-9]+)"/);
	var message = m ? m[1] : null;

	return { id: id, team: team, message: message };
}

if ('rendererEvalAsync' in window) {
	var origRendererEvalAsync = window.rendererEvalAsync;
	window.rendererEvalAsync = function(blob) {
		try {
			var data = JSON.parse(decodeURIComponent(atob(blob)));
			if (data.code.match(/handleDeepLink/)) {
				var request = parseDeepLinkRequest(data.code);
				if (!request.id || !request.team || !request.message) return;

				request.cmd = 'channel';
				TSSSB.handleDeepLinkWithArgs(JSON.stringify(request));
				return;
			} else {
				origRendererEvalAsync(blob);
			}
		} catch (e) {
		}
	}
}
</script>



<script type="text/javascript">

	var TSSSB = {
		call: function() {
			return false;
		}
	};

</script>
<script>TSSSB.env = (function() {
	'use strict';

	var v = {
		win_ssb_version: null,
		win_ssb_version_minor: null,
		mac_ssb_version: null,
		mac_ssb_version_minor: null,
		mac_ssb_build: null,
		lin_ssb_version: null,
		lin_ssb_version_minor: null,
		desktop_app_version: null,
	};

	var is_win = (navigator.appVersion.indexOf('Windows') !== -1);
	var is_lin = (navigator.appVersion.indexOf('Linux') !== -1);
	var is_mac = !!(navigator.userAgent.match(/(OS X)/g));

	if (navigator.userAgent.match(/(Slack_SSB)/g) || navigator.userAgent.match(/(Slack_WINSSB)/g)) {
		
		var parts = navigator.userAgent.split('/');
		var version_str = parts[parts.length - 1];
		var version_float = parseFloat(version_str);
		var version_parts = version_str.split('.');
		var version_minor = (version_parts.length == 3) ? parseInt(version_parts[2], 10) : 0;

		if (navigator.userAgent.match(/(AtomShell)/g)) {
			
			if (is_lin) {
				v.lin_ssb_version = version_float;
				v.lin_ssb_version_minor = version_minor;
			} else if (is_win) {
				v.win_ssb_version = version_float;
				v.win_ssb_version_minor = version_minor;
			} else if (is_mac) {
				v.mac_ssb_version = version_float;
				v.mac_ssb_version_minor = version_minor;
			}

			if (version_parts.length >= 3) {
				v.desktop_app_version = {
					major: parseInt(version_parts[0], 10),
					minor: parseInt(version_parts[1], 10),
					patch: parseInt(version_parts[2], 10),
				};
			}
		}
	}

	return v;
})();
</script>


	<script type="text/javascript">
		
		window.addEventListener('load', function() {
			var was_TS = window.TS;
			delete window.TS;
			if (was_TS) window.TS = was_TS;
		});
	</script>
	        <title>angular-file.js | Myridz technologies Slack</title>
    <meta name="author" content="Slack">
        

	
		
	
	
		
	
						
	
	

	
	
	
	
	
	
	
		<!-- output_css "sk_adapter" -->
    <link href="https://a.slack-edge.com/b4ee0/style/rollup-slack_kit_legacy_adapters.css" rel="stylesheet" type="text/css" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)">

			<!-- output_css "core" -->
    <link href="https://a.slack-edge.com/d6588/style/rollup-plastic.css" rel="stylesheet" type="text/css" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)">

		<!-- output_css "before_file_pages" -->
    <link href="https://a.slack-edge.com/74a30/style/libs/codemirror.css" rel="stylesheet" type="text/css" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)">
    <link href="https://a.slack-edge.com/2e1ec/style/codemirror_overrides.css" rel="stylesheet" type="text/css" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)">

	<!-- output_css "file_pages" -->
    <link href="https://a.slack-edge.com/a613b/style/rollup-file_pages.css" rel="stylesheet" type="text/css" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)">

	
				<!-- output_css "regular" -->
    <link href="https://a.slack-edge.com/25e57/style/print.css" rel="stylesheet" type="text/css" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)">
    <link href="https://a.slack-edge.com/181a56/style/libs/lato-2-compressed.css" rel="stylesheet" type="text/css" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)">

	

	
	
		<meta name="robots" content="noindex, nofollow" />
	

	
<link id="favicon" rel="shortcut icon" href="https://a.slack-edge.com/436da/marketing/img/meta/favicon-32.png" sizes="16x16 32x32 48x48" type="image/png" />

<link rel="icon" href="https://a.slack-edge.com/436da/marketing/img/meta/app-256.png" sizes="256x256" type="image/png" />

<link rel="apple-touch-icon-precomposed" sizes="152x152" href="https://a.slack-edge.com/436da/marketing/img/meta/ios-152.png" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://a.slack-edge.com/436da/marketing/img/meta/ios-144.png" />
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="https://a.slack-edge.com/436da/marketing/img/meta/ios-120.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://a.slack-edge.com/436da/marketing/img/meta/ios-114.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://a.slack-edge.com/436da/marketing/img/meta/ios-72.png" />
<link rel="apple-touch-icon-precomposed" href="https://a.slack-edge.com/436da/marketing/img/meta/ios-57.png" />

<meta name="msapplication-TileColor" content="#FFFFFF" />
<meta name="msapplication-TileImage" content="https://a.slack-edge.com/436da/marketing/img/meta/app-144.png" />
</head>

<body class="				">

		  			<script>
		
			var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			if (w > 1440) document.querySelector('body').classList.add('widescreen');
		
		</script>
	
  	
	

			

<nav id="site_nav" class="no_transition">

	<div id="site_nav_contents">

		<div id="user_menu">
			<div id="user_menu_contents">
				<div id="user_menu_avatar">
										<span class="member_image thumb_48" style="background-image: url('https://secure.gravatar.com/avatar/c28fee68b81b38c2f82ed7766f7bb9a6.jpg?s=192&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0014-192.png')" data-thumb-size="48" data-member-id="U0JDS9QBC"></span>
					<span class="member_image thumb_36" style="background-image: url('https://secure.gravatar.com/avatar/c28fee68b81b38c2f82ed7766f7bb9a6.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0014-72.png')" data-thumb-size="36" data-member-id="U0JDS9QBC"></span>
				</div>
				<h3>Signed in as</h3>
				<span id="user_menu_name">elavarasan</span>
			</div>
		</div>

		<div class="nav_contents">

			<ul class="primary_nav">
									<li><a href="/messages" data-qa="app"><i class="ts_icon ts_icon_angle_arrow_up_left"></i>Back to Slack</a></li>
								<li><a href="/home" data-qa="home"><i class="ts_icon ts_icon_home"></i>Home</a></li>
				<li><a href="/account" data-qa="account_profile"><i class="ts_icon ts_icon_user"></i>Account &amp; Profile</a></li>
				<li><a href="/apps/manage" data-qa="configure_apps" target="_blank"><i class="ts_icon ts_icon_plug"></i>Configure Apps</a></li>
				<li><a href="/files" data-qa="files"><i class="ts_icon ts_icon_all_files clear_blue"></i>Files</a></li>
									<li><a href="/team" data-qa="team_directory"><i class="ts_icon ts_icon_team_directory"></i>Directory</a></li>
				
														<li><a href="/stats" data-qa="statistics"><i class="ts_icon ts_icon_dashboard"></i>Analytics</a></li>
													<li><a href="/customize" data-qa="customize"><i class="ts_icon ts_icon_magic"></i>Customize</a></li>
																			<li><a href="/account/team" data-qa="team_settings"><i class="ts_icon ts_icon_cog_o"></i>Workspace Settings</a></li>
												</ul>

			
		</div>

		<div id="footer">

			<ul id="footer_nav">
				<li><a href="/is" data-qa="tour">Tour</a></li>
				<li><a href="/downloads" data-qa="download_apps">Download Apps</a></li>
				<li><a href="/brand-guidelines" data-qa="brand_guidelines">Brand Guidelines</a></li>
				<li><a href="/help" data-qa="help">Help</a></li>
				<li><a href="https://api.slack.com" target="_blank" data-qa="api">API<i class="ts_icon ts_icon_external_link small_left_margin ts_icon_inherit"></i></a></li>
								<li><a href="/pricing?ui_step=96&ui_element=5" data-qa="pricing" data-clog-event="GROWTH_PRICING" data-clog-ui-element="pricing_link" data-clog-ui-action="click" data-clog-ui-step="admin_footer">Pricing</a></li>
				<li><a href="/help/requests/new" data-qa="contact">Contact</a></li>
				<li><a href="/terms-of-service" data-qa="policies">Policies</a></li>
				<li><a href="http://slackhq.com/" target="_blank" data-qa="our_blog">Our Blog</a></li>
				<li><a href="https://slack.com/signout/18467453632?crumb=s-1506754284-b60679e41e-%E2%98%83" data-qa="sign_out">Sign Out<i class="ts_icon ts_icon_sign_out small_left_margin ts_icon_inherit"></i></a></li>
			</ul>

			<p id="footer_signature">Made with <i class="ts_icon ts_icon_heart"></i> by Slack</p>

		</div>

	</div>
</nav>	
			
<header>
			<a id="menu_toggle" class="no_transition" data-qa="menu_toggle_hamburger">
			<span class="menu_icon"></span>
			<span class="menu_label">Menu</span>
			<span class="vert_divider"></span>
		</a>
		<h1 id="header_team_name" class="inline_block no_transition" data-qa="header_team_name">
			<a href="/home">
				<i class="ts_icon ts_icon_home" /></i>
				Myridz technologies
			</a>
		</h1>
		<div class="header_nav">
			<div class="header_btns float_right">
				<a id="team_switcher" data-qa="team_switcher">
					<i class="ts_icon ts_icon_th_large ts_icon_inherit"></i>
											<span class="block label">Workspaces</span>
									</a>
				<a href="/help" id="help_link" data-qa="help_link">
					<i class="ts_icon ts_icon_life_ring ts_icon_inherit"></i>
					<span class="block label">Help</span>
				</a>
															<a href="/messages" data-qa="launch">
							<img src="https://a.slack-edge.com/66f9/img/icons/ios-64.png" srcset="https://a.slack-edge.com/66f9/img/icons/ios-32.png 1x, https://a.slack-edge.com/66f9/img/icons/ios-64.png 2x" title="Slack" alt="Launch Slack"/>
							<span class="block label">Launch</span>
						</a>
												</div>
				                    <ul id="header_team_nav" data-qa="team_switcher_menu">
	                        	                            <li class="active">
	                            	<a href="https://myridztechnologies.slack.com/home" target="https://myridztechnologies.slack.com/">
	                            			                            			<i class="ts_icon small ts_icon_check_circle_o active_icon s"></i>
	                            			                            			                            			<i class="team_icon small default" >MT</i>
	                            			                            		<span class="switcher_label team_name">Myridz technologies</span>
	                            	</a>
	                            </li>
	                        	                        	                       		<li id="add_team_option"><a href="https://slack.com/signin" target="_blank"><i class="ts_icon ts_icon_plus team_icon small"></i> <span class="switcher_label">Sign in to another workspace...</span></a></li>
	                       	
	                    </ul>
	                		</div>
	
	
	
</header>	
	<div id="page" >

		<div id="page_contents" data-qa="page_contents" class="">


<p class="print_only">
	<strong>
	
	Created by rahul4ckp on Saturday, September 30, 2017 at 0:21 PM
	</strong><br />
	<span class="subtle_silver break_word">https://myridztechnologies.slack.com/files/U357THGMB/F7AQZHU49/angular-file.js</span>
</p>

<div class="file_header_container no_print"></div>

<div class="alert_container">
		

<div class="file_public_link_shared alert" style="display: none;">
		
	<i class="ts_icon ts_icon_link"></i> Public Link: <a class="file_public_link" href="https://slack-files.com/T0JDRDBJL-F7AQZHU49-43af775776" target="new">https://slack-files.com/T0JDRDBJL-F7AQZHU49-43af775776</a>
</div></div>

<div id="file_page" class="card top_padding">

	<p class="small subtle_silver no_print meta">
		
		10KB JavaScript/JSON snippet created on <span class="date">September 30, 2017</span>.
				This file is private.		<span class="file_share_list"></span>
	</p>

	<a id="file_action_cog" class="action_cog action_cog_snippet float_right no_print">
		<span>Actions </span><i class="ts_icon ts_icon_cog"></i>
	</a>
	<a id="snippet_expand_toggle" class="float_right no_print">
		<i class="ts_icon ts_icon_expand "></i>
		<i class="ts_icon ts_icon_compress hidden"></i>
	</a>

	<div class="large_bottom_margin clearfix">
		<pre id="file_contents">/**
 * ur.file: Native HTML5-based file input bindings for AngularJS
 *
 * @version 0.9a
 * @copyright (c) 2013 Union of RAD, LLC http://union-of-rad.com/
 * @license: BSD
 */


/**
 * The ur.file module implements native support for file uploads in AngularJS.
 */
angular.module(&#039;ur.file&#039;, []).config([&#039;$provide&#039;, function($provide) {

  /**
   * XHR initialization, copied from Angular core, because it&#039;s buried inside $HttpProvider.
   */
  var XHR = window.XMLHttpRequest || function() {
    try { return new ActiveXObject(&quot;Msxml2.XMLHTTP.6.0&quot;); } catch (e1) {}
    try { return new ActiveXObject(&quot;Msxml2.XMLHTTP.3.0&quot;); } catch (e2) {}
    try { return new ActiveXObject(&quot;Msxml2.XMLHTTP&quot;); } catch (e3) {}
    throw new Error(&quot;This browser does not support XMLHttpRequest.&quot;);
  };

  /**
   * Initializes XHR object with parameters from $httpBackend.
   */
  function prepXHR(method, url, headers, callback, withCredentials, type, manager) {
    var xhr = new XHR();
    var status;

    xhr.open(method, url, true);

    if (type) {
      xhr.type = type;
      headers[&#039;Content-Type&#039;] = type;
    }

    angular.forEach(headers, function(value, key) {
      (value) ? xhr.setRequestHeader(key, value) : null;
    });

    manager.register(xhr);

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        manager.unregister(xhr);
        var response = xhr.response || xhr.responseText;
        callback(status = status || xhr.status, response, xhr.getAllResponseHeaders());
      }
    };

    if (withCredentials) {
      xhr.withCredentials = true;
    }
    return xhr;
  }

  /**
   * Hook into $httpBackend to intercept requests containing files.
   */
  $provide.decorator(&#039;$httpBackend&#039;, [&#039;$delegate&#039;, &#039;$window&#039;, &#039;uploadManager&#039;, function($delegate, $window, uploadManager) {
    return function(method, url, post, callback, headers, timeout, wc) {
      var containsFile = false, result = null, manager = uploadManager;

      if (post &amp;&amp; angular.isObject(post)) {
        containsFile = hasFile(post);
      }

      if (angular.isObject(post)) {
        if (post &amp;&amp; post.name &amp;&amp; !headers[&#039;X-File-Name&#039;]) {
          headers[&#039;X-File-Name&#039;] = encodeURI(post.name);
        }

        angular.forEach({
          size: &#039;X-File-Size&#039;,
          lastModifiedDate: &#039;X-File-Last-Modified&#039;
        }, function(header, key) {
          if (post &amp;&amp; post[key]) {
            if (!headers[header]) headers[header] = post[key];
          }
        });
      }

      if (post &amp;&amp; post instanceof Blob) {
        return prepXHR(method, url, headers, callback, wc, post.type, manager).send(post);
      }
      $delegate(method, url, post, callback, headers, timeout, wc);
    };
  }]);

  /**
   * Checks an object hash to see if it contains a File object, or, if legacy is true, checks to
   * see if an object hash contains an &lt;input type=&quot;file&quot; /&gt; element.
   */
  var hasFile = function(data) {
    for (var n in data) {
      if (data[n] instanceof Blob) {
        return true;
      }
      if ((angular.isObject(data[n]) || angular.isArray(data[n])) &amp;&amp; hasFile(data[n])) {
        return true;
      }
    }
    return false;
  };

  /**
   * Prevents $http from executing its default transformation behavior if the data to be
   * transformed contains file data.
   */
  $provide.decorator(&#039;$http&#039;, [&#039;$delegate&#039;, function($delegate) {
    var transformer = $delegate.defaults.transformRequest[0];

    $delegate.defaults.transformRequest = [function(data) {
      return data instanceof Blob ? data : transformer(data);
    }];
    return $delegate;
  }]);

}]).service(&#039;fileHandler&#039;, [&#039;$q&#039;, &#039;$rootScope&#039;, function($q, $rootScope) {

  return {

    /**
     * Loads a file as a data URL and returns a promise representing the file&#039;s value.
     */
    load: function(file) {
      var deferred = $q.defer();

      var reader = angular.extend(new FileReader(), {
        onload: function(e) {
          deferred.resolve(e.target.result);
          if (!$rootScope.$$phase) $rootScope.$apply();
        },
        onerror: function(e) {
          deferred.reject(e);
          if (!$rootScope.$$phase) $rootScope.$apply();
        },
        onabort: function(e) {
          deferred.reject(e);
          if (!$rootScope.$$phase) $rootScope.$apply();
        }
        // onprogress: Gee, it&#039;d be great to get some progress support from $q...
      });
      reader.readAsDataURL(file);

      return angular.extend(deferred.promise, {
        abort: function() { reader.abort(); }
      });
    },

    /**
     * Returns the metadata from a File object, including the name, size and last modified date.
     */
    meta: function(file) {
      return {
        name: file.name,
        size: file.size,
        lastModifiedDate: file.lastModifiedDate
      };
    },

    /**
     * Converts a File object or data URL to a Blob.
     */
    toBlob: function(data) {
      var extras = {};

      if (data instanceof File) {
        extras = this.meta(data);
        data = data.toDataURL();
      }
      var parts = data.split(&quot;,&quot;), headers = parts[0].split(&quot;:&quot;), body;

      if (parts.length !== 2 || headers.length !== 2 || headers[0] !== &quot;data&quot;) {
        throw new Error(&quot;Invalid data URI.&quot;);
      }
      headers = headers[1].split(&quot;;&quot;);
      body = (headers[1] === &quot;base64&quot;) ? atob(parts[1]) : decodeURI(parts[1]);
      var length = body.length, buffer = new ArrayBuffer(length), bytes = new Uint8Array(buffer);

      for (var i = 0; i &lt; length; i++) {
        bytes[i] = body.charCodeAt(i);
      }
      return angular.extend(new Blob([bytes], { type: headers[0] }), extras);
    }
  };

}]).service(&#039;uploadManager&#039;, [&#039;$rootScope&#039;, function($rootScope) {

  angular.extend(this, {
    id : null,
    uploads: {},
    capture: function(id) {
      this.id = id;
      this.uploads[id] = {
        loaded: 0,
        total: 0,
        percent: 0,
        object: null
      };
    },
    register: function(xhr) {
      if (this.id === null) {
        return false;
      }
      xhr._idXhr = this.id;
      this.id = null;
      this.uploads[xhr._idXhr][&#039;object&#039;] = xhr;
      var self = this;

      xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
          self.uploads[xhr._idXhr][&#039;loaded&#039;] = e.loaded;
          self.uploads[xhr._idXhr][&#039;total&#039;] = e.total;
          self.uploads[xhr._idXhr][&#039;percent&#039;] = Math.round(e.loaded / e.total * 100);
          $rootScope.$apply();
        }
      };
      return true;
    },
    unregister: function(xhr) {
      delete this.uploads[xhr._idXhr];
    },
    get: function(id) {
      if (this.uploads[id]) {
        return this.uploads[id];
      }
      return false;
    },
    abort: function(id) {
      if (this.uploads[id]) {
        return this.uploads[id][&#039;object&#039;].abort();
      }
      return false;
    }
  });

}]).directive(&#039;type&#039;, [&#039;$parse&#039;, function urModelFileFactory($parse) {

  /**
   * Binding for file input elements
   */
  return {
    scope: false,
    priority: 1,
    require: &quot;?ngModel&quot;,
    link: function urFilePostLink(scope, element, attrs, ngModel) {

      if (attrs.type.toLowerCase() !== &#039;file&#039; || !ngModel) {
        return;
      }

      element.bind(&#039;change&#039;, function(e) {
        if (!e.target.files || !e.target.files.length || !e.target.files[0]) {
          return true;
        }
        var index, fileData = attrs.multiple ? e.target.files : e.target.files[0];
        ngModel.$render = function() {};

        scope.$apply(function(scope) {
          index = scope.$index;
          $parse(attrs.ngModel).assign(scope, fileData);
        });
        scope.$index = index;

        // @todo Make sure this can be replaced by ngChange.
        // For that to work, this event handler must have a higher priority than the one
        // defined by ngChange
        attrs.change ? scope.$eval(attrs.change) : null;
      });
    }
  };

}]).directive(&#039;dropTarget&#039;, [&#039;$parse&#039;, &#039;fileHandler&#039;, function urDropTargetFactory($parse, fileHandler) {

  return {
    scope: false,
    restrict: &quot;EAC&quot;,
    require: &quot;?ngModel&quot;,
    link: function urDropTargetLink(scope, element, attrs, ngModel) {
      var multiple  = attrs.multiple,
          dropExpr  = attrs.drop ? $parse(attrs.drop) : null,
          modelExpr = attrs.ngModel ? $parse(attrs.ngModel) : null;

      if (ngModel) ngModel.$render = function() {};

      function stop(e) {
        e.stopPropagation();
        e.preventDefault();
      }

      var toIgnore = [], isOver = false;

      element.bind(&quot;dragenter&quot;, function dragEnter(e) {
        stop(e);
        if (e.target === this &amp;&amp; !isOver) {
          if (attrs.overClass) element.addClass(attrs.overClass);
          isOver = true;
          return;
        }
        toIgnore.push(e.target);
      });

      element.bind(&quot;dragleave&quot;, function dragExit(e) {
        stop(e);
        if (toIgnore.length === 0 &amp;&amp; isOver) {
          if (attrs.overClass) element.removeClass(attrs.overClass);
          isOver = false;
          return;
        }
        toIgnore.pop();
      });

      element.bind(&quot;dragover&quot;, function(e) {
        stop(e);
      });

      element.bind(&quot;drop&quot;, function(e) {
        stop(e);
        if (attrs.overClass) element.removeClass(attrs.overClass);
        isOver = false;
        e = e.originalEvent || e;
        var files = e.dataTransfer.files;

        if (!files.length) return;
        files = multiple ? files : files[0];

        if (modelExpr) modelExpr.assign(scope, files);
        if (!dropExpr) return (scope.$$phase) ? null : scope.$apply();

        var local = { $event: e };
        local[&#039;$file&#039; + (multiple ? &#039;s&#039; : &#039;&#039;)] = files;
        var result = function() { dropExpr(scope, local); };
        (scope.$$phase) ? result() : scope.$apply(result);
      });
    }
  };

}]);</pre>

		<p class="file_page_meta no_print" style="line-height: 1.5rem;">
			<label class="checkbox normal mini float_right no_top_padding no_min_width">
				<input type="checkbox" id="file_preview_wrap_cb"> wrap long lines			</label>
		</p>

	</div>

	<div id="comments_holder" class="clearfix clear_both">
	<div class="col span_1_of_6"></div>
	<div class="col span_4_of_6 no_right_padding">
		<div id="file_page_comments">
					</div>	
		

	<p class="p-external_file_author_notice hidden">
		
			<strong class="dull_grey">Can???t view comments</strong><br />
			This file is from another workspace.
			</p>

	<form action="https://myridztechnologies.slack.com/files/U357THGMB/F7AQZHU49/angular-file.js"
			id="file_comment_form"
							class="comment_form clearfix"
						method="post">
					<a href="/team/U0JDS9QBC" class="member_preview_link" data-member-id="U0JDS9QBC" >
				<span class="member_image thumb_36" style="background-image: url('https://secure.gravatar.com/avatar/c28fee68b81b38c2f82ed7766f7bb9a6.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0014-72.png')" data-thumb-size="36" data-member-id="U0JDS9QBC"></span>
			</a>
				<input type="hidden" name="addcomment" value="1" />
		<input type="hidden" name="crumb" value="s-1506754285-8df0d407fa-???" />

		<div id="file_comment" class="small texty_comment_input comment_input small_bottom_margin" name="comment" wrap="virtual" ></div>
		<span class="input_note float_left indifferent_grey file_comment_tip">shift+enter to add a new line</span>		<button id="file_comment_submit_btn" type="submit" class="btn float_right  ladda-button" data-style="expand-right"><span class="ladda-label">Add Comment</span></button>
	</form>

<form
		id="file_edit_comment_form"
					class="edit_comment_form clearfix hidden"
				method="post">
		<div id="file_edit_comment" class="small texty_comment_input comment_input small_bottom_margin" name="comment" wrap="virtual"></div>
	<input type="submit" class="save btn float_right " value="Save" />
	<button class="cancel btn btn_outline float_right small_right_margin ">Cancel</button>
</form>	
	</div>
	<div class="col span_1_of_6"></div>
</div>
</div>



		
	</div>
	<div id="overlay"></div>
</div>







<script type="text/javascript">

	/**
	 * A placeholder function that the build script uses to
	 * replace file paths with their CDN versions.
	 *
	 * @param {String} file_path - File path
	 * @returns {String}
	 */
	function vvv(file_path) {

		var vvv_warning = 'You cannot use vvv on dynamic values. Please make sure you only pass in static file paths.';
		if (TS && TS.warn) {
			TS.warn(vvv_warning);
		} else {
			console.warn(vvv_warning);
		}

		return file_path;
	}

	var cdn_url = "https:\/\/slack.global.ssl.fastly.net";
	var vvv_abs_url = "https:\/\/slack.com\/";
	var inc_js_setup_data = {
			emoji_sheets: {
			apple: 'https://a.slack-edge.com/bfaba/img/emoji_2016_06_08/sheet_apple_64_indexed_256colors.png',
			google: 'https://a.slack-edge.com/f360/img/emoji_2016_06_08/sheet_google_64_indexed_128colors.png',
			twitter: 'https://a.slack-edge.com/bfaba/img/emoji_2016_06_08/sheet_twitter_64_indexed_128colors.png',
			emojione: 'https://a.slack-edge.com/bfaba/img/emoji_2016_06_08/sheet_emojione_64_indexed_128colors.png',
		},
		};
</script>
			<script type="text/javascript">
<!--
	// common boot_data
	var boot_data = {
		start_ms: Date.now(),
		app: 'web',
		user_id: 'U0JDS9QBC',
		team_id: 'T0JDRDBJL',
		visitor_uid: ".dmn4ioudmlcg4ssk4sggogwgo",
		no_login: false,
		version_ts: '1506743709',
		version_uid: 'a469616a6abe4845661d64a01e1cf616919fecd2',
		cache_version: "v16-giraffe",
		cache_ts_version: "v2-bunny",
		redir_domain: 'slack-redir.net',
		signin_url: 'https://slack.com/signin',
		abs_root_url: 'https://slack.com/',
		api_url: '/api/',
		team_url: 'https://myridztechnologies.slack.com/',
		image_proxy_url: 'https://slack-imgs.com/',
		beacon_timing_url: "https:\/\/slack.com\/beacon\/timing",
		beacon_error_url: "https:\/\/slack.com\/beacon\/error",
		clog_url: "clog\/track\/",
		api_token: 'xoxs-18467453632-18468330386-200305237314-5ae2bf95e0',
		ls_disabled: false,

		vvv_paths: {
			
		lz_string: "https:\/\/a.slack-edge.com\/bv1-1\/lz-string-1.4.4.worker.8de1b00d670ff3dc706a0.js",
		codemirror: "https:\/\/a.slack-edge.com\/bv1-1\/codemirror.min.e2bf579bcee157a88b78.min.js",
	codemirror_addon_simple: "https:\/\/a.slack-edge.com\/bv1-1\/simple.70ecc9a975af2f650003.min.js",
	codemirror_load: "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_load.76d72167bd995cf5b4ba.min.js",

	// Silly long list of every possible file that Codemirror might load
	codemirror_files: {
		'apl': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_apl.911c78ae9dbbb876ec8a.min.js",
		'asciiarmor': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_asciiarmor.a293255fe54afa94ba49.min.js",
		'asn.1': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_asn.1.6e9b3bdfc2b7aad3f343.min.js",
		'asterisk': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_asterisk.e7ab0d83b26e49893820.min.js",
		'brainfuck': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_brainfuck.5ff5d5934df8d8f3ba98.min.js",
		'clike': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_clike.1d820a3be1600616277e.min.js",
		'clojure': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_clojure.6550ef462b29bbf4bb65.min.js",
		'cmake': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_cmake.9fac03e459ae3eb2c9f8.min.js",
		'cobol': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_cobol.68081e0f32784bab49e7.min.js",
		'coffeescript': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_coffeescript.ae97eeccf3b88bcfceb6.min.js",
		'commonlisp': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_commonlisp.b1cbef624ea5d7394ba7.min.js",
		'css': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_css.485632700ef686acd1c4.min.js",
		'crystal': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_crystal.660a67432521aabdb561.min.js",
		'cypher': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_cypher.c675e3196ed9de30ca26.min.js",
		'd': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_d.501549b16457db7c8d87.min.js",
		'dart': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_dart.261812fc920361a08189.min.js",
		'diff': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_diff.fc8d5f9dee34cb0b93bc.min.js",
		'django': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_django.6d49f8134512def5bcc0.min.js",
		'dockerfile': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_dockerfile.b43431e3e0e17595dbd5.min.js",
		'dtd': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_dtd.ada71afac170905bffaf.min.js",
		'dylan': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_dylan.35670fb5a5cca14df32a.min.js",
		'ebnf': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_ebnf.e2fe4c9b25c0b6996c43.min.js",
		'ecl': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_ecl.3292b0ee5be77a1566f3.min.js",
		'eiffel': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_eiffel.aa1efb4b120c790d9532.min.js",
		'elm': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_elm.e05fe54a20df8e4cacd4.min.js",
		'erlang': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_erlang.7cdd2cbbb7151847e3c7.min.js",
		'factor': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_factor.6384ea1509e932fd74d8.min.js",
		'forth': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_forth.0e7358540106734546a7.min.js",
		'fortran': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_fortran.66ac7867e223f04e08a1.min.js",
		'gas': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_gas.9a9871c5882ec843ec25.min.js",
		'gfm': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_gfm.f2f9251ae647f2608f70.min.js",
		'gherkin': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_gherkin.1c920531fae3313dd50e.min.js",
		'go': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_go.240032cb95b8c1d2ce51.min.js",
		'groovy': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_groovy.bb27ef387db12083d5d7.min.js",
		'haml': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_haml.f74e06e62ad8189c1804.min.js",
		'handlebars': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_handlebars.8ae865aaceffc23ba4d1.min.js",
		'haskell': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_haskell.20cbec9db20614dd529c.min.js",
		'haxe': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_haxe.979364e085e02c82546f.min.js",
		'htmlembedded': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_htmlembedded.a0cfaf914b9112179022.min.js",
		'htmlmixed': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_htmlmixed.dc70b53248135c663a77.min.js",
		'http': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_http.cc930d2a50ad5d77597d.min.js",
		'idl': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_idl.f5f14e7316c57ba2034f.min.js",
		'jade': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_jade.353c24e0beaaa2fa7bcd.min.js",
		'javascript': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_javascript.ce6a46a841bc65c261d4.min.js",
		'jinja2': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_jinja2.97d72869c00301d7aa07.min.js",
		'julia': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_julia.112ef7da5cd4299f2122.min.js",
		'livescript': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_livescript.7937d4bf6cdb2c2e6ff1.min.js",
		'lua': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_lua.a12fda60089940a28fb7.min.js",
		'markdown': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_markdown.57762102ae501fa4fc4a.min.js",
		'mathematica': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_mathematica.236c0eeee07670c114ea.min.js",
		'mirc': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_mirc.d7da3243961864361fab.min.js",
		'mllike': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_mllike.0b1f589b53c66b323eed.min.js",
		'modelica': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_modelica.bae63806a9d473b199d5.min.js",
		'mscgen': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_mscgen.427febd993c6b531d6b6.min.js",
		'mumps': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_mumps.e102b6911f2d202ba74f.min.js",
		'nginx': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_nginx.09afcc5b0476c0aaa3e8.min.js",
		'nsis': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_nsis.46f51123c684597e7d97.min.js",
		'ntriples': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_ntriples.a4acdfd129080bd9baa9.min.js",
		'octave': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_octave.dc00709ffa8761d97b8c.min.js",
		'oz': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_oz.d22ba302f414f6457354.min.js",
		'pascal': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_pascal.167cc18bd1e3cfe3b0e2.min.js",
		'pegjs': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_pegjs.a77868e778c6fda32a66.min.js",
		'perl': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_perl.b88d22694a7ad9b98816.min.js",
		'php': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_php.8b685839b11495d324ef.min.js",
		'pig': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_pig.b77de4f6e4d9ff076ce6.min.js",
		'powershell': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_powershell.863c7bdf7923b7dad50c.min.js",
		'properties': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_properties.450c0f5ed974ce1dc481.min.js",
		'puppet': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_puppet.8bbd26fd877a5a595de7.min.js",
		'python': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_python.4e5523cb58d294cf0719.min.js",
		'q': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_q.4f8c3a21aa44fcb2bfbc.min.js",
		'r': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_r.0e05c3432b9cff2f4297.min.js",
		'rpm': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_rpm.5d29240ab604dfa25a9c.min.js",
		'rst': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_rst.3eedc6de08d4b5865e7c.min.js",
		'ruby': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_ruby.779eeca881fb61ccfe82.min.js",
		'rust': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_rust.2e8534a34d566b177478.min.js",
		'sass': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_sass.809d645f4b0dd54d613a.min.js",
		'scheme': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_scheme.217a204789d4468e5457.min.js",
		'shell': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_shell.0b3347d5784373ddd1ab.min.js",
		'sieve': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_sieve.c74bfdf3aea19bd02e4d.min.js",
		'slim': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_slim.f31bd32332cfcc1238cc.min.js",
		'smalltalk': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_smalltalk.574b12a73456546ca196.min.js",
		'smarty': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_smarty.cc283133853e665e75ad.min.js",
		'solr': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_solr.ccfe308233a11d87de57.min.js",
		'soy': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_soy.93f4e6da8f797f0170e0.min.js",
		'sparql': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_sparql.25373e50cc6b23ffc5eb.min.js",
		'spreadsheet': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_spreadsheet.37068cc18a1fc045c063.min.js",
		'sql': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_sql.05d310606c2f24fa23be.min.js",
		'stex': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_stex.3838e5b07a0c925d6892.min.js",
		'stylus': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_stylus.bfd2de920876dc08e801.min.js",
		'swift': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_swift.25cd459be39ee6bab07c.min.js",
		'tcl': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_tcl.2ba95fd938982743ff5c.min.js",
		'textile': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_textile.cfa927a6523bab8bdb69.min.js",
		'tiddlywiki': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_tiddlywiki.3a7889b8f193dfda99fe.min.js",
		'tiki': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_tiki.388727f48ce028ca1a59.min.js",
		'toml': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_toml.3b33b16a7b208213fa17.min.js",
		'tornado': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_tornado.a69cee1ed46d1a4c4b04.min.js",
		'troff': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_troff.2066152d5615bb6305e0.min.js",
		'ttcn': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_ttcn.83f5ebad005f2f2b7c46.min.js",
		'ttcn:cfg': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_ttcn-cfg.69061a6fb9988675db3d.min.js",
		'turtle': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_turtle.2b6c4b6635f293812188.min.js",
		'twig': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_twig.342914c3f2ba81355960.min.js",
		'vb': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_vb.0589afaaaaa7718db555.min.js",
		'vbscript': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_vbscript.325e16013fa2ed4450af.min.js",
		'velocity': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_velocity.e255f5bf42e44432b3c0.min.js",
		'verilog': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_verilog.d17bfcdb5b1aea551cd0.min.js",
		'vhdl': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_vhdl.5745948bcb9013a3e631.min.js",
		'vue': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_vue.57952f2a0fd912d79dbb.min.js",
		'xml': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_xml.dd06629420ecef13c2b6.min.js",
		'xquery': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_xquery.10753bf9ac188b97e518.min.js",
		'yaml': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_yaml.04d051abb015e3a90c30.min.js",
		'z80': "https:\/\/a.slack-edge.com\/bv1-1\/codemirror_lang_z80.c4a96a6e7b7981504b61.min.js"
	}		},

		notification_sounds: [{"value":"b2.mp3","label":"Ding","url":"https:\/\/slack.global.ssl.fastly.net\/7e91\/sounds\/push\/b2.mp3","url_ogg":"https:\/\/slack.global.ssl.fastly.net\/46ebb\/sounds\/push\/b2.ogg"},{"value":"animal_stick.mp3","label":"Boing","url":"https:\/\/slack.global.ssl.fastly.net\/7e91\/sounds\/push\/animal_stick.mp3","url_ogg":"https:\/\/slack.global.ssl.fastly.net\/46ebb\/sounds\/push\/animal_stick.ogg"},{"value":"been_tree.mp3","label":"Drop","url":"https:\/\/slack.global.ssl.fastly.net\/7e91\/sounds\/push\/been_tree.mp3","url_ogg":"https:\/\/slack.global.ssl.fastly.net\/46ebb\/sounds\/push\/been_tree.ogg"},{"value":"complete_quest_requirement.mp3","label":"Ta-da","url":"https:\/\/slack.global.ssl.fastly.net\/7e91\/sounds\/push\/complete_quest_requirement.mp3","url_ogg":"https:\/\/slack.global.ssl.fastly.net\/46ebb\/sounds\/push\/complete_quest_requirement.ogg"},{"value":"confirm_delivery.mp3","label":"Plink","url":"https:\/\/slack.global.ssl.fastly.net\/7e91\/sounds\/push\/confirm_delivery.mp3","url_ogg":"https:\/\/slack.global.ssl.fastly.net\/46ebb\/sounds\/push\/confirm_delivery.ogg"},{"value":"flitterbug.mp3","label":"Wow","url":"https:\/\/slack.global.ssl.fastly.net\/7e91\/sounds\/push\/flitterbug.mp3","url_ogg":"https:\/\/slack.global.ssl.fastly.net\/46ebb\/sounds\/push\/flitterbug.ogg"},{"value":"here_you_go_lighter.mp3","label":"Here you go","url":"https:\/\/slack.global.ssl.fastly.net\/7e91\/sounds\/push\/here_you_go_lighter.mp3","url_ogg":"https:\/\/slack.global.ssl.fastly.net\/46ebb\/sounds\/push\/here_you_go_lighter.ogg"},{"value":"hi_flowers_hit.mp3","label":"Hi","url":"https:\/\/slack.global.ssl.fastly.net\/7e91\/sounds\/push\/hi_flowers_hit.mp3","url_ogg":"https:\/\/slack.global.ssl.fastly.net\/46ebb\/sounds\/push\/hi_flowers_hit.ogg"},{"value":"knock_brush.mp3","label":"Knock Brush","url":"https:\/\/slack.global.ssl.fastly.net\/7e91\/sounds\/push\/knock_brush.mp3","url_ogg":"https:\/\/slack.global.ssl.fastly.net\/46ebb\/sounds\/push\/knock_brush.ogg"},{"value":"save_and_checkout.mp3","label":"Whoa!","url":"https:\/\/slack.global.ssl.fastly.net\/7e91\/sounds\/push\/save_and_checkout.mp3","url_ogg":"https:\/\/slack.global.ssl.fastly.net\/46ebb\/sounds\/push\/save_and_checkout.ogg"},{"value":"item_pickup.mp3","label":"Yoink","url":"https:\/\/slack.global.ssl.fastly.net\/7e91\/sounds\/push\/item_pickup.mp3","url_ogg":"https:\/\/slack.global.ssl.fastly.net\/46ebb\/sounds\/push\/item_pickup.ogg"},{"value":"hummus.mp3","label":"Hummus","url":"https:\/\/slack.global.ssl.fastly.net\/7fa9\/sounds\/push\/hummus.mp3","url_ogg":"https:\/\/slack.global.ssl.fastly.net\/46ebb\/sounds\/push\/hummus.ogg"},{"value":"none","label":"None"}],
		alert_sounds: [{"value":"frog.mp3","label":"Frog","url":"https:\/\/slack.global.ssl.fastly.net\/a34a\/sounds\/frog.mp3"}],
		call_sounds: [{"value":"call\/alert_v2.mp3","label":"Alert","url":"https:\/\/slack.global.ssl.fastly.net\/08f7\/sounds\/call\/alert_v2.mp3"},{"value":"call\/incoming_ring_v2.mp3","label":"Incoming ring","url":"https:\/\/slack.global.ssl.fastly.net\/08f7\/sounds\/call\/incoming_ring_v2.mp3"},{"value":"call\/outgoing_ring_v2.mp3","label":"Outgoing ring","url":"https:\/\/slack.global.ssl.fastly.net\/08f7\/sounds\/call\/outgoing_ring_v2.mp3"},{"value":"call\/pop_v2.mp3","label":"Incoming reaction","url":"https:\/\/slack.global.ssl.fastly.net\/08f7\/sounds\/call\/pop_v2.mp3"},{"value":"call\/they_left_call_v2.mp3","label":"They left call","url":"https:\/\/slack.global.ssl.fastly.net\/08f7\/sounds\/call\/they_left_call_v2.mp3"},{"value":"call\/you_left_call_v2.mp3","label":"You left call","url":"https:\/\/slack.global.ssl.fastly.net\/08f7\/sounds\/call\/you_left_call_v2.mp3"},{"value":"call\/they_joined_call_v2.mp3","label":"They joined call","url":"https:\/\/slack.global.ssl.fastly.net\/08f7\/sounds\/call\/they_joined_call_v2.mp3"},{"value":"call\/you_joined_call_v2.mp3","label":"You joined call","url":"https:\/\/slack.global.ssl.fastly.net\/08f7\/sounds\/call\/you_joined_call_v2.mp3"},{"value":"call\/confirmation_v2.mp3","label":"Confirmation","url":"https:\/\/slack.global.ssl.fastly.net\/08f7\/sounds\/call\/confirmation_v2.mp3"}],
		call_sounds_version: "v2",
				default_tz: "America\/Los_Angeles",
		
		feature_tinyspeck: false,
		feature_create_team_google_auth: false,
		feature_enterprise_custom_tos: false,
		feature_webapp_always_collect_initial_time_period_stats: false,
		feature_search_skip_context: false,
		feature_flannel_use_canary_sometimes: false,
		feature_store_members_in_redux: false,
		feature_store_files_in_redux: false,
		feature_cross_team_deeplink: false,
		feature_deprecate_window_cert: true,
		feature_deprecate_window_cert_block: true,
		feature_im_browser_qs_tip: false,
		feature_file_threads: false,
		feature_message_replies_inline: false,
		feature_subteam_members_diff: false,
		feature_a11y_keyboard_shortcuts: false,
		feature_email_ingestion: false,
		feature_msg_consistency: false,
		feature_sli_channel_priority: true,
		feature_core_8327_fix: false,
		feature_dont_automark_muted_channels: true,
		feature_global_nav: false,
		feature_sidebar_settings_button: false,
		feature_sidebar_context_menu: false,
		feature_attachments_inline: false,
		feature_fix_files: true,
		feature_channel_eventlog_client: true,
		feature_paging_api: false,
		feature_enterprise_frecency: false,
		feature_enterprise_move_channels: true,
		feature_roles_from_roles_table: false,
		feature_entitlements: true,
		feature_precompute_org_user_counts: true,
		feature_i18n_checkout_updates: true,
		feature_pending_renewal_i18n_update: false,
		feature_grid_archive_link_fixes: false,
		feature_dunning: true,
		feature_invoice_dunning: true,
		feature_safeguard_org_retention: true,
		feature_ssi_checkout: true,
		feature_billing_edits: false,
		feature_basic_analytics: true,
		feature_team_site_basic_analytics: false,
		feature_free_team_analytics_upsell: false,
		feature_analytics_csv_exports: true,
		feature_dashboard_sortable_lists: false,
		feature_analytics_member_report_changes: false,
		feature_refactor_admin_stats: false,
		feature_guest_invitation_restrictions: true,
		feature_teams_to_workspaces: true,
		feature_invite_only_workspaces: false,
		feature_workspace_domain_display: true,
		feature_ent_admin_member_list_filter: false,
		feature_mvch_conflict_popover_update: false,
		feature_enterprise_signup_name_tagging: false,
		feature_sk_lato_cleanup: false,
		feature_saml_rotate_authn_key_client: true,
		feature_sso_jit_disabling: true,
		feature_channel_alert_words: false,
		feature_shared_channels: true,
		feature_shared_channels_client: true,
		feature_connecting_shared_channels_enterprise: false,
		feature_mpim_channels: false,
		feature_esc_cancel_invitations_button: false,
		feature_winssb_beta_channel: false,
		feature_slack_astronaut_i18n_tweaks: false,
		feature_i18n_customer_stories: false,
		feature_i18n_customer_stories_backlog: false,
		feature_presence_sub: true,
		feature_whitelist_zendesk_chat_widget: false,
		feature_live_support_free_plan: false,
		feature_slackbot_goes_to_college: false,
		feature_newxp_enqueue_message: true,
		feature_focus_mode: false,
		feature_star_shortcut: false,
		feature_show_jumper_scores: true,
		feature_force_ls_compression: false,
		feature_ignore_code_mentions: true,
		feature_name_tagging_client: true,
		feature_name_tagging_client_autocomplete: false,
		feature_name_tagging_client_topic_purpose: false,
		feature_use_imgproxy_resizing: true,
		feature_app_forms: true,
		feature_localization: true,
		feature_locale_es_ES: true,
		feature_locale_fr_FR: true,
		feature_locale_de_DE: true,
		feature_locale_ja_JP: false,
		feature_pseudo_locale: false,
		feature_share_mention_comment_cleanup: false,
		feature_external_files: false,
		feature_min_web: true,
		feature_electron_memory_logging: false,
		feature_channel_exports: false,
		feature_free_inactive_domains: true,
		feature_measure_css_usage: false,
		feature_take_profile_photo: false,
		feature_arugula: false,
		feature_texty: true,
		feature_texty_takes_over: true,
		feature_texty_rewrite_on_paste: false,
		feature_deprecate_screenhero: false,
		feature_calls_esc_ui: false,
		feature_parsed_mrkdwn: false,
		feature_toggle_id_translation: false,
		feature_emoji_menu_tuning: false,
		feature_default_shared_channels: false,
		feature_default_shared_channels_new_copy: false,
		feature_react_lfs: false,
		feature_removing_workspaces_from_cross_workspace_channels: false,
		feature_removing_workspaces_from_cross_workspace_channels_strings: false,
		feature_redux_hearts_enterprise: false,
		feature_log_quickswitcher_queries: false,
		feature_disc_workspace_pagination: false,
		feature_mvch_admin_improvements: true,
		feature_enable_mdm: true,
		feature_message_menus: true,
		feature_sli_recaps: true,
		feature_sli_recaps_interface: true,
		feature_new_message_click_logging: true,
		feature_user_custom_status: true,
		feature_announce_only_channels: false,
		feature_token_ip_whitelist: true,
		feature_hide_join_leave: false,
		feature_rollback_to_mapping: false,
		feature_update_emoji_to_v4: false,
		feature_allow_intra_word_formatting: false,
		feature_show_ja_modifier_subtitle: true,
		feature_slim_scrollbar: false,
		feature_sli_briefing: true,
		feature_sli_channel_insights: true,
		feature_sli_file_search: true,
		feature_sli_home: false,
		feature_scrollback_half_measures: true,
		feature_initial_scroll_position: true,
		feature_react_messages: false,
		feature_enterprise_loading_state: false,
		feature_enterprise_dashboard_nav: true,
		feature_api_admin_page: true,
		feature_api_admin_page_not_ent: false,
		feature_oauth_react_wta: false,
		feature_app_index: false,
		feature_partners_lp: false,
		feature_untangle_app_directory_templates: true,
		feature_app_profile_app_site_link: false,
		feature_custom_app_installs: false,
		feature_gdrive_removal_warning_copy_update: true,
		feature_delete_moved_channels: false,
		feature_solr_discoverability: false,
		feature_ms_msg_handlers_profiling: true,
		feature_ms_latest: false,
		feature_no_preload_video: true,
		feature_react_emoji_picker_frecency: false,
		feature_one_rebuild_per_animation_frame: false,
		feature_app_space: true,
		feature_app_space_permissions_tab: false,
		feature_app_canvases: false,
		feature_queue_metrics: false,
		feature_stop_loud_channel_mentions: false,
		feature_message_input_byte_limit: false,
		feature_perfectrics: false,
		feature_automated_perfectrics: false,
		feature_retire_team_site_directory: false,
		feature_link_buttons: true,
		feature_nudge_team_creators: false,
		feature_onedrive_picker: false,
		feature_lesson_onboarding: true,
		feature_lazy_grid_teams: true,
		feature_less_light_up: true,
		feature_ent_user_teams_validate: true,
		feature_less_c_ids_fetch: true,
		feature_delete_team_and_apps: true,
		feature_email_forwarding: true,
		feature_opt_out_react_messages_pref: false,
		feature_pjpeg: false,
		feature_pdf_thumb: true,
		feature_async_uploads_jq: false,
		feature_apps_manage_permissions_scope_changes: true,
		feature_app_dir_only_default_true: false,
		feature_reminder_cross_workspace: false,
		feature_speedy_boot_handlebars: false,
		feature_client_app_menu_cleanup: false,
		feature_channel_invite_modal_cannot_join: false,
		feature_cancel_survey: true,
		feature_sonic: false,
		feature_shortcuts_flexpane: true,
		feature_app_directory_home_page_redesign: true,
		feature_workspace_scim_management: false,
		feature_channel_updated_event: false,
		feature_email_previewer: false,
		feature_browser_dragndrop: false,
		feature_granular_shared_channel_perms: false,
		feature_notification_method: true,
		feature_org_detailed_thread_mentions: true,
		feature_embargo_block_page: true,
		feature_api_site_rollups: false,
		feature_generic_notif_banner: false,
		feature_shortcuts_prompt: false,
		feature_accessible_dialogs: false,
		feature_i18n_unwrapped_strings: false,

	client_logs: {"0":{"numbers":[0],"user_facing":false},"@scott":{"numbers":[2,4,37,58,67,141,142,389,481,488,529,667,773,808,888,999,1701],"owner":"@scott"},"@eric":{"numbers":[2,23,47,48,72,73,82,91,93,96,365,438,552,777,794],"owner":"@eric"},"2":{"owner":"@scott \/ @eric","numbers":[2],"user_facing":false},"4":{"owner":"@scott","numbers":[4],"user_facing":false},"5":{"channels":"#dhtml","numbers":[5],"user_facing":false},"23":{"owner":"@eric","numbers":[23],"user_facing":false},"sounds":{"owner":"@scott","name":"sounds","numbers":[37]},"37":{"owner":"@scott","name":"sounds","numbers":[37],"user_facing":true},"47":{"owner":"@eric","numbers":[47],"user_facing":false},"48":{"owner":"@eric","numbers":[48],"user_facing":false},"Message History":{"owner":"@scott","name":"Message History","numbers":[58]},"58":{"owner":"@scott","name":"Message History","numbers":[58],"user_facing":true},"67":{"owner":"@scott","numbers":[67],"user_facing":false},"72":{"owner":"@eric","numbers":[72],"user_facing":false},"73":{"owner":"@eric","numbers":[73],"user_facing":false},"82":{"owner":"@eric","numbers":[82],"user_facing":false},"@shinypb":{"owner":"@shinypb","numbers":[88,1000,1989,1990,1991,1996]},"88":{"owner":"@shinypb","numbers":[88],"user_facing":false},"91":{"owner":"@eric","numbers":[91],"user_facing":false},"93":{"owner":"@eric","numbers":[93],"user_facing":false},"96":{"owner":"@eric","numbers":[96],"user_facing":false},"@steveb":{"owner":"@steveb","numbers":[99]},"99":{"owner":"@steveb","numbers":[99],"user_facing":false},"Channel Marking (MS)":{"owner":"@scott","name":"Channel Marking (MS)","numbers":[141]},"141":{"owner":"@scott","name":"Channel Marking (MS)","numbers":[141],"user_facing":true},"Channel Marking (Client)":{"owner":"@scott","name":"Channel Marking (Client)","numbers":[142]},"142":{"owner":"@scott","name":"Channel Marking (Client)","numbers":[142],"user_facing":true},"365":{"owner":"@eric","numbers":[365],"user_facing":false},"389":{"owner":"@scott","numbers":[389],"user_facing":false},"438":{"owner":"@eric","numbers":[438],"user_facing":false},"@rowan":{"numbers":[444,666],"owner":"@rowan"},"444":{"owner":"@rowan","numbers":[444],"user_facing":false},"481":{"owner":"@scott","numbers":[481],"user_facing":false},"488":{"owner":"@scott","numbers":[488],"user_facing":false},"529":{"owner":"@scott","numbers":[529],"user_facing":false},"552":{"owner":"@eric","numbers":[552],"user_facing":false},"dashboard":{"owner":"@ac \/ @bruce \/ @kylestetz \/ @nic \/ @rowan","channels":"#devel-enterprise-fe, #feat-enterprise-dash","name":"dashboard","numbers":[666]},"@ac":{"channels":"#devel-enterprise-fe, #feat-enterprise-dash","name":"dashboard","numbers":[666],"owner":"@ac"},"@bruce":{"channels":"#devel-enterprise-fe, #feat-enterprise-dash","name":"dashboard","numbers":[666],"owner":"@bruce"},"@kylestetz":{"channels":"#devel-enterprise-fe, #feat-enterprise-dash","name":"dashboard","numbers":[666],"owner":"@kylestetz"},"@nic":{"channels":"#devel-enterprise-fe, #feat-enterprise-dash","name":"dashboard","numbers":[666],"owner":"@nic"},"666":{"owner":"@ac \/ @bruce \/ @kylestetz \/ @nic \/ @rowan","channels":"#devel-enterprise-fe, #feat-enterprise-dash","name":"dashboard","numbers":[666],"user_facing":false},"667":{"owner":"@scott","numbers":[667],"user_facing":false},"773":{"owner":"@scott","numbers":[773],"user_facing":false},"777":{"owner":"@eric","numbers":[777],"user_facing":false},"794":{"owner":"@eric","numbers":[794],"user_facing":false},"Client Responsiveness":{"owner":"@scott","name":"Client Responsiveness","user_facing":false,"numbers":[808]},"808":{"owner":"@scott","name":"Client Responsiveness","user_facing":false,"numbers":[808]},"Message Pane Scrolling":{"owner":"@scott","name":"Message Pane Scrolling","numbers":[888]},"888":{"owner":"@scott","name":"Message Pane Scrolling","numbers":[888],"user_facing":true},"Unread banner and divider":{"owner":"@scott","name":"Unread banner and divider","numbers":[999]},"999":{"owner":"@scott","name":"Unread banner and divider","numbers":[999],"user_facing":true},"1000":{"owner":"@shinypb","numbers":[1000],"user_facing":false},"Duplicate badges (desktop app icons)":{"owner":"@scott","name":"Duplicate badges (desktop app icons)","numbers":[1701]},"1701":{"owner":"@scott","name":"Duplicate badges (desktop app icons)","numbers":[1701],"user_facing":true},"Members":{"owner":"@fearon","name":"Members","numbers":[1975]},"@fearon":{"owner":"@fearon","name":"Members","numbers":[1975,98765]},"1975":{"owner":"@fearon","name":"Members","numbers":[1975],"user_facing":true},"lazy loading":{"owner":"@shinypb","channels":"#devel-flannel","name":"lazy loading","numbers":[1989]},"1989":{"owner":"@shinypb","channels":"#devel-flannel","name":"lazy loading","numbers":[1989],"user_facing":true},"thin_channel_membership":{"owner":"@shinypb","channels":"#devel-infrastructure","name":"thin_channel_membership","numbers":[1990]},"1990":{"owner":"@shinypb","channels":"#devel-infrastructure","name":"thin_channel_membership","numbers":[1990],"user_facing":true},"stats":{"owner":"@shinypb","channels":"#team-infrastructure","name":"stats","numbers":[1991]},"1991":{"owner":"@shinypb","channels":"#team-infrastructure","name":"stats","numbers":[1991],"user_facing":true},"ms":{"owner":"@shinypb","name":"ms","numbers":[1996]},"1996":{"owner":"@shinypb","name":"ms","numbers":[1996],"user_facing":true},"shared_channels_connection":{"owner":"@jim","name":"shared_channels_connection","numbers":[1999]},"@jim":{"owner":"@jim","name":"shared_channels_connection","numbers":[1999]},"1999":{"owner":"@jim","name":"shared_channels_connection","numbers":[1999],"user_facing":false},"dnd":{"owner":"@patrick","channels":"dhtml","name":"dnd","numbers":[2002]},"@patrick":{"owner":"@patrick","channels":"dhtml","name":"dnd","numbers":[2002,2003,2004,2005,2006,2007]},"2002":{"owner":"@patrick","channels":"dhtml","name":"dnd","numbers":[2002],"user_facing":true},"2003":{"owner":"@patrick","channels":"dhtml","numbers":[2003],"user_facing":false},"Threads":{"owner":"@patrick","channels":"#feat-threads, #devel-threads","name":"Threads","numbers":[2004]},"2004":{"owner":"@patrick","channels":"#feat-threads, #devel-threads","name":"Threads","numbers":[2004],"user_facing":true},"2005":{"owner":"@patrick","numbers":[2005],"user_facing":false},"Reactions":{"owner":"@patrick","name":"Reactions","numbers":[2006]},"2006":{"owner":"@patrick","name":"Reactions","numbers":[2006],"user_facing":true},"TSSSB.focusTabAndSwitchToChannel":{"owner":"@patrick","name":"TSSSB.focusTabAndSwitchToChannel","numbers":[2007]},"2007":{"owner":"@patrick","name":"TSSSB.focusTabAndSwitchToChannel","numbers":[2007],"user_facing":false},"Presence Detection":{"owner":"@ainjii","name":"Presence Detection","numbers":[2017]},"@ainjii":{"owner":"@ainjii","name":"Presence Detection","numbers":[2017,8675309]},"2017":{"owner":"@ainjii","name":"Presence Detection","numbers":[2017],"user_facing":true},"mc_sibs":{"name":"mc_sibs","numbers":[9999]},"9999":{"name":"mc_sibs","numbers":[9999],"user_facing":false},"98765":{"owner":"@fearon","numbers":[98765],"user_facing":false},"8675309":{"owner":"@ainjii","numbers":[8675309],"user_facing":false},"@monty":{"owner":"@monty","numbers":[6532]},"6532":{"owner":"@monty","numbers":[6532],"user_facing":false}},


		img: {
			app_icon: 'https://a.slack-edge.com/272a/img/slack_growl_icon.png'
		},
		page_needs_custom_emoji: false,
		page_needs_enterprise: false	};

	
	
	
	
	
	// i18n locale map (eg: maps Slack `ja-jp` to ZD `ja`)
			boot_data.slack_to_zd_locale = {"en-us":"en-us","fr-fr":"fr-fr","de-de":"de","es-es":"es","ja-jp":"ja"};
	
	// client boot data
		
					boot_data.should_use_flannel = true;
		boot_data.ms_connect_url = "wss:\/\/lbmulti-1Wkx.lb.slack-msgs.com\/?flannel=2&token=xoxs-18467453632-18468330386-200305237314-5ae2bf95e0";
				boot_data.page_has_incomplete_user_model = true;
		boot_data.flannel_server_pool = "random";
		
	
	
	
	
	
	
//-->
</script>	
	
	


	


	<!-- output_js "core" -->
<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/emoji.77de915d82c0ff0314bf.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>
<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/rollup-core_required_libs.4beeaf01382f3cc6f601.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>
<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/rollup-core_required_ts.e01f6445c7c8080eec16.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>
<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/TS.web.ae483e6e3a3ade0a611d.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>

	<!-- output_js "core_web" -->
<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/rollup-core_web.51860257ab0a93c2fef5.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>

	<!-- output_js "secondary" -->
<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/rollup-secondary_a_required.0273625c6669633af99c.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>
<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/rollup-secondary_b_required.6034c622eb12c51e53fb.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>

	<!-- output_js "application" -->
<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/application.f8a18dfd7d1c56d6a286.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>

			
	
	<!-- output_js "regular" -->
<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/TS.web.comments.a29bc2295feb1d57e81f.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>
<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/TS.web.file.7131bffac15d5e480a51.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>
<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/codemirror.min.e2bf579bcee157a88b78.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>
<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/simple.70ecc9a975af2f650003.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>
<script type="text/javascript" src="https://a.slack-edge.com/bv1-1/codemirror_load.76d72167bd995cf5b4ba.min.js" crossorigin="anonymous" onload="window._cdn && _cdn.ok(this, arguments)" onerror="window._cdn && _cdn.failed(this, arguments)"></script>


		<script type="text/javascript">
				TS.clog.setTeam('T0JDRDBJL');
				TS.clog.setUser('U0JDS9QBC');
			</script>

			<script type="text/javascript">
	<!--
		boot_data.page_needs_custom_emoji = true;

		boot_data.file = {"id":"F7AQZHU49","created":1506754277,"timestamp":1506754277,"name":"angular-file.js","title":"angular-file.js","mimetype":"text\/plain","filetype":"javascript","pretty_type":"JavaScript\/JSON","user":"U357THGMB","editable":true,"size":10150,"mode":"snippet","is_external":false,"external_type":"","is_public":false,"public_url_shared":false,"display_as_bot":false,"username":"","url_private":"https:\/\/files.slack.com\/files-pri\/T0JDRDBJL-F7AQZHU49\/angular-file.js","url_private_download":"https:\/\/files.slack.com\/files-pri\/T0JDRDBJL-F7AQZHU49\/download\/angular-file.js","permalink":"https:\/\/myridztechnologies.slack.com\/files\/U357THGMB\/F7AQZHU49\/angular-file.js","permalink_public":"https:\/\/slack-files.com\/T0JDRDBJL-F7AQZHU49-43af775776","edit_link":"https:\/\/myridztechnologies.slack.com\/files\/U357THGMB\/F7AQZHU49\/angular-file.js\/edit","preview":"\/**\r\n * ur.file: Native HTML5-based file input bindings for AngularJS\r\n *\r\n * @version 0.9a\r\n * @copyright (c) 2013 Union of RAD, LLC http:\/\/union-of-rad.com\/\r","preview_highlight":"\u003Cdiv class=\"CodeMirror cm-s-default CodeMirrorServer\" oncopy=\"if(event.clipboardData){event.clipboardData.setData('text\/plain',window.getSelection().toString().replace(\/\\u200b\/g,''));event.preventDefault();event.stopPropagation();}\"\u003E\n\u003Cdiv class=\"CodeMirror-code\"\u003E\n\u003Cdiv\u003E\u003Cpre\u003E\u003Cspan class=\"cm-comment\"\u003E\/**\u003C\/span\u003E\u003C\/pre\u003E\u003C\/div\u003E\n\u003Cdiv\u003E\u003Cpre\u003E\u003Cspan class=\"cm-comment\"\u003E * ur.file: Native HTML5-based file input bindings for AngularJS\u003C\/span\u003E\u003C\/pre\u003E\u003C\/div\u003E\n\u003Cdiv\u003E\u003Cpre\u003E\u003Cspan class=\"cm-comment\"\u003E *\u003C\/span\u003E\u003C\/pre\u003E\u003C\/div\u003E\n\u003Cdiv\u003E\u003Cpre\u003E\u003Cspan class=\"cm-comment\"\u003E * @version 0.9a\u003C\/span\u003E\u003C\/pre\u003E\u003C\/div\u003E\n\u003Cdiv\u003E\u003Cpre\u003E\u003Cspan class=\"cm-comment\"\u003E * @copyright (c) 2013 Union of RAD, LLC http:\/\/union-of-rad.com\/\u003C\/span\u003E\u003C\/pre\u003E\u003C\/div\u003E\n\u003C\/div\u003E\n\u003C\/div\u003E\n","lines":341,"lines_more":336,"preview_is_truncated":true,"channels":[],"groups":[],"ims":["D34ET9741"],"comments_count":0};
		boot_data.file.comments = [];

		

		var g_editor;

		var code_wrap_long_lines = true;

		$(function(){

			var wrap_long_lines = !!code_wrap_long_lines;

			g_editor = CodeMirror(function(elt){
				var content = document.getElementById("file_contents");
				content.parentNode.replaceChild(elt, content);
			}, {
				value: $('#file_contents').text(),
				lineNumbers: true,
				matchBrackets: true,
				indentUnit: 4,
				indentWithTabs: true,
				enterMode: "keep",
				tabMode: "shift",
				viewportMargin: 10,
				readOnly: true,
				lineWrapping: wrap_long_lines
			});

			// past a certain point, CodeMirror rendering may simply stop working.
			// start having CodeMirror use its Long List View-style scolling at >= max_lines.
			var max_lines = 8192;

			var snippet_lines;

			// determine # of lines, limit height accordingly
			if (g_editor.doc && g_editor.doc.lineCount) {
				snippet_lines = parseInt(g_editor.doc.lineCount());
				var new_height;
				if (snippet_lines) {
					// we want the CodeMirror container to collapse around short snippets.
					// however, we want to let it auto-expand only up to a limit, at which point
					// we specify a fixed height so CM can display huge snippets without dying.
					// this is because CodeMirror works nicely with no height set, but doesn't
					// scale (big file performance issue), and doesn't work with min/max-height -
					// so at some point, we have to set an absolute height to kick it into its
					// smart / partial "Long List View"-style rendering mode.
					if (snippet_lines < max_lines) {
						new_height = 'auto';
					} else {
						new_height = (max_lines * 0.875) + 'rem'; // line-to-rem ratio
					}
					var line_count = Math.min(snippet_lines, max_lines);
					TS.info('Applying height of ' + new_height + ' to container for this snippet of ' + snippet_lines + (snippet_lines === 1 ? ' line' : ' lines'));
					$('#page .CodeMirror').height(new_height);
				}
			}

			$('#file_preview_wrap_cb').bind('change', function(e) {
				code_wrap_long_lines = $(this).prop('checked');
				g_editor.setOption('lineWrapping', code_wrap_long_lines);
			})

			$('#file_preview_wrap_cb').prop('checked', wrap_long_lines);

			CodeMirror.switchSlackMode(g_editor, "javascript");
		});

		
		$('#file_comment').css('overflow', 'hidden').autogrow();
	//-->
	</script>


			<script type="text/javascript">TS.boot(boot_data);</script>
	
<style>.color_9f69e7:not(.nuc) {color:#9F69E7;}.color_4bbe2e:not(.nuc) {color:#4BBE2E;}.color_e7392d:not(.nuc) {color:#E7392D;}.color_3c989f:not(.nuc) {color:#3C989F;}.color_674b1b:not(.nuc) {color:#674B1B;}.color_e96699:not(.nuc) {color:#E96699;}.color_e0a729:not(.nuc) {color:#E0A729;}.color_684b6c:not(.nuc) {color:#684B6C;}.color_5b89d5:not(.nuc) {color:#5B89D5;}.color_2b6836:not(.nuc) {color:#2B6836;}.color_99a949:not(.nuc) {color:#99A949;}.color_df3dc0:not(.nuc) {color:#DF3DC0;}.color_4cc091:not(.nuc) {color:#4CC091;}.color_9b3b45:not(.nuc) {color:#9B3B45;}.color_d58247:not(.nuc) {color:#D58247;}.color_bb86b7:not(.nuc) {color:#BB86B7;}.color_5a4592:not(.nuc) {color:#5A4592;}.color_db3150:not(.nuc) {color:#DB3150;}.color_235e5b:not(.nuc) {color:#235E5B;}.color_9e3997:not(.nuc) {color:#9E3997;}.color_53b759:not(.nuc) {color:#53B759;}.color_c386df:not(.nuc) {color:#C386DF;}.color_385a86:not(.nuc) {color:#385A86;}.color_a63024:not(.nuc) {color:#A63024;}.color_5870dd:not(.nuc) {color:#5870DD;}.color_ea2977:not(.nuc) {color:#EA2977;}.color_50a0cf:not(.nuc) {color:#50A0CF;}.color_d55aef:not(.nuc) {color:#D55AEF;}.color_d1707d:not(.nuc) {color:#D1707D;}.color_43761b:not(.nuc) {color:#43761B;}.color_e06b56:not(.nuc) {color:#E06B56;}.color_8f4a2b:not(.nuc) {color:#8F4A2B;}.color_902d59:not(.nuc) {color:#902D59;}.color_de5f24:not(.nuc) {color:#DE5F24;}.color_a2a5dc:not(.nuc) {color:#A2A5DC;}.color_827327:not(.nuc) {color:#827327;}.color_3c8c69:not(.nuc) {color:#3C8C69;}.color_8d4b84:not(.nuc) {color:#8D4B84;}.color_84b22f:not(.nuc) {color:#84B22F;}.color_4ec0d6:not(.nuc) {color:#4EC0D6;}.color_e23f99:not(.nuc) {color:#E23F99;}.color_e475df:not(.nuc) {color:#E475DF;}.color_619a4f:not(.nuc) {color:#619A4F;}.color_a72f79:not(.nuc) {color:#A72F79;}.color_7d414c:not(.nuc) {color:#7D414C;}.color_aba727:not(.nuc) {color:#ABA727;}.color_965d1b:not(.nuc) {color:#965D1B;}.color_4d5e26:not(.nuc) {color:#4D5E26;}.color_dd8527:not(.nuc) {color:#DD8527;}.color_bd9336:not(.nuc) {color:#BD9336;}.color_e85d72:not(.nuc) {color:#E85D72;}.color_dc7dbb:not(.nuc) {color:#DC7DBB;}.color_bc3663:not(.nuc) {color:#BC3663;}.color_9d8eee:not(.nuc) {color:#9D8EEE;}.color_8469bc:not(.nuc) {color:#8469BC;}.color_73769d:not(.nuc) {color:#73769D;}.color_b14cbc:not(.nuc) {color:#B14CBC;}</style>

<!-- slack-www-hhvm-097bcf2ba85116cba / 2017-09-29 23:51:25 / va469616a6abe4845661d64a01e1cf616919fecd2 / B:H -->


</body>
</html>