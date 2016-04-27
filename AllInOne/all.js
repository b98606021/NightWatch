// Converter Class 
var fs = require('fs');
var Converter = require("csvtojson").Converter;
//store csv
var converter = new Converter({
  checkType: false
});
//read from file 
fs.createReadStream("data/all/all_smoke.csv",[{flags: 'rs+'}]).pipe(converter);
var moment = require('moment');
var now = moment().format("YYYY_MMM_Do_h.mm.ss a");
var writeStream = fs.createWriteStream("data/all/"+ now +".csv", [{flags: 'rs+'}]);
writeStream.write('ID'+','+'Number'+','+'Product'+','+'Payamount'+','+'Result'); 

module.exports = {
  'Open all' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (var i = 0; i < jsonArray.length ; i++ )  { 
      browser
        .useCss()
        .url('http://210.13.77.68:10013/ls/logoutPage.do')
        .waitForElementPresent('body', 30000)
        .setValue('input[name=userName]', 'IBM6')
        .clearValue('input[name=userPassword]')
        .setValue('input[name=userPassword]', 'eBao123')
        .click('input[name=Submit2]')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
        .pause(1000) /*
        .url('http://210.13.77.68:10013/ls/pa/outerAcceptance.do?syskey_request_token=32f6ac8c7200671c71e43cd5ef4fc2ad&current_module_id=1000003287')
        .waitForElementPresent('input[name=submissionDate_minguo]', 10000) 
        .pause(1000)

        // Open New 
    	  .clearValue('input[name=submissionDate_minguo]')
    	  .setValue('input[name=submissionDate_minguo]', jsonArray[i]['date'])
    	  .useXpath()
    	  .setValue("//input[@name='brbdAcceptanceVO.policyCode_text']",jsonArray[i]['number'])
        .getAttribute("//input[@name='brbdAcceptanceVO.policyCode_text']", "value" ,function(result){
        writeStream.write('\r\n'+result.value+',')
        })
        var id1 = makeid()
        browser
        .setValue("//input[@name='brbdAcceptanceVO.phCertiCode']", id1)
        .setValue("//input[@name='brbdAcceptanceVO.insuredCertiCode']", id1)
        .getAttribute("//input[@name='brbdAcceptanceVO.insuredCertiCode']", "value" ,function(result){
        writeStream.write(result.value+',')
        })
    	  .setValue("//input[@name='brbdAcceptanceVO.productId_text']", jsonArray[i]['code'])
        .getAttribute("//input[@name='brbdAcceptanceVO.productId_text']", "value" ,function(result){
        writeStream.write(result.value+',')
        })
    	  .setValue("//input[@name='brbdAcceptanceVO.registerCode']", jsonArray[i]['login'])
    	  .setValue("//input[@name='brbdAcceptanceVO.acptOrg_text']", '')
    	  .click("//input[@name='save']") 

  	  	//Distribute to fill new
  	  	.waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
  	  	.url('http://210.13.77.68:10013/ls/pub/taskmonitor/taskReassignMain.do?procName=PA Process&taskName=DetailRegistration&taskId=6')
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
  	  	.setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
  	  	.click("//input[@name='search']")
  	  	.waitForElementPresent("//tr[@classname='odd']", 10000)
        .pause(2000)
  	  	.click("//tr[@classname='odd']")
  	  	.click("//input[@name='btnReassign']")
  	  	.waitForElementPresent("//input[@name='userId']", 10000)
  	  	.click("//input[@name='userId']")
  	  	.click("//input[@classname='button btn']")
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000) 
*/
  	  	//fill new 
        .useXpath()
  	  	.url('http://210.13.77.68:10013/ls/pub/workflow/GetWorkList.do?procName=PA Process&taskName=DetailRegistration&taskId=6&syskey_request_token=731f379c24509368cbc25acba4e853c5')
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
  	  	.setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
  	  	.click("//input[@name='search']")
  	  	.waitForElementPresent("//tr[@classname='odd']", 10000)
        .pause(2000)
  	  	.click("//tr[@classname='odd']")
  	  	.click("//input[@name='claim']")
  	  	.waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
  	  	.waitForElementPresent("//iframe[@name='MasterPolicy']", 30000)
  	  	.frame('MasterPolicy')
  	  	.frame('mainfr')
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
  	  	.waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .pause(1000) 
  	  	.setValue("//input[@name='applyVersion']", jsonArray[i]['version']) 
  	  	.setValue("//input[@name='applyDate_minguo']", jsonArray[i]['date']) 
  	  	.click("//input[@name='rowid']")
  	  	.click("//input[@name='__btnModify']")
/*
  	  	// Insurance Person 
  	  	.setValue("//input[@name='insured.marriageId_text']", '1')
  	  	.setValue("//input[@name='policyHolderName']", 'Kobe'+Math.floor((Math.random() * 1000000) + 1))
  	  	.setValue("//input[@name='policyHolderBirthDay_minguo']", '800101')
  	  	.setValue("//input[@name='policyHolderGender_text']", '1')
  	  	.setValue("//input[@name='policyHolderJobCateId_text']", 'A101')
  	  	.setValue("//input[@name='policyHolderJobClass']", '1')
  	  	.setValue("//textarea[@name='policyHolderAddrAddress1']", 'tester')
  	  	.click("//input[@name='policyHolderJobCateId_text']", function(){browser.dismiss_alert()})
  	  	.setValue("//input[@name='insured.relationToPH_text']", '0')
  	  	.setValue("//input[@name='insured.name']", '')
  	  	.click("//input[@name='__btnSave']")
*/
  	  	// fill the insurance data
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
  	  	.waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
  	  	.waitForElementPresent("(//input[@name='rowid'])[position()=2]", 30000)
        .pause(1000) 
  	  	.click("(//input[@name='rowid'])[position()=2]")
  	  	.click("(//input[@name='__btnModify'])[position()=2]")
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
  	  	.waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .pause(1000) 
  	  	.setValue("//input[@name='coverage.initialType_text']", jsonArray[i]['payway'])
        console.log('coverage.chargePeriod_text'+i)
        .pause(1000)
        // Fill initial Type and then fill chargePeriod and chargeYear

                      .getAttribute("//input[@name='coverage.chargePeriod_text']", "value" ,function(result){
                        console.log('coverage.chargePeriod_text'+i)
                       if (result.value =='3'){} else {
                        console.log('coverage.chargePeriod_text'+i)
                        this
                          .setValue("//input[@name='coverage.chargePeriod_text']", jsonArray[i]['chargePeriod_text'])
                          .setValue("//input[@name='coverage.chargeYear']", jsonArray[i]['chargeYear'])
                          console.log('coverage.chargePeriod_text'+(i))
                        }
                      })

        // Guarantee charge year
        .isVisible("//input[@name='coverage.coveragePeriod']", function(){
          browser
          .getAttribute("//input[@name='coverage.coveragePeriod']", "class" ,function(result){
           if (result.value =='textfiled textfield_null readOnly ro'){} 
            else {
              console.log('coverage.coveragePeriod'+i)
            browser
              .setValue("//input[@name='coverage.coveragePeriod']", jsonArray[i-1]['coveragePeriod'])
              .setValue("//input[@name='coverage.coverageYear']", jsonArray[i-1]['coverageYear'])
              console.log('coverage.coveragePeriod'+i)
            }
          })
        })

        // Fill coverage or plan or unit
        .isVisible("//input[@name='coverage.amount']", function(){
          browser
          .getAttribute("//input[@name='coverage.amount']", "class" ,function(result){
           if (result.value =='textfiled_ro textfield_null ro right readOnly'){} 
            else {
            browser
              .setValue("//input[@name='coverage.amount']", jsonArray[i-1]['getamount'])
              console.log('coverage.amount'+i)
            }
          })
        })
        .isVisible("//input[@name='coverage.benefitLevel']", function(){
          browser
          .getAttribute("//input[@name='coverage.benefitLevel']", "class" ,function(result){
           if (result.value =='textfiled textfield_null right readOnly ro'){} 
            else {
            browser
              .setValue("//input[@name='coverage.benefitLevel']", jsonArray[i-1]['plan'])
            }
          })
        })
        .isVisible("//input[@name='coverage.unit']", function(){
          browser
          .getAttribute("//input[@name='coverage.unit']", "class" ,function(result){
           if (result.value =='textfiled textfield_null right readOnly ro'){} 
            else {
            browser
              .setValue("//input[@name='coverage.unit']", jsonArray[i-1]['unit'])
              console.log('coverage.unit'+i)
            }
          })
        })

        //payamount
        .isVisible("//input[@name='coverage.stdPremAf']", function(){
          browser
          .getAttribute("//input[@name='coverage.stdPremAf']", "class" ,function(result){
           if (result.value =='textfiled textfield_null right readOnly ro'){
            browser
              .setValue("(//input[@name='coverage.stdPremAf'])[position()=2]", jsonArray[i-1]['payamount'])
              console.log('coverage.stdPremAf'+i)
            } else {
            browser
              .setValue("//input[@name='coverage.stdPremAf']", jsonArray[i-1]['payamount'])
              console.log('coverage.stdPremAf'+i)
            }
          })
        })

        //customized payamount
        .isVisible("//input[@name='coverage.customizedPrem']", function(){
          browser
           .setValue("//input[@name='coverage.customizedPrem']", jsonArray[i-1]['customizedPrem'])
           console.log('coverage.customizedPrem'+i)
        })

        //flexible payamount
        .isVisible("//input[@name='coverage.applyAmount']", function(){
          browser
           .setValue("//input[@name='coverage.applyAmount']", jsonArray[i-1]['flexible'])
           console.log('coverage.applyAmount'+i)
        })

        //important thing
        .isVisible("//input[@name='coverage.agreeReadIndi_text']", function(){
          browser
           .setValue("//input[@name='coverage.agreeReadIndi_text']", '1')
        })

        // annual getamount
        .isVisible("//input[@name='coverage.chargePeriod_text']", function(){
          browser
          .getAttribute("//input[@name='coverage.payYear']", "class" ,function(result){
           if (result.value =='textfiled textfield_null right readOnly ro'){} else {
            browser
              .setValue("//input[@name='coverage.payYear']", '70')
              console.log('coverage.payYear'+i)
            }
          })
        })

        .getAttribute("//input[@name='coverage.payType_text']", "class" ,function(result){
         if (result.value =='textfiled textfield_null readOnly ro'){} else {
          browser
            .clearValue("//input[@name='coverage.payType_text']")
            .setValue("//input[@name='coverage.payType_text']", jsonArray[i-1]['paytype'])
            console.log('coverage.payType_text'+i)
          }
        })
        .getAttribute("//input[@name='coverage.payEnsure']", "class" ,function(result){
         if (result.value =='textfiled textfield_null right readOnly ro'){} else {
          browser
           .setValue("//input[@name='coverage.payEnsure']", '10')
          }
        })
        .getAttribute("//input[@name='coverage.instalmentAmount']", "class" ,function(result){
         if (result.value =='textfiled textfield_null right readOnly ro'){} else {
          browser
           .setValue("//input[@name='coverage.instalmentAmount']", jsonArray[i-1]['annualmoney'])
          }
        })
  	  	.click("(//input[@name='__btnSave'])[position()=2]")
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
  	  	.waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
  	  	.pause(1000)
        // fill the insurance data over

        // add additional product 
        /*
        .setValue("//input[@name='coverage.internalId']", jsonArray[i]['addcode'])
        .click("//input[@id='proposalCategory001']")
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
        .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .pause(1000)
        //.clearValue("//input[@name='coverage.initialType_text']")
        //.setValue("//input[@name='coverage.initialType_text']", '0'+'1')//jsonArray[i]['addpaytype'])
        .getAttribute("//input[@name='coverage.initialType_text']", "value" ,function(result){
         if (result.value == '00'){} else {
          browser
            .setValue("//input[@name='coverage.chargePeriod_text']", jsonArray[i]['addperiod'])
            .setValue("//input[@name='coverage.chargeYear']", jsonArray[i]['addyear'])
          }
        })       
        .setValue("//input[@name='coverage.amount']", jsonArray[i]['addamount'])
        //.setValue("//input[@name='coverage.benefitLevel']", '5')
        .click("(//input[@name='__btnSave'])[position()=2]")
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
        .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .pause(1000) 
        */


  	  	//T_fund setting
        .isVisible("//input[@name='investRate.fundCode']", function(){
          browser
            for (j = 0; j < 3 ; j ++) {
            browser
            .setValue("//input[@name='investRate.fundCode']", jsonArray[i-1]['fundcode'+j])
            .setValue("//input[@name='investRate.assignRate']", jsonArray[i-1]['ratio'+j])
            .click("(//input[@name='__btnSave'])[position()=3]")
            .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
            .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
            .pause(1000)
            }
        })
    		//t_fund over
    		
    		//paymode
        .pause(1000)
    		.setValue("//input[@name='payMode_text']", '3')
        .pause(1000)
        .getAttribute("//input[@name='payNext_text']", "class" ,function(result){
         if (result.value =='textfiled textfield_null right readOnly ro'){} else {
          browser
           .setValue("//input[@name='payNext_text']", '3')
           .pause(1000)
          }
        })
        .getAttribute("//input[@name='aplPermit_text']", "class" ,function(result){
         if (result.value =='textfiled textfield_null right readOnly ro'){} else {
          browser
           .setValue("//input[@name='aplPermit_text']", '2')
           .pause(1000)
          }
        })

    		//benificial person
        .setValue("//input[@name='bene.nbBeneficiaryType']", '5')
        .setValue("//input[@name='bene.designation']", '')
        .click("(//input[@name='__btnSave'])[position()=4]")
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
        .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .pause(1000) 

        // height and weight
        .isVisible("//input[@name='insured.height']", function(){
          browser
            .setValue("//input[@name='insured.height']", '180')
            .pause(1000)
        })
        .isVisible("//input[@name='insured.weight']", function(){
          browser
            .setValue("//input[@name='insured.weight']", '70')
            .pause(1000)
        })
        .isVisible("//input[@name='insured.notifyIndi_text']", function(){
          browser
            .setValue("//input[@name='insured.notifyIndi_text']", '2')
            .pause(1000)
        })
        .isVisible("(//input[@name='__btnSave'])[position()=5]", function(){
          browser
            .click("(//input[@name='__btnSave'])[position()=5]")
            .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
            .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
            .pause(1000)
        })


    		//rest data
    		.setValue("//input[@name='otherCheckIndi_text']", '1')
    		.setValue("//input[@name='singCompleteIndi_text']", '1')
    		.setValue("//input[@name='userConfirmIndi_text']", '1')
    		.click("(//input[@name='docType'])[position()=3]")
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
    		.waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
    		.pause(1000)

        // trad claim
        .isVisible("//input[@name='review.internalId']", function(){
          browser
            .setValue("//input[@name='review.internalId']", jsonArray[i-1]['code'])
            .pause(1000)
            console.log('review.internalId'+i)
        })
        .isVisible("//input[@name='review.reviewIndi_text']", function(){
          browser
            .setValue("//input[@name='review.reviewIndi_text']", '1')
            .pause(1000)
        })
        .isVisible("//input[@name='review.reviewDate_minguo']", function(){
          browser
            .setValue("//input[@name='review.reviewDate_minguo']", jsonArray[i-1]['date'])
            .pause(1000)
        })
        .isVisible("//input[@name='review.strVersion']", function(){
          browser
            .setValue("//input[@name='review.strVersion']", jsonArray[i-1]['version'])
            .pause(1000)
        })
        .click("(//input[@name='__btnSave'])[position()=6]")
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
        .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .pause(1000)

        // final click
    		.click("//input[@name='btnSubmit']", function(){browser.accept_alert()})
    		.waitForElementPresent("//div[@classname='header_logo_ls']", 30000)



    		// distribute to confirm
    		.url('http://210.13.77.68:10013/ls/pub/taskmonitor/taskReassignMain.do?procName=PA Process&taskName=Verification&taskId=10')
      	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
  	  	.setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
  	  	.click("//input[@name='search']")
  	  	.waitForElementPresent("//tr[@classname='odd']", 10000)
        .pause(3000)
  	  	.click("//tr[@classname='odd']")
  	  	.click("//input[@name='btnReassign']")
  	  	.waitForElementPresent("//input[@name='userId']", 10000)
  	  	.click("//input[@name='userId']")
  	  	.click("//input[@classname='button btn']")
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000) 

  	  	// turn to confirm
  	  	.url('http://210.13.77.68:10013/ls/pub/workflow/GetWorkList.do?procName=PA Process&taskName=Verification&taskId=10&syskey_request_token=752ba247eba263311fb36ec58db42536')
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
  	  	.setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
  	  	.click("//input[@name='search']")
  	  	.waitForElementPresent("//tr[@classname='odd']", 10000)
        .pause(3000)
  	  	.click("//tr[@classname='odd']")
  	  	.click("//input[@name='claim']")
  	  	.waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
  	  	.waitForElementPresent("//iframe[@name='MasterPolicy']", 30000)
  	  	.frame('MasterPolicy')
  	  	.frame('mainfr')
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
  	  	.waitForElementPresent("//input[@name='btnSubmit']", 30000)
  	  	.pause(3000)
  	  	.click("//input[@name='btnSubmit']" , function(){browser.accept_alert()})
  	  	.waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 

  	  	// distribute to manual confirmation
  	  	.url('http://210.13.77.68:10013/ls/pub/taskmonitor/taskReassignMain.do?procName=PA Process&taskName=ManualUW&taskId=8')
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
  	  	.setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
  	  	.click("//input[@name='search']")
  	  	.waitForElementPresent("//tr[@classname='odd']", 10000)
        .pause(3000)
  	  	.click("//tr[@classname='odd']")
  	  	.click("//input[@name='btnReassign']")
  	  	.waitForElementPresent("//input[@name='userId']", 10000)
  	  	.click("//input[@name='userId']")
  	  	.click("//input[@classname='button btn']")
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000) 

  	  	// turn to manual confirmation
  	  	.url('http://210.13.77.68:10013/ls/pub/workflow/GetWorkList.do?procName=PA Process&taskName=ManualUW&taskId=8&syskey_request_token=752ba247eba263311fb36ec58db42536')
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
  	  	.setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
  	  	.click("//input[@name='search']")
  	  	.waitForElementPresent("//tr[@classname='odd']", 10000)
        .pause(3000)
  	  	.click("//tr[@classname='odd']")
  	  	.click("//input[@name='claim']")
  	  	.waitForElementPresent("//input[@name='btnSubmit']", 10000)
  	  	//.clearValue("//input[@name='policyDecision']")
    		//.setValue("//input[@name='policyDecision']", 'A')
    		.click("//input[@name='btnSubmit']" , function(){browser.accept_alert()})
  	  	.waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 

  	  	// Pay money
  	  	.useXpath()
  	  	.url('http://210.13.77.68:10013/ls/arap/cash/recv/counter/search.do?syskey_request_token=752ba247eba263311fb36ec58db42536&current_module_id=300168')
  	  	.waitForElementPresent("//input[@classname='button btn']", 30000) 
  	  	.setValue("//input[@name='policyNumber']", jsonArray[i]['number'])
  	  	.click("//input[@classname='button btn']")
  	  	.waitForElementPresent("(//input[@classname='button btn'])[position()=1]", 30000) 
        .getAttribute("//input[@name='totalIP']", "value" ,function(result){
        browser
          .setValue("//input[@name='pay_amount']",result.value)
          .setValue("//input[@name='voucherAmount']",result.value)
          if(result.value == '0') {writeStream.write('0'+',')}  else {
            var money = result.value
            money = money.replace(/,/g,"")
            writeStream.write(money+',')
          }
        })
  	  	.setValue("//input[@name='payMode_text']", '11')
  	  	.click("//input[@name='voucherDate_minguo']")
  	  	.pause(2000)
  	  	.setValue("//input[@name='voucherDate_minguo']", jsonArray[i]['date'])
  	  	.click("//select[@name='account']")
  	  	.keys(['\uE015', '\uE006'])
  	  	.click("(//input[@classname='button btn'])[position()=1]")
  	  	.waitForElementPresent("//table[@id='table2']", 30000)
  	  	.click("(//input[@classname='button btn'])[position()=3]")
  	  	.click("(//input[@classname='button btn'])[position()=4]")
		    .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .saveScreenshot('./data/all/' +jsonArray[i]['number']+'paymoney.png')


        // Check
        .url('http://210.13.77.68:10013/ls/qry/commonquery.CommonQuery.do?syskey_request_token=d83d39e2acdfa20e8f903f934aa511ab&current_module_id=301744')
        .waitForElementPresent("//input[@classname='button btn']", 30000) 
        .click("//input[@name='qryType']")
        .pause(1000)
        .setValue("//input[@name='policyCode_text']", jsonArray[i]['number'])
        .pause(1000)
        .click("//input[@name='qryType']")
        .pause(1000)
        .click("//input[@classname='button btn']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000)
        .pause(3000)
        .getText("(//td[@classname='table_text_td'])[position()=3]//div[@classname='input']",function(result){
          writeStream.write(result.value)
        })
        .saveScreenshot('./data/all/' +jsonArray[i]['number']+'search.png')

   }})
  }

};



 function makename(namelist){
   var namelist = "";
   var c = "";
    for (var j=0; j<5; j++) {
      c = Math.round(Math.random()*9);
      namelist += c;
    }
    namelist = "Smoke" + namelist;
    return namelist;

  };//end function

function makeid(sList){
  var ALP_STR = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
  var NUM_STR = "0123456789";
  var SEX_STR = "12";
  var MAX_COUNT = 999;

// 身分證字號產生器
  var SelectALP = "";
  var SelectSEX = "";
  var sNewPID = "";
   var sList = "";
  var iChkSum = 0;
  // 字母組 隨機產生
    var SelectALP = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        SelectALP = possible.charAt(Math.floor(Math.random() * possible.length));
  // 性別組
  SelectSEX ="1";
  // 第1碼 (英文字母)
  j = SelectALP.substr(Math.round(Math.random()*(SelectALP.length-1)), 1);
  sNewPID += j;
  //console.log("j="+j)
  j = ALP_STR.indexOf(sNewPID) + 10;
  iChkSum = (j-j%10)/10 + (j%10*9); /* X1 + X2*9 */
  // 第2碼 (性別)
  j = SelectSEX.substr(Math.round(Math.random()*(SelectSEX.length-1)), 1);
  sNewPID += j;
  iChkSum += j*8; /* X3*8 */
   // 第3~9碼
    for (var i=0; i<7; i++) {
      c = Math.round(Math.random()*9);
      sNewPID += c;
      iChkSum += c * (7-i);
    }
    // 第10碼 (檢查碼)
    sNewPID += ((10 - iChkSum % 10) % 10);
    sList += sNewPID + "\n";
    return sList;
  }//end function