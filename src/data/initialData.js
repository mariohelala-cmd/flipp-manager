export const STAFF = ["Umensu","Sartak","Gary","Roshan","Imran","Mamata","Sarina","Sandi","Christina","Rima","Pragya"];
export const DAYS  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// roster[staffName][day] = { start, end, role } | null
export const initialRoster = {
  Umensu:   { Mon:null,                    Tue:{start:"9:30",end:"18:00",role:"foh"}, Wed:{start:"9:30",end:"18:00",role:"foh"}, Thu:null,                         Fri:null,                         Sat:{start:"9:30",end:"18:00",role:"foh"}, Sun:null },
  Sartak:   { Mon:null,                    Tue:{start:"9:30",end:"17:00",role:"boh"}, Wed:{start:"9:30",end:"17:00",role:"boh"}, Thu:{start:"9:30",end:"14:00",role:"boh"}, Fri:null,                   Sat:null,                                  Sun:{start:"10:00",end:"17:00",role:"boh"} },
  Gary:     { Mon:{start:"9:30",end:"16:00",role:"foh"},  Tue:null,                  Wed:null,                                  Thu:null,                         Fri:{start:"9:30",end:"16:00",role:"foh"},  Sat:null,                           Sun:null },
  Roshan:   { Mon:{start:"9:30",end:"18:00",role:"boh"},  Tue:null,                  Wed:null,                                  Thu:{start:"9:30",end:"13:30",role:"boh"}, Fri:null,                    Sat:{start:"11:00",end:"18:00",role:"boh"}, Sun:{start:"12:00",end:"17:00",role:"boh"} },
  Imran:    { Mon:{start:"15:00",end:"18:00",role:"foh"}, Tue:null,                  Wed:null,                                  Thu:{start:"14:30",end:"21:30",role:"foh"}, Fri:{start:"11:00",end:"18:00",role:"foh"}, Sat:null,                  Sun:null },
  Mamata:   { Mon:null,                    Tue:null,                                  Wed:null,                                  Thu:{start:"16:00",end:"21:00",role:"foh"}, Fri:null,                   Sat:{start:"12:00",end:"18:00",role:"foh"}, Sun:{start:"10:00",end:"16:00",role:"foh"} },
  Sarina:   { Mon:null,                    Tue:null,                                  Wed:null,                                  Thu:{start:"16:00",end:"21:30",role:"foh"}, Fri:null,                   Sat:{start:"9:30",end:"17:30",role:"foh"},  Sun:{start:"11:00",end:"17:00",role:"foh"} },
  Sandi:    { Mon:null,                    Tue:null,                                  Wed:null,                                  Thu:{start:"10:30",end:"21:30",role:"boh"}, Fri:null,                   Sat:{start:"11:00",end:"18:00",role:"boh"}, Sun:{start:"11:00",end:"17:00",role:"boh"} },
  Christina:{ Mon:null,                    Tue:null,                                  Wed:null,                                  Thu:{start:"17:00",end:"21:00",role:"foh"}, Fri:null,                   Sat:null,                                  Sun:null },
  Rima:     { Mon:{start:"11:00",end:"18:00",role:"foh"}, Tue:null,                  Wed:null,                                  Thu:null,                         Fri:null,                             Sat:null,                                  Sun:null },
  Pragya:   { Mon:null,                    Tue:null,                                  Wed:null,                                  Thu:{start:"17:00",end:"21:00",role:"foh"}, Fri:{start:"11:00",end:"18:00",role:"foh"}, Sat:null,                  Sun:null },
};

export const initialTasks = [
  {t:"Deep clean grill & flat top",day:"Mon",done:true},
  {t:"Check & record fridge/freezer temps",day:"Daily",done:true},
  {t:"Stocktake buns, patties, cheese",day:"Tue",done:false},
  {t:"Place weekly produce order",day:"Wed",done:false},
  {t:"Clean fryers & change oil",day:"Thu",done:false},
  {t:"Reconcile till & banking",day:"Fri",done:false},
  {t:"Sanitise dining area & bins",day:"Sat",done:false},
  {t:"Staff roster sign-off for next week",day:"Sun",done:false},
];

