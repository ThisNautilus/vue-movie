<template>
    <div class="city_body">
		
		<div class="city_list">
			<Loading v-if="isLoading"/>
			<!-- 滑动下只能有一个子节点 -->
			<Scroller v-else ref="city_List">
			<div>
				<div class="city_hot">
					<h2>热门城市</h2>
					<ul class="clearfix">
						<li v-for="item in hotList" :key="item.nm" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
					</ul>
				</div>
			<!-- ref引用属性，获取dom -->
				<div class="city_sort" ref="city_sort">
					<div v-for="item in cityList" :key="item.index">
						<h2>{{item.index}}</h2>
						<ul>
							<li v-for="li in item.list" :key='li.id' @tap="handleToCity(li.nm,li.id)">{{li.nm}}</li>
						</ul>
					</div>
				</div>
			</div>
			</Scroller>
		</div>
		
		<div class="city_index">
			<ul>
				<!-- 这里的index并不是item.index 而是下标0,1,2.... -->
				<!-- touchstart：移动端浏览器触摸事件 -->
				<li v-for="(item,index) in cityList" :key="item.index" @touchstart=handleToIndex(index)>{{item.index}}</li>
			</ul>
		</div>		
	</div>
</template>

<script>
export default {
	name:'city',
	data(){
		return {
			cityList:[],
			hotList:[],
			isLoading:true
		}
	},
	mounted(){
		var cityList = JSON.parse(window.localStorage.getItem('cityList'));
		var hotList = JSON.parse(window.localStorage.getItem('hotList'));

		if(cityList && hotList) {
			this.cityList = cityList;
			this.hotList = hotList;
			this.isLoading = false;
		}
		else{
			this.axios.get('/api/cityList').then(res=>{
			// console.log(res);
			var msg = res.data.msg
			if(msg === 'ok'){
				this.isLoading = false;
				var cities = res.data.data.cities;
				var {cityList,hotList} = this.formatCityList(cities);
				this.cityList = cityList;
				this.hotList = hotList;
				window.localStorage.setItem('cityList',JSON.stringify(cityList));   // 本地存储的格式为字符串，为了不破坏格式将数组转为json格式进行存储
				window.localStorage.setItem('hotList',JSON.stringify(hotList));   
			}
		})
		}
	},
	methods:{
		formatCityList(cities){
			var cityList = [];
			var hotList = [];
			
			// 筛选出热门城市
			for(var i=0;i<cities.length;i++){
				if(cities[i].isHot === 1){
					hotList.push(cities[i]);
				}
			}

			// 将所有的城市按照首字母排序
			for(var i=0;i<cities.length;i++){
				var firstLetter = cities[i].py.substring(0,1).toUpperCase();
				if(toCom(firstLetter)){  // 新添加Index
					cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]});
				}else{  // 累加index
					for(var j=0;j<cityList.length;j++){
						if(cityList[j].index===firstLetter){
							cityList[j].list.push({nm:cities[i].nm,id:cities[i].id});
						}
					}
				}
			}
			cityList.sort((n1,n2)=>{
				if(n1.index>n2.index){
					return 1;
				}else if(n1.index<n2.index){
					return -1;
				}else {
					return 0;
				}
			})


			function toCom(firstLetter){
				for(var i=0;i<cityList.length;i++){
					if(cityList[i].index === firstLetter){
						return false;
					}
				}
				return true;
			}

			// console.log(cityList);
			// console.log(hotList);
			return {cityList,hotList}
		},
		handleToIndex(index){
			var h2 = this.$refs.city_sort.getElementsByTagName("h2");
			// this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
			this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
		},
		handleToCity(nm,id){
			this.$store.commit("city/CITY_INFO",{nm,id});

			// 本地存储当前选中城市，防止每次刷新页面  城市定位发生变化
			window.localStorage.setItem('nownm',nm);
			window.localStorage.setItem('nowid',id);

			this.$router.push('/movie/nowplaying');
		}
	}
}
</script>

<style scoped>
    #content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul{}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort{}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>