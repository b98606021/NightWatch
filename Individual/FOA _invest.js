// Converter Class 
var fs = require('fs');
var Converter = require("csvtojson").Converter;
//store csv
var converter = new Converter({
  checkType: false
});
//read from file 
fs.createReadStream("data/trad/trad_foa.csv",[{flags: 'rs+'}]).pipe(converter);
var moment = require('moment');
var now = moment().format("YYYY_MMM_Do_h.mm.ss a");
var writeStream = fs.createWriteStream("data/trad/"+ now +".csv", [{flags: 'rs+'}]);
writeStream.write('ID'+','+'Number'+','+'Product'+','+'Payamount'+','+'Result'); 
var periodValue = 1;

module.exports = {
  'FOA Accepted' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (i = 0; i < jsonArray.length ; i ++)  { 
      var id1 = makeid()
      browser
        .frame(null)
        .useCss()
        .url('http://210.13.77.85:12000/ls/logoutPage.do')
        .waitForElementPresent('body', 30000)
        .setValue('input[name=userName]', 'IBM11')
        .clearValue('input[name=userPassword]')
        .setValue('input[name=userPassword]', 'eBao123')
        .click('input[name=Submit2]')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
        .pause(1000)
        .useXpath()

        // Open New
        .url('http://210.13.77.85:12000/ls/chl/foaNbAcceptance.do?tabNo=1&actionNo=100')
        .waitForElementPresent("//input[@name='unbCaseVO.policyCode']", 30000) 
      .clearValue("//input[@name='unbCaseVO.policyCode']")
      .setValue("//input[@name='unbCaseVO.policyCode']", jsonArray[i]['number'])
        .clearValue("//input[@name='unbCaseVO.applyDate_minguo']")
        .setValue("//input[@name='unbCaseVO.applyDate_minguo']",jsonArray[i]['date'])
        .clearValue("//input[@name='acceptVO.aceptDate_minguo']")
        .setValue("//input[@name='acceptVO.aceptDate_minguo']",jsonArray[i]['date'])
        .click("//select[@name='acceptVO.aceptOrg']/option[@value='1350582114']")
        //受理單位 9455727中彰督導區盛達營業處 1350582114極光6JCBBR 29211264青玉 16610407全心  
        .pause(2000)
        .setValue("//input[@name='holderVO.name']",'foa'+ Math.floor((Math.random() * 1000000) + 1))
        .pause(2000)
        .clearValue("//input[@name='holderVO.birthday_minguo']")
        .setValue("//input[@name='holderVO.birthday_minguo']",'075/03/13')
        .clearValue("//input[@name='holderVO.certiCode']")
        .setValue("//input[@name='holderVO.certiCode']", id1)
        .pause(1000)
        .setValue("//input[@name='holderVO.jobClass']",'1')
        .click("//select[@name='holderVO.gender']")
        .keys(['\uE015', '\uE006'])
         //被保人資料
        .waitForElementPresent("//select[@name='laToPh']", 30000)
        .click("//select[@name='laToPh']")
        .keys(['\uE015', '\uE006'])
        
        //.setValue("//input[@name='laToPh']",'1')
        .click("(//input[@name='BT_EXIT'])[position()=1]")
        .pause(3000)
        //險種資料
        .waitForElementPresent("//select[@name='productVO.certiCode']", 30000)
        .click("//select[@name='productVO.certiCode']")
        .keys(['\uE015', '\uE006'])
        .setValue("//input[@name='productVO.productId_text']", jsonArray[i]['code'])
        .pause(20000)
        .click("//select[@name='productVO.initialType']/option[@value='5']")
        //繳別 1年繳 2半年繳 3季繳 4月繳 5躉繳
        .pause(20000)
        .click("//select[@name='productVO.chargePeriod']/option[@value='1']")
         //繳費年期類型 0無關 1躉繳 2按年限繳 3繳至某確定年齡 4終身繳費
        .clearValue("//input[@name='productVO.chargeYear']")
        .setValue("//input[@name='productVO.chargeYear']", jsonArray[i]['chargeyear'])
        .click("//input[@name='productVO.targetPremium']")
        .setValue("//input[@name='productVO.targetPremium']", jsonArray[i]['targetamount'])
        .click("//input[@name='productVO.overPremium']")
        .setValue("//input[@name='productVO.overPremium']", jsonArray[i]['exceedamount'])
        .click("//input[@name='productVO.premAmt']")
        .setValue("//input[@name='productVO.premAmt']", jsonArray[i]['getamount'])

        .click("//input[@id='productVOAmount']")
        .setValue("//input[@id='productVOAmount']",jsonArray[i]['getamount'])
        .click("//input[@id='productVOUnit']")  
        .setValue("//input[@id='productVOUnit']",jsonArray[i]['getunit'])
        .click("//input[@id='productVOBenefitLevel']")  
        .setValue("//input[@id='productVOBenefitLevel']",jsonArray[i]['getlevel'])

        //附約
        !function outer(i) { browser
        .elementIdDisplayed("//select[@name='unbCertiCode']", function(){
          for (k=0;k<1;k++){
            !function outer(k) {browser
        .click("//select[@name='unbCertiCode']")
        .keys(['\uE015', '\uE006'])
        .click("//input[@name='unbProductId_text']")  
        .setValue("//input[@name='unbProductId_text']",jsonArray[i]['addcode'+k])
        .click("//input[@name='unbAmount']") 
        .setValue("//input[@name='unbAmount']", jsonArray[i]['addamount'+k])
        .click("//input[@name='unbUnit']")
        .setValue("//input[@name='unbUnit']", jsonArray[i]['addunit'+k])
        .click("//input[@name='unbBenefitLevel']")
        .setValue("//input[@name='unbBenefitLevel']", jsonArray[i]['addlevel'+k])
        .click("//select[@name='unbChargePeriod']/option[@value='2']")
        //繳費年期 0無關 1躉繳 2按年限繳 3繳至某確定年齡 4終身繳費
        .setValue("//input[@name='unbChargeYear']", jsonArray[i]['addyear'+k])
        .setValue("//input[@name='unbPremAmt']", jsonArray[i]['addamount'+k])
        }(k)
          }
        },false)}(i)

        browser
        //繳費方式
        .click("//select[@name='unbCaseVO.initialType']/option[@value='1']")
        .click("//select[@name='unbCaseVO.renewalType']/option[@value='1']")


        //業務員資料
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){
          for (k=0;k<2;k++){
            !function outer(k) {browser
                  .click("//input[@name='planVO["+k+"].registerCode']")
                  .setValue("//input[@name='planVO["+k+"].registerCode']", jsonArray[i]['planner'+k])
                  .click("//input[@name='planVO["+k+"].commShareRate']")
                  .pause(3000)
                  .clearValue("//input[@name='planVO["+k+"].commShareRate']")
                  .pause(3000)
                  .setValue("//input[@name='planVO["+k+"].commShareRate']", jsonArray[i]['planrate'+k])
                  .pause(3000)
            }(k)
          }
        },false)}(i)

        //業務員done
        
                
        //打勾
        browser
        .click("(//input[@name='docuIndex'])")
        .pause(5000)
        .click("(//input[@classname='button btn'])[position()=last()-3]")
        .pause(5000)
        //結束
        .saveScreenshot('./data/trad/' +jsonArray[i]['number']+'foa.png')
        .pause(5000)

        //change time
        .useXpath()
        .url('http://210.13.77.85:12000/ls/tool/setSysdateAction.do?syskey_request_token=136205f01cc68c74d534a3ac1e0dba25&current_module_id=301182')
        .waitForElementPresent("//input[@name='conSysdate_minguo']", 10000)
        .clearValue("//input[@name='conSysdate_minguo']")
        .setValue("//input[@name='conSysdate_minguo']", jsonArray[i]['veridate'])
        .click("(//input[@classname='button btn'])[position()=1]")
        .pause(10000)


       //送件     
        browser
        .url('http://210.13.77.85:12000/ls/chl/foaAceptStatistics.do?syskey_request_token=cde4db8f950b41071cdd225c965a2ea0&current_module_id=1000002792')
        .waitForElementPresent("//input[@name='foaId_text']", 10000) 
        .click("//select[@name='aceptOrg']/option[@value='1350582114']")
        //受理單位 9455727中彰督導區盛達營業處 1350582114極光6JCBBR 29211264青玉 16610407全心  
        .click("(//input[@classname='button btn'])[position()=1]")
        .waitForElementPresent("(//input[@type='checkbox'])[1]", 10000) 
        .click("(//input[@type='checkbox'])[1]")
        .pause(5000)
        .click("(//input[@classname='button btn'])[position()=last()-1]")
        .pause(5000)
        .saveScreenshot('./data/trad/' +jsonArray[i]['number']+'foasend.png')
        //內部通路
        .url('http://210.13.77.85:12000/ls/pa/queryFoaAcceptance.do?syskey_request_token=a58df3e73c14495708bdcb416ae8602c&current_module_id=1000003687')
        .pause(10000)
        .click("(//input[@value='on'])")
        .pause(10000)
        .click("(//input[@name='BT_CONFIRM'])")
        .pause(5000)
        .saveScreenshot('./data/trad/' +jsonArray[i]['number']+'foarecieve.png')
        .pause(5000)

    //Distribute to fill new
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .url('http://210.13.77.85:12000/ls/pub/taskmonitor/taskReassignMain.do?procName=PA Process&taskName=DetailRegistration&taskId=6')
        .useXpath()
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
        .setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
        .click("//input[@name='search']")
        .waitForElementVisible("//tr[@classname='odd']", 10000)
        .pause(2000)
        .click("//tr[@classname='odd']/td[@classname='table_column odd']")
        .click("//input[@name='btnReassign']")
        .waitForElementPresent("//input[@name='userId']", 10000)
        .click("//input[@name='userId']")
        .click("//input[@classname='button btn']")
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000) 

        //fill new 
        .useXpath()
        .url('http://210.13.77.85:12000/ls/pub/workflow/GetWorkList.do?procName=PA Process&taskName=DetailRegistration&taskId=6&syskey_request_token=731f379c24509368cbc25acba4e853c5')
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
        .setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
        .click("//input[@name='search']")
        .waitForElementVisible("//tr[@classname='odd']", 10000)
        .pause(2000)
        .click("//tr[@classname='odd']/td[@classname='table_column odd']")
        .click("//input[@name='claim']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .waitForElementPresent("//iframe[@name='MasterPolicy']", 30000)
        .frame('MasterPolicy')
        .frame('mainfr')
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
        .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .pause(1000) 
        .setValue("//input[@name='applyVersion']", '1') 
        .setValue("//input[@name='applyDate_minguo']", jsonArray[i]['date']) 
        .click("//input[@name='rowid']")
        .click("//input[@name='__btnModify']")

        // Insurance Person 
       .click("//input[@name='policyHolderName']")
       .click("//input[@name='policyHolderBirthDay_minguo']")
        //.setValue("//input[@name='policyHolderName']", 'Kobe'+Math.floor((Math.random() * 1000000) + 1))
        //.setValue("//input[@name='policyHolderBirthDay_minguo']", jsonArray[i]['birthDay'])
        .setValue("//input[@name='policyHolderGender_text']", jsonArray[i]['gender']) //1 = male, 2= female
        .click("//input[@name='policyHolderJobCateId_text']")
        .setValue("//input[@name='policyHolderJobCateId_text']", 'A101')
        .click("//input[@name='policyHolderJobClass']")
        //.setValue("//input[@name='policyHolderJobClass']", '1')
        .setValue("//textarea[@name='policyHolderAddrAddress1']", 'tester')
        .click("//input[@name='insured.relationToPH_text']", function(){browser.dismiss_alert()})
        //.setValue("//input[@name='insured.relationToPH_text']", '0')
        .pause(10000)
        .click("(//input[@name='rowid'])[position()=1]", function(){browser.dismiss_alert()})
        .click("(//input[@name='rowid'])[position()=1]")
        .click("(//input[@name='__btnModify'])[position()=1]")
        .click("(//input[@name='__btnModify'])[position()=1]")
        .click("//input[@name='insured.marriageId_text']")
        .setValue("//input[@name='insured.marriageId_text']", '1')
        .click("(//input[@name='__btnSave'])[position()=1]")
        .click("(//input[@name='__btnSave'])[position()=1]")
        .pause(1000) 

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
        .clearValue("//input[@name='coverage.initialType_text']") 
        .setValue("//input[@name='coverage.initialType_text']", '12')
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){
          browser
          .getAttribute("//input[@name='coverage.initialType_text']", "value" ,function(result){
            console.log('paynext'+i)
           if (result.value == '00'){} else {
            browser
              .setValue("//input[@name='payNext_text']", '3')
              console.log('paynext'+i)
            }
          })

          .isVisible("//input[@name='coverage.amount']", function(result){
            if (result.value == true) {
              browser
              .clearValue("//input[@name='coverage.amount']")
              .setValue("//input[@name='coverage.amount']", jsonArray[i]['getamount'])
              //.setValue("//input[@name='coverage.applyAmount']", jsonArray[i]['flexible'])
              .setValue("//input[@name='coverage.agreeReadIndi_text']", '1')
            } else {}
          })

          .getAttribute("//input[@name='coverage.stdPremAf']", "class" ,function(result){
             console.log('payamount'+i)
             if (result.value =='textfiled textfield_null right readOnly ro'){
              browser
               // .setValue("(//input[@name='coverage.stdPremAf'])[position()=2]", jsonArray[i]['payamount'])
                console.log('payamount'+i)
              } else {
              browser
               // .setValue("//input[@name='coverage.stdPremAf']", jsonArray[i]['payamount'])
                console.log('payamount'+i)
              }
          })


          .getAttribute("//input[@name='coverage.payYear']", "class" ,function(result){
           if (result.value =='textfiled textfield_null right readOnly ro'){} else {
            browser
              .setValue("//input[@name='coverage.payYear']", '70')
            }
          })


          .getAttribute("//input[@name='coverage.payType_text']", "class" ,function(result){
            console.log('paytype'+i)
           if (result.value =='textfiled textfield_null readOnly ro'){} else {
            browser
              .clearValue("//input[@name='coverage.payType_text']")
              .setValue("//input[@name='coverage.payType_text']",'12')
              console.log('paytype'+i)
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
             .setValue("//input[@name='coverage.instalmentAmount']", '1000000')
            }
          })

        },false)}(i)


        browser
        .setValue("//input[@name='bene.branchCode']", '0040059')
        .setValue("//input[@name='bene.bankAccount']", '16888888888888')
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){ browser
          .isVisible("//select[@name='coverage.versionTypeId']/option[@value='367']", function(result){
            if (result.value == true) { browser
              .click("//select[@name='coverage.versionTypeId']/option[@value='"+ jsonArray[i]['type'] +"']") // A=367, B=368
            }
          })
        },false)}(i)
        browser
        .pause(1000)
        .click("(//input[@name='__btnSave'])[position()=2]")
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
        .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .pause(1000)

        // add additional product 
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){
          for (k=0;k<1;k++){
            !function outer(k) { 
                if (jsonArray[i]['addcode'+k] == "") {} else { 
                  browser
                  .setValue("//input[@name='coverage.internalId']", jsonArray[i]['addcode'+k])
                  .click("//input[@id='proposalCategory001']")
                  .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
                  .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
                  .pause(1000)          
                    .getAttribute("//input[@name='coverage.initialType_text']", "value" ,function(result){
                     if (result.value == '00'){
                      click("//input[@name='coverage.nhiInsuIndi_text']")
                    } else {
                      console.log(k)
                      browser
                        .setValue("//input[@name='coverage.chargePeriod_text']", jsonArray[i]['addperiod'+k])
                        .setValue("//input[@name='coverage.chargeYear']", jsonArray[i]['addyear'+k])
                      }
                    })
                    .getAttribute("//input[@name='coverage.amount']", "class" ,function(result){
                       if (result.value == 'textfiled textfield_null right readOnly ro'){} else {
                        browser
                          .setValue("//input[@name='coverage.amount']",jsonArray[i]['addamount'+k])
                        }
                    })
                    .getAttribute("//input[@name='coverage.benefitLevel']", "class" ,function(result){
                       if (result.value == 'textfiled textfield_null readOnly ro'){} else {
                        browser
                          .setValue("//input[@name='coverage.benefitLevel']", jsonArray[i]['addplan'+k])
                        }
                    })
                    .getAttribute("//input[@name='coverage.unit']", "class" ,function(result){
                       if (result.value == 'textfiled textfield_null right readOnly ro'){} else {
                        browser
                          .setValue("//input[@name='coverage.unit']", jsonArray[i]['addunit'+k])
                        }
                    })
                  browser
                  .click("(//input[@name='__btnSave'])[position()=2]")
                  .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
                  .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
                  .pause(1000)
                }
            }(k)
          }
        },false)}(i)
        // add done
      
        //T_fund setting
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){
          for (j = 0; j < 3 ; j ++) {
            !function outer(j) { 
                if (jsonArray[i]['fundcode'+j] == "") {} else {  
                  browser
                  .setValue("//input[@name='investRate.fundCode']", jsonArray[i]['fundcode'+j])
                  .setValue("//input[@name='investRate.assignRate']", jsonArray[i]['ratio'+j])
                  .click("(//input[@name='__btnSave'])[position()=3]")
                  .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
                  .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
                  .pause(1000)
                }
            }(j)
          }
        },false)}(i)
        //t_fund over
        
        //paymode
        browser
        .pause(1000)
        .setValue("//input[@name='payMode_text']", '3')
        .pause(1000)
        .setValue("//input[@name='aplPermit_text']", '2')

        //benificial person
        .setValue("//input[@name='bene.nbBeneficiaryType']", '5') // change 5
        .setValue("//input[@name='bene.designation']", '1')
        .setValue("//input[@name='bene.name']", 'mother'+Math.floor((Math.random() * 1000000) + 1))
        .clearValue("//input[@name='bene.certiCode']") 
        var id2 = makeid()
        browser
        .setValue("//input[@name='bene.certiCode']", id2) 
        .clearValue("//input[@name='bene.shareOrder']") 
        .setValue("//input[@name='bene.shareOrder']", '1') 
        .clearValue("//input[@name='bene.shareRate']") 
        .setValue("//input[@name='bene.shareRate']", '100') 
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
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){
          for (k=0;k<2;k++){
            !function outer(k) { browser
                if (jsonArray[i]['addcode'+k] =="") {} else {
                  browser
                  .getAttribute("//input[@name='review.internalId']", "class" ,function(result){
                    if (result.value == "textfiled textfield_null readOnly ro") {} else {
                      browser
                      .setValue("//input[@name='review.internalId']", jsonArray[i]['addcode'+k])
                      .clearValue("//input[@name='review.reviewIndi_text']")
                      .setValue("//input[@name='review.reviewIndi_text']", '1')
                      .clearValue("//input[@name='review.reviewDate_minguo']")
                      .setValue("//input[@name='review.reviewDate_minguo']", jsonArray[i]['date'])
                      .clearValue("//input[@name='review.strVersion']")
                      .setValue("//input[@name='review.strVersion']", '1')
                      .click("(//input[@name='__btnSave'])[position()=6]")
                      .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
                      .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
                      .pause(1000)
                      .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
                      .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
                    }
                  })
                }
            }(k)
          }
        },false)}(i)

        // Final
        browser
        .click("//input[@name='btnSubmit']", function(){browser.accept_alert()})
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000)
        .pause(1000)  

        // distribute to confirm
        .url('http://210.13.77.85:12000/ls/pub/taskmonitor/taskReassignMain.do?procName=PA Process&taskName=Verification&taskId=10')
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
        .setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
        .click("//input[@name='search']")
        .waitForElementVisible("//tr[@classname='odd']", 10000)
        .pause(3000)
        .click("//tr[@classname='odd']/td[@classname='table_column odd']")
        .click("//input[@name='btnReassign']")
        .waitForElementPresent("//input[@name='userId']", 10000)
        .click("//input[@name='userId']")
        .click("//input[@classname='button btn']")
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000) 

        // turn to confirm
        .url('http://210.13.77.85:12000/ls/pub/workflow/GetWorkList.do?procName=PA Process&taskName=Verification&taskId=10&syskey_request_token=752ba247eba263311fb36ec58db42536')
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
        .setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
        .click("//input[@name='search']")
        .waitForElementVisible("//tr[@classname='odd']", 10000)
        .pause(3000)
        .click("//tr[@classname='odd']/td[@classname='table_column odd']")
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
        .url('http://210.13.77.85:12000/ls/pub/taskmonitor/taskReassignMain.do?procName=PA Process&taskName=ManualUW&taskId=8')
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
        .setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
        .click("//input[@name='search']")
        .waitForElementVisible("//tr[@classname='odd']", 10000)
        .pause(3000)
        .click("//tr[@classname='odd']/td[@classname='table_column odd']")
        .click("//input[@name='btnReassign']")
        .waitForElementPresent("//input[@name='userId']", 10000)
        .click("//input[@name='userId']")
        .click("//input[@classname='button btn']")
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000) 

        // turn to manual confirmation
        .url('http://210.13.77.85:12000/ls/pub/workflow/GetWorkList.do?procName=PA Process&taskName=ManualUW&taskId=8&syskey_request_token=752ba247eba263311fb36ec58db42536')
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
        .setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
        .click("//input[@name='search']")
        .waitForElementVisible("//tr[@classname='odd']", 10000)
        .pause(3000)
        .click("//tr[@classname='odd']/td[@classname='table_column odd']")
        .click("//input[@name='claim']")
        .waitForElementPresent("//input[@name='btnSubmit']", 10000)
        .click("//input[@name='btnOutstandingIssues']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .elements("xpath","//select[@name='uwRuleStatusId']", function(result){
        console.log(result.value.length)
          for (var a=1; a < (result.value.length+1) ; a ++) {
            !function outer(a) { 
              browser
              .click("(//select[@name='uwRuleStatusId'])[position()="+a+"]")
              .keys(['\uE015','\uE015','\uE006'])
              .pause(1000)
            }(a)
          }
        })
        browser
        .click("//input[@name='btnSaveUwIssuesList']")
        .pause(1000)
        .click("//input[@name='btnCancel']")
        .pause(1000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .pause(1000)
        .click("//input[@name='btnSubmit']" , function(){browser.accept_alert()})
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 

        // Pay money
        .useXpath()
        .url('http://210.13.77.85:12000/ls/arap/cash/recv/counter/search.do?syskey_request_token=752ba247eba263311fb36ec58db42536&current_module_id=300168')
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
        .saveScreenshot('./data/invest/' +jsonArray[i]['number']+'payamount.png')

        // Check
        .url('http://210.13.77.85:12000/ls/qry/commonquery.CommonQuery.do?syskey_request_token=d83d39e2acdfa20e8f903f934aa511ab&current_module_id=301744')
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
        .getText("(//td[@classname='table_text_td'])[position()=3]//div[@classname='input']", function(result){
        writeStream.write(result.value)
        })
        .saveScreenshot('./data/invest/' +jsonArray[i]['number']+'search.png')

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