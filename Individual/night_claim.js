// Converter Class 
var fs = require('fs');
var Converter = require("csvtojson").Converter;
//store csv
var converter = new Converter({});
var Sync = require('sync');
//read from file 
fs.createReadStream("data/claim/claim.csv",[{flags: 'rs+'}]).pipe(converter);

var moment = require('moment');
var now = moment().format("YYYY_MMM_Do_h.mm.ss a");
var writeStreamReport = fs.createWriteStream("data/claim/"+ now +".csv", [{flags: 'rs+'}]);
writeStreamReport.write('Number'+','+'keyinclaim'+','+'Payamount1'+','+'Result1'+'Result2'); 

var writeId = fs.createWriteStream("data/claim/claimid.txt",[{flags:'rs+'}]);

module.exports = {
  'Open Claim' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (i = 0; i < jsonArray.length ; i ++)  { 
    browser
      .frame(null)
      .useCss()
      .url('http://210.13.77.85:12000/ls/logoutPage.do')
      .waitForElementPresent('body', 30000)
      .setValue('input[name=userName]', 'IBM94')
      .clearValue('input[name=userPassword]')
      .setValue('input[name=userPassword]', 'eBao123')
      .click('input[name=Submit2]')
      .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
      .url('http://210.13.77.85:12000/ls/clm/SearchLifeAssuredAction.do?syskey_request_token=2bddbed54474602933dae40c6e678817&current_module_id=300021')
      .waitForElementPresent('input[name=policyCode]', 10000) 

      //Search 
      .useXpath()
  	  .clearValue("(//input[@name='certiCode'])")
  	  .setValue("(//input[@name='certiCode'])",jsonArray[i]['ID'])
      .getAttribute("//input[@name='certiCode']", "value" ,function(result){
        writeStreamReport.write('\r\n'+result.value+',')
        })
      .setValue("(//input[@name='policyCode'])",'00000'+jsonArray[i]['number'])
      .click("//select[@name='certiType']/option[@value='1']")
  	  .click("(//input[@classname='button btn'])[position()=1]")
      .waitForElementPresent("//tr[@classname='odd']", 30000) 
      .click("(//input[@classname='button btn'])[position()=4]")
      
  	  //填寫受理資料
      .waitForElementPresent("//select[@name='claimType']", 30000)
      .click("//select[@name='claimType']")
      .click("//select[@name='claimType']/option[@value='2']")
      .click("//select[@name='isRpterSms']")
      .keys(['\uE015', '\uE006'])
      .click("//select[@name='isRpterEmail']")
      .keys(['\uE015', '\uE006'])
      .click("(//input[@classname='button btn'])[position()=1]",function(){browser.dismiss_alert()})

      //受理完成
      .waitForElementPresent("//input[@name='registerId']", 30000) 
       .getAttribute("//input[@name='registerId']", 'value' ,function(result){
        writeId.write(result.value)
       })

      .saveScreenshot('./data/claim/00000' +jsonArray[i]['number']+'立案結束'+'.png')
//      writeStreamReport.write('受理成功'+',')
      
      //派件確認
        browser
        .useXpath() 
        .url('http://210.13.77.85:12000/ls/clm/AssignCase.do?syskey_request_token=4f4e77fa5f888913328523dfb60c353b&current_module_id=1000004786')
        .waitForElementPresent("//input[@name='searchButton']",300000)
        .click("//input[@name='searchButton']")
        .pause(5000)
        .waitForElementPresent("//td[@align='left']",300000)
        .getText("//td[@align='left']",function(result1){
        console.log(result1.value)
        var amount = result1.value
        var replaceAmount = amount.replace(/[^\d]/g,"")
        var replaceAmountModi = Number(replaceAmount)+1
        console.log(replaceAmount)
        console.log(replaceAmountModi)

        for (i = 1; i < replaceAmountModi ; i ++){
          browser
          .getText("(//tr/td[@class='table_column'][3])["+i+"]", function(result){         
          //if(this.assert.notEqual(result.value, '105160000284'))
          if(result.value!='00'){          
          browser
          .click("//input[@name='details["+(i-replaceAmount-1)+"].check']")
          console.log("//input[@name='details["+(i-replaceAmount-1)+"].check']")
          console.log(result)            
        }//end if
          i=i+1
          console.log("--------------------------\n")

          })
        }  
        //取得檔案內的值
        var content;
        fs.readFile('data/claim/claimid.txt', function getId(err,data){
           if (err) throw err
           console.log(data)
           content=data
           console.log(content)
         })//end read 
        for (j = 1; j < replaceAmountModi ; j ++){
          browser
          .getText("(//tr/td[@class='table_column'][3])["+j+"]", function(result){ 
          //if(this.assert.notEqual(result.value, '105160000284'))
          if(result.value==content){          
          browser
          .click("//input[@name='details["+(j-replaceAmount-1)+"].check']")
          console.log("//input[@name='details["+(j-replaceAmount-1)+"].check']")
          console.log(result)            
        }//end if
          j=j+1
          console.log("--------------------------\n")

          })
        }//end for

      browser.click("//input[@name='btnAssignExec']") 
      })//end getText
      .pause(5000)
      .saveScreenshot('./data/claim/00000' +jsonArray[i]['number']+'派件結果'+'.png')
  //    writeStreamReport.write('派件成功'+',')


//派件結束             

        //受理池
        .useXpath()
        .url('http://210.13.77.85:12000/ls/clm/mytask/detailSearch.do?syskey_request_token=3e0ea811001e616d786cc329c7315a46&current_module_id=910523')
        .waitForElementPresent("//input[@name='insuredName']",300000)
        .clearValue("//input[@name='insuredName']")
        .setValue("//input[@name='insuredName']",jsonArray[i]['name'])
        .click("(//input[@classname='button btn'])[position()=1]")
        .click("//a")
       // .click("(//trz@classname='odd']//td[@classname='table_column'][3])")


       //立案輸入
      .waitForElementPresent("//select[@name='claimNature']",300000)
      .click("//select[@name='claimNature']")
      .keys(['\uE015', '\uE006'])
      .clearValue("(//input[@name='jobCategory_text'])")
      .setValue("(//input[@name='jobCategory_text'])",'A101')
      .pause(5000)
      .setValue("//input[@name='deathCode']",'21')
      .waitForElementPresent("//select[@name='location']",300000)
      .click("//select[@name='location']/option[@value='1']")
      //保單風險資料庫
      .click("(//input[@classname='button btn'])[position()=1]")
      .pause(5000)
      .window_handles(function(result){
        var handle=result.value[1]
        browser.switchWindow(handle)
        browser.maximizeWindow(handle)    
      })
      .useXpath()
      .waitForElementPresent("//select[@name='claimRiskSubVO.dataTypeId']",10000)
      .click("//select[@name='claimRiskSubVO.dataTypeId']/option[@value='1']")
      .pause(3000)
      .click("//select[@name='claimRiskSubVO.isAgree']/option[@value='Y']")
      .setValue("//input[@name='claimRiskSubVO.deathPostalCode']",'100')
      .click("//select[@name='claimRiskSubVO.deathPlaceCode']")
      .keys(['\uE015', '\uE006'])
      .click("//select[@name='claimRiskSubVO.deathWayCode']")
      .keys(['\uE015', '\uE006']) 
      .setValue("//textarea[@name='claimRiskSubVO.deathCause1']",'100') 
      .setValue("//input[@name='claimRiskSubVO.hospitalCode_text']",'1')
      .setValue("//input[@name='claimRiskSubVO.deathCertificateDate_minguo']",'1050101')
      .setValue("//input[@name='claimRiskSubVO.deathCertificateNo']",'123456789')
      .click("//select[@name='claimRiskSubVO.emergrncyLevel']/option[@value='1']")
      .click("(//input[@name='btnSave'])")
      .pause(1000)
      //
        .window_handles(function(result){
        var handle=result.value[0]
        browser.switchWindow(handle)
        browser.maximizeWindow(handle)    
      }) 

        //診斷代碼
        browser
        .click("//b[text()='診斷代碼']")
        .pause(5000)
        .window_handles(function(result){
        var handle=result.value[1]
        browser.switchWindow(handle)
        browser.maximizeWindow(handle)    
      }) 
        .waitForElementPresent("//td[@classname='table_text_td']",10000)
        .click("(//input[@name='detailI[0].check'])")
        .pause(1000)
        .click("(//input[@name='btnAssignExec'])")
        .pause(1000)
        .click("(//input[@name='btnExit'])")

          .window_handles(function(result){
        var handle=result.value[0]
        browser.switchWindow(handle)
        browser.maximizeWindow(handle)    
      }) 

      //next
      .waitForElementPresent("(//input[@classname='button btn'])[position()=3]",10000)
      .click("(//input[@classname='button btn'])[position()=3]", function(){browser.dismiss_alert()})
     //  writeStreamReport.write('理賠立案'+',')
      //立案
      .pause(5000)
      .useXpath()
      .saveScreenshot('./data/claim/00000' +jsonArray[i]['number']+'立案小結'+'.png')
      .frame('leftFrame')
      .waitForElementPresent("//div[@id='KB1Child']",10000)
      .click("(//div[@classname='child'])")
      .pause(2000)
      .frame(null)
      .frame('rightFrame')
      .pause(2000)
      .setValue("//input[@name='notifiedAmounts']",'500000') 
      .click("(//input[@name='isAccepteds'])")
      .click("(//input[@name='saveButton'])") 
      .frame(null)
      .frame('leftFrame')
      .click("(//div[@classname='parent'])")
      .frame(null)
      .frame('rightFrame')
      .waitForElementPresent("(//input[@classname='button btn'])[position()=13]",10000)
      .click("(//input[@classname='button btn'])[position()=13]")

      
   //   writeStreamReport.write('立案完成')
      .saveScreenshot('./data/claim/00000' +jsonArray[i]['number']+'立案完成'+'.png')
    //立案完成

   }})}

};


