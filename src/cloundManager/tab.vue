<template>
	<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="selectTab" class="tab-wrap">
		<el-tab-pane
		v-for="(item, index) in editableTabs"
		:key="item.name"
		:label="item.title"
		:name="item.name"
		>
		</el-tab-pane>
	</el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        editableTabsValue: '0',
        editableTabs: [],
        tabIndex: 0
      }
    },
    methods: {
      addTab(targetName) {
        var self = this;
        if(this.$route.path != "/"){
          let tabs = sessionStorage.getItem("editableTabs")? JSON.parse(sessionStorage.getItem("editableTabs")): [];
          this.editableTabs = tabs;
        	let [hasTab,tabIndex] = [false];
          var rIndex = 0;
        	tabs.forEach((tab,index) =>{
        		if(this.$route.name == tab.title){
        			hasTab = true;
              tabIndex = tab.name;
              rIndex = index
        		}
        	})
        	if(!hasTab){
            let newTabName;
            if(this.editableTabs.length == 0){
              newTabName = "1";
            }else{
              newTabName = (parseInt(this.editableTabs[this.editableTabs.length-1].name)+1) + '';
            }
        		this.editableTabs.push({
        		  title: this.$route.name,
        		  name: newTabName,
        		  content: this.$route.fullPath
        		});
            sessionStorage.setItem("editableTabs", JSON.stringify(this.editableTabs));
        		this.editableTabsValue = newTabName;
        	}else{
            tabs[rIndex].content = this.$route.fullPath;
            sessionStorage.setItem("editableTabs", JSON.stringify(tabs));
        		this.editableTabsValue = tabIndex;
        	}
        }
      },
      removeTab(targetName) {
        let tabs = sessionStorage.getItem("editableTabs")? JSON.parse(sessionStorage.getItem("editableTabs")): [];
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                this.$router.push(nextTab.content)
              }else{
                this.editableTabsValue = "0";
                this.editableTabs = [];
                this.tabIndex = 0;
                this.$router.push("/")
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        sessionStorage.setItem("editableTabs", JSON.stringify(this.editableTabs));
      },
      selectTab(targetName){
      	let routerKey = targetName.label;
      	let tabs = this.editableTabs;
    		tabs.forEach((tab, index) => {
    			if(routerKey == tab.title){
            this.editableTabsValue = ++index +"";
    				this.$router.push(tab.content)
    			}
    		});
      }
    }
  }
</script>
<style>
  .tab-wrap{
    position: fixed;
    z-index: 999;
    left: 150px;
    top: 60px;
    right: 10px;
    background-color: #fff;
    min-height: 52px;
  }
</style>