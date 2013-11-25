var cheerio = require('cheerio');

var bounties = [];
/*
bounties.push({
  name: "Ebay",
  url: 'http://pages.ebay.com/securitycenter/ResearchersAcknowledgement.html',
  cb: function(r, id){
    $ = cheerio.load(r);
		$('div.inner_conb li').each(function() { 
			var name = $(this).text();
        h = lookup_hustler(name);
        upgrade_hustler(h,id);
		});		
  }
})
*/
bounties.push({
  name: "Chromium",
  url: 'http://www.chromium.org/Home/chromium-security/hall-of-fame',
  cb: function(r, id, upgrade){

    $ = cheerio.load(r);
		$('#sites-canvas-main-content td li').each(function() { 
			var text = $(this).text(); 
			var parts = text.split(/\sfor\s/);
			if (parts[1]) { // gets rid of the anonymous entries
				var name, reward,
				    rewardAndName = parts[0].split(/\sto\s/);
				if (rewardAndName[1]) {
					reward = rewardAndName[0].substr(1);
					name = rewardAndName[1];
				} else {
					name = rewardAndName[0];
				}
				h = upgrade(name,id);
				if (reward) {
					h.reward += parseInt(reward);
				}
			}
		});
/*
    var res;
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){

      item = res[1].split(/\sfor/)[0];
      item = item.split(/\sto\s/).reverse();
 
      h = lookup_hustler(item[0]);
      upgrade_hustler(h,id);
      if(item.length == 2)
        h.reward += parseInt(item[1].substr(1))
    }
*/
  }
})
/*
bounties.push({
  name: "Google",
  url: 'http://www.google.com/about/appsecurity/hall-of-fame/reward/',
  cb: function(r, id){

    var res;
    var reg  = /td>\s*<td class="name">\s*(.*?)\s*</g
    var html = /</;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);

    }
  }
})


bounties.push({
  name: "Adobe",
  url: 'http://www.adobe.com/support/security/bulletins/securityacknowledgments.html',
  cb: function(r, id){

    var res;
    var reg  = /<li>(.*?)<\/li>/g;
    // extract the list
    r=r.split('Security Bulletin')[1].split('</ul>')[0];
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})


bounties.push({
  name: "AT&T",
  url: 'http://developer.att.com/developer/apiDetailPage.jsp?passedItemId=13400790',
  cb: function(r, id){


    var res;
    var reg  = />(.*?)<\/td>\s*<td class="last/g
    var html = /</;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);

    }
  }
})



bounties.push({
  name: "Barracuda",
  url: 'http://barracudalabs.com/research-resources/bug-bounty-program/bug-bounty-hall-of-fame/',
  cb: function(r, id){


    var res;
    var reg  = /<td>(.*?)<\/td>\s*<\/tr/g
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);

    }
  }
})



bounties.push({
  name: "Coinbase",
  url: 'http://coinbase.com/whitehat',
  cb: function(r, id){
    var res;
    r=r.split('h5>Awards')[1];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})


bounties.push({
  name: "Dropbox",
  url: 'https://www.dropbox.com/special_thanks',
  cb: function(r, id){
    var res;
    r=r.split('thanks-go-to')[1].split('responsible-disclosure')[0];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})


bounties.push({
  name: "Gitlab",
  url: 'http://www.gitlab.com/vulnerability-acknowledgements/',
  cb: function(r, id){
    var res;
    r=r.split('<ul')[2];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})


bounties.push({
  name: "Github",
  url: 'https://help.github.com/articles/responsible-disclosure-of-security-vulnerabilities',
  cb: function(r, id){
    var res;
    r=r.split('<ul')[3];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})


bounties.push({
  name: "Yahoo",
  url: 'http://bugbounty.yahoo.com/security_wall.html',
  cb: function(r, id){
    var res;
    r=r.split('header-badge')[1];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})

bounties.push({
  name: "Zynga",
  url: 'http://company.zynga.com/security/whitehats',
  cb: function(r, id){
    var res;
    r=r.split('>Thanks!')[1];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})

bounties.push({
  name: "Yandex",
  url: 'http://company.yandex.com/security/hall-of-fame.xml',
  cb: function(r, id){
    var res;
    var reg  = /<tr><td class="b-research__t-td">\s*<p>\s*(.*?)<\/p>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})

bounties.push({
  name: "Zendesk",
  url: 'http://www.zendesk.com/company/responsible-disclosure-policy',
  cb: function(r, id){
    var res;
    var reg  = /<br\/>\s*(.{1,400})\s*<br\/>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})
bounties.push({
  name: "Apple",
  url: 'http://support.apple.com/kb/HT1318',
  cb: function(r, id){
    var res;
    var reg  = /We would like to acknowledge (.*?) for/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})

bounties.push({
  name: "Nokia",
  url: 'http://www.nokia.com/global/security/acknowledgements/',
  cb: function(r, id){
    $ = cheerio.load(r);
    $('td:first-child')
      .filter(function() {
	// Remove month/year headers
        var t = $(this).attr('data-title');
        return t && t !== '';
      })
      .each(function() { 
        var name = $(this).text().trim(); 
        h = lookup_hustler(name);
        upgrade_hustler(h,id);
      }); 
  }
})


bounties.push({
  name: "Microsoft",
  url: 'http://technet.microsoft.com/en-us/security/cc308575',
  cb: function(r, id){
    var res;
    var reg  = /<strong>(.*?)<\/strong>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})

bounties.push({
  name: "Soundcloud",
  url: 'http://help.soundcloud.com/customer/portal/articles/439715-responsible-disclosure',
  cb: function(r, id){
    var res;
    r=r.split('we really appreciate it')[1].split('span style')[0];
    var reg  = /-(.*?)<br/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})





bounties.push({
  name: "Shopify",
  url: 'https://www.shopify.com/security-response',
  cb: function(r, id){
    var res;
    r=r.split('Thank you!</h3')[1].split('sub-call-to-action')[0];
    var reg  = /<p>(.*?)<\/p>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})


bounties.push({
  name: "Facebook",
  url: 'https://www.facebook.com/whitehat/thanks/',
  cb: function(r, id){
    var res;
    r = r.replace('064;', '@');
    var reg  = /<span class="fsm">(.*?)<\/span>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})

bounties.push({
  name: "Heroku",
  url: 'https://www.heroku.com/policy/security-hall-of-fame',
  cb: function(r, id){
    var res;
    r=r.split('Security Researcher')[1].split('article>')[0];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      res[1] = res[1].split(' (')[0];
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})
bounties.push({
  name: "Red hat",
  url: 'https://access.redhat.com/site/articles/66234',
  cb: function(r, id){
    var res;
    r=r.split('Please avoid using')[1].split('like a public acknowledgement')[0];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      data = res[1].split(' [');
      h = lookup_hustler(data[0]);
      num = 1;
      if(data[1]){
        num = parseInt(data[1]);
      }
      while(num--){
        upgrade_hustler(h,id);
      }
      
    }
  }
})

bounties.push({
  name: "Twitter",
  url: 'https://about.twitter.com/company/security',
  cb: function(r, id){
    var res;
    var reg  = />([^<]*?)<\/a><\/span>\s*<\/div>\s*<\/div>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})




bounties.push({
  name: "Etsy",
  url: 'http://www.etsy.com/help/article/2463',
  cb: function(r, id){
    var res;
    r=r.split('vulnerabilities to us in the past')[1];
    var reg  = />(.*?)<br \/>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})


bounties.push({
  name: "Paypal",
  url: 'https://www.paypal.com/webapps/mpp/security-tools/wall-of-fame-honorable-mention',
  cb: function(r, id){
    var res;
    var reg  = /xl65">(.*?)</g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})
*/
module.exports = bounties;