export const suppliers = [
  {name:"Aussie Meats Co.",cat:"Patties & Beef",rep:"Tony G.",phone:"02 9631 1100",email:"orders@aussiemeats.com.au",day:"Tue & Fri",status:"Preferred"},
  {name:"Fresh Valley Produce",cat:"Veg & Salad",rep:"Mai L.",phone:"02 9876 4420",email:"sales@freshvalley.com.au",day:"Mon, Wed, Fri",status:"Preferred"},
  {name:"Golden Buns Bakery",cat:"Buns & Bread",rep:"Sam K.",phone:"02 9123 7788",email:"hello@goldenbuns.com.au",day:"Daily 5am",status:"Active"},
  {name:"ChillPack Beverages",cat:"Drinks & Syrups",rep:"Rita P.",phone:"02 9555 2010",email:"orders@chillpack.com.au",day:"Thu",status:"Active"},
  {name:"CleanPro Supplies",cat:"Cleaning & Packaging",rep:"Dev S.",phone:"02 9444 6633",email:"support@cleanpro.com.au",day:"On request",status:"Backup"},
];

export const orderTemplate = [
  {item:"Beef patties (180g)",sup:"Aussie Meats Co.",unit:"box / 40",par:6,onhand:2},
  {item:"Brioche buns",sup:"Golden Buns Bakery",unit:"tray / 48",par:8,onhand:3},
  {item:"Cheese slices",sup:"Aussie Meats Co.",unit:"box / 200",par:3,onhand:1},
  {item:"Lettuce",sup:"Fresh Valley Produce",unit:"case",par:4,onhand:1},
  {item:"Tomatoes",sup:"Fresh Valley Produce",unit:"case",par:3,onhand:2},
  {item:"Fries (skin-on)",sup:"Fresh Valley Produce",unit:"bag 2.5kg",par:12,onhand:5},
  {item:"Soft drink syrup",sup:"ChillPack Beverages",unit:"BIB",par:5,onhand:3},
  {item:"Takeaway boxes",sup:"CleanPro Supplies",unit:"carton / 500",par:4,onhand:2},
];

export const initialEmails = [
  {from:"Aussie Meats Co.",subj:"Invoice #4821 — June delivery",prev:"Please find attached your statement for…",time:"08:14",read:false},
  {from:"Merrylands Council",subj:"Food safety inspection booking",prev:"Your annual inspection is scheduled for…",time:"Yest",read:false},
  {from:"Fresh Valley Produce",subj:"Price update — leafy greens",prev:"Due to weather, lettuce pricing will…",time:"Yest",read:true},
  {from:"Jess (staff)",subj:"Swap request — Sat shift",prev:"Hi Mario, can I swap my Saturday shift…",time:"2d",read:true},
  {from:"Uber Eats Partner",subj:"Weekly payout summary",prev:"Your payout of $3,142.60 has been…",time:"3d",read:true},
];

export const finance = {
  revenue:{"Dine-in":8200,"Takeaway":5400,"Uber Eats":3140,"DoorDash":2010},
  costs:{"Food & ingredients":7100,"Wages":6200,"Rent":1900,"Utilities":650,"Packaging":540,"Other":420},
};

export const performance = [
  {name:"Mario",role:"Manager",shifts:5,onTime:5,rating:4.9,notes:"Excellent leadership this week."},
  {name:"Sara",role:"Manager",shifts:4,onTime:4,rating:4.7,notes:"Great team communication."},
  {name:"Ahmed",role:"Grill",shifts:5,onTime:4,rating:4.5,notes:"One late arrival Mon — otherwise solid."},
  {name:"Lily",role:"Cashier",shifts:4,onTime:4,rating:4.8,notes:"Customers love her service."},
  {name:"Omar",role:"Grill",shifts:5,onTime:5,rating:4.6,notes:"Consistent speed on the grill."},
  {name:"Jess",role:"Cashier",shifts:3,onTime:3,rating:4.4,notes:"Requested shift swap handled well."},
  {name:"Dia",role:"Prep",shifts:4,onTime:3,rating:4.2,notes:"Two late starts — follow up needed."},
];

export const initialIncidents = [
  {date:"Mon 22 Jun",type:"Equipment",sev:"High",desc:"Fryer #2 rattling noise — CleanPro booked for Thu inspection.",reporter:"Sara",status:"Open"},
  {date:"Tue 17 Jun",type:"Customer",sev:"Med",desc:"Customer complaint re: wait time during lunch rush. Addressed with team.",reporter:"Mario",status:"Resolved"},
  {date:"Sat 14 Jun",type:"Staff",sev:"Low",desc:"Jess arrived 15 min late due to transport. Noted in file.",reporter:"Sara",status:"Resolved"},
  {date:"Thu 12 Jun",type:"Food Safety",sev:"High",desc:"Fridge #1 temp logged at 6°C — reset and monitored. Back to 3°C within 1hr.",reporter:"Ahmed",status:"Resolved"},
];

export const initialChecklist = {
  open:[
    {t:"Unlock premises & disarm alarm",done:false},
    {t:"Check all fridge & freezer temps (must be ≤4°C)",done:false},
    {t:"Turn on all equipment — grills, fryers, screens",done:false},
    {t:"Stock front counter (cups, lids, napkins, sauces)",done:false},
    {t:"Check opening cash float ($200)",done:false},
    {t:"Verify delivery stock from overnight drop",done:false},
    {t:"Brief opening team on daily specials & tasks",done:false},
  ],
  close:[
    {t:"Complete end-of-day till reconciliation",done:false},
    {t:"Deep clean grills, fryers & prep surfaces",done:false},
    {t:"Label & date all open food items in fridge",done:false},
    {t:"Empty & sanitise all bins",done:false},
    {t:"Lock all refrigeration & check temps logged",done:false},
    {t:"Set alarm & lock premises",done:false},
    {t:"Submit closing report in system",done:false},
  ],
  openBack:[
    {t:"Turn on grills, flat top & fryers — preheat to temp",done:false},
    {t:"Check gas lines & pilot lights",done:false},
    {t:"Pull thawed patties from fridge — check date labels",done:false},
    {t:"Prep sauces, sliced veg & garnishes",done:false},
    {t:"Stock bain-marie with condiments",done:false},
    {t:"Check oil levels in fryers — top up or change if needed",done:false},
    {t:"Log fridge & freezer opening temps on sheet",done:false},
    {t:"BOH team briefed on special items & allergens",done:false},
  ],
  closeBack:[
    {t:"Scrape & deep clean all grills and flat tops",done:false},
    {t:"Drain, filter & cover fryer oil",done:false},
    {t:"Discard expired prepped items — label & date remaining",done:false},
    {t:"Clean & sanitise all prep surfaces & benches",done:false},
    {t:"Sweep & mop kitchen floor",done:false},
    {t:"Empty & sanitise all kitchen bins",done:false},
    {t:"Log fridge & freezer closing temps on sheet",done:false},
    {t:"Turn off all cooking equipment & check gas off",done:false},
  ],
  openFront:[
    {t:"Unlock front door & flip sign to OPEN",done:false},
    {t:"Stock front counter — cups, lids, bags, napkins, sauces",done:false},
    {t:"Check opening cash float ($200) & enter in POS",done:false},
    {t:"Power on POS terminals & Uber Eats / DoorDash tablets",done:false},
    {t:"Wipe down tables, chairs & condiment stations",done:false},
    {t:"Restock drink fridge & check best-before dates",done:false},
    {t:"Check uniform & hygiene standards with FOH team",done:false},
  ],
  closeFront:[
    {t:"Flip sign to CLOSED & lock front door",done:false},
    {t:"Complete end-of-day till reconciliation & print Z-report",done:false},
    {t:"Wipe all tables, chairs & menus",done:false},
    {t:"Clean & restock condiment stations for tomorrow",done:false},
    {t:"Power off POS terminals & delivery tablets",done:false},
    {t:"Sweep & mop dining area floor",done:false},
    {t:"Submit FOH closing report in system",done:false},
  ],
};

export const initialComments = [
  {who:"Sara",txt:"Fryer #2 making a rattling noise — booked CleanPro to look Thu.",flag:true,when:"1h ago"},
  {who:"Ahmed",txt:"Running low on cheese slices, added to Wed order.",flag:false,when:"3h ago"},
  {who:"Lily",txt:"Eftpos terminal was slow this morning, restarted and OK now.",flag:false,when:"Yest"},
];
