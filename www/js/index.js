/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 var app = {
    // Application Constructor
    initialize: function() {
        app.currDiv = 0;
        app.div1 = $("#jt_div1");
        app.div2 = $("#jt_div2");

        // load main.html
        app.loadPage("./main.html", null, app.setupMain);
    },

    setupMain: function() {
        $("#jt_sidebar").css("left","-%100");
        setTimeout(function() {
            app.setupSidebar("./main.html", app.setupMain);
            $("#jt_sidebar").css("left","%0");
        }, 50);
        
        // setup event handlers
        $('#jt_btn_goto_main').click(function(){
            app.loadPage("./begin.html", null, app.setupBegin);
        });

        $('#jt_btn_scan').click(function(){
            app.loadPage("./city.html", null, app.setupCity);
        });
    },

    setupCity: function() {
        $("#jt_btn_cancel").click(function(){
            app.loadPage("./main.html", null, app.setupMain);
        });

        $("#jt_btn_enter").click(function(){
            app.loadPageWithAnimate("./cityinfo.html", null, app.setupCityinfo); 
        });
    },

    // setup being page
    setupBegin: function() {
        // setup float button
        app.setupRecord();

        // setup sidebar
        app.setupSidebar("./begin.html", app.setupBegin);
        beginScroll = new iScroll('jt_begin_wrapper', {
            "vScrollbar":false
        });

        $("#jt_filter").hide();
        var jtf_hide = true;
        $("#jt_btn_filter").click(function(){
            if (jtf_hide == true) {
                $("#jt_filter").fadeIn();
                $("#jt_btn_filter").attr("src", "img/jobbox_2.png");
                jtf_hide = false;
            } else {
                $("#jt_filter").fadeOut();
                $("#jt_btn_filter").attr("src", "img/jobbox.png");
                jtf_hide = true;
            }
        });

        $("#jt_btn_place").click(function(){
            app.loadPageWithAnimate("place.html", null, app.setupPlace);
        });

        $("#jt_btn_comment").click(function(){
            app.loadPageWithAnimate("comment.html", null, app.setupComment);
        });

        $(".jt_begin-place-cover").click(function(e){
            var target = $(e.target);
            var next = target.data("goto");
            if(!next) return;
            app.loadPageWithAnimate(next, null, function(){
                app.setupPlaceDetail("./begin.html", app.setupBegin, next);
            });
        });

        $(".jt_begin-reply").click(function(e){
            var target = $(e.target);
            var next = target.data("goto") || $(e.target.parentNode).data("goto");
            if(!next) return;
            app.loadPageWithAnimate(next, null, function(){
                app.setupReply("./begin.html", app.setupBegin);
            });
        });

        $(".jt_has_nearby").each(function(_, obj){
            var name = $(obj).data("nearby");
            $(obj).addClass(name);
        });

        var setupPlaceCover = function(nearby) {
            $(".jt_has_nearby").each(function(_, obj){
                var name = $(obj).data("nearby");
                if(nearby) {
                    $(obj).addClass(name+"-loc");
                } else {
                    $(obj).removeClass(name+"-loc");
                }
            });
        }
        $("#jt_btn_home_or_nearby").click(function(){
            var btn = $("#jt_btn_home_or_nearby");
            if (btn.attr("src") == "img/nearby.png") {
                btn.attr("src", "img/home.png");
                $("#jt_topbar_title").html("附　近");
                $("#jt_filter > img").attr("src", "img/filter_02.png");
                $(".jt_none_nearby").hide();
                beginScroll.refresh();
                beginScroll.scrollTo(0, 0, 100, false);
                setupPlaceCover(true);
            } else {
                btn.attr("src", "img/nearby.png");
                $("#jt_topbar_title").html("台　北");
                $("#jt_filter > img").attr("src", "img/filter_01.png");
                $(".jt_none_nearby").show();
                beginScroll.refresh();
                beginScroll.scrollTo(0, 0, 100, false);
                setupPlaceCover(false);
            }
        });
    },

    setupCityinfo: function(){

        beginScroll = new iScroll('jt_cityinfo_wrapper', {
            "vScrollbar":false
        });

        $(".jt_begin-place-cover").click(function(e){
            var target = $(e.target);
            var next = target.data("goto");
            if(!next) return;
            app.loadPageWithAnimate(next, null, function(){
                app.setupPlaceDetail("./cityinfo.html", app.setupCityinfo, next);
            });
        });

        $("#jt_btn_back").click(function(){
            app.loadPageWithAnimateBack("./city.html", null, app.setupCity);
        });

    },

    // setup profile page
    setupProfile: function(backurl, setupfunc) {

        profileScroll = new iScroll('jt_profile_wrapper', { 
            "vScrollbar": false,
            "checkDOMChanges": true,
        });

        $("#jt_btn_back").click(function(){
            app.loadPageWithAnimateBack(backurl, null, setupfunc);
        });

        $("#jt_btn_home").click(function(){
            app.loadPage("./begin.html", null, app.setupBegin);
        });

        $("#jt_btn_history").click(function(){
            app.loadPageWithAnimate("./history.html", null, function(){
                app.setupHistory("./profile.html", function(){
                    app.setupProfile(backurl, setupfunc);
                });
            });
        });

        $("#jt_history_taibei").click(function(){
            app.loadPageWithAnimate("./tour.html", null, function(){
                app.setupTour("./profile.html", function(){
                    app.setupProfile(backurl, setupfunc);
                });
            });
        });

        $("#jt_btn_place_info").click(function(){
            app.loadPageWithAnimate("./placeinfo.html", null, function(){
                app.setupPlaceInfo("./profile.html", function(){
                    app.setupProfile(backurl, setupfunc);
                });
            });
        });

        $("#jt_btn_reply").click(function(){
            app.loadPageWithAnimate("./reply.html", null, function(){
                app.setupReply("./profile.html", function(){
                    app.setupProfile(backurl, setupfunc);
                });
            });
        });
    },

    // setup place page
    setupPlace: function() {
        app.setupRecord();
        app.setupStar();

        placeScroll = new iScroll('jt_place_wrapper', { 
            "vScrollbar": false,
            "checkDOMChanges": true,
        });

        $("#jt_btn_back").click(function(){
            app.loadPageWithAnimateBack("./begin.html", null, app.setupBegin);
        });

        $(".jt_btn_place_detail").click(function(e){
            var target = $(e.target);
            var next = target.data("goto") || $(e.target.parentNode).data("goto") ;
            if(!next) return;
            app.loadPageWithAnimate(next, null, function(){
                app.setupPlaceDetail("./place.html", app.setupPlace, next);
            });
        });
    },

    setupPlaceFavour: function() {
        app.setupRecord();
        placeScroll = new iScroll('jt_place_wrapper', { 
            "vScrollbar": false,
            "checkDOMChanges": true,
        });

        $("#jt_btn_back").click(function(){
            app.loadPageWithAnimateBack("./begin.html", null, app.setupBegin);
        });

        $("#jt_btn_place_detail").click(function(){
            app.loadPageWithAnimate("./placedetail.html", null, function(){
                app.setupPlaceDetail("./favourplace.html", app.setupPlaceFavour);
            });
        });
    },

    // setup place page
    setupComment: function() {
        app.setupRecord();
        commentScroll = new iScroll('jt_place_wrapper', { 
            "vScrollbar": false,
            "checkDOMChanges": true,
        });

        $("#jt_btn_back").click(function(){
            app.loadPageWithAnimateBack("./begin.html", null, app.setupBegin);
        });

        $(".jt_btn_place_detail").click(function(e){
            var target = $(e.target);
            var next = target.data("goto") || $(e.target.parentNode).data("goto") ;
            if(!next) return;
            app.loadPageWithAnimate(next, null, function(){
                app.setupPlaceDetail("./comment.html", app.setupComment);
            });
        });

        $(".jt_btn_reply").click(function(e){
            var target = $(e.target);
            var next = target.data("goto") || $(e.target.parentNode).data("goto") ;
            if(!next) return;
            app.loadPageWithAnimate(next, null, function(){
                app.setupReply("./comment.html", app.setupComment);
            });
        });
    },

    // setup history page
    setupHistory: function(backurl, setupfunc) {

        commentScroll = new iScroll('jt_place_wrapper', { 
            "vScrollbar": false,
            "checkDOMChanges": true,
        });

        $("#jt_btn_back").click(function(){
            app.loadPageWithAnimateBack(backurl, null, setupfunc);
        });

        $("#jt_history_taibei").click(function(){
            app.loadPageWithAnimate("./tour.html", null, function(){
                app.setupTour("./history.html", function(){
                    app.setupHistory(backurl, setupfunc);
                });
            });
        });
    },

    setupTour: function(backurl, setupfunc) {
        commentScroll = new iScroll('jt_place_wrapper', { 
            "vScrollbar": false,
            "checkDOMChanges": true,
        });

        $("#jt_btn_back").click(function(){
            app.loadPageWithAnimateBack(backurl, null, setupfunc);
        });

        $("#jt_btn_place_info").click(function(){
            app.loadPageWithAnimate("./placeinfo.html", null, function(){
                app.setupPlaceInfo("./tour.html", function(){
                    app.setupTour(backurl, setupfunc);
                });
            });
        });

        $("#jt_btn_reply").click(function(){
            app.loadPageWithAnimate("./reply.html", null, function(){
                app.setupReply("./tour.html", function(){
                    app.setupTour(backurl, setupfunc);
                });
            });
        });

        $("#jt_btn_share").click(function(){
            app.loadPageWithAnimate("./share.html", null, function(){
                app.setupShare(backurl, setupfunc);
            });
        });

        $("#jt_btn_qr").click(function(){
            app.loadPageWithAnimate("./qr.html", null, function(){
                $("#jt_btn_back").click(function(){
                    app.loadPageWithAnimateBack("./tour.html", null, function(){
                        app.setupTour(backurl, setupfunc);
                    });
                });
            });
        });
    },

    setupShare: function(backurl, setupfunc) {
        // setup share page
        $("#jt_btn_back").click(function(){
            app.loadPageWithAnimateBack("./tour.html", null, function(){
                app.setupTour(backurl, setupfunc);
            });
        });

        $("#jt_btn_shareflip").click(function(){
            app.loadPageWithAnimate("./share_flip.html", null, function(){
                app.setupSharefilp(backurl, setupfunc);
            });
        });
    },

    setupSharefilp: function(backurl, setupfunc) {
        commentScroll = new iScroll('jt_shareflip_wrapper', { 
            "vScrollbar": false,
            "checkDOMChanges": true,
        });

        $("#jt_btn_back").click(function(){
            app.loadPageWithAnimateBack("./share.html", null, function(){
                app.setupShare(backurl, setupfunc);
            });
        });
    },

    setupPlaceDetail: function(backurl, setupfunc, from) {
        app.setupRecord();
        app.setupStar();

        if(!from) from = "./placedetail.html";

        commentScroll = new iScroll('jt_place_detail_wrapper', { 
            "vScrollbar": false,
            "checkDOMChanges": true,
        });

        $("#jt_btn_back").click(function(){
            app.loadPageWithAnimateBack(backurl, null, setupfunc);
        });

        $("#jt_btn_home").click(function(){
            app.loadPage("./begin.html", null, app.setupBegin);
        });

        $("#jt_btn_place_info").click(function(e){
            var target = $(e.target);
            var next = target.data("goto") || $(e.target.parentNode).data("goto") ;
            if(!next) return;
            app.loadPageWithAnimate(next, null, function(){
                app.setupPlaceInfo(from, function(){
                    app.setupPlaceDetail(backurl, setupfunc);
                });
            });
        });

        $("#jt_btn_placecomment").click(function(e){
            var target = $(e.target);
            var next = target.data("goto") || $(e.target.parentNode).data("goto") ;
            if(!next) return;
            app.loadPageWithAnimate(next, null, function(){
                app.setupPlaceComment(from, function(){
                    app.setupPlaceDetail(backurl, setupfunc);
                }, next);
            });
        });

        $("#jt_btn_reply").click(function(e){
            var target = $(e.target);
            var next = target.data("goto") || $(e.target.parentNode).data("goto") ;
            if(!next) return;
            app.loadPageWithAnimate(next, null, function(){
                app.setupReply(from, function(){
                    app.setupPlaceDetail(backurl, setupfunc);
                }, next);
            });
        });

    },

    setupPlaceComment: function(backurl, setupfunc, from) {
        app.setupRecord();
        app.setupStar();

        if(!from) from = "./placecomment.html";

        commentScroll = new iScroll('jt_place_wrapper', { 
            "vScrollbar": false,
            "checkDOMChanges": true,
        });

        $("#jt_btn_back").click(function(){
            app.loadPageWithAnimateBack(backurl, null, setupfunc);
        });


        $("#jt_btn_reply").click(function(e){
            var target = $(e.target);
            var next = target.data("goto") || $(e.target.parentNode).data("goto") ;
            if(!next) return;
            app.loadPageWithAnimate(next, null, function(){
                app.setupReply(from, function(){
                    app.setupPlaceComment(backurl, setupfunc);
                });
            }, next);
        });

        $("#jt_btn_profile").click(function(){
            app.loadPageWithAnimate("./profile.html", null, function(){
                app.setupProfile(from, function(){
                    app.setupPlaceComment(backurl, setupfunc);
                });
            });
        });
    },

    setupPlaceInfo: function(backurl, setupfunc) {
        app.setupRecord();
        app.setupStar();

        commentScroll = new iScroll('jt_place_info_wrapper', { 
            "vScrollbar": false,
            "checkDOMChanges": true,
        });

        $("#jt_btn_back").click(function(){
            app.loadPageWithAnimateBack(backurl, null, setupfunc);
        });
    },

    setupReply: function(backurl, setupfunc) {
        commentScroll = new iScroll('jt_reply_wrapper', { 
            "vScrollbar": false,
            "checkDOMChanges": true,
        });

        $("#jt_btn_back").click(function(){
            app.loadPageWithAnimateBack(backurl, null, setupfunc);
        });
    },

    setupSidebar : function(backurl, setupfunc) {
        
        // add menu handlers
        $("#jt_menu_profile").click(function(){
            console.log("menu profile");
            app.loadPageWithAnimate("./profile.html", null, function(){
                app.setupProfile(backurl, setupfunc);
            });
        });

        $("#jt_menu_home").click(function(){
            console.log("menu home");
            app.loadPage("./main.html", null, app.setupMain);
        });

        $("#jt_menu_record").click(function(){
            console.log("menu record");
            app.loadPageWithAnimate("./tour.html", null, function(){
                app.setupTour(backurl, setupfunc);
            });
        });

        $("#jt_menu_favourplace").click(function(){
            console.log("menu favourplace");
            app.loadPageWithAnimate("./favourplace.html", null, app.setupPlaceFavour);
        });

        $("#jt_menu_history").click(function(){
            console.log("menu history");
            app.loadPageWithAnimate("./history.html", null, function(){
                app.setupHistory(backurl, setupfunc);
            });
        });

        $("#jt_menu_reply").click(function(){
            console.log("menu reply");
            app.loadPageWithAnimate("./reply.html", null, function(){
                app.setupReply(backurl, setupfunc);
            });
        });

        //Setup the ViewNavigator
        var sv = new SlidingView('jt_sidebar', 'jt_body', 'jt_topbar');  
        sv.sidebarWidth = 412;
        // setTimeout(function(){
            // sv.sidebar.css("left", "0px");
            sv.sidebar.oriDomi({ hPanels: 1, vPanels: 2, speed:1, perspective:800, shadingIntensity:4 });
            sv.sidebar.oriDomi( 'accordion', 90);
            sv.sidebar.bind( "slidingViewProgress", function(event, data) {
                var fudge = 1
                var half = data.max/2;
                if ( data.current < half ) {
                    fudge = (data.current)/half
                } else if ( data.current > half ) {
                    fudge = (half-(data.current-half))/half
                }
                fudge *= 15
                
                var angle = 90-((90*(data.current/data.max)));
                
                if ( (angle+fudge) > 0 ) {
                    sv.sidebar.oriDomi( 'restoreOriDomi', (angle+fudge) );
                    sv.sidebar.oriDomi( 'accordion', (angle+fudge) );
                } else {
                    sv.sidebar.oriDomi( 'restoreDOM', (angle+fudge) );
                }
            });
        // }, 500);

        var sidebar_open = false;
        $("#jt_btn_menu").click(function(){
            if (sidebar_open == false) {
                sv.open();
                sidebar_open = true;
            } else {
                sv.close();
                sidebar_open = false;
            }
        });
    },

    setupRecord: function() {

        var rec = $("#jt_record_container");
        rec.hide();
        $("#jt_float_edit_btn").click(function(){
            // load editor
            rec.load("./record.html", function(){
                rec.css({"z-index":99});
                rec.fadeIn(200);

                $(".jt_record_dismissable").click(function(){
                    rec.fadeOut(200, function(){
                            rec.html("");
                    });
                });
            });

        });

    },

    setupStar: function() {

        $(".jt_btn_star").click(function(e){
            var imgel = $(e.target);
            if(imgel.attr("src") == "img/star_1.png") {
                imgel.attr("src", "img/star_2.png");
            } else {
                imgel.attr("src", "img/star_1.png");
            }
        });

    },

    /**** Utilities ****/
    loadPage: function(url, onleave, onenter) {
        console.log("loadPage("+url+")");
        // If onleave function specified
        if (onleave) {
            onleave();
        }

        $('#jt_div'+(app.currDiv+1)).load(url, onenter);
    },

    getCurrDiv: function() {
        app.currDiv;
    },

    clearState: function(onenter, idx){
            // Clear transition so app.div2 can be moved to the right of app.div1
        setTimeout(function() {
            app.div2.css({
                WebkitTransition: ""
            });
            app.div1.css({
                WebkitTransition: ""
            });
            
            $('#jt_div'+idx).html("");

            $("#jt_mask").css({"z-index":-999});

            if (onenter) {
                onenter();
            }
        }, 330);
    },

    loadPageWithAnimate: function (url, onleave, onenter) {

        console.log("loadPageA("+url+")");

        if (onleave) {
            onleave();
        }
        $("#jt_mask").css({"z-index":999});

        if (app.currDiv === 0) {
            
            // Slide div0 out and div1 in from left 
            app.div2.css({left:"100%"});
            setTimeout(function() {
                app.div2.load(url, function(){
                    app.div1.css({
                        left: "-100%",
                        WebkitTransition: "left 0.25s ease-in",
                    });

                    app.div2.css({
                        left: "0px",
                        WebkitTransition: "left 0.25s ease-in",
                    });
                    
                    // Clear transition so app.div2 can be moved to the right of app.div1
                    app.clearState(onenter, 1);
                    app.currDiv = 1;
                });
            }, 100);
            
        } else {
            app.div1.css({left:"100%"});
            setTimeout(function() {
                app.div1.load(url, function(){
                    app.div1.css({
                        left: "0px",
                        WebkitTransition: "left 0.25s ease-in",
                    });
                    app.div2.css({
                        left: "-100%",
                        WebkitTransition: "left 0.25s ease-in",
                    });
                    
                    app.clearState(onenter, 2);
                    app.currDiv = 0;
                });
            }, 100);
        }
    }, 

    loadPageWithAnimateBack: function (url, onleave, onenter) {

        console.log("loadPageAB("+url+")");

        if (onleave) {
            onleave();
        }

        $("#jt_mask").css({"z-index":999});

        if (app.currDiv === 0) {
            
            app.div2.css({left:"-100%"});
            setTimeout(function() {
                app.div2.load(url, function(){
                    app.div1.css({
                        left: "100%",
                        WebkitTransition: "left 0.25s ease-out",
                    });

                    app.div2.css({
                        left: "0px",
                        WebkitTransition: "left 0.25s ease-out",
                    });
                    
                    // Clear transition so app.div2 can be moved to the right of app.div1
                    app.clearState(onenter, 1);
                    app.currDiv = 1;
                });
            }, 100);
            
        } else {

            app.div1.css({left:"-100%"});
            setTimeout(function() {
                app.div1.load(url, function(){
                    // Slide app.div2 out and di0 in from left
                    app.div1.css({
                        left: "0px",
                        WebkitTransition: "left 0.25s ease-out",
                    });
                    app.div2.css({
                        left: "100%",
                        WebkitTransition: "left 0.25s ease-out",
                    });
                    
                    // Clear transition so app.div2 can be moved to the right of app.div1
                    app.clearState(onenter, 2);
                    app.currDiv = 0;
                });
            }, 100);
        }
    }

};


