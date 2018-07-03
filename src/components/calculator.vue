<template>

</template>
<script>
export default {
	name: 'app',
	data(){
		return{
		}
	},
	created(){

	},
	methods:{
		formatTime(time,minute){
      let hour = time.split(":")[0];
      let mm = time.split(":")[1];
      let totalM = this.numAdd(this.numMulti(parseInt(hour),60),parseInt(mm));
      totalM = this.numAdd(totalM,parseInt(minute))
      let formatH = parseInt(totalM/60)
      if(formatH>=24){
        formatH = formatH-24
      }
      formatH = (formatH+"").length==1?"0"+formatH:formatH
      let formatM = (totalM%60+"").length==1?"0"+totalM%60:totalM%60
      return formatH+":"+formatM
    },
    //重写加法
    numAdd(num1, num2) {
      var baseNum, baseNum1, baseNum2;
      try {
        baseNum1 = num1.toString().split(".")[1].length;
      } catch (e) {
        baseNum1 = 0;
      } try {
        baseNum2 = num2.toString().split(".")[1].length;
      } catch (e) {
        baseNum2 = 0;
      }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return (num1 * baseNum + num2 * baseNum) / baseNum;
    },
    //重写减法
    numSub(num1, num2) {
      var baseNum, baseNum1, baseNum2;
      var precision;// 精度
      try {
        baseNum1 = num1.toString().split(".")[1].length;
      } catch (e) {
        baseNum1 = 0;
      } try {
        baseNum2 = num2.toString().split(".")[1].length;
      } catch (e) {
        baseNum2 = 0;
      }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
      	precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
        return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
    },
    //重写乘法
    numMulti(num1, num2) {
      var baseNum = 0;
      try {
        baseNum += num1.toString().split(".")[1].length;
      } catch (e) {
      } try {
        baseNum += num2.toString().split(".")[1].length;
      } catch (e) {
      }
      return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
    },
    formatPrice(price){
        price = price + "";
        if(price.split(".")[1] && price.split(".")[1].length>2){
            price = parseFloat(price).toFixed(2)
        }
        if(parseFloat(price)>=10){
            price = Math.round(price);
        }else if(parseFloat(price)>1 && parseFloat(price)<10){
            if(price.split(".")[1]){
                var ceil = "0." + price.split(".")[1];
                if(parseFloat(ceil)>=0.8 && parseFloat(ceil)<=1){
                    price = parseInt(price) + 1
                }else if(parseFloat(ceil)>=0.2 && parseFloat(ceil)<=0.79){
                    price = parseInt(price) + 0.5
                }else{
                    price = parseInt(price)
                }
            }
        }else if(parseFloat(price)>=0.8 && parseFloat(price)<=1){
            price = 1
        }else if(parseFloat(price)>=0.2 && parseFloat(price)<=0.79){
            price = 0.5
        }else{
            price = 0
        }

        return price;
    },
	}
}
</script>