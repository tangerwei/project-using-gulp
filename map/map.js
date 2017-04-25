(function () {
    if (window.IMap) {
        console.error("IMap is already there");
        return;
    }
    if (!BMap) {
        console.error("please add Map plugin of Baidu");
        return;
    }
    window.IMap = function (name) {
        this.$map = new BMap.Map(name);
        this.$Geocoder = new BMap.Geocoder();
        this.$geolocation = new BMap.Geolocation();
        this.$position = {
            lastPositionLng: null,
            lastPositionLat: null,
            id: 0
        };
    }
    IMap.prototype = {
        //str为地址，obj为图标的属性
        setIcon: function (str, obj) {
            var _self = this;
            this.$Geocoder.getPoint(str, function (point) {
                if (point) {
                    _self.mapPoint(new BMap.Point(point.lng, point.lat), obj ? obj : true)
                } else {
                    console.log("地址-" + str + "-没有解析到结果!");
                }
            });
        },
        mapPoint: function (myP1, obj) {
            // 标注解析点和设置对应的图标
            try {
                var url = obj.url, w = obj.width, h = obj.height;
                var icon = new BMap.Icon(url, new BMap.Size(w, h));
                this.$map.addOverlay(new BMap.Marker(myP1, { icon: icon }));
            } catch (e) {
                console.log('set icon of point in map,maybe the next object attribute is error');
                console.log(obj);
            }
        },
        // 画线函数
        drawLine: function (lng, lat) {
            if (this.$position.lastPositionLng == null) {
                console.log("first point");
            } else {
                var polyline = new BMap.Polyline([
                    new BMap.Point(this.$position.lastPositionLng, this.$position.lastPositionLat),
                    new BMap.Point(lng, lat)
                ], { strokeColor: "pink", strokeWeight: 4, strokeOpacity: 0.5 });
                this.$map.addOverlay(polyline);
            }
            // save position
            this.$position.lastPositionLng = lng;
            this.$position.lastPositionLat = lat;
        },
        // 获取当前定位经纬度
        getLocal: function (callback) {
            var _self = this;
            this.$geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var lng = r.point.lng;
                    var lat = r.point.lat;
                    //draw line
                    _self.drawLine(lng, lat);
                    if (typeof callback == "function") {
                        callback();
                    }
                    // 每次获取当前位置并且重置地图中心点 
                    _self.$map.centerAndZoom(new BMap.Point(lng, lat), 12);  // 初始化地图,设置中心点坐标和  地图级别
                    // 标注当前位置
                    var icon = new BMap.Icon("caricon.png", new BMap.Size(32, 32));//设置标注图标
                    //设置标注的经纬度
                    var marker = new BMap.Marker(new BMap.Point(lng, lat), { icon: icon });
                    // 将标注添加到地图上
                    _self.$map.addOverlay(marker);
                }
                else {
                    console.error("sorry,get location error");
                }
            }, { enableHighAccuracy: true })
        },
        startDraw: function () {
            var _self = this;
            this.getLocal();
            this.$position.id = setInterval(function () {
                _self.getLocal();
            }, 10000);
        },
        removeDraw:function(){
            if(this.$position.id !== 0){
                clearInterval(this.$position.id);
            }
        }
    }
})();