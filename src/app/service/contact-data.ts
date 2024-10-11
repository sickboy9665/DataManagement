export function getData(): any[] {
    const rowData = [
        {
            client_name: "CLIENT X",
            first_name: "andrew",
            last_name: "grauberg",
            email: "andrew.grauberg@abc.com",
            company_name: "abc quant",
            designation: "ceo, president",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "lana",
            last_name: "nordstrom",
            email: "lana.nordstrom@abc.com",
            company_name: "abc quant",
            designation: "director of business development",
            dup_group_id: 1
          },
          {
            client_name: "CLIENT X",
            first_name: "paul",
            last_name: "silverberg",
            email: "paul.silverberg@abc.com",
            company_name: "abc quant",
            designation: "cto",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "shebin",
            last_name: "s",
            email: "shebin.s@abc.com",
            company_name: "abc quant",
            designation: "senior product specialist",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "cristina",
            last_name: "gallo",
            email: "cristina.gallo@abmm.com",
            company_name: "abmm financial",
            designation: "head of group retirement",
            dup_group_id: 2
          },
          {
            client_name: "CLIENT X",
            first_name: "griffin",
            last_name: "mcparland",
            email: "griffin.mcparland@abmm.com",
            company_name: "abmm financial",
            designation: "financial advisor: gwn securities, inc.",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "john",
            last_name: "bannan",
            email: "john.bannan@abmm.com",
            company_name: "abmm financial",
            designation: "financial advisor: gwn securities, inc.",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "mary",
            last_name: "earl",
            email: "mary.earl@abmm.com",
            company_name: "abmm financial",
            designation: "financial advisor: gwn securities inc. /nea retirement specialist",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "tom",
            last_name: "woods",
            email: "tom.woods@abmm.com",
            company_name: "abmm financial",
            designation: "advisor service associate",
            dup_group_id: 3
          },
          {
            client_name: "CLIENT X",
            first_name: "vincent",
            last_name: "parascandola",
            email: "vincent.parascandola@abmm.com",
            company_name: "abmm financial",
            designation: "svp - head of sales",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "william",
            last_name: "plum",
            email: "william.plum@abmm.com",
            company_name: "abmm financial",
            designation: "financial advisor, investment advisor representative of gwn securities, inc.",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "akrati",
            last_name: "johari",
            email: "akrati.johari@affinity.com",
            company_name: "affinity capital exchange inc.",
            designation: "board member",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "alexander",
            last_name: "christoff",
            email: "alexander.christoff@affinity.com",
            company_name: "affinity capital exchange inc.",
            designation: "corporate development",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "howard",
            last_name: "wettan",
            email: "howard.wettan@affinity.com",
            company_name: "affinity capital exchange inc.",
            designation: "board advisor and legal counsel",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "plamen",
            last_name: "mandadjiev",
            email: "plamen.mandadjiev@affinity.com",
            company_name: "affinity capital exchange inc.",
            designation: "head of engineering",
            dup_group_id: 4
          },
          {
            client_name: "CLIENT X",
            first_name: "tiago",
            last_name: "s",
            email: "tiago.s@affinity.com",
            company_name: "affinity capital exchange inc.",
            designation: "director research and analytics",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "andrew",
            last_name: "lewis",
            email: "andrew.lewis@alpha.com",
            company_name: "alpha theory",
            designation: "artificial intelligence intern",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "cameron",
            last_name: "hight",
            email: "cameron.hight@alpha.com",
            company_name: "alpha theory",
            designation: "ceo & founder",
            dup_group_id: 5
          },
          {
            client_name: "CLIENT X",
            first_name: "justin",
            last_name: "olson",
            email: "justin.olson@alpha.com",
            company_name: "alpha theory",
            designation: "data scientist",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "michael",
            last_name: "guzek",
            email: "michael.guzek@alpha.com",
            company_name: "alpha theory",
            designation: "chief information officer",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "mike",
            last_name: "ortiz",
            email: "mike.ortiz@alpha.com",
            company_name: "alpha theory",
            designation: "senior business analyst",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "ray",
            last_name: "xecu",
            email: "ray.xecu@alpha.com",
            company_name: "alpha theory",
            designation: "senior product manager",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "cindy",
            last_name: "h",
            email: "cindy.h@anti.com",
            company_name: "anti capital",
            designation: "quantitative developer",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "jacob",
            last_name: "labor",
            email: "jacob.labor@anti.com",
            company_name: "anti capital",
            designation: "senior rust data engineer",
            dup_group_id: 6
          },
          {
            client_name: "CLIENT X",
            first_name: "jake",
            last_name: "lee",
            email: "jake.lee@anti.com",
            company_name: "anti capital",
            designation: "senior quantitative researcher",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "karamvir",
            last_name: "singh",
            email: "karamvir.singh@anti.com",
            company_name: "anti capital",
            designation: "consultant",
            dup_group_id: 7
          },
          {
            client_name: "CLIENT X",
            first_name: "wei-yu",
            last_name: "yang",
            email: "wei-yu.yang@anti.com",
            company_name: "anti capital",
            designation: "quantitative developer",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "lena",
            last_name: "nordstrom",
            email: "lana.nordstrom@abc.com",
            company_name: "abc quant",
            designation: "director of business development",
            dup_group_id: 1
          },
          {
            client_name: "CLIENT X",
            first_name: "cristina",
            last_name: "gallow",
            email: "cristina.gallo@abmm.com",
            company_name: "abmm financial",
            designation: "head of group retirement",
            dup_group_id: 2
          },
          {
            client_name: "CLIENT X",
            first_name: "tom",
            last_name: "woods",
            email: "tom.woods@abmm.com",
            company_name: "abmm financial",
            designation: "advisor service associate",
            dup_group_id: 3
          },
          {
            client_name: "CLIENT X",
            first_name: "plamen",
            last_name: "mandadjiev",
            email: "plamen.mandadjiev@affinity.com",
            company_name: "affinity capital exchange inc.",
            designation: "head of engineering",
            dup_group_id: 4
          },
          {
            client_name: "CLIENT X",
            first_name: "cameron",
            last_name: "hight",
            email: "cameron.hight@centerbook.com",
            company_name: "centerbook partners lp",
            designation: "chairman & co-founder of centerbook partners",
            dup_group_id: 5
          },
          {
            client_name: "CLIENT X",
            first_name: "jacob",
            last_name: "labor",
            email: "jacob.labor@xyz.com",
            company_name: "anti capital",
            designation: "senior rust data engineer",
            dup_group_id: 6
          },
          {
            client_name: "CLIENT X",
            first_name: "karamvir",
            last_name: "singh",
            email: "karamvir.singh@anti.com",
            company_name: "",
            designation: "consultant",
            dup_group_id: 7
          },
          {
            client_name: "CLIENT X",
            first_name: "mike",
            last_name: "",
            email: "michael.guzek@alpha.com",
            company_name: "alpha theory",
            designation: "chief information officer",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "mike",
            last_name: "guzek",
            email: "michael.guzek@alpha.com",
            company_name: "alpha theory",
            designation: "chief information officer",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "kitty",
            last_name: "liu",
            email: "kitty.liu@anti.com",
            company_name: "anti capital",
            designation: "human resources business partner",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "maxwell",
            last_name: "becker",
            email: "maxwell.becker@anti.com",
            company_name: "anti capital",
            designation: "lead system engineer",
            dup_group_id: 999999
          },
          {
            client_name: "CLIENT X",
            first_name: "po-wen",
            last_name: "perng",
            email: "po-wen.perng@anti.com",
            company_name: "anti capital",
            designation: "head of taiwan",
            dup_group_id: 999999
          }
    ]
    return rowData.map((row) => ({ ...row, hidden: 'hidden' }));
}