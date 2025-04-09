// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Slider } from "@/components/ui/slider";
// // import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { Button } from "../../../components/ui/button";
// import { Slider } from "@/components/ui/slider";


// const IPL =[
    // {
    //   "KKR Team": {
    //     "Batters": [
    //       {"name": "Ajinkya Rahane", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/44.png"},
    //       {"name": "Rinku Singh", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/152.png"},
    //       {"name": "Quinton de Kock", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/170.png"},
    //       {"name": "Rahmanullah Gurbaz", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/641.png"},
    //       {"name": "Angkrish Raghuvanshi", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/787.png"},
    //       {"name": "Rovman Powell", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/329.png"},
    //       {"name": "Manish Pandey", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/16.png"},
    //       {"name": "Luvnith Sisodia", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1009.png"}
    //     ],
    //     "All Rounders": [
    //       {"name": "Venkatesh Iyer", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/584.png"},
    //       {"name": "Anukul Roy", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/160.png"},
    //       {"name": "Moeen Ali", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/206.png"},
    //       {"name": "Ramandeep Singh", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/991.png"},
    //       {"name": "Andre Russell", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/141.png"},
    //       {"name": "Sunil Narine", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/156.png"}
    //     ],
    //     "Bowlers": [
    //       {"name": "Anrich Nortje", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/142.png"},
    //       {"name": "Vaibhav Arora", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/583.png"},
    //       {"name": "Mayank Markande", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/87.png"},
    //       {"name": "Spencer Johnson", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/2518.png"},
    //       {"name": "Harshit Rana", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1013.png"},
    //       {"name": "Varun Chakaravarthy", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/140.png"},
    //       {"name": "Chetan Sakariya", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/592.png"}
    //     ]
    //   }
    // },
  
  
    // {
    //   "RCB Team": {
    //     "Batters": [
    //       {"name": "Rajat Patidar", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/597.png"},
    //       {"name": "Virat Kohli", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/2.png"},
    //       {"name": "Phil Salt", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1220.png"},
    //       {"name": "Jitesh Sharma", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1000.png"},
    //       {"name": "Devdutt Padikkal", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/200.png"},
    //       {"name": "Swastik Chhikara", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3102.png"}
    //     ],
    //     "All Rounders": [
    //       {"name": "Liam Livingstone", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/183.png"},
    //       {"name": "Krunal Pandya", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/17.png"},
    //       {"name": "Swapnil Singh", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1483.png"},
    //       {"name": "Tim David", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/636.png"},
    //       {"name": "Romario Shepherd", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/371.png"},
    //       {"name": "Manoj Bhandage", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1485.png"},
    //       {"name": "Jacob Bethell", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/869.png"}
    //     ],
    //     "Bowlers": [
    //       {"name": "Josh Hazlewood", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/36.png"},
    //       {"name": "Rasikh Dar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/172.png"},
    //       {"name": "Suyash Sharma", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1932.png"},
    //       {"name": "Bhuvneshwar Kumar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/15.png"},
    //       {"name": "Nuwan Thushara", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/813.png"},
    //       {"name": "Lungisani Ngidi", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/99.png"},
    //       {"name": "Abhinandan Singh", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3574.png"},
    //       {"name": "Mohit Rathee", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1935.png"},
    //       {"name": "Yash Dayal", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/978.png"}
    //     ]
    //   }
    // },
  
    // {
    //   "SRH Team": {
    //     "Batters": [
    //       {"name": "Ishan Kishan", "role": "WK-Batter", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee42c88ec80.07161393kus9q7ew.png"},
    //       {"name": "Atharva Taide", "role": "Batter", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee13fa47017.25507614btem91fd.png"},
    //       {"name": "Abhinav Manohar", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/974.png"},
    //       {"name": "Aniket Verma", "role": "Batter", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee157dee754.27943533bf)xod(j.png"},
    //       {"name": "Sachin Baby", "role": "Batter", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee16ca75159.77560477un$4jtey.png"},
    //       {"name": "Heinrich Klaasen", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/202.png"},
    //       {"name": "Travis Head", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/37.png"}
    //     ],
    //     "All Rounders": [
    //       {"name": "Harshal Patel", "role": "All-Rounder", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee00907b481.96254448m$okwnzl.png"},
    //       {"name": "Kamindu Mendis", "role": "All-Rounder", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee115a18f24.67736995p594$x1k.png"},
    //       {"name": "Wiaan Mulder", "role": "All-Rounder", "image": "https://d13ir53smqqeyp.cloudfront.net/player-images/opta-cricket/9243.png"},
    //       {"name": "Abhishek Sharma", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/212.png"},
    //       {"name": "Nitish Kumar Reddy", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1944.png"},
    //       {"name": "Brydon Carse", "role": "All-Rounder", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee183405e96.7501842024xmewjp.png"}
    //     ],
    //     "Bowlers": [
    //       {"name": "Pat Cummins", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/33.png"},
    //       {"name": "Mohammad Shami", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee416b7ea12.405426875d8int1x.png"},
    //       {"name": "Rahul Chahar", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee0e62ee861.711889401ylc$u0i.png"},
    //       {"name": "Adam Zampa", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee0d97e50b3.853559074zn$0hvm.png"},
    //       {"name": "Simarjeet Singh", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee0fe73db37.24811874ekj9)nq8.png"},
    //       {"name": "Zeeshan Ansari", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee1327dbd11.533483987m4zwbe5.png"},
    //       {"name": "Jaydev Unadkat", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-65fefdfbcd3c05.33790781o8)mzsc3.png"},
    //       {"name": "Eshan Malinga", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee12606d642.560857045p4hcq1g.png"}
    //     ]
    //   }
    // },
  
  
  
    // {
    //   "RR Team": {
    //     "Batters": [
    //       { "name": "Sanju Samson", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/190.png" },
    //       { "name": "Shubham Dubey", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/3112.png" },
    //       { "name": "Vaibhav Suryavanshi", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1540.png" },
    //       { "name": "Kunal Rathore", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1540.png" },
    //       { "name": "Shimron Hetmyer", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/210.png" },
    //       { "name": "Yashasvi Jaiswal", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/533.png" },
    //       { "name": "Dhruv Jurel", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1004.png" },
    //       { "name": "Riyan Parag", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/189.png" }
    //     ],
    //     "All Rounders": [
    //       { "name": "Nitish Rana", "role": "All-Rounder", "image": "https://www.rajasthanroyals.com/static-assets/images/players/63649.png" },
    //       { "name": "Yudhvir Singh", "role": "All-Rounder", "image": "https://www.rajasthanroyals.com/static-assets/images/players/74054.png" },
    //       { "name": "Vaibhav Suryavanshi", "role": "All-Rounder", "image": "https://www.rajasthanroyals.com/static-assets/images/players/114349.png" }
    //     ],
    //     "Bowlers": [
    //       { "name": "Jofra Archer", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/64254.png" },
    //       { "name": "Maheesh Theekshana", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/69274.png" },
    //       { "name": "Wanindu Hasaranga", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/65027.png" },
    //       { "name": "Akash Madhwal", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/74055.png" },
    //       { "name": "Kumar Kartikeya Singh", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/70191.png" },
    //       { "name": "Tushar Deshpande", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/65478.png" },
    //       { "name": "Fazalhaq Farooqi", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/67927.png" },
    //       { "name": "Kwena Maphaka", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/90908.png" },
    //       { "name": "Ashok Sharma", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/91316.png" },
    //       { "name": "Sandeep Sharma", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/220.png" }
    //     ]
    //   }
    // },
  
    // {
    //   "LSG Team": {
    //     "Batters": [
    //       {"name": "Rishabh Pant", "role": "WK-Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/65756.png"},
    //       {"name": "David Miller", "role": "Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/5313.png"},
    //       {"name": "Aiden Markram", "role": "Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/64219.png"},
    //       {"name": "Aryan Juyal", "role": "WK-Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/68003.png"},
    //       {"name": "Himmat Singh", "role": "Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/65152.png"},
    //       {"name": "Matthew Breetzke", "role": "Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/65618.png"},
    //       {"name": "Nicholas Pooran", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/136.png"}
    //     ],
    //     "All Rounders": [
    //       {"name": "Mitchell Marsh", "role": "All-Rounder", "image": ""},
    //       {"name": "Abdul Samad", "role": "All-Rounder", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/71260.png"},
    //       {"name": "Shahbaz Ahamad", "role": "All-Rounder", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/58223.png"},
    //       {"name": "Yuvraj Chaudhary", "role": "All-Rounder", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/71367.png"},
    //       {"name": "Rajvardhan Hangargekar", "role": "All-Rounder", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/71152.png"},
    //       {"name": "Arshin Kulkarni", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/2788.png"},
    //       {"name": "Ayush Badoni", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/985.png"}
    //     ],
    //     "Bowlers": [
    //       {"name": "Avesh Khan", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2023/109.png"},
    //       {"name": "Akash Deep", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/71447.png"},
    //       {"name": "M. Siddharth", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/532.png"},
    //       {"name": "Digvesh Singh", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/100574.png"},
    //       {"name": "Akash Singh", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/70376.png"},
    //       {"name": "Shamar Joseph", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/101907.png"},
    //       {"name": "Prince Yadav", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/100570.png"},
    //       {"name": "Mayank Yadav", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/987.png"},
    //       {"name": "Mohsin Khan", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/541.png"},
    //       {"name": "Ravi Bishnoi", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/520.png"}
    //     ]
    //   }
    // },
    // {
    //   "DC Team": {
    //     "Batters": [
    //       {"name": "KL Rahul", "role": "WK-Batter", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/60122.png"},
    //       {"name": "Jake Fraser-McGurk", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/3115.png"},
    //       {"name": "Karun Nair", "role": "Batter", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/62297.png"},
    //       {"name": "Faf du Plessis", "role": "Batter", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/28891.png"},
    //       {"name": "Donovan Ferreira", "role": "WK-Batter", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/23487.png"},
    //       {"name": "Abishek Porel", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1580.png"},
    //       {"name": "Tristan Stubbs", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1017.png"}
    //     ],
    //     "All Rounders": [
    //       {"name": "Axar Patel", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/110.png"},
    //       {"name": "Sameer Rizvi", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/71376.png"},
    //       {"name": "Ashutosh Sharma", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/68176.png"},
    //       {"name": "Darshan Nalkande", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/67489.png"},
    //       {"name": "Vipraj Nigam", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/88677.png"},
    //       {"name": "Ajay Mandal", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/66558.png"},
    //       {"name": "Manvanth Kumar", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/98477.png"},
    //       {"name": "Tripurana Vijay", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/90635.png"},
    //       {"name": "Madhav Tiwari", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/124649.png"}
    //     ],
    //     "Bowlers": [
    //       {"name": "Mitchell Starc", "role": "Bowler", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/10053.png"},
    //       {"name": "T. Natarajan", "role": "Bowler", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/65160.png"},
    //       {"name": "Mohit Sharma", "role": "Bowler", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/63341.png"},
    //       {"name": "Mukesh Kumar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1462.png"},
    //       {"name": "Dushmantha Chameera", "role": "Bowler", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/58065.png"},
    //       {"name": "Kuldeep Yadav", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/14.png"}
    //     ]
    //   }
    // },
  
    // {
    //   "GT Team": {
    //     "Batters": [
    //       {"name": "Shubman Gill", "role": "Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/66818.png"},
    //       {"name": "Jos Buttler", "role": "WK-Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/9782.png"},
    //       {"name": "Kumar Kushagra", "role": "WK-Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/74097.png"},
    //       {"name": "Anuj Rawat", "role": "WK-Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/67752.png"},
    //       {"name": "Sherfane Rutherford", "role": "Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/67285.png"},
    //       {"name": "Shahrukh Khan", "role": "Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/64721.png"},
    //       {"name": "Glenn Phillips", "role": "Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65295.png"}
    //     ],
    //     "All Rounders": [
    //       {"name": "Nishant Sindhu", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/88873.png"},
    //       {"name": "Mahipal Lomror", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65432.png"},
    //       {"name": "Washington Sundar", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65859.png"},
    //       {"name": "Mohd. Arshad Khan", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/82839.png"},
    //       {"name": "Sai Kishore", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/66438.png"},
    //       {"name": "Jayant Yadav", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/59611.png"},
    //       {"name": "Karim Janat", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65875.png"},
    //       {"name": "Sai Sudharsan", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/69500.png"},
    //       {"name": "Rahul Tewatia", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/64440.png"}
    //     ],
    //     "Bowlers": [
    //       {"name": "Kagiso Rabada", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/63611.png"},
    //       {"name": "Mohammed Siraj", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65799.png"},
    //       {"name": "Prasidh Krishna", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65702.png"},
    //       {"name": "Manav Suthar", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/71149.png"},
    //       {"name": "Gerald Coetzee", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/67443.png"},
    //       {"name": "Gurnoor Singh Brar", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/90572.png"},
    //       {"name": "Ishant Sharma", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/3899.png"},
    //       {"name": "Kulwant Khejroliya", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/67136.png"},
    //       {"name": "Rashid Khan", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65748.png"}
    //     ]
    //   }
    // },
    // {
    //   "PBKS Team": {
    //     "Batters": [
    //       {"name": "Shreyas Iyer", "role": "Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/63961.png"},
    //       {"name": "Nehal Wadhera", "role": "Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/69657.png"},
    //       {"name": "Vishnu Vinod", "role": "WK-Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/64783.png"},
    //       {"name": "Josh Inglis", "role": "WK-Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/65893.png"},
    //       {"name": "Harnoor Pannu", "role": "Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/89196.png"},
    //       {"name": "Pyla Avinash", "role": "Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/81901.png"},
    //       {"name": "Prabhsimran Singh", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/137.png"},
    //       {"name": "Shashank Singh", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/191.png"}
    //     ],
    //     "All Rounders": [
    //       {"name": "Marcus Stoinis", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/4311.png"},
    //       {"name": "Glenn Maxwell", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/10085.png"},
    //       {"name": "Harpreet Brar", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/130.png"},
    //       {"name": "Marco Jansen", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/69409.png"},
    //       {"name": "Azmatullah Omarzai", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/67516.png"},
    //       {"name": "Priyansh Arya", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/71366.png"},
    //       {"name": "Aaron Hardie", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/68072.png"},
    //       {"name": "Musheer Khan", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/94786.png"},
    //       {"name": "Suryansh Shedge", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/71951.png"}
    //     ],
    //     "Bowlers": [
    //       {"name": "Arshdeep Singh", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/125.png"},
    //       {"name": "Yuzvendra Chahal", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/9844.png"},
    //       {"name": "Vyshak Vijaykumar", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/67628.png"},
    //       {"name": "Yash Thakur", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/66819.png"},
    //       {"name": "Lockie Ferguson", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/63719.png"},
    //       {"name": "Kuldeep Sen", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/70402.png"},
    //       {"name": "Xavier Bartlett", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/66516.png"},
    //       {"name": "Pravin Dubey", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/63550.png"}
    //     ]
    //   }
    // },
  
    // {
    //   "CSK Team": {
    //     "Batters": [
    //       {"name": "Ruturaj Gaikwad", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/102.png"},
    //       {"name": "MS Dhoni", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/57.png"},
    //       {"name": "Devon Conway", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/601.png"},
    //       {"name": "Rahul Tripathi", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/188.png"},
    //       {"name": "Shaik Rasheed", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/778.png"},
    //       {"name": "Vansh Bedi", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3558.png"},
    //       {"name": "Andre Siddarth", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3157.png"}
    //     ],
    //     "All Rounders": [
    //       {"name": "Rachin Ravindra", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/724.png"},
    //       {"name": "Ravichandran Ashwin", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/45.png"},
    //       {"name": "Vijay Shankar", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/61.png"},
    //       {"name": "Sam Curran", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/138.png"},
    //       {"name": "Anshul Kamboj", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3106.png"},
    //       {"name": "Deepak Hooda", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/215.png"},
    //       {"name": "Jamie Overton", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1216.png"},
    //       {"name": "Kamlesh Nagarkoti", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/146.png"},
    //       {"name": "Ramakrishna Ghosh", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3559.png"},
    //       {"name": "Ravindra Jadeja", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/46.png"},
    //       {"name": "Shivam Dube", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/211.png"}
    //     ],
    //     "Bowlers": [
    //       {"name": "Khaleel Ahmed", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/8.png"},
    //       {"name": "Noor Ahmad", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/975.png"},
    //       {"name": "Mukesh Choudhary", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/970.png"},
    //       {"name": "Gurjapneet Singh", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/2256.png"},
    //       {"name": "Nathan Ellis", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/633.png"},
    //       {"name": "Shreyas Gopal", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/192.png"},
    //       {"name": "Matheesha Pathirana", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1014.png"}
    //     ]
    //   }
    // },
    // {
    //   "MI Team": {
    //     "Batters": [
    //       {"name": "Rohit Sharma", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/6.png"},
    //       {"name": "Surya Kumar Yadav", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/174.png"},
    //       {"name": "Robin Minz", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3103.png"},
    //       {"name": "Ryan Rickelton", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/743.png"},
    //       {"name": "Shrijith Krishnan", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3570.png"},
    //       {"name": "Bevon Jacobs", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3567.png"},
    //       {"name": "N. Tilak Varma", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/993.png"}
    //     ],
    //     "All Rounders": [
    //       {"name": "Hardik Pandya", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/54.png"},
    //       {"name": "Naman Dhir", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3107.png"},
    //       {"name": "Will Jacks", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1941.png"},
    //       {"name": "Mitchell Santner", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/75.png"},
    //       {"name": "Raj Angad Bawa", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/781.png"},
    //       {"name": "Vignesh Puthur", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3566.png"},
    //       {"name": "Corbin Bosch", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1041.png"}
    //     ],
    //     "Bowlers": [
    //       {"name": "Trent Boult", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/66.png"},
    //       {"name": "Karn Sharma", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/98.png"},
    //       {"name": "Deepak Chahar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/91.png"},
    //       {"name": "Ashwani Kumar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3569.png"},
    //       {"name": "Reece Topley", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/574.png"},
    //       {"name": "V.Satyanarayana Penmetsa", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3568.png"},
    //       {"name": "Arjun Tendulkar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/585.png"},
    //       {"name": "Mujeeb-ur-Rahman", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/134.png"},
    //       {"name": "Jasprit Bumrah", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/9.png"}
    //     ]
    //   }
    // }
  
    
    
//   ]

// export default function BuildTeamPage() {
//   const { matchId } = useParams();
//   const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
//   const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");

//   // Find match details based on matchId (you might want to fetch this from Firestore)
//   useEffect(() => {
//     // This would ideally come from your Firestore data
//     // For now, we'll use hardcoded match details
//     const matchDetails = {
//       "114996": {
//         team1: "Rajasthan Royals",
//         team2: "Kolkata Knight Riders"
//       },
//       // Add other match IDs as needed
//     };

//     if (matchDetails[matchId as string]) {
//       setTeam1(matchDetails[matchId as string].team1);
//       setTeam2(matchDetails[matchId as string].team2);
//     }
//   }, [matchId]);

//   // Get teams data
//   const team1Data = IPL.find(team => team[`${team1.split(' ')[0]} Team`]);
//   const team2Data = IPL.find(team => team[`${team2.split(' ')[0]} Team`]);

//   const togglePlayerSelection = (player: any) => {
//     setSelectedPlayers(prev => {
//       const isSelected = prev.some(p => p.name === player.name);
//       if (isSelected) {
//         return prev.filter(p => p.name !== player.name);
//       } else if (prev.length < 11) {
//         return [...prev, player];
//       }
//       return prev;
//     });
//   };

//   const handleTeamSelect = (team: string) => {
//     setSelectedTeam(team === selectedTeam ? null : team);
//   };

//   const generateAutoTeam = () => {
//     // Simple auto-selection logic based on risk level
//     const allPlayers = [
//       ...(team1Data ? Object.values(team1Data[`${team1.split(' ')[0]} Team`]).flat() : []),
//       ...(team2Data ? Object.values(team2Data[`${team2.split(' ')[0]} Team`]).flat() : [])
//     ];
    
//     // Sort players based on risk level (this is simplified)
//     const sortedPlayers = [...allPlayers].sort((a, b) => {
//       // Higher risk means more aggressive players (simplified logic)
//       return riskLevel > 50 ? Math.random() - 0.5 : 0;
//     });

//     setSelectedPlayers(sortedPlayers.slice(0, 11));
//   };

//   const saveTeam = () => {
//     // Save team to Firestore or your backend
//     console.log("Saving team:", {
//       matchId,
//       players: selectedPlayers,
//       riskLevel
//     });
//     alert("Team saved successfully!");
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-6 text-center">
//         Build Your Team: {team1} vs {team2}
//       </h1>

//       {/* Risk Slider */}
//       <div className="mb-8">
//         <h2 className="text-lg font-semibold mb-2">Risk Level</h2>
//         <div className="flex items-center gap-4">
//           <span className="text-sm">Safe</span>
//           <Slider
//             value={[riskLevel]}
//             onValueChange={([value]) => setRiskLevel(value)}
//             min={0}
//             max={100}
//             step={10}
//             className="w-full max-w-md"
//           />
//           <span className="text-sm">Aggressive</span>
//         </div>
//         <p className="text-sm text-gray-500 mt-1">
//           Current risk level: {riskLevel}% ({riskLevel > 70 ? "High Risk" : riskLevel > 30 ? "Moderate" : "Low Risk"})
//         </p>
//       </div>

//       {/* Team Selection */}
//       <div className="flex gap-4 mb-6">
//         <Button
//           onClick={() => handleTeamSelect(team1)}
//           className={`flex-1 ${selectedTeam === team1 ? "bg-green-600" : "bg-gray-200 text-gray-800"}`}
//         >
//           {team1}
//         </Button>
//         <Button
//           onClick={() => handleTeamSelect(team2)}
//           className={`flex-1 ${selectedTeam === team2 ? "bg-green-600" : "bg-gray-200 text-gray-800"}`}
//         >
//           {team2}
//         </Button>
//         <Button
//           onClick={() => handleTeamSelect("both")}
//           className={`flex-1 ${selectedTeam === "both" ? "bg-green-600" : "bg-gray-200 text-gray-800"}`}
//         >
//           Both Teams
//         </Button>
//       </div>

//       {/* Auto Generate Button */}
//       <div className="flex justify-center mb-6">
//         <Button
//           onClick={generateAutoTeam}
//           className="bg-blue-600 hover:bg-blue-700"
//         >
//           Auto Generate Team
//         </Button>
//       </div>

//       {/* Players Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Batters */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Batters</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && (
//               <>
//                 {selectedTeam !== team2 && team1Data?.[`${team1.split(' ')[0]} Team`]?.Batters?.map((player: any) => (
//                   <PlayerCard
//                     key={`${team1}-${player.name}`}
//                     player={player}
//                     selected={selectedPlayers.some(p => p.name === player.name)}
//                     onClick={() => togglePlayerSelection(player)}
//                     team={team1}
//                   />
//                 ))}
//                 {selectedTeam !== team1 && team2Data?.[`${team2.split(' ')[0]} Team`]?.Batters?.map((player: any) => (
//                   <PlayerCard
//                     key={`${team2}-${player.name}`}
//                     player={player}
//                     selected={selectedPlayers.some(p => p.name === player.name)}
//                     onClick={() => togglePlayerSelection(player)}
//                     team={team2}
//                   />
//                 ))}
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* All Rounders */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">All Rounders</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && (
//               <>
//                 {selectedTeam !== team2 && team1Data?.[`${team1.split(' ')[0]} Team`]?.["All Rounders"]?.map((player: any) => (
//                   <PlayerCard
//                     key={`${team1}-${player.name}`}
//                     player={player}
//                     selected={selectedPlayers.some(p => p.name === player.name)}
//                     onClick={() => togglePlayerSelection(player)}
//                     team={team1}
//                   />
//                 ))}
//                 {selectedTeam !== team1 && team2Data?.[`${team2.split(' ')[0]} Team`]?.["All Rounders"]?.map((player: any) => (
//                   <PlayerCard
//                     key={`${team2}-${player.name}`}
//                     player={player}
//                     selected={selectedPlayers.some(p => p.name === player.name)}
//                     onClick={() => togglePlayerSelection(player)}
//                     team={team2}
//                   />
//                 ))}
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Bowlers */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Bowlers</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && (
//               <>
//                 {selectedTeam !== team2 && team1Data?.[`${team1.split(' ')[0]} Team`]?.Bowlers?.map((player: any) => (
//                   <PlayerCard
//                     key={`${team1}-${player.name}`}
//                     player={player}
//                     selected={selectedPlayers.some(p => p.name === player.name)}
//                     onClick={() => togglePlayerSelection(player)}
//                     team={team1}
//                   />
//                 ))}
//                 {selectedTeam !== team1 && team2Data?.[`${team2.split(' ')[0]} Team`]?.Bowlers?.map((player: any) => (
//                   <PlayerCard
//                     key={`${team2}-${player.name}`}
//                     player={player}
//                     selected={selectedPlayers.some(p => p.name === player.name)}
//                     onClick={() => togglePlayerSelection(player)}
//                     team={team2}
//                   />
//                 ))}
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Selected Players */}
//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">
//           Your Team ({selectedPlayers.length}/11 players)
//         </h2>
//         {selectedPlayers.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {selectedPlayers.map((player) => (
//               <div
//                 key={player.name}
//                 className="border rounded-lg p-3 flex items-center gap-3 hover:bg-gray-100"
//               >
//                 <Image
//                   src={player.image || "/fallback.jpg"}
//                   alt={player.name}
//                   width={40}
//                   height={40}
//                   className="rounded-full"
//                 />
//                 <div>
//                   <p className="font-medium">{player.name}</p>
//                   <p className="text-sm text-gray-500">{player.role}</p>
//                 </div>
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   onClick={() => togglePlayerSelection(player)}
//                   className="ml-auto"
//                 >
//                   Remove
//                 </Button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No players selected yet</p>
//         )}
//       </div>

//       {/* Save Team Button */}
//       <div className="mt-8 flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           {selectedPlayers.length === 11 ? "Save Team" : `Select ${11 - selectedPlayers.length} more players`}
//         </Button>
//       </div>
//     </div>
//   );
// }

// function PlayerCard({ player, selected, onClick, team }: {
//   player: any,
//   selected: boolean,
//   onClick: () => void,
//   team: string
// }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`p-3 border rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
//         selected ? "bg-green-100 border-green-500" : "hover:bg-gray-50"
//       }`}
//     >
//       <Image
//         src={player.image || "/fallback.jpg"}
//         alt={player.name}
//         width={40}
//         height={40}
//         className="rounded-full"
//       />
//       <div className="flex-1">
//         <p className="font-medium">{player.name}</p>
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-500">{player.role}</span>
//           <span className="text-xs bg-gray-200 px-2 py-1 rounded">
//             {team.split(' ')[0]}
//           </span>
//         </div>
//       </div>
//       {selected && (
//         <span className="text-green-500">✓</span>
//       )}
//     </div>
//   );
// }


/// GG

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Button } from "../../../components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { IPL, teamAbbreviations } from "@/data/iplTeams";
// // import { IPL, teamAbbreviations } from "@/data/iplTeams";

// interface Player {
//   name: string;
//   role: string;
//   image: string;
//   team?: string;
// }

// interface TeamData {
//   Batters: Player[];
//   "All Rounders": Player[];
//   Bowlers: Player[];
// }

// interface Match {
//   id: number;
//   team1: string;
//   team2: string;
// }

// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
//   const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch match details from Firestore
//   useEffect(() => {
//     const fetchMatchDetails = async () => {
//       try {
//         const docRef = doc(db, "cricket", "upcomingMatches");
//         const docSnap = await getDoc(docRef);
        
//         if (!docSnap.exists()) {
//           setError("No matches data found in Firestore");
//           return;
//         }
  
//         const data = docSnap.data();
        
//         if (!data.matches || !Array.isArray(data.matches)) {
//           setError("Matches data is not in expected format");
//           return;
//         }
  
//         // Convert matchId from URL to number for comparison
//         const numericMatchId = Number(matchId);
        
//         // Find match where id matches (handling both string and number IDs)
//         const currentMatch = data.matches.find((match: any) =>
//           match.id === numericMatchId || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }
  
//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching match:", err);
//         setError("Failed to load match data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchDetails();
//   }, [matchId]);

//   // Get teams data using abbreviations
//   const team1Abbr = teamAbbreviations[team1];
//   const team2Abbr = teamAbbreviations[team2];
//   const team1Data = team1Abbr ? IPL[team1Abbr] : null;
//   const team2Data = team2Abbr ? IPL[team2Abbr] : null;

//   const togglePlayerSelection = (player: Player) => {
//     setSelectedPlayers(prev => {
//       const isSelected = prev.some(p => p.name === player.name);
//       if (isSelected) {
//         return prev.filter(p => p.name !== player.name);
//       } else if (prev.length < 11) {
//         return [...prev, { ...player, team: player.team || team1Abbr }];
//       }
//       return prev;
//     });
//   };

//   const handleTeamSelect = (team: string) => {
//     setSelectedTeam(team === selectedTeam ? null : team);
//   };

//   const generateAutoTeam = () => {
//     const allPlayers: Player[] = [
//       ...(team1Data ? Object.values(team1Data).flat() : []),
//       ...(team2Data ? Object.values(team2Data).flat() : [])
//     ].filter((player): player is Player => player !== undefined);
    
//     const sortedPlayers = [...allPlayers].sort((a, b) => {
//       return riskLevel > 50 ? Math.random() - 0.5 : 0;
//     });

//     setSelectedPlayers(sortedPlayers.slice(0, 11).map(player => ({
//       ...player,
//       team: player.team || (team1Data && Object.values(team1Data).flat().includes(player) ? team1Abbr : team2Abbr)
//     })));
//   };

//   const saveTeam = () => {
//     console.log("Saving team:", {
//       matchId,
//       players: selectedPlayers,
//       riskLevel
//     });
//     alert("Team saved successfully!");
//   };

//   // Filter players based on selected team and role
//   const getPlayersByRole = (role: keyof TeamData): Player[] => {
//     const players: Player[] = [];
    
//     if ((selectedTeam === team1 || selectedTeam === "both") && team1Data?.[role]) {
//       players.push(...team1Data[role].map(player => ({ ...player, team: team1Abbr })));
//     }
    
//     if ((selectedTeam === team2 || selectedTeam === "both") && team2Data?.[role]) {
//       players.push(...team2Data[role].map(player => ({ ...player, team: team2Abbr })));
//     }
    
//     return players;
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!team1 || !team2) {
//     return <div className="p-4 text-center">Match data not available</div>;
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-6 text-center">
//         Build Your Team: {team1} vs {team2}
//       </h1>

//       {/* Risk Slider */}
//       <div className="mb-8">
//         <h2 className="text-lg font-semibold mb-2">Risk Level</h2>
//         <div className="flex items-center gap-4">
//           <span className="text-sm">Safe</span>
//           <Slider
//             value={[riskLevel]}
//             onValueChange={([value]) => setRiskLevel(value)}
//             min={0}
//             max={100}
//             step={10}
//             className="w-full max-w-md"
//           />
//           <span className="text-sm">Aggressive</span>
//         </div>
//         <p className="text-sm text-gray-500 mt-1">
//           Current risk level: {riskLevel}% ({riskLevel > 70 ? "High Risk" : riskLevel > 30 ? "Moderate" : "Low Risk"})
//         </p>
//       </div>

//       {/* Team Selection */}
//       <div className="flex gap-4 mb-6">
//         <Button
//           onClick={() => handleTeamSelect(team1)}
//           className={`flex-1 ${selectedTeam === team1 ? "bg-green-600" : "bg-gray-200 text-gray-800"}`}
//         >
//           {team1}
//         </Button>
//         <Button
//           onClick={() => handleTeamSelect(team2)}
//           className={`flex-1 ${selectedTeam === team2 ? "bg-green-600" : "bg-gray-200 text-gray-800"}`}
//         >
//           {team2}
//         </Button>
//         <Button
//           onClick={() => handleTeamSelect("both")}
//           className={`flex-1 ${selectedTeam === "both" ? "bg-green-600" : "bg-gray-200 text-gray-800"}`}
//         >
//           Both Teams
//         </Button>
//       </div>

//       {/* Auto Generate Button */}
//       <div className="flex justify-center mb-6">
//         <Button
//           onClick={generateAutoTeam}
//           className="bg-blue-600 hover:bg-blue-700"
//         >
//           Auto Generate Team
//         </Button>
//       </div>

//       {/* Players Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Batters */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Batters</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("Batters").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>

//         {/* All Rounders */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">All Rounders</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("All Rounders").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>

//         {/* Bowlers */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Bowlers</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("Bowlers").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Selected Players */}
//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">
//           Your Team ({selectedPlayers.length}/11 players)
//         </h2>
//         {selectedPlayers.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {selectedPlayers.map((player) => (
//               <div
//                 key={`${player.team}-${player.name}`}
//                 className="border rounded-lg p-3 flex items-center gap-3 hover:bg-gray-100"
//               >
//                 <Image
//                   src={player.image || "/fallback.jpg"}
//                   alt={player.name}
//                   width={40}
//                   height={40}
//                   className="rounded-full"
//                   onError={(e) => {
//                     const target = e.target as HTMLImageElement;
//                     target.src = "/fallback.jpg";
//                   }}
//                 />
//                 <div>
//                   <p className="font-medium">{player.name}</p>
//                   <p className="text-sm text-gray-500">{player.role}</p>
//                 </div>
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   onClick={() => togglePlayerSelection(player)}
//                   className="ml-auto"
//                 >
//                   Remove
//                 </Button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No players selected yet</p>
//         )}
//       </div>

//       {/* Save Team Button */}
//       <div className="mt-8 flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           {selectedPlayers.length === 11 ? "Save Team" : `Select ${11 - selectedPlayers.length} more players`}
//         </Button>
//       </div>
//     </div>
//   );
// }

// function PlayerCard({ player, selected, onClick, team }: {
//   player: Player,
//   selected: boolean,
//   onClick: () => void,
//   team: string
// }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`p-3 border rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
//         selected ? "bg-green-100 border-green-500" : "hover:bg-gray-50"
//       }`}
//     >
//       <Image
//         src={player.image || "/fallback.jpg"}
//         alt={player.name}
//         width={40}
//         height={40}
//         className="rounded-full"
//         onError={(e) => {
//           const target = e.target as HTMLImageElement;
//           target.src = "/fallback.jpg";
//         }}
//       />
//       <div className="flex-1">
//         <p className="font-medium">{player.name}</p>
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-500">{player.role}</span>
//           <span className="text-xs bg-gray-200 px-2 py-1 rounded">
//             {team}
//           </span>
//         </div>
//       </div>
//       {selected && (
//         <span className="text-green-500">✓</span>
//       )}
//     </div>
//   );
// }





// Your IPL data array (keep this exactly as you have it)

// Your IPL data array goes here (keep the same as in your original code)



// interface Player {
//   name: string;
//   role: string;
//   image: string;
//   team?: string;
// }

// interface TeamData {
//   Batters: Player[];
//   "All Rounders": Player[];
//   Bowlers: Player[];
// }

// interface IPLTeams {
//   [key: string]: TeamData;
// }


// const IPL =
//   {
//     KKR: {
//       "Batters": [
//         {"name": "Ajinkya Rahane", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/44.png"},
//         {"name": "Rinku Singh", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/152.png"},
//         {"name": "Quinton de Kock", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/170.png"},
//         {"name": "Rahmanullah Gurbaz", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/641.png"},
//         {"name": "Angkrish Raghuvanshi", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/787.png"},
//         {"name": "Rovman Powell", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/329.png"},
//         {"name": "Manish Pandey", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/16.png"},
//         {"name": "Luvnith Sisodia", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1009.png"}
//       ],
//       "All Rounders": [
//         {"name": "Venkatesh Iyer", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/584.png"},
//         {"name": "Anukul Roy", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/160.png"},
//         {"name": "Moeen Ali", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/206.png"},
//         {"name": "Ramandeep Singh", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/991.png"},
//         {"name": "Andre Russell", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/141.png"},
//         {"name": "Sunil Narine", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/156.png"}
//       ],
//       "Bowlers": [
//         {"name": "Anrich Nortje", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/142.png"},
//         {"name": "Vaibhav Arora", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/583.png"},
//         {"name": "Mayank Markande", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/87.png"},
//         {"name": "Spencer Johnson", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/2518.png"},
//         {"name": "Harshit Rana", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1013.png"},
//         {"name": "Varun Chakaravarthy", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/140.png"},
//         {"name": "Chetan Sakariya", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/592.png"}
//       ]
//     }
//   },


//   {
//     RCB: {
//       "Batters": [
//         {"name": "Rajat Patidar", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/597.png"},
//         {"name": "Virat Kohli", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/2.png"},
//         {"name": "Phil Salt", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1220.png"},
//         {"name": "Jitesh Sharma", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1000.png"},
//         {"name": "Devdutt Padikkal", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/200.png"},
//         {"name": "Swastik Chhikara", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3102.png"}
//       ],
//       "All Rounders": [
//         {"name": "Liam Livingstone", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/183.png"},
//         {"name": "Krunal Pandya", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/17.png"},
//         {"name": "Swapnil Singh", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1483.png"},
//         {"name": "Tim David", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/636.png"},
//         {"name": "Romario Shepherd", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/371.png"},
//         {"name": "Manoj Bhandage", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1485.png"},
//         {"name": "Jacob Bethell", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/869.png"}
//       ],
//       "Bowlers": [
//         {"name": "Josh Hazlewood", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/36.png"},
//         {"name": "Rasikh Dar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/172.png"},
//         {"name": "Suyash Sharma", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1932.png"},
//         {"name": "Bhuvneshwar Kumar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/15.png"},
//         {"name": "Nuwan Thushara", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/813.png"},
//         {"name": "Lungisani Ngidi", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/99.png"},
//         {"name": "Abhinandan Singh", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3574.png"},
//         {"name": "Mohit Rathee", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1935.png"},
//         {"name": "Yash Dayal", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/978.png"}
//       ]
//     }
//   },

//   {
//     SRH: {
//       "Batters": [
//         {"name": "Ishan Kishan", "role": "WK-Batter", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee42c88ec80.07161393kus9q7ew.png"},
//         {"name": "Atharva Taide", "role": "Batter", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee13fa47017.25507614btem91fd.png"},
//         {"name": "Abhinav Manohar", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/974.png"},
//         {"name": "Aniket Verma", "role": "Batter", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee157dee754.27943533bf)xod(j.png"},
//         {"name": "Sachin Baby", "role": "Batter", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee16ca75159.77560477un$4jtey.png"},
//         {"name": "Heinrich Klaasen", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/202.png"},
//         {"name": "Travis Head", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/37.png"}
//       ],
//       "All Rounders": [
//         {"name": "Harshal Patel", "role": "All-Rounder", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee00907b481.96254448m$okwnzl.png"},
//         {"name": "Kamindu Mendis", "role": "All-Rounder", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee115a18f24.67736995p594$x1k.png"},
//         {"name": "Wiaan Mulder", "role": "All-Rounder", "image": "https://d13ir53smqqeyp.cloudfront.net/player-images/opta-cricket/9243.png"},
//         {"name": "Abhishek Sharma", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/212.png"},
//         {"name": "Nitish Kumar Reddy", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1944.png"},
//         {"name": "Brydon Carse", "role": "All-Rounder", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee183405e96.7501842024xmewjp.png"}
//       ],
//       "Bowlers": [
//         {"name": "Pat Cummins", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/33.png"},
//         {"name": "Mohammad Shami", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee416b7ea12.405426875d8int1x.png"},
//         {"name": "Rahul Chahar", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee0e62ee861.711889401ylc$u0i.png"},
//         {"name": "Adam Zampa", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee0d97e50b3.853559074zn$0hvm.png"},
//         {"name": "Simarjeet Singh", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee0fe73db37.24811874ekj9)nq8.png"},
//         {"name": "Zeeshan Ansari", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee1327dbd11.533483987m4zwbe5.png"},
//         {"name": "Jaydev Unadkat", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-65fefdfbcd3c05.33790781o8)mzsc3.png"},
//         {"name": "Eshan Malinga", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee12606d642.560857045p4hcq1g.png"}
//       ]
//     }
//   },



//   {
//     RR: {
//       "Batters": [
//         { "name": "Sanju Samson", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/190.png" },
//         { "name": "Shubham Dubey", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/3112.png" },
//         { "name": "Vaibhav Suryavanshi", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1540.png" },
//         { "name": "Kunal Rathore", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1540.png" },
//         { "name": "Shimron Hetmyer", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/210.png" },
//         { "name": "Yashasvi Jaiswal", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/533.png" },
//         { "name": "Dhruv Jurel", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1004.png" },
//         { "name": "Riyan Parag", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/189.png" }
//       ],
//       "All Rounders": [
//         { "name": "Nitish Rana", "role": "All-Rounder", "image": "https://www.rajasthanroyals.com/static-assets/images/players/63649.png" },
//         { "name": "Yudhvir Singh", "role": "All-Rounder", "image": "https://www.rajasthanroyals.com/static-assets/images/players/74054.png" },
//         { "name": "Vaibhav Suryavanshi", "role": "All-Rounder", "image": "https://www.rajasthanroyals.com/static-assets/images/players/114349.png" }
//       ],
//       "Bowlers": [
//         { "name": "Jofra Archer", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/64254.png" },
//         { "name": "Maheesh Theekshana", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/69274.png" },
//         { "name": "Wanindu Hasaranga", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/65027.png" },
//         { "name": "Akash Madhwal", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/74055.png" },
//         { "name": "Kumar Kartikeya Singh", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/70191.png" },
//         { "name": "Tushar Deshpande", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/65478.png" },
//         { "name": "Fazalhaq Farooqi", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/67927.png" },
//         { "name": "Kwena Maphaka", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/90908.png" },
//         { "name": "Ashok Sharma", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/91316.png" },
//         { "name": "Sandeep Sharma", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/220.png" }
//       ]
//     }
//   },

//   {
//     LSG: {
//       "Batters": [
//         {"name": "Rishabh Pant", "role": "WK-Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/65756.png"},
//         {"name": "David Miller", "role": "Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/5313.png"},
//         {"name": "Aiden Markram", "role": "Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/64219.png"},
//         {"name": "Aryan Juyal", "role": "WK-Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/68003.png"},
//         {"name": "Himmat Singh", "role": "Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/65152.png"},
//         {"name": "Matthew Breetzke", "role": "Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/65618.png"},
//         {"name": "Nicholas Pooran", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/136.png"}
//       ],
//       "All Rounders": [
//         {"name": "Mitchell Marsh", "role": "All-Rounder", "image": ""},
//         {"name": "Abdul Samad", "role": "All-Rounder", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/71260.png"},
//         {"name": "Shahbaz Ahamad", "role": "All-Rounder", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/58223.png"},
//         {"name": "Yuvraj Chaudhary", "role": "All-Rounder", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/71367.png"},
//         {"name": "Rajvardhan Hangargekar", "role": "All-Rounder", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/71152.png"},
//         {"name": "Arshin Kulkarni", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/2788.png"},
//         {"name": "Ayush Badoni", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/985.png"}
//       ],
//       "Bowlers": [
//         {"name": "Avesh Khan", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2023/109.png"},
//         {"name": "Akash Deep", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/71447.png"},
//         {"name": "M. Siddharth", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/532.png"},
//         {"name": "Digvesh Singh", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/100574.png"},
//         {"name": "Akash Singh", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/70376.png"},
//         {"name": "Shamar Joseph", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/101907.png"},
//         {"name": "Prince Yadav", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/100570.png"},
//         {"name": "Mayank Yadav", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/987.png"},
//         {"name": "Mohsin Khan", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/541.png"},
//         {"name": "Ravi Bishnoi", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/520.png"}
//       ]
//     }
//   },
//   {
//     DC: {
//       "Batters": [
//         {"name": "KL Rahul", "role": "WK-Batter", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/60122.png"},
//         {"name": "Jake Fraser-McGurk", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/3115.png"},
//         {"name": "Karun Nair", "role": "Batter", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/62297.png"},
//         {"name": "Faf du Plessis", "role": "Batter", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/28891.png"},
//         {"name": "Donovan Ferreira", "role": "WK-Batter", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/23487.png"},
//         {"name": "Abishek Porel", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1580.png"},
//         {"name": "Tristan Stubbs", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1017.png"}
//       ],
//       "All Rounders": [
//         {"name": "Axar Patel", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/110.png"},
//         {"name": "Sameer Rizvi", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/71376.png"},
//         {"name": "Ashutosh Sharma", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/68176.png"},
//         {"name": "Darshan Nalkande", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/67489.png"},
//         {"name": "Vipraj Nigam", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/88677.png"},
//         {"name": "Ajay Mandal", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/66558.png"},
//         {"name": "Manvanth Kumar", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/98477.png"},
//         {"name": "Tripurana Vijay", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/90635.png"},
//         {"name": "Madhav Tiwari", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/124649.png"}
//       ],
//       "Bowlers": [
//         {"name": "Mitchell Starc", "role": "Bowler", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/10053.png"},
//         {"name": "T. Natarajan", "role": "Bowler", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/65160.png"},
//         {"name": "Mohit Sharma", "role": "Bowler", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/63341.png"},
//         {"name": "Mukesh Kumar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1462.png"},
//         {"name": "Dushmantha Chameera", "role": "Bowler", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/58065.png"},
//         {"name": "Kuldeep Yadav", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/14.png"}
//       ]
//     }
//   },

//   {
//     GT: {
//       "Batters": [
//         {"name": "Shubman Gill", "role": "Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/66818.png"},
//         {"name": "Jos Buttler", "role": "WK-Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/9782.png"},
//         {"name": "Kumar Kushagra", "role": "WK-Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/74097.png"},
//         {"name": "Anuj Rawat", "role": "WK-Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/67752.png"},
//         {"name": "Sherfane Rutherford", "role": "Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/67285.png"},
//         {"name": "Shahrukh Khan", "role": "Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/64721.png"},
//         {"name": "Glenn Phillips", "role": "Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65295.png"}
//       ],
//       "All Rounders": [
//         {"name": "Nishant Sindhu", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/88873.png"},
//         {"name": "Mahipal Lomror", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65432.png"},
//         {"name": "Washington Sundar", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65859.png"},
//         {"name": "Mohd. Arshad Khan", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/82839.png"},
//         {"name": "Sai Kishore", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/66438.png"},
//         {"name": "Jayant Yadav", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/59611.png"},
//         {"name": "Karim Janat", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65875.png"},
//         {"name": "Sai Sudharsan", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/69500.png"},
//         {"name": "Rahul Tewatia", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/64440.png"}
//       ],
//       "Bowlers": [
//         {"name": "Kagiso Rabada", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/63611.png"},
//         {"name": "Mohammed Siraj", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65799.png"},
//         {"name": "Prasidh Krishna", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65702.png"},
//         {"name": "Manav Suthar", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/71149.png"},
//         {"name": "Gerald Coetzee", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/67443.png"},
//         {"name": "Gurnoor Singh Brar", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/90572.png"},
//         {"name": "Ishant Sharma", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/3899.png"},
//         {"name": "Kulwant Khejroliya", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/67136.png"},
//         {"name": "Rashid Khan", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65748.png"}
//       ]
//     }
//   },
//   {
//     PBKS: {
//       "Batters": [
//         {"name": "Shreyas Iyer", "role": "Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/63961.png"},
//         {"name": "Nehal Wadhera", "role": "Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/69657.png"},
//         {"name": "Vishnu Vinod", "role": "WK-Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/64783.png"},
//         {"name": "Josh Inglis", "role": "WK-Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/65893.png"},
//         {"name": "Harnoor Pannu", "role": "Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/89196.png"},
//         {"name": "Pyla Avinash", "role": "Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/81901.png"},
//         {"name": "Prabhsimran Singh", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/137.png"},
//         {"name": "Shashank Singh", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/191.png"}
//       ],
//       "All Rounders": [
//         {"name": "Marcus Stoinis", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/4311.png"},
//         {"name": "Glenn Maxwell", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/10085.png"},
//         {"name": "Harpreet Brar", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/130.png"},
//         {"name": "Marco Jansen", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/69409.png"},
//         {"name": "Azmatullah Omarzai", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/67516.png"},
//         {"name": "Priyansh Arya", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/71366.png"},
//         {"name": "Aaron Hardie", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/68072.png"},
//         {"name": "Musheer Khan", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/94786.png"},
//         {"name": "Suryansh Shedge", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/71951.png"}
//       ],
//       "Bowlers": [
//         {"name": "Arshdeep Singh", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/125.png"},
//         {"name": "Yuzvendra Chahal", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/9844.png"},
//         {"name": "Vyshak Vijaykumar", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/67628.png"},
//         {"name": "Yash Thakur", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/66819.png"},
//         {"name": "Lockie Ferguson", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/63719.png"},
//         {"name": "Kuldeep Sen", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/70402.png"},
//         {"name": "Xavier Bartlett", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/66516.png"},
//         {"name": "Pravin Dubey", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/63550.png"}
//       ]
//     }
//   },

//   {
//     CSK: {
//       "Batters": [
//         {"name": "Ruturaj Gaikwad", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/102.png"},
//         {"name": "MS Dhoni", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/57.png"},
//         {"name": "Devon Conway", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/601.png"},
//         {"name": "Rahul Tripathi", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/188.png"},
//         {"name": "Shaik Rasheed", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/778.png"},
//         {"name": "Vansh Bedi", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3558.png"},
//         {"name": "Andre Siddarth", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3157.png"}
//       ],
//       "All Rounders": [
//         {"name": "Rachin Ravindra", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/724.png"},
//         {"name": "Ravichandran Ashwin", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/45.png"},
//         {"name": "Vijay Shankar", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/61.png"},
//         {"name": "Sam Curran", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/138.png"},
//         {"name": "Anshul Kamboj", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3106.png"},
//         {"name": "Deepak Hooda", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/215.png"},
//         {"name": "Jamie Overton", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1216.png"},
//         {"name": "Kamlesh Nagarkoti", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/146.png"},
//         {"name": "Ramakrishna Ghosh", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3559.png"},
//         {"name": "Ravindra Jadeja", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/46.png"},
//         {"name": "Shivam Dube", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/211.png"}
//       ],
//       "Bowlers": [
//         {"name": "Khaleel Ahmed", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/8.png"},
//         {"name": "Noor Ahmad", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/975.png"},
//         {"name": "Mukesh Choudhary", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/970.png"},
//         {"name": "Gurjapneet Singh", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/2256.png"},
//         {"name": "Nathan Ellis", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/633.png"},
//         {"name": "Shreyas Gopal", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/192.png"},
//         {"name": "Matheesha Pathirana", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1014.png"}
//       ]
//     }
//   },
//   {
//     MI: {
//       "Batters": [
//         {"name": "Rohit Sharma", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/6.png"},
//         {"name": "Surya Kumar Yadav", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/174.png"},
//         {"name": "Robin Minz", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3103.png"},
//         {"name": "Ryan Rickelton", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/743.png"},
//         {"name": "Shrijith Krishnan", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3570.png"},
//         {"name": "Bevon Jacobs", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3567.png"},
//         {"name": "N. Tilak Varma", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/993.png"}
//       ],
//       "All Rounders": [
//         {"name": "Hardik Pandya", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/54.png"},
//         {"name": "Naman Dhir", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3107.png"},
//         {"name": "Will Jacks", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1941.png"},
//         {"name": "Mitchell Santner", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/75.png"},
//         {"name": "Raj Angad Bawa", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/781.png"},
//         {"name": "Vignesh Puthur", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3566.png"},
//         {"name": "Corbin Bosch", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1041.png"}
//       ],
//       "Bowlers": [
//         {"name": "Trent Boult", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/66.png"},
//         {"name": "Karn Sharma", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/98.png"},
//         {"name": "Deepak Chahar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/91.png"},
//         {"name": "Ashwani Kumar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3569.png"},
//         {"name": "Reece Topley", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/574.png"},
//         {"name": "V.Satyanarayana Penmetsa", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3568.png"},
//         {"name": "Arjun Tendulkar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/585.png"},
//         {"name": "Mujeeb-ur-Rahman", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/134.png"},
//         {"name": "Jasprit Bumrah", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/9.png"}
//       ]
//     }
//   }











// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";

// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { IPL, teamAbbreviations } from "@/data/iplTeams";
// import { Button } from "../../../components/ui/button";

// interface Player {
//   name: string;
//   role: string;
//   image: string;
//   team?: string;
// }

// interface TeamData {
//   Batters: Player[];
//   "All Rounders": Player[];
//   Bowlers: Player[];
// }

// interface Match {
//   id: number;
//   team1: string;
//   team2: string;
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     if (risk === 0) return { rank: "3,590,001", prize: "49 Rs" };
//     if (risk <= 10) return { rank: "1,798,400", prize: "55 Rs" };
//     if (risk <= 20) return { rank: "359,000", prize: "100 Rs" };
//     if (risk <= 30) return { rank: "301,000", prize: "1,000 Rs" };
//     if (risk <= 40) return { rank: "251,000", prize: "1,500 Rs" };
//     if (risk <= 50) return { rank: "201,000", prize: "2,000 Rs" };
//     if (risk <= 60) return { rank: "151,000", prize: "2,500 Rs" };
//     if (risk <= 70) return { rank: "101,000", prize: "3,000 Rs" };
//     if (risk <= 80) return { rank: "21", prize: "9,000 Rs" };
//     if (risk <= 85) return { rank: "13", prize: "20,000 Rs" };
//     if (risk <= 90) return { rank: "12", prize: "25,000 Rs" };
//     if (risk <= 92) return { rank: "11", prize: "50,000 Rs" };
//     if (risk <= 94) return { rank: "10", prize: "1,00,000 Rs" };
//     if (risk <= 96) return { rank: "8", prize: "1,50,000 Rs" };
//     if (risk <= 98) return { rank: "6", prize: "20,00,000 Rs" };
//     if (risk <= 99) return { rank: "5", prize: "20,00,000 Rs" };
//     if (risk === 100) return { rank: "1", prize: "3 Crore Rs" };
//     return { rank: "1", prize: "3 Crore Rs" };
//   };

//   const getSliderColor = (risk: number) => {
//     if (risk <= 20) return "#22c55e"; // Bright green for low risk
//     if (risk <= 50) return "#fbbf24"; // Yellow for moderate risk
//     if (risk <= 80) return "#f97316"; // Orange for high risk
//     return "#dc2626"; // Dark red for very high risk
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-sm">
//       <h2 className="text-lg font-semibold mb-4 text-center">Team Risk Level</h2>
      
//       <div className="flex justify-between mb-4">
//         <div className="text-center px-4 py-2 bg-green-50 rounded-lg">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
      
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={0}
//         max={100}
//         step={1}
//         className="w-full [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
//         style={{
//           '--slider-track-color': '#e5e7eb',
//           '--slider-range-color': getSliderColor(value),
//         } as React.CSSProperties}
//       />
      
//       <div className="flex justify-between mt-2 px-2">
//         <span className="text-sm text-gray-500">Safe</span>
//         <span className="text-sm font-medium px-2 py-1 bg-gray-800 rounded">
//           Risk: {value}%
//         </span>
//         <span className="text-sm text-gray-500">Aggressive</span>
//       </div>
//     </div>
//   );
// };

// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
//   const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchMatchDetails = async () => {
//       try {
//         const docRef = doc(db, "cricket", "upcomingMatches");
//         const docSnap = await getDoc(docRef);
        
//         if (!docSnap.exists()) {
//           setError("No matches data found in Firestore");
//           return;
//         }
  
//         const data = docSnap.data();
        
//         if (!data.matches || !Array.isArray(data.matches)) {
//           setError("Matches data is not in expected format");
//           return;
//         }
  
//         const numericMatchId = Number(matchId);
//         const currentMatch = data.matches.find((match: any) =>
//           match.id === numericMatchId || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }
  
//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching match:", err);
//         setError("Failed to load match data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchDetails();
//   }, [matchId]);

//   const team1Abbr = teamAbbreviations[team1];
//   const team2Abbr = teamAbbreviations[team2];
//   const team1Data = team1Abbr ? IPL[team1Abbr] : null;
//   const team2Data = team2Abbr ? IPL[team2Abbr] : null;

//   const togglePlayerSelection = (player: Player) => {
//     setSelectedPlayers(prev => {
//       const isSelected = prev.some(p => p.name === player.name);
//       if (isSelected) {
//         return prev.filter(p => p.name !== player.name);
//       } else if (prev.length < 11) {
//         return [...prev, { ...player, team: player.team || team1Abbr }];
//       }
//       return prev;
//     });
//   };

//   const handleTeamSelect = (team: string) => {
//     setSelectedTeam(team === selectedTeam ? null : team);
//   };

//   const generateAutoTeam = () => {
//     const allPlayers: Player[] = [
//       ...(team1Data ? Object.values(team1Data).flat() : []),
//       ...(team2Data ? Object.values(team2Data).flat() : [])
//     ].filter((player): player is Player => player !== undefined);
    
//     const sortedPlayers = [...allPlayers].sort((a, b) => {
//       return riskLevel > 50 ? Math.random() - 0.5 : 0;
//     });

//     setSelectedPlayers(sortedPlayers.slice(0, 11).map(player => ({
//       ...player,
//       team: player.team || (team1Data && Object.values(team1Data).flat().includes(player) ? team1Abbr : team2Abbr)
//     })));
//   };

//   const saveTeam = () => {
//     console.log("Saving team:", {
//       matchId,
//       players: selectedPlayers,
//       riskLevel
//     });
//     alert("Team saved successfully!");
//   };

//   const getPlayersByRole = (role: keyof TeamData): Player[] => {
//     const players: Player[] = [];
    
//     if ((selectedTeam === team1 || selectedTeam === "both") && team1Data?.[role]) {
//       players.push(...team1Data[role].map(player => ({ ...player, team: team1Abbr })));
//     }
    
//     if ((selectedTeam === team2 || selectedTeam === "both") && team2Data?.[role]) {
//       players.push(...team2Data[role].map(player => ({ ...player, team: team2Abbr })));
//     }
    
//     return players;
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!team1 || !team2) {
//     return <div className="p-4 text-center">Match data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-center">
//         Build Your Team: {team1} vs {team2}
//       </h1>

//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />

//       <div className="flex gap-4 mb-6">
//         <Button
//           onClick={() => handleTeamSelect(team1)}
//           variant={selectedTeam === team1 ? "default" : "outline"}
//           className="flex-1"
//         >
//           {team1}
//         </Button>
//         <Button
//           onClick={() => handleTeamSelect(team2)}
//           variant={selectedTeam === team2 ? "default" : "outline"}
//           className="flex-1"
//         >
//           {team2}
//         </Button>
//         <Button
//           onClick={() => handleTeamSelect("both")}
//           variant={selectedTeam === "both" ? "default" : "outline"}
//           className="flex-1"
//         >
//           Both Teams
//         </Button>
//       </div>

//       <div className="flex justify-center mb-6">
//         <Button
//           onClick={generateAutoTeam}
//           className="bg-blue-600 hover:bg-blue-700"
//         >
//           Auto Generate Team
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Batters</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("Batters").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">All Rounders</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("All Rounders").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Bowlers</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("Bowlers").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>
//       </div>

//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">
//           Your Team ({selectedPlayers.length}/11 players)
//         </h2>
//         {selectedPlayers.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {selectedPlayers.map((player) => (
//               <div
//                 key={`${player.team}-${player.name}`}
//                 className="border rounded-lg p-3 flex items-center gap-3 hover:bg-gray-100"
//               >
//                 <Image
//                   src={player.image || "/fallback.jpg"}
//                   alt={player.name}
//                   width={40}
//                   height={40}
//                   className="rounded-full"
//                   onError={(e) => {
//                     const target = e.target as HTMLImageElement;
//                     target.src = "/fallback.jpg";
//                   }}
//                 />
//                 <div>
//                   <p className="font-medium">{player.name}</p>
//                   <p className="text-sm text-gray-500">{player.role}</p>
//                 </div>
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   onClick={() => togglePlayerSelection(player)}
//                   className="ml-auto"
//                 >
//                   Remove
//                 </Button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No players selected yet</p>
//         )}
//       </div>

//       <div className="mt-8 flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           {selectedPlayers.length === 11 ? "Save Team" : `Select ${11 - selectedPlayers.length} more players`}
//         </Button>
//       </div>
//     </div>
//   );
// }

// function PlayerCard({ player, selected, onClick, team }: {
//   player: Player,
//   selected: boolean,
//   onClick: () => void,
//   team: string
// }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`p-3 border rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
//         selected ? "bg-green-100 border-green-500" : "hover:bg-gray-50"
//       }`}
//     >
//       <Image
//         src={player.image || "/fallback.jpg"}
//         alt={player.name}
//         width={40}
//         height={40}
//         className="rounded-full"
//         onError={(e) => {
//           const target = e.target as HTMLImageElement;
//           target.src = "/fallback.jpg";
//         }}
//       />
//       <div className="flex-1">
//         <p className="font-medium">{player.name}</p>
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-500">{player.role}</span>
//           <span className="text-xs bg-gray-200 px-2 py-1 rounded">
//             {team}
//           </span>
//         </div>
//       </div>
//       {selected && (
//         <span className="text-green-500">✓</span>
//       )}
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Button } from "../../../components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { IPL, teamAbbreviations } from "@/data/iplTeams";

// interface Player {
//   name: string;
//   role: string;
//   image: string;
//   team?: string;
// }

// interface TeamData {
//   Batters: Player[];
//   "All Rounders": Player[];
//   Bowlers: Player[];
//   "Playing XI"?: Player[];
// }

// interface Match {
//   id: number;
//   team1: string;
//   team2: string;
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     if (risk === 0) return { rank: "3,590,001", prize: "49 Rs" };
//     if (risk <= 10) return { rank: "1,798,400", prize: "55 Rs" };
//     if (risk <= 20) return { rank: "359,000", prize: "100 Rs" };
//     if (risk <= 30) return { rank: "301,000", prize: "1,000 Rs" };
//     if (risk <= 40) return { rank: "251,000", prize: "1,500 Rs" };
//     if (risk <= 50) return { rank: "201,000", prize: "2,000 Rs" };
//     if (risk <= 60) return { rank: "151,000", prize: "2,500 Rs" };
//     if (risk <= 70) return { rank: "101,000", prize: "3,000 Rs" };
//     if (risk <= 80) return { rank: "21", prize: "9,000 Rs" };
//     if (risk <= 85) return { rank: "13", prize: "20,000 Rs" };
//     if (risk <= 90) return { rank: "12", prize: "25,000 Rs" };
//     if (risk <= 92) return { rank: "11", prize: "50,000 Rs" };
//     if (risk <= 94) return { rank: "10", prize: "1,00,000 Rs" };
//     if (risk <= 96) return { rank: "8", prize: "1,50,000 Rs" };
//     if (risk <= 98) return { rank: "6", prize: "2,00,000 Rs" };
//     if (risk <= 99) return { rank: "5", prize: "2,00,000 Rs" };
//     if (risk === 100) return { rank: "1", prize: "3 Crore Rs" };
//     return { rank: "1", prize: "3 Crore Rs" };
//   };

//   const getSliderColor = (risk: number) => {
//     if (risk <= 20) return "#22c55e";
//     if (risk <= 50) return "#fbbf24";
//     if (risk <= 80) return "#f97316";
//     return "#dc2626";
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-sm">
//       <h2 className="text-lg font-semibold mb-4 text-center">Team Risk Level</h2>
//       <div className="flex justify-between mb-4">
//         <div className="text-center px-4 py-2 bg-green-50 rounded-lg">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={0}
//         max={100}
//         step={1}
//         className="w-full [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
//         style={{
//           '--slider-track-color': '#e5e7eb',
//           '--slider-range-color': getSliderColor(value),
//         } as React.CSSProperties}
//       />
//       <div className="flex justify-between mt-2 px-2">
//         <span className="text-sm text-gray-500">Safe</span>
//         <span className="text-sm font-medium px-2 py-1 bg-gray-800 rounded">
//           Risk: {value}%
//         </span>
//         <span className="text-sm text-gray-500">Aggressive</span>
//       </div>
//     </div>
//   );
// };

// const TeamSlider = ({ onChange }: { onChange: (value: number) => void }) => {
//   const [numTeams, setNumTeams] = useState(1);

//   const handleSliderChange = (value: number) => {
//     setNumTeams(value);
//     onChange(value);
//   };

//   const getTeamLabel = (teams: number) => {
//     if (teams === 20) return "20 Team Select";
//     if (teams === 40) return "40 Team Best Friend";
//     if (teams === 60) return "60 Team 3 Bros";
//     if (teams === 80) return "80 Team Quonta Friend";
//     if (teams === 100) return "100 Team 5 Group of Genius";
//     return null;
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-sm">
//       <h2 className="text-lg font-semibold mb-4 text-center">Number of Teams</h2>
//       <Slider
//         value={[numTeams]}
//         onValueChange={([val]) => handleSliderChange(val)}
//         min={1}
//         max={100}
//         step={1}
//         className="w-full"
//       />
//       <div className="flex justify-between mt-2">
//         <span className="text-sm text-gray-500">1</span>
//         <span className="text-sm font-medium">{numTeams} Teams</span>
//         <span className="text-sm text-gray-500">100</span>
//       </div>
//       <div className="grid grid-cols-5 gap-2 mt-4 text-xs text-center">
//         {[20, 40, 60, 80, 100].map((count) => (
//           <div key={count} className="p-1 bg-gray-100 rounded">
//             {getTeamLabel(count)}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
//   const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<any[][]>([]);
//   const [showFullTeam, setShowFullTeam] = useState<boolean[]>([]);

//   useEffect(() => {
//     const fetchMatchDetails = async () => {
//       try {
//         const docRef = doc(db, "cricket", "upcomingMatches");
//         const docSnap = await getDoc(docRef);
        
//         if (!docSnap.exists()) {
//           setError("No matches data found in Firestore");
//           return;
//         }
  
//         const data = docSnap.data();
        
//         if (!data.matches || !Array.isArray(data.matches)) {
//           setError("Matches data is not in expected format");
//           return;
//         }
  
//         const numericMatchId = Number(matchId);
//         const currentMatch = data.matches.find((match: any) =>
//           match.id === numericMatchId || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }
  
//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching match:", err);
//         setError("Failed to load match data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchDetails();
//   }, [matchId]);

//   const team1Abbr = teamAbbreviations[team1];
//   const team2Abbr = teamAbbreviations[team2];
//   const team1Data = team1Abbr ? IPL[team1Abbr] : null;
//   const team2Data = team2Abbr ? IPL[team2Abbr] : null;

//   const togglePlayerSelection = (player: Player) => {
//     setSelectedPlayers(prev => {
//       const isSelected = prev.some(p => p.name === player.name);
//       if (isSelected) {
//         return prev.filter(p => p.name !== player.name);
//       } else if (prev.length < 11) {
//         return [...prev, { ...player, team: player.team || team1Abbr }];
//       }
//       return prev;
//     });
//   };

//   const handleTeamSelect = (team: string) => {
//     setSelectedTeam(team === selectedTeam ? null : team);
//   };

//   const generateRandomTeams = () => {
//     if (!team1Data || !team2Data) return [];
    
//     const team1Players = [...(team1Data["Batters"] || []), ...(team1Data["All Rounders"] || []), ...(team1Data["Bowlers"] || [])];
//     const team2Players = [...(team2Data["Batters"] || []), ...(team2Data["All Rounders"] || []), ...(team2Data["Bowlers"] || [])];
    
//     const shuffledTeam1 = [...team1Players].sort(() => Math.random() - 0.5);
//     const shuffledTeam2 = [...team2Players].sort(() => Math.random() - 0.5);

//     // Ensure at least one wicketkeeper
//     const team1Wicketkeeper = shuffledTeam1.find((player) => player.role.includes("WK"));
//     const team2Wicketkeeper = shuffledTeam2.find((player) => player.role.includes("WK"));

//     const team1Selection = shuffledTeam1.slice(0, 6);
//     const team2Selection = shuffledTeam2.slice(0, 5);

//     // Ensure at least one wicketkeeper in the combined team
//     const combinedTeam = [...team1Selection, ...team2Selection];
//     if (!combinedTeam.some((player) => player.role.includes("WK"))) {
//       if (team1Wicketkeeper) combinedTeam.push(team1Wicketkeeper);
//       else if (team2Wicketkeeper) combinedTeam.push(team2Wicketkeeper);
//     }

//     return combinedTeam.sort(() => Math.random() - 0.5).slice(0, 11);
//   };

//   const generateMultipleTeams = () => {
//     const newTeams = Array.from({ length: numTeams }, () => generateRandomTeams());
//     setGeneratedTeams(prev => [...prev, ...newTeams]);
//     setShowFullTeam(new Array(newTeams.length).fill(false));
//   };

//   const predictCaptainAndViceCaptain = (team: Player[]) => {
//     const battersAndAllRounders = team.filter(
//       (player) => player.role.includes("Batter") || player.role.includes("All-Rounder")
//     );
//     const sortedPlayers = [...battersAndAllRounders].sort(() => Math.random() - 0.5);
//     return {
//       captain: sortedPlayers[0],
//       viceCaptain: sortedPlayers[1]
//     };
//   };

//   const countPlayersByRole = (team: Player[]) => {
//     return {
//       WK: team.filter((player) => player.role.includes("WK")).length,
//       BAT: team.filter((player) => player.role.includes("Batter")).length,
//       AR: team.filter((player) => player.role.includes("All-Rounder")).length,
//       BOWL: team.filter((player) => player.role.includes("Bowler")).length,
//     };
//   };

//   const toggleFullTeam = (index: number) => {
//     setShowFullTeam(prev => {
//       const newState = [...prev];
//       newState[index] = !newState[index];
//       return newState;
//     });
//   };

//   const saveTeam = () => {
//     console.log("Saving team:", {
//       matchId,
//       players: selectedPlayers,
//       riskLevel
//     });
//     alert("Team saved successfully!");
//   };

//   const getPlayersByRole = (role: keyof TeamData): Player[] => {
//     const players: Player[] = [];
    
//     if ((selectedTeam === team1 || selectedTeam === "both") && team1Data?.[role]) {
//       players.push(...team1Data[role].map(player => ({ ...player, team: team1Abbr })));
//     }
    
//     if ((selectedTeam === team2 || selectedTeam === "both") && team2Data?.[role]) {
//       players.push(...team2Data[role].map(player => ({ ...player, team: team2Abbr })));
//     }
    
//     return players;
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!team1 || !team2) {
//     return <div className="p-4 text-center">Match data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-center">
//         Build Your Team: {team1} vs {team2}
//       </h1>

//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />

//       <TeamSlider onChange={setNumTeams} />

//       <div className="flex gap-4 mb-6">
//         <Button
//           onClick={() => handleTeamSelect(team1)}
//           variant={selectedTeam === team1 ? "default" : "outline"}
//           className="flex-1"
//         >
//           {team1}
//         </Button>
//         <Button
//           onClick={() => handleTeamSelect(team2)}
//           variant={selectedTeam === team2 ? "default" : "outline"}
//           className="flex-1"
//         >
//           {team2}
//         </Button>
//         <Button
//           onClick={() => handleTeamSelect("both")}
//           variant={selectedTeam === "both" ? "default" : "outline"}
//           className="flex-1"
//         >
//           Both Teams
//         </Button>
//       </div>

//       <div className="flex justify-center gap-4 mb-6">
//         <Button
//           onClick={generateMultipleTeams}
//           className="bg-blue-600 hover:bg-blue-700"
//         >
//           Generate Random Teams
//         </Button>
//         <Button
//           onClick={() => {
//             const team = generateRandomTeams();
//             setSelectedPlayers(team);
//           }}
//           className="bg-green-600 hover:bg-green-700"
//         >
//           Auto Generate My Team
//         </Button>
//       </div>

//       {/* Generated Teams Section */}
//       {generatedTeams.length > 0 && (
//         <div className="mb-8">
//           <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {generatedTeams.map((team, index) => {
//               const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//               const roleCounts = countPlayersByRole(team);

//               return (
//                 <Card key={index}>
//                   <CardHeader>
//                     <CardTitle className="text-center">Team {index + 1}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex justify-between mb-4">
//                       <div>
//                         <span className="font-medium">Captain: </span>
//                         <span>{captain?.name}</span>
//                       </div>
//                       <div>
//                         <span className="font-medium">Vice Captain: </span>
//                         <span>{viceCaptain?.name}</span>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//                       <div className="bg-gray-100 p-2 rounded text-center">
//                         <div className="font-bold">{roleCounts.WK}</div>
//                         <div>WK</div>
//                       </div>
//                       <div className="bg-gray-100 p-2 rounded text-center">
//                         <div className="font-bold">{roleCounts.BAT}</div>
//                         <div>BAT</div>
//                       </div>
//                       <div className="bg-gray-100 p-2 rounded text-center">
//                         <div className="font-bold">{roleCounts.AR}</div>
//                         <div>AR</div>
//                       </div>
//                       <div className="bg-gray-100 p-2 rounded text-center">
//                         <div className="font-bold">{roleCounts.BOWL}</div>
//                         <div>BOWL</div>
//                       </div>
//                     </div>

//                     <Button
//                       onClick={() => toggleFullTeam(index)}
//                       variant="outline"
//                       className="w-full"
//                     >
//                       {showFullTeam[index] ? "Hide Team" : "Show Full Team"}
//                     </Button>

//                     {showFullTeam[index] && (
//                       <div className="mt-4 space-y-2">
//                         {team.map((player, i) => (
//                           <div key={i} className="flex items-center gap-3 p-2 border rounded">
//                             <Image
//                               src={player.image || "/fallback.jpg"}
//                               alt={player.name}
//                               width={40}
//                               height={40}
//                               className="rounded-full"
//                             />
//                             <div className="flex-1">
//                               <p className="font-medium">{player.name}</p>
//                               <p className="text-sm text-gray-500">{player.role}</p>
//                             </div>
//                             <span className="text-sm bg-gray-200 px-2 py-1 rounded">
//                               {player.team}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Players Selection Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Batters</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("Batters").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">All Rounders</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("All Rounders").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Bowlers</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("Bowlers").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Selected Players Section */}
//       <div className="mb-8">
//         <h2 className="text-xl font-bold mb-4">
//           Your Team ({selectedPlayers.length}/11 players)
//         </h2>
//         {selectedPlayers.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {selectedPlayers.map((player) => (
//               <div
//                 key={`${player.team}-${player.name}`}
//                 className="border rounded-lg p-3 flex items-center gap-3 hover:bg-gray-100"
//               >
//                 <Image
//                   src={player.image || "/fallback.jpg"}
//                   alt={player.name}
//                   width={40}
//                   height={40}
//                   className="rounded-full"
//                   onError={(e) => {
//                     const target = e.target as HTMLImageElement;
//                     target.src = "/fallback.jpg";
//                   }}
//                 />
//                 <div>
//                   <p className="font-medium">{player.name}</p>
//                   <p className="text-sm text-gray-500">{player.role}</p>
//                 </div>
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   onClick={() => togglePlayerSelection(player)}
//                   className="ml-auto"
//                 >
//                   Remove
//                 </Button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No players selected yet</p>
//         )}
//       </div>

//       <div className="flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           {selectedPlayers.length === 11 ? "Save Team" : `Select ${11 - selectedPlayers.length} more players`}
//         </Button>
//       </div>
//     </div>
//   );
// }

// function PlayerCard({ player, selected, onClick, team }: {
//   player: Player,
//   selected: boolean,
//   onClick: () => void,
//   team: string
// }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`p-3 border rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
//         selected ? "bg-green-100 border-green-500" : "hover:bg-gray-50"
//       }`}
//     >
//       <Image
//         src={player.image || "/fallback.jpg"}
//         alt={player.name}
//         width={40}
//         height={40}
//         className="rounded-full"
//         onError={(e) => {
//           const target = e.target as HTMLImageElement;
//           target.src = "/fallback.jpg";
//         }}
//       />
//       <div className="flex-1">
//         <p className="font-medium">{player.name}</p>
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-500">{player.role}</span>
//           <span className="text-xs bg-gray-200 px-2 py-1 rounded">
//             {team}
//           </span>
//         </div>
//       </div>
//       {selected && (
//         <span className="text-green-500">✓</span>
//       )}
//     </div>
//   );
// }







// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Button } from "../../../components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { IPL, teamAbbreviations } from "@/data/iplTeams";

// interface Player {
//   name: string;
//   role: string;
//   image: string;
//   team?: string;
// }

// interface TeamData {
//   Batters: Player[];
//   "All Rounders": Player[];
//   Bowlers: Player[];
//   "Playing XI"?: Player[];
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     if (risk === 0) return { rank: "3,590,001", prize: "49 Rs" };
//     if (risk <= 10) return { rank: "1,798,400", prize: "55 Rs" };
//     if (risk <= 20) return { rank: "359,000", prize: "100 Rs" };
//     if (risk <= 30) return { rank: "301,000", prize: "1,000 Rs" };
//     if (risk <= 40) return { rank: "251,000", prize: "1,500 Rs" };
//     if (risk <= 50) return { rank: "201,000", prize: "2,000 Rs" };
//     if (risk <= 60) return { rank: "151,000", prize: "2,500 Rs" };
//     if (risk <= 70) return { rank: "101,000", prize: "3,000 Rs" };
//     if (risk <= 80) return { rank: "21", prize: "9,000 Rs" };
//     if (risk <= 85) return { rank: "13", prize: "20,000 Rs" };
//     if (risk <= 90) return { rank: "12", prize: "25,000 Rs" };
//     if (risk <= 92) return { rank: "11", prize: "50,000 Rs" };
//     if (risk <= 94) return { rank: "10", prize: "1,00,000 Rs" };
//     if (risk <= 96) return { rank: "8", prize: "1,50,000 Rs" };
//     if (risk <= 98) return { rank: "6", prize: "2,00,000 Rs" };
//     if (risk <= 99) return { rank: "5", prize: "2,00,000 Rs" };
//     if (risk === 100) return { rank: "1", prize: "3 Crore Rs" };
//     return { rank: "1", prize: "3 Crore Rs" };
//   };

//   const getSliderColor = (risk: number) => {
//     if (risk <= 20) return "#22c55e";
//     if (risk <= 50) return "#fbbf24";
//     if (risk <= 80) return "#f97316";
//     return "#dc2626";
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-sm">
//       <h2 className="text-lg font-semibold mb-4 text-center">Team Risk Level</h2>
//       <div className="flex justify-between mb-4">
//         <div className="text-center px-4 py-2 bg-green-50 rounded-lg">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={0}
//         max={100}
//         step={1}
//         className="w-full"
//         style={{
//           '--slider-track-color': '#e5e7eb',
//           '--slider-range-color': getSliderColor(value),
//         } as React.CSSProperties}
//       />
//       <div className="flex justify-between mt-2 px-2">
//         <span className="text-sm text-gray-500">Safe</span>
//         <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded">
//           Risk: {value}%
//         </span>
//         <span className="text-sm text-gray-500">Aggressive</span>
//       </div>
//     </div>
//   );
// };

// const TeamSlider = ({ onChange }: { onChange: (value: number) => void }) => {
//   const [numTeams, setNumTeams] = useState(1);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-sm">
//       <h2 className="text-lg font-semibold mb-4 text-center">Number of Teams</h2>
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-sm">1 Team</span>
//         <span className="text-sm font-medium bg-blue-100 px-3 py-1 rounded-full">
//           {numTeams} Team{numTeams !== 1 ? 's' : ''} Selected
//         </span>
//         <span className="text-sm">100 Teams</span>
//       </div>
//       <Slider
//         value={[numTeams]}
//         onValueChange={([val]) => {
//           setNumTeams(val);
//           onChange(val);
//         }}
//         min={1}
//         max={100}
//         step={1}
//         className="w-full mb-4"
//       />
//       <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
//         <p className="text-center font-medium">
//           Total Charge: ₹{numTeams * 5} (₹5 per team)
//         </p>
//       </div>
//     </div>
//   );
// };

// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
//   const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);
//   const [matchTitle, setMatchTitle] = useState("");

//   useEffect(() => {
//     const fetchMatchDetails = async () => {
//       try {
//         const docRef = doc(db, "cricket", "upcomingMatches");
//         const docSnap = await getDoc(docRef);
        
//         if (!docSnap.exists()) {
//           setError("No matches data found in Firestore");
//           return;
//         }
  
//         const data = docSnap.data();
        
//         if (!data.matches || !Array.isArray(data.matches)) {
//           setError("Matches data is not in expected format");
//           return;
//         }
  
//         const numericMatchId = Number(matchId);
//         const currentMatch = data.matches.find((match: any) =>
//           match.id === numericMatchId || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }
  
//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
//         setMatchTitle(`${currentMatch.team1} vs ${currentMatch.team2}`);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching match:", err);
//         setError("Failed to load match data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchDetails();
//   }, [matchId]);

//   const team1Abbr = teamAbbreviations[team1];
//   const team2Abbr = teamAbbreviations[team2];
//   const team1Data = team1Abbr ? IPL[team1Abbr] : null;
//   const team2Data = team2Abbr ? IPL[team2Abbr] : null;

//   const togglePlayerSelection = (player: Player) => {
//     setSelectedPlayers(prev => {
//       const isSelected = prev.some(p => p.name === player.name);
//       if (isSelected) {
//         return prev.filter(p => p.name !== player.name);
//       } else if (prev.length < 11) {
//         return [...prev, { ...player, team: player.team || team1Abbr }];
//       }
//       return prev;
//     });
//   };

//   const handleTeamSelect = (team: string) => {
//     setSelectedTeam(team === selectedTeam ? null : team);
//   };

//   const generateRandomTeams = () => {
//     if (!team1Data || !team2Data) return [];
    
//     const team1Players = [...(team1Data["Batters"] || []), ...(team1Data["All Rounders"] || []), ...(team1Data["Bowlers"] || [])];
//     const team2Players = [...(team2Data["Batters"] || []), ...(team2Data["All Rounders"] || []), ...(team2Data["Bowlers"] || [])];
    
//     const shuffledTeam1 = [...team1Players].sort(() => Math.random() - 0.5);
//     const shuffledTeam2 = [...team2Players].sort(() => Math.random() - 0.5);

//     const team1Wicketkeeper = shuffledTeam1.find((player) => player.role.includes("WK"));
//     const team2Wicketkeeper = shuffledTeam2.find((player) => player.role.includes("WK"));

//     const team1Selection = shuffledTeam1.slice(0, 6);
//     const team2Selection = shuffledTeam2.slice(0, 5);

//     const combinedTeam = [...team1Selection, ...team2Selection];
//     if (!combinedTeam.some((player) => player.role.includes("WK"))) {
//       if (team1Wicketkeeper) combinedTeam.push(team1Wicketkeeper);
//       else if (team2Wicketkeeper) combinedTeam.push(team2Wicketkeeper);
//     }

//     return combinedTeam.sort(() => Math.random() - 0.5).slice(0, 11);
//   };

//   const generateMultipleTeams = () => {
//     const newTeams = Array.from({ length: numTeams }, () => generateRandomTeams());
//     setGeneratedTeams(newTeams);
//   };

//   const predictCaptainAndViceCaptain = (team: Player[]) => {
//     const battersAndAllRounders = team.filter(
//       (player) => player.role.includes("Batter") || player.role.includes("All-Rounder")
//     );
//     const sortedPlayers = [...battersAndAllRounders].sort(() => Math.random() - 0.5);
//     return {
//       captain: sortedPlayers[0],
//       viceCaptain: sortedPlayers[1]
//     };
//   };

//   const countPlayersByRole = (team: Player[]) => {
//     return {
//       WK: team.filter((player) => player.role.includes("WK")).length,
//       BAT: team.filter((player) => player.role.includes("Batter") && !player.role.includes("WK")).length,
//       AR: team.filter((player) => player.role.includes("All-Rounder")).length,
//       BOWL: team.filter((player) => player.role.includes("Bowler")).length,
//     };
//   };

//   const saveTeam = () => {
//     console.log("Saving team:", {
//       matchId,
//       players: selectedPlayers,
//       riskLevel
//     });
//     alert("Team saved successfully!");
//   };

//   const getPlayersByRole = (role: keyof TeamData): Player[] => {
//     const players: Player[] = [];
    
//     if ((selectedTeam === team1 || selectedTeam === "both") && team1Data?.[role]) {
//       players.push(...team1Data[role].map(player => ({ ...player, team: team1Abbr })));
//     }
    
//     if ((selectedTeam === team2 || selectedTeam === "both") && team2Data?.[role]) {
//       players.push(...team2Data[role].map(player => ({ ...player, team: team2Abbr })));
//     }
    
//     return players;
//   };

//   const renderGeneratedTeams = () => {
//     return generatedTeams.map((team, index) => {
//       const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//       const roleCounts = countPlayersByRole(team);

//       const sortedPlayers = [...team].sort((a, b) => {
//         const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//         return roleOrder[a.role.split(' ')[0]] - roleOrder[b.role.split(' ')[0]];
//       });

//       return (
//         <Card key={index} className="relative overflow-hidden">
//           <div
//             className="absolute inset-0 bg-[url('/Grass.jpg')] bg-cover opacity-20"
//             aria-hidden="true"
//           />
//           <CardHeader>
//             <CardTitle className="text-center relative z-10">
//               Team {index + 1}
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="relative z-10">
//             <div className="flex justify-between mb-4">
//               <div className="bg-white/90 p-2 rounded">
//                 <span className="font-medium">C: </span>
//                 <span>{captain?.name}</span>
//               </div>
//               <div className="bg-white/90 p-2 rounded">
//                 <span className="font-medium">VC: </span>
//                 <span>{viceCaptain?.name}</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//               {Object.entries(roleCounts).map(([role, count]) => (
//                 <div key={role} className="bg-white/90 p-2 rounded text-center">
//                   <div className="font-bold">{count}</div>
//                   <div>{role}</div>
//                 </div>
//               ))}
//             </div>

//             <div className="space-y-2">
//               {sortedPlayers.map((player, i) => (
//                 <div key={i} className="flex items-center gap-3 p-2 bg-white/90 rounded">
//                   <Image
//                     src={player.image || "/fallback.jpg"}
//                     alt={player.name}
//                     width={40}
//                     height={40}
//                     className="rounded-full"
//                   />
//                   <div className="flex-1">
//                     <p className="font-medium">{player.name}</p>
//                     <p className="text-sm text-gray-500">
//                       {player.role.includes('WK') ? 'Wicketkeeper' : player.role}
//                     </p>
//                   </div>
//                   <span className="text-sm bg-gray-200 px-2 py-1 rounded">
//                     {player.team}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       );
//     });
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!team1 || !team2) {
//     return <div className="p-4 text-center">Match data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold mb-2 text-center">
//         {matchTitle || "Loading match..."}
//       </h1>
//       <p className="text-center text-gray-600 mb-6">
//         {team1} vs {team2}
//       </p>

//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//       <TeamSlider onChange={setNumTeams} />

//       <div className="flex gap-4 mb-6">
//         <Button
//           onClick={() => handleTeamSelect(team1)}
//           variant={selectedTeam === team1 ? "default" : "outline"}
//           className="flex-1"
//         >
//           {team1}
//         </Button>
//         <Button
//           onClick={() => handleTeamSelect(team2)}
//           variant={selectedTeam === team2 ? "default" : "outline"}
//           className="flex-1"
//         >
//           {team2}
//         </Button>
//         <Button
//           onClick={() => handleTeamSelect("both")}
//           variant={selectedTeam === "both" ? "default" : "outline"}
//           className="flex-1"
//         >
//           Both Teams
//         </Button>
//       </div>

//       <div className="flex justify-center gap-4 mb-6">
//         <Button
//           onClick={generateMultipleTeams}
//           className="bg-blue-600 hover:bg-blue-700"
//         >
//           Generate Teams
//         </Button>
//         <Button
//           onClick={() => {
//             const team = generateRandomTeams();
//             setSelectedPlayers(team);
//           }}
//           className="bg-green-600 hover:bg-green-700"
//         >
//           Auto Select My Team
//         </Button>
//       </div>

//       {generatedTeams.length > 0 && (
//         <div className="mb-8">
//           <h2 className="text-xl font-bold mb-4">
//             Generated Teams ({generatedTeams.length})
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {renderGeneratedTeams()}
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Batters</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("Batters").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">All Rounders</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("All Rounders").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Bowlers</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("Bowlers").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>
//       </div>

//       <div className="flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           Save Team
//         </Button>
//       </div>
//     </div>
//   );
// }

// function PlayerCard({ player, selected, onClick, team }: {
//   player: Player,
//   selected: boolean,
//   onClick: () => void,
//   team: string
// }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`p-3 border rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
//         selected ? "bg-green-100 border-green-500" : "hover:bg-gray-50"
//       }`}
//     >
//       <Image
//         src={player.image || "/fallback.jpg"}
//         alt={player.name}
//         width={40}
//         height={40}
//         className="rounded-full"
//         onError={(e) => {
//           const target = e.target as HTMLImageElement;
//           target.src = "/fallback.jpg";
//         }}
//       />
//       <div className="flex-1">
//         <p className="font-medium">{player.name}</p>
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-500">
//             {player.role.includes('WK') ? 'Wicketkeeper' : player.role}
//           </span>
//           <span className="text-xs bg-gray-200 px-2 py-1 rounded">
//             {team}
//           </span>
//         </div>
//       </div>
//       {selected && (
//         <span className="text-green-500">✓</span>
//       )}
//     </div>
//   );
// }  good end



// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Button } from "../../../components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { IPL, teamAbbreviations } from "@/data/iplTeams";

// interface Player {
//   name: string;
//   role: string;
//   image: string;
//   team?: string;
// }

// interface TeamData {
//   Batters: Player[];
//   "All Rounders": Player[];
//   Bowlers: Player[];
//   "Playing XI"?: Player[];
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     if (risk === 0) return { rank: "3,590,001", prize: "49 Rs" };
//     if (risk <= 10) return { rank: "1,798,400", prize: "55 Rs" };
//     if (risk <= 20) return { rank: "359,000", prize: "100 Rs" };
//     if (risk <= 30) return { rank: "301,000", prize: "1,000 Rs" };
//     if (risk <= 40) return { rank: "251,000", prize: "1,500 Rs" };
//     if (risk <= 50) return { rank: "201,000", prize: "2,000 Rs" };
//     if (risk <= 60) return { rank: "151,000", prize: "2,500 Rs" };
//     if (risk <= 70) return { rank: "101,000", prize: "3,000 Rs" };
//     if (risk <= 80) return { rank: "21", prize: "9,000 Rs" };
//     if (risk <= 85) return { rank: "13", prize: "20,000 Rs" };
//     if (risk <= 90) return { rank: "12", prize: "25,000 Rs" };
//     if (risk <= 92) return { rank: "11", prize: "50,000 Rs" };
//     if (risk <= 94) return { rank: "10", prize: "1,00,000 Rs" };
//     if (risk <= 96) return { rank: "8", prize: "1,50,000 Rs" };
//     if (risk <= 98) return { rank: "6", prize: "2,00,000 Rs" };
//     if (risk <= 99) return { rank: "5", prize: "2,00,000 Rs" };
//     if (risk === 100) return { rank: "1", prize: "3 Crore Rs" };
//     return { rank: "1", prize: "3 Crore Rs" };
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-sm">
//       <h2 className="text-lg font-semibold mb-4 text-center">Team Risk Level</h2>
//       <div className="flex justify-between mb-4">
//         <div className="text-center px-4 py-2 bg-green-50 rounded-lg">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       <div className="relative w-full h-2 bg-gray-200 rounded-full">
//         <div
//           className="absolute h-full rounded-full"
//           style={{
//             width: `${value}%`,
//             backgroundColor:
//               value <= 20 ? "#22c55e" :
//               value <= 50 ? "#fbbf24" :
//               value <= 80 ? "#f97316" : "#dc2626"
//           }}
//         />
//         <div
//           className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-300 rounded-full shadow-lg flex items-center justify-center"
//           style={{
//             left: `${value}%`,
//             width: "40px",
//             height: "40px",
//           }}
//         >
//           <span className="text-sm font-bold text-gray-700">{value}%</span>
//         </div>
//       </div>
//       <div className="flex justify-between mt-4">
//         <span className="font-bold text-green-600">SAFE</span>
//         <span className="font-bold text-red-600">AGGRESSIVE</span>
//       </div>
//     </div>
//   );
// };

// const TeamSlider = ({ onChange }: { onChange: (value: number) => void }) => {
//   const [numTeams, setNumTeams] = useState(1);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-sm">
//       <h2 className="text-lg font-semibold mb-4 text-center">Number of Teams</h2>
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-sm">1 Team</span>
//         <div className="bg-blue-600 text-white px-3 py-1 rounded-full">
//           <span className="text-sm font-medium">
//             {numTeams} Team{numTeams !== 1 ? 's' : ''} Selected
//           </span>
//         </div>
//         <span className="text-sm">100 Teams</span>
//       </div>
//       <Slider
//         value={[numTeams]}
//         onValueChange={([val]) => {
//           setNumTeams(val);
//           onChange(val);
//         }}
//         min={1}
//         max={100}
//         step={1}
//         className="w-full mb-4"
//       />
//       <div className="bg-blue-600 text-white p-3 rounded-lg">
//         <p className="text-center font-medium">
//           Total Charge: ₹{numTeams * 5} (₹5 per team)
//         </p>
//       </div>
//     </div>
//   );
// };

// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
//   const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//   const [matchDetails, setMatchDetails] = useState<{team1: string, team2: string}>({team1: "", team2: ""});

//   useEffect(() => {
//     const fetchMatchDetails = async () => {
//       try {
//         const docRef = doc(db, "cricket", "upcomingMatches");
//         const docSnap = await getDoc(docRef);
        
//         if (!docSnap.exists()) {
//           setError("No matches data found in Firestore");
//           return;
//         }
  
//         const data = docSnap.data();
        
//         if (!data.matches || !Array.isArray(data.matches)) {
//           setError("Matches data is not in expected format");
//           return;
//         }
  
//         const numericMatchId = Number(matchId);
//         const currentMatch = data.matches.find((match: any) =>
//           match.id === numericMatchId || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }
  
//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
//         setMatchDetails({
//           team1: currentMatch.team1,
//           team2: currentMatch.team2
//         });
//         setError("");
//       } catch (err) {
//         console.error("Error fetching match:", err);
//         setError("Failed to load match data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchDetails();
//   }, [matchId]);

//   const team1Abbr = teamAbbreviations[team1];
//   const team2Abbr = teamAbbreviations[team2];
//   const team1Data = team1Abbr ? IPL[team1Abbr] : null;
//   const team2Data = team2Abbr ? IPL[team2Abbr] : null;

//   const togglePlayerSelection = (player: Player) => {
//     setSelectedPlayers(prev => {
//       const isSelected = prev.some(p => p.name === player.name);
//       if (isSelected) {
//         return prev.filter(p => p.name !== player.name);
//       } else if (prev.length < 11) {
//         return [...prev, { ...player, team: player.team || team1Abbr }];
//       }
//       return prev;
//     });
//   };

//   const handleTeamSelect = (team: string) => {
//     setSelectedTeam(team === selectedTeam ? null : team);
//   };

//   const generateRandomTeams = () => {
//     if (!team1Data || !team2Data) return [];
    
//     const team1Players = [...(team1Data["Batters"] || []), ...(team1Data["All Rounders"] || []), ...(team1Data["Bowlers"] || [])];
//     const team2Players = [...(team2Data["Batters"] || []), ...(team2Data["All Rounders"] || []), ...(team2Data["Bowlers"] || [])];
    
//     const shuffledTeam1 = [...team1Players].sort(() => Math.random() - 0.5);
//     const shuffledTeam2 = [...team2Players].sort(() => Math.random() - 0.5);

//     const team1Wicketkeeper = shuffledTeam1.find((player) => player.role.includes("WK"));
//     const team2Wicketkeeper = shuffledTeam2.find((player) => player.role.includes("WK"));

//     const team1Selection = shuffledTeam1.slice(0, 6);
//     const team2Selection = shuffledTeam2.slice(0, 5);

//     const combinedTeam = [...team1Selection, ...team2Selection];
//     if (!combinedTeam.some((player) => player.role.includes("WK"))) {
//       if (team1Wicketkeeper) combinedTeam.push(team1Wicketkeeper);
//       else if (team2Wicketkeeper) combinedTeam.push(team2Wicketkeeper);
//     }

//     return combinedTeam.sort(() => Math.random() - 0.5).slice(0, 11);
//   };

//   const generateMultipleTeams = () => {
//     const newTeams = Array.from({ length: numTeams }, () => generateRandomTeams());
//     setGeneratedTeams(newTeams);
//     setSelectedTeamsToShare([]);
//   };

//   const predictCaptainAndViceCaptain = (team: Player[]) => {
//     const battersAndAllRounders = team.filter(
//       (player) => player.role.includes("Batter") || player.role.includes("All-Rounder")
//     );
//     const sortedPlayers = [...battersAndAllRounders].sort(() => Math.random() - 0.5);
//     return {
//       captain: sortedPlayers[0],
//       viceCaptain: sortedPlayers[1]
//     };
//   };

//   const countPlayersByRole = (team: Player[]) => {
//     return {
//       WK: team.filter((player) => player.role.includes("WK")).length,
//       BAT: team.filter((player) => player.role.includes("Batter") && !player.role.includes("WK")).length,
//       AR: team.filter((player) => player.role.includes("All-Rounder")).length,
//       BOWL: team.filter((player) => player.role.includes("Bowler")).length,
//     };
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const shareTeams = () => {
//     const message = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map((team, i) => {
//         const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//         return `Team ${i+1}:\nC: ${captain?.name}\nVC: ${viceCaptain?.name}\nPlayers:\n${
//           team.map(p => `${p.name} (${p.role})`).join('\n')
//         }`;
//       })
//       .join('\n\n');
    
//     // Implement actual sharing logic
//     const shareUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
//     window.open(shareUrl, '_blank');
//   };

//   const saveTeam = () => {
//     console.log("Saving team:", {
//       matchId,
//       players: selectedPlayers,
//       riskLevel
//     });
//     alert("Team saved successfully!");
//   };

//   const getPlayersByRole = (role: keyof TeamData): Player[] => {
//     const players: Player[] = [];
    
//     if ((selectedTeam === team1 || selectedTeam === "both") && team1Data?.[role]) {
//       players.push(...team1Data[role].map(player => ({ ...player, team: team1Abbr })));
//     }
    
//     if ((selectedTeam === team2 || selectedTeam === "both") && team2Data?.[role]) {
//       players.push(...team2Data[role].map(player => ({ ...player, team: team2Abbr })));
//     }
    
//     return players;
//   };

//   const renderGeneratedTeams = () => {
//     return generatedTeams.map((team, index) => {
//       const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//       const roleCounts = countPlayersByRole(team);

//       const sortedPlayers = [...team].sort((a, b) => {
//         const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//         return roleOrder[a.role.split(' ')[0]] - roleOrder[b.role.split(' ')[0]];
//       });

//       return (
//         <Card key={index} className="relative overflow-hidden">
//           <Image
//             src="/grass.jpg"
//             alt="Field background"
//             fill
//             className="object-cover"
//           />
//           <div className="relative z-10 bg-white/90 p-4 rounded-lg">
//             <div className="flex justify-between items-center mb-4">
//               <CardTitle className="text-center">
//                 Team {index + 1}
//               </CardTitle>
//               <input
//                 type="checkbox"
//                 checked={selectedTeamsToShare.includes(index)}
//                 onChange={() => toggleTeamSelection(index)}
//                 className="h-5 w-5"
//               />
//             </div>

//             <div className="flex justify-between mb-4">
//               <div className="flex flex-col items-center">
//                 <div className="bg-yellow-200 rounded-full p-1 mb-1">
//                   <Image
//                     src={captain?.image || "/fallback.jpg"}
//                     alt={captain?.name || "Captain"}
//                     width={50}
//                     height={50}
//                     className="rounded-full border-2 border-yellow-500"
//                   />
//                 </div>
//                 <span className="font-medium">C</span>
//                 <span className="text-sm">{captain?.name}</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <div className="bg-blue-200 rounded-full p-1 mb-1">
//                   <Image
//                     src={viceCaptain?.image || "/fallback.jpg"}
//                     alt={viceCaptain?.name || "Vice Captain"}
//                     width={50}
//                     height={50}
//                     className="rounded-full border-2 border-blue-500"
//                   />
//                 </div>
//                 <span className="font-medium">VC</span>
//                 <span className="text-sm">{viceCaptain?.name}</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//               {Object.entries(roleCounts).map(([role, count]) => (
//                 <div key={role} className="bg-gray-100 p-2 rounded text-center">
//                   <div className="font-bold">{count}</div>
//                   <div>{role}</div>
//                 </div>
//               ))}
//             </div>

//             <div className="space-y-2">
//               {sortedPlayers.map((player, i) => (
//                 <div key={i} className="flex items-center gap-3 p-2 bg-white rounded border">
//                   <Image
//                     src={player.image || "/fallback.jpg"}
//                     alt={player.name}
//                     width={40}
//                     height={40}
//                     className="rounded-full"
//                   />
//                   <div className="flex-1">
//                     <p className="font-medium">{player.name}</p>
//                     <p className="text-sm text-gray-500">
//                       {player.role.includes('WK') ? 'Wicketkeeper' : player.role}
//                     </p>
//                   </div>
//                   {player.name === captain?.name && (
//                     <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                       C
//                     </span>
//                   )}
//                   {player.name === viceCaptain?.name && (
//                     <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                       VC
//                     </span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       );
//     });
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!team1 || !team2) {
//     return <div className="p-4 text-center">Match data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold mb-2 text-center">
//         {matchDetails.team1} vs {matchDetails.team2}
//       </h1>

//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//       <TeamSlider onChange={setNumTeams} />

//       <div className="flex gap-4 mb-6">
//         <Button
//           onClick={() => handleTeamSelect(team1)}
//           variant={selectedTeam === team1 ? "default" : "outline"}
//           className="flex-1"
//         >
//           Sunrisers Hyderabad
//         </Button>
//         <Button
//           onClick={() => handleTeamSelect(team2)}
//           variant={selectedTeam === team2 ? "default" : "outline"}
//           className="flex-1"
//         >
//           Lucknow Super Giants
//         </Button>
//       </div>

//       <div className="flex justify-center gap-4 mb-6">
//         <Button
//           onClick={generateMultipleTeams}
//           className="bg-blue-600 hover:bg-blue-700"
//         >
//           Generate Teams
//         </Button>
//         <Button
//           onClick={() => {
//             const team = generateRandomTeams();
//             setSelectedPlayers(team);
//           }}
//           className="bg-green-600 hover:bg-green-700"
//         >
//           Auto Select My Team
//         </Button>
//       </div>

//       {generatedTeams.length > 0 && (
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">
//               Generated Teams ({generatedTeams.length})
//             </h2>
//             {selectedTeamsToShare.length > 0 && (
//               <Button
//                 onClick={shareTeams}
//                 className="bg-green-600 hover:bg-green-700"
//               >
//                 Share Selected Teams ({selectedTeamsToShare.length})
//               </Button>
//             )}
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {renderGeneratedTeams()}
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Batters</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("Batters").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">All Rounders</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("All Rounders").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Bowlers</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {selectedTeam && getPlayersByRole("Bowlers").map((player) => (
//               <PlayerCard
//                 key={`${player.team}-${player.name}`}
//                 player={player}
//                 selected={selectedPlayers.some(p => p.name === player.name)}
//                 onClick={() => togglePlayerSelection(player)}
//                 team={player.team || ""}
//               />
//             ))}
//           </CardContent>
//         </Card>
//       </div>

//       <div className="flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           Save Team
//         </Button>
//       </div>
//     </div>
//   );
// }

// function PlayerCard({ player, selected, onClick, team }: {
//   player: Player,
//   selected: boolean,
//   onClick: () => void,
//   team: string
// }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`p-3 border rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
//         selected ? "bg-green-100 border-green-500" : "hover:bg-gray-50"
//       }`}
//     >
//       <Image
//         src={player.image || "/fallback.jpg"}
//         alt={player.name}
//         width={40}
//         height={40}
//         className="rounded-full"
//         onError={(e) => {
//           const target = e.target as HTMLImageElement;
//           target.src = "/fallback.jpg";
//         }}
//       />
//       <div className="flex-1">
//         <p className="font-medium">{player.name}</p>
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-500">
//             {player.role.includes('WK') ? 'Wicketkeeper' : player.role}
//           </span>
//           <span className="text-xs bg-gray-200 px-2 py-1 rounded">
//             {team}
//           </span>
//         </div>
//       </div>
//       {selected && (
//         <span className="text-green-500">✓</span>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Button } from "../../../components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { IPL, teamAbbreviations } from "@/data/iplTeams";

// interface Player {
//   name: string;
//   role: string;
//   image: string;
//   team?: string;
// }

// interface TeamData {
//   Batters: Player[];
//   "All Rounders": Player[];
//   Bowlers: Player[];
//   "Playing XI"?: Player[];
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     if (risk === 0) return { rank: "3,590,001", prize: "49 Rs" };
//     if (risk <= 10) return { rank: "1,798,400", prize: "55 Rs" };
//     if (risk <= 20) return { rank: "359,000", prize: "100 Rs" };
//     if (risk <= 30) return { rank: "301,000", prize: "1,000 Rs" };
//     if (risk <= 40) return { rank: "251,000", prize: "1,500 Rs" };
//     if (risk <= 50) return { rank: "201,000", prize: "2,000 Rs" };
//     if (risk <= 60) return { rank: "151,000", prize: "2,500 Rs" };
//     if (risk <= 70) return { rank: "101,000", prize: "3,000 Rs" };
//     if (risk <= 80) return { rank: "21", prize: "9,000 Rs" };
//     if (risk <= 85) return { rank: "13", prize: "20,000 Rs" };
//     if (risk <= 90) return { rank: "12", prize: "25,000 Rs" };
//     if (risk <= 92) return { rank: "11", prize: "50,000 Rs" };
//     if (risk <= 94) return { rank: "10", prize: "1,00,000 Rs" };
//     if (risk <= 96) return { rank: "8", prize: "1,50,000 Rs" };
//     if (risk <= 98) return { rank: "6", prize: "2,00,000 Rs" };
//     if (risk <= 99) return { rank: "5", prize: "2,00,000 Rs" };
//     if (risk === 100) return { rank: "1", prize: "3 Crore Rs" };
//     return { rank: "1", prize: "3 Crore Rs" };
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-sm">
//       <h2 className="text-lg font-semibold mb-4 text-center">Team Risk Level</h2>
//       <div className="flex justify-between mb-4">
//         <div className="text-center px-4 py-2 bg-green-50 rounded-lg">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={0}
//         max={100}
//         step={1}
//         className="w-full [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
//         style={{
//           '--slider-track-color': '#e5e7eb',
//           '--slider-range-color':
//             value <= 20 ? "#22c55e" :
//             value <= 50 ? "#fbbf24" :
//             value <= 80 ? "#f97316" : "#dc2626",
//         } as React.CSSProperties}
//       />
//       <div className="flex justify-between mt-2 px-2">
//         <span className="font-bold text-green-600">SAFE</span>
//         <span className="font-bold text-red-600">AGGRESSIVE</span>
//       </div>
//     </div>
//   );
// };

// const TeamSlider = ({ onChange }: { onChange: (value: number) => void }) => {
//   const [numTeams, setNumTeams] = useState(1);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-sm">
//       <h2 className="text-lg font-semibold mb-4 text-center">Number of Teams</h2>
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-sm">1 Team</span>
//         <Button
//           onClick={() => onChange(numTeams)}
//           className="bg-green-600 hover:bg-green-700 px-4 py-1 h-auto"
//         >
//           ₹{numTeams * 5}
//         </Button>
//         <span className="text-sm">100 Teams</span>
//       </div>
//       <Slider
//         value={[numTeams]}
//         onValueChange={([val]) => setNumTeams(val)}
//         min={1}
//         max={100}
//         step={1}
//         className="w-full"
//       />
//     </div>
//   );
// };

// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);
//   const [showFullTeams, setShowFullTeams] = useState(false);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);

//   useEffect(() => {
//     const fetchMatchDetails = async () => {
//       try {
//         const docRef = doc(db, "cricket", "upcomingMatches");
//         const docSnap = await getDoc(docRef);
        
//         if (!docSnap.exists()) {
//           setError("No matches data found in Firestore");
//           return;
//         }
  
//         const data = docSnap.data();
        
//         if (!data.matches || !Array.isArray(data.matches)) {
//           setError("Matches data is not in expected format");
//           return;
//         }
  
//         const numericMatchId = Number(matchId);
//         const currentMatch = data.matches.find((match: any) =>
//           match.id === numericMatchId || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }
  
//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching match:", err);
//         setError("Failed to load match data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchDetails();
//   }, [matchId]);

//   const team1Abbr = teamAbbreviations[team1];
//   const team2Abbr = teamAbbreviations[team2];
//   const team1Data = team1Abbr ? IPL[team1Abbr] : null;
//   const team2Data = team2Abbr ? IPL[team2Abbr] : null;

//   const generateRandomTeams = () => {
//     if (!team1Data || !team2Data) return [];
    
//     const team1Players = [...(team1Data["Batters"] || []), ...(team1Data["All Rounders"] || []), ...(team1Data["Bowlers"] || [])];
//     const team2Players = [...(team2Data["Batters"] || []), ...(team2Data["All Rounders"] || []), ...(team2Data["Bowlers"] || [])];
    
//     const shuffledTeam1 = [...team1Players].sort(() => Math.random() - 0.5);
//     const shuffledTeam2 = [...team2Players].sort(() => Math.random() - 0.5);

//     const team1Wicketkeeper = shuffledTeam1.find((player) => player.role.includes("WK"));
//     const team2Wicketkeeper = shuffledTeam2.find((player) => player.role.includes("WK"));

//     const team1Selection = shuffledTeam1.slice(0, 6);
//     const team2Selection = shuffledTeam2.slice(0, 5);

//     const combinedTeam = [...team1Selection, ...team2Selection];
//     if (!combinedTeam.some((player) => player.role.includes("WK"))) {
//       if (team1Wicketkeeper) combinedTeam.push(team1Wicketkeeper);
//       else if (team2Wicketkeeper) combinedTeam.push(team2Wicketkeeper);
//     }

//     return combinedTeam.sort(() => Math.random() - 0.5).slice(0, 11);
//   };

//   const generateMultipleTeams = () => {
//     const newTeams = Array.from({ length: numTeams }, () => generateRandomTeams());
//     setGeneratedTeams(newTeams);
//     setSelectedTeamsToShare([]);
//   };

//   const predictCaptainAndViceCaptain = (team: Player[]) => {
//     const battersAndAllRounders = team.filter(
//       (player) => player.role.includes("Batter") || player.role.includes("All-Rounder")
//     );
//     const sortedPlayers = [...battersAndAllRounders].sort(() => Math.random() - 0.5);
//     return {
//       captain: sortedPlayers[0],
//       viceCaptain: sortedPlayers[1]
//     };
//   };

//   const countPlayersByRole = (team: Player[]) => {
//     return {
//       WK: team.filter((player) => player.role.includes("WK")).length,
//       BAT: team.filter((player) => player.role.includes("Batter") && !player.role.includes("WK")).length,
//       AR: team.filter((player) => player.role.includes("All-Rounder")).length,
//       BOWL: team.filter((player) => player.role.includes("Bowler")).length,
//     };
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const shareTeams = () => {
//     const message = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map((team, i) => {
//         const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//         return `Team ${i+1}:\nC: ${captain?.name}\nVC: ${viceCaptain?.name}\nPlayers:\n${
//           team.map(p => `${p.name} (${p.role})`).join('\n')
//         }`;
//       })
//       .join('\n\n');
    
//     const shareUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
//     window.open(shareUrl, '_blank');
//   };

//   const saveTeam = () => {
//     console.log("Saving team:", {
//       matchId,
//       players: selectedPlayers,
//       riskLevel
//     });
//     alert("Team saved successfully!");
//   };

//   const renderGeneratedTeams = () => {
//     return generatedTeams.map((team, index) => {
//       const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//       const roleCounts = countPlayersByRole(team);

//       return (
//         <Card key={index} className="mb-4">
//           <CardHeader className="pb-2">
//             <div className="flex justify-between items-center">
//               <CardTitle>Team {index + 1}</CardTitle>
//               <input
//                 type="checkbox"
//                 checked={selectedTeamsToShare.includes(index)}
//                 onChange={() => toggleTeamSelection(index)}
//                 className="h-5 w-5"
//               />
//             </div>
//           </CardHeader>
//           <CardContent>
//             {showFullTeams ? (
//               <>
//                 <div className="flex justify-between mb-4">
//                   <div className="flex flex-col items-center">
//                     <Image
//                       src={captain?.image || "/fallback.jpg"}
//                       alt={captain?.name || "Captain"}
//                       width={50}
//                       height={50}
//                       className="rounded-full border-2 border-yellow-500 mb-1"
//                     />
//                     <span className="font-medium">C: {captain?.name}</span>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <Image
//                       src={viceCaptain?.image || "/fallback.jpg"}
//                       alt={viceCaptain?.name || "Vice Captain"}
//                       width={50}
//                       height={50}
//                       className="rounded-full border-2 border-blue-500 mb-1"
//                     />
//                     <span className="font-medium">VC: {viceCaptain?.name}</span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//                   {Object.entries(roleCounts).map(([role, count]) => (
//                     <div key={role} className="bg-gray-100 p-2 rounded text-center">
//                       <div className="font-bold">{count}</div>
//                       <div>{role}</div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="space-y-2">
//                   {team.map((player, i) => (
//                     <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
//                       <Image
//                         src={player.image || "/fallback.jpg"}
//                         alt={player.name}
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium">{player.name}</p>
//                         <p className="text-sm text-gray-500">
//                           {player.role.includes('WK') ? 'Wicketkeeper' : player.role}
//                         </p>
//                       </div>
//                       {player.name === captain?.name && (
//                         <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                           C
//                         </span>
//                       )}
//                       {player.name === viceCaptain?.name && (
//                         <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                           VC
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <div className="space-y-2">
//                 <div className="font-bold">{captain?.name} (C)</div>
//                 <div className="font-bold">{viceCaptain?.name} (VC)</div>
//                 <div className="flex justify-between text-sm">
//                   <span>WK: {roleCounts.WK}</span>
//                   <span>BAT: {roleCounts.BAT}</span>
//                   <span>AR: {roleCounts.AR}</span>
//                   <span>BOWL: {roleCounts.BOWL}</span>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       );
//     });
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!team1 || !team2) {
//     return <div className="p-4 text-center">Match data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//       <TeamSlider onChange={setNumTeams} />

//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             id="showFullTeams"
//             checked={showFullTeams}
//             onChange={() => setShowFullTeams(!showFullTeams)}
//             className="h-4 w-4"
//           />
//           <label htmlFor="showFullTeams" className="text-sm">
//             Show Full Teams
//           </label>
//         </div>
//         <Button
//           onClick={generateMultipleTeams}
//           className="bg-blue-600 hover:bg-blue-700"
//         >
//           Generate Teams (₹{numTeams * 5})
//         </Button>
//       </div>

//       {generatedTeams.length > 0 && (
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">
//               Generated Teams ({generatedTeams.length})
//             </h2>
//             {selectedTeamsToShare.length > 0 && (
//               <Button
//                 onClick={shareTeams}
//                 className="bg-green-600 hover:bg-green-700"
//               >
//                 Share Selected ({selectedTeamsToShare.length})
//               </Button>
//             )}
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {renderGeneratedTeams()}
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           Save Team
//         </Button>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Button } from "../../../components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { IPL, teamAbbreviations } from "@/data/iplTeams";

// interface Player {
//   name: string;
//   role: string;
//   image: string;
//   team?: string;
// }

// interface TeamData {
//   Batters: Player[];
//   "All Rounders": Player[];
//   Bowlers: Player[];
//   "Playing XI"?: Player[];
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     if (risk === 0) return { rank: "3,590,001", prize: "49 Rs" };
//     if (risk <= 10) return { rank: "1,798,400", prize: "55 Rs" };
//     if (risk <= 20) return { rank: "359,000", prize: "100 Rs" };
//     if (risk <= 30) return { rank: "301,000", prize: "1,000 Rs" };
//     if (risk <= 40) return { rank: "251,000", prize: "1,500 Rs" };
//     if (risk <= 50) return { rank: "201,000", prize: "2,000 Rs" };
//     if (risk <= 60) return { rank: "151,000", prize: "2,500 Rs" };
//     if (risk <= 70) return { rank: "101,000", prize: "3,000 Rs" };
//     if (risk <= 80) return { rank: "21", prize: "9,000 Rs" };
//     if (risk <= 85) return { rank: "13", prize: "20,000 Rs" };
//     if (risk <= 90) return { rank: "12", prize: "25,000 Rs" };
//     if (risk <= 92) return { rank: "11", prize: "50,000 Rs" };
//     if (risk <= 94) return { rank: "10", prize: "1,00,000 Rs" };
//     if (risk <= 96) return { rank: "8", prize: "1,50,000 Rs" };
//     if (risk <= 98) return { rank: "6", prize: "2,00,000 Rs" };
//     if (risk <= 99) return { rank: "5", prize: "2,00,000 Rs" };
//     if (risk === 100) return { rank: "1", prize: "3 Crore Rs" };
//     return { rank: "1", prize: "3 Crore Rs" };
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-4 p-4 bg-white rounded-lg shadow-sm">
//       <div className="flex justify-between mb-2">
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={0}
//         max={100}
//         step={1}
//         className="w-full [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
//         style={{
//           '--slider-track-color': '#e5e7eb',
//           '--slider-range-color':
//             value <= 20 ? "#22c55e" :
//             value <= 50 ? "#fbbf24" :
//             value <= 80 ? "#f97316" : "#dc2626",
//         } as React.CSSProperties}
//       />
//       <div className="flex justify-between mt-2 px-2">
//         <span className="font-bold text-green-600">SAFE</span>
//         <span className="font-bold text-red-600">AGGRESSIVE</span>
//       </div>
//     </div>
//   );
// };

// const TeamSlider = ({ value, onChange, onGenerate }: {
//   value: number;
//   onChange: (value: number) => void;
//   onGenerate: () => void;
// }) => {
//   return (
//     <div className="w-full max-w-2xl mx-auto mb-6 p-4 bg-white rounded-lg shadow-sm">
//       <div className="flex items-center justify-between mb-4">
//         <span className="text-lg font-medium">Teams: {value}</span>
//         <Button
//           onClick={onGenerate}
//           className="bg-green-600 hover:bg-green-700"
//         >
//           Generate Teams (₹{value * 5})
//         </Button>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={1}
//         max={100}
//         step={1}
//         className="w-full"
//       />
//       <div className="flex justify-between mt-2 text-sm">
//         <span>1 Team</span>
//         <span>100 Teams</span>
//       </div>
//     </div>
//   );
// };

// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);
//   const [showFullTeams, setShowFullTeams] = useState(false);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//   const [expandedTeam, setExpandedTeam] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchMatchDetails = async () => {
//       try {
//         const docRef = doc(db, "cricket", "upcomingMatches");
//         const docSnap = await getDoc(docRef);
        
//         if (!docSnap.exists()) {
//           setError("No matches data found in Firestore");
//           return;
//         }
  
//         const data = docSnap.data();
        
//         if (!data.matches || !Array.isArray(data.matches)) {
//           setError("Matches data is not in expected format");
//           return;
//         }
  
//         const numericMatchId = Number(matchId);
//         const currentMatch = data.matches.find((match: any) =>
//           match.id === numericMatchId || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }
  
//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching match:", err);
//         setError("Failed to load match data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchDetails();
//   }, [matchId]);

//   const team1Abbr = teamAbbreviations[team1];
//   const team2Abbr = teamAbbreviations[team2];
//   const team1Data = team1Abbr ? IPL[team1Abbr] : null;
//   const team2Data = team2Abbr ? IPL[team2Abbr] : null;

//   const generateRandomTeams = () => {
//     if (!team1Data || !team2Data) return [];
    
//     const team1Players = [...(team1Data["Batters"] || []), ...(team1Data["All Rounders"] || []), ...(team1Data["Bowlers"] || [])];
//     const team2Players = [...(team2Data["Batters"] || []), ...(team2Data["All Rounders"] || []), ...(team2Data["Bowlers"] || [])];
    
//     const shuffledTeam1 = [...team1Players].sort(() => Math.random() - 0.5);
//     const shuffledTeam2 = [...team2Players].sort(() => Math.random() - 0.5);

//     const team1Wicketkeeper = shuffledTeam1.find((player) => player.role.includes("WK"));
//     const team2Wicketkeeper = shuffledTeam2.find((player) => player.role.includes("WK"));

//     const team1Selection = shuffledTeam1.slice(0, 6);
//     const team2Selection = shuffledTeam2.slice(0, 5);

//     const combinedTeam = [...team1Selection, ...team2Selection];
//     if (!combinedTeam.some((player) => player.role.includes("WK"))) {
//       if (team1Wicketkeeper) combinedTeam.push(team1Wicketkeeper);
//       else if (team2Wicketkeeper) combinedTeam.push(team2Wicketkeeper);
//     }

//     return combinedTeam.sort(() => Math.random() - 0.5).slice(0, 11);
//   };

//   const generateMultipleTeams = () => {
//     const newTeams = Array.from({ length: numTeams }, () => generateRandomTeams());
//     setGeneratedTeams(newTeams);
//     setSelectedTeamsToShare([]);
//     setExpandedTeam(null);
//   };

//   const predictCaptainAndViceCaptain = (team: Player[]) => {
//     const battersAndAllRounders = team.filter(
//       (player) => player.role.includes("Batter") || player.role.includes("All-Rounder")
//     );
//     const sortedPlayers = [...battersAndAllRounders].sort(() => Math.random() - 0.5);
//     return {
//       captain: sortedPlayers[0],
//       viceCaptain: sortedPlayers[1]
//     };
//   };

//   const countPlayersByRole = (team: Player[]) => {
//     return {
//       WK: team.filter((player) => player.role.includes("WK")).length,
//       BAT: team.filter((player) => player.role.includes("Batter") && !player.role.includes("WK")).length,
//       AR: team.filter((player) => player.role.includes("All-Rounder")).length,
//       BOWL: team.filter((player) => player.role.includes("Bowler")).length,
//     };
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const toggleTeamExpansion = (index: number) => {
//     setExpandedTeam(expandedTeam === index ? null : index);
//   };

//   const shareTeams = () => {
//     const message = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map((team, i) => {
//         const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//         return `Team ${i+1}:\nC: ${captain?.name}\nVC: ${viceCaptain?.name}\nPlayers:\n${
//           team.map(p => `${p.name} (${p.role})`).join('\n')
//         }`;
//       })
//       .join('\n\n');
    
//     const shareUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
//     window.open(shareUrl, '_blank');
//   };

//   const saveTeam = () => {
//     console.log("Saving team:", {
//       matchId,
//       players: selectedPlayers,
//       riskLevel
//     });
//     alert("Team saved successfully!");
//   };

//   const renderGeneratedTeams = () => {
//     return generatedTeams.map((team, index) => {
//       const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//       const roleCounts = countPlayersByRole(team);
//       const isExpanded = expandedTeam === index;

//       return (
//         <Card key={index} className="mb-4">
//           <CardHeader className="pb-2">
//             <div className="flex justify-between items-center">
//               <CardTitle>Team {index + 1}</CardTitle>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedTeamsToShare.includes(index)}
//                   onChange={() => toggleTeamSelection(index)}
//                   className="h-5 w-5"
//                 />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => toggleTeamExpansion(index)}
//                 >
//                   {isExpanded ? "Hide" : "View Full"}
//                 </Button>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between mb-4">
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={captain?.image || "/fallback.jpg"}
//                   alt={captain?.name || "Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-yellow-500 mb-1"
//                 />
//                 <span className="font-medium">C: {captain?.name}</span>
//               </div>
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={viceCaptain?.image || "/fallback.jpg"}
//                   alt={viceCaptain?.name || "Vice Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-blue-500 mb-1"
//                 />
//                 <span className="font-medium">VC: {viceCaptain?.name}</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//               {Object.entries(roleCounts).map(([role, count]) => (
//                 <div key={role} className="bg-gray-100 p-2 rounded text-center">
//                   <div className="font-bold">{count}</div>
//                   <div>{role}</div>
//                 </div>
//               ))}
//             </div>

//             {isExpanded && (
//               <div className="space-y-2">
//                 {team.map((player, i) => (
//                   <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
//                     <Image
//                       src={player.image || "/fallback.jpg"}
//                       alt={player.name}
//                       width={40}
//                       height={40}
//                       className="rounded-full"
//                     />
//                     <div className="flex-1">
//                       <p className="font-medium">{player.name}</p>
//                       <p className="text-sm text-gray-500">
//                         {player.role.includes('WK') ? 'Wicketkeeper' : player.role}
//                       </p>
//                     </div>
//                     {player.name === captain?.name && (
//                       <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                         C
//                       </span>
//                     )}
//                     {player.name === viceCaptain?.name && (
//                       <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                         VC
//                       </span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       );
//     });
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!team1 || !team2) {
//     return <div className="p-4 text-center">Match data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//       <TeamSlider
//         value={numTeams}
//         onChange={setNumTeams}
//         onGenerate={generateMultipleTeams}
//       />

//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             id="showFullTeams"
//             checked={showFullTeams}
//             onChange={() => setShowFullTeams(!showFullTeams)}
//             className="h-4 w-4"
//           />
//           <label htmlFor="showFullTeams" className="text-sm">
//             Show Full Teams
//           </label>
//         </div>
//       </div>

//       {generatedTeams.length > 0 && (
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">
//               Generated Teams ({generatedTeams.length})
//             </h2>
//             {selectedTeamsToShare.length > 0 && (
//               <Button
//                 onClick={shareTeams}
//                 className="bg-green-600 hover:bg-green-700"
//               >
//                 Share Selected ({selectedTeamsToShare.length})
//               </Button>
//             )}
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {renderGeneratedTeams()}
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           Save Team
//         </Button>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Button } from "../../../components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { IPL, teamAbbreviations } from "@/data/iplTeams";

// interface Player {
//   name: string;
//   role: string;
//   image: string;
//   team?: string;
// }

// interface TeamData {
//   Batters: Player[];
//   "All Rounders": Player[];
//   Bowlers: Player[];
//   "Playing XI"?: Player[];
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     if (risk === 0) return { rank: "3,590,001", prize: "49 Rs" };
//     if (risk <= 10) return { rank: "1,798,400", prize: "55 Rs" };
//     if (risk <= 20) return { rank: "359,000", prize: "100 Rs" };
//     if (risk <= 30) return { rank: "301,000", prize: "1,000 Rs" };
//     if (risk <= 40) return { rank: "251,000", prize: "1,500 Rs" };
//     if (risk <= 50) return { rank: "201,000", prize: "2,000 Rs" };
//     if (risk <= 60) return { rank: "151,000", prize: "2,500 Rs" };
//     if (risk <= 70) return { rank: "101,000", prize: "3,000 Rs" };
//     if (risk <= 80) return { rank: "21", prize: "9,000 Rs" };
//     if (risk <= 85) return { rank: "13", prize: "20,000 Rs" };
//     if (risk <= 90) return { rank: "12", prize: "25,000 Rs" };
//     if (risk <= 92) return { rank: "11", prize: "50,000 Rs" };
//     if (risk <= 94) return { rank: "10", prize: "1,00,000 Rs" };
//     if (risk <= 96) return { rank: "8", prize: "1,50,000 Rs" };
//     if (risk <= 98) return { rank: "6", prize: "2,00,000 Rs" };
//     if (risk <= 99) return { rank: "5", prize: "2,00,000 Rs" };
//     if (risk === 100) return { rank: "1", prize: "3 Crore Rs" };
//     return { rank: "1", prize: "3 Crore Rs" };
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-4 p-4 bg-white rounded-lg shadow-sm">
//       <div className="flex justify-between mb-2">
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={0}
//         max={100}
//         step={1}
//         className="w-full [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
//         style={{
//           '--slider-track-color': '#e5e7eb',
//           '--slider-range-color':
//             value <= 20 ? "#22c55e" :
//             value <= 50 ? "#fbbf24" :
//             value <= 80 ? "#f97316" : "#dc2626",
//         } as React.CSSProperties}
//       />
//       <div className="flex justify-between mt-2 px-2">
//         <span className="text-green-600">safe</span>
//         <span className="text-red-600">aggressive</span>
//       </div>
//     </div>
//   );
// };

// const TeamSlider = ({ value, onChange, onGenerate }: {
//   value: number;
//   onChange: (value: number) => void;
//   onGenerate: () => void;
// }) => {
//   return (
//     <div className="w-full max-w-2xl mx-auto mb-6 p-4 bg-green-900 rounded-lg shadow-sm">
//       <div className="flex items-center justify-between mb-4">
//         <span className="text-lg font-medium">Teams: {value}</span>
//         <Button
//           onClick={onGenerate}
//           className="bg-blue-600 hover:bg-blue-700"
//         >
//           Generate Teams (₹{value * 5})
//         </Button>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={1}
//         max={100}
//         step={1}
//         className="w-full"
//       />
//       <div className="flex justify-between mt-2 text-sm">
//         <span>1 Team</span>
//         <span>100 Teams</span>
//       </div>
//     </div>
//   );
// };

// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);
//   const [showFullTeams, setShowFullTeams] = useState(false);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//   const [expandedTeam, setExpandedTeam] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchMatchDetails = async () => {
//       try {
//         const docRef = doc(db, "cricket", "upcomingMatches");
//         const docSnap = await getDoc(docRef);
        
//         if (!docSnap.exists()) {
//           setError("No matches data found in Firestore");
//           return;
//         }
  
//         const data = docSnap.data();
        
//         if (!data.matches || !Array.isArray(data.matches)) {
//           setError("Matches data is not in expected format");
//           return;
//         }
  
//         const numericMatchId = Number(matchId);
//         const currentMatch = data.matches.find((match: any) =>
//           match.id === numericMatchId || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }
  
//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching match:", err);
//         setError("Failed to load match data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchDetails();
//   }, [matchId]);

//   const team1Abbr = teamAbbreviations[team1];
//   const team2Abbr = teamAbbreviations[team2];
//   const team1Data = team1Abbr ? IPL[team1Abbr] : null;
//   const team2Data = team2Abbr ? IPL[team2Abbr] : null;

//   const generateRandomTeams = () => {
//     if (!team1Data || !team2Data) return [];
    
//     const team1Players = [...(team1Data["Batters"] || []), ...(team1Data["All Rounders"] || []), ...(team1Data["Bowlers"] || [])];
//     const team2Players = [...(team2Data["Batters"] || []), ...(team2Data["All Rounders"] || []), ...(team2Data["Bowlers"] || [])];
    
//     const shuffledTeam1 = [...team1Players].sort(() => Math.random() - 0.5);
//     const shuffledTeam2 = [...team2Players].sort(() => Math.random() - 0.5);

//     const team1Wicketkeeper = shuffledTeam1.find((player) => player.role.includes("WK"));
//     const team2Wicketkeeper = shuffledTeam2.find((player) => player.role.includes("WK"));

//     const team1Selection = shuffledTeam1.slice(0, 6);
//     const team2Selection = shuffledTeam2.slice(0, 5);

//     const combinedTeam = [...team1Selection, ...team2Selection];
//     if (!combinedTeam.some((player) => player.role.includes("WK"))) {
//       if (team1Wicketkeeper) combinedTeam.push(team1Wicketkeeper);
//       else if (team2Wicketkeeper) combinedTeam.push(team2Wicketkeeper);
//     }

//     return combinedTeam.sort(() => Math.random() - 0.5).slice(0, 11);
//   };

//   const generateMultipleTeams = () => {
//     const newTeams = Array.from({ length: numTeams }, () => generateRandomTeams());
//     setGeneratedTeams(newTeams);
//     setSelectedTeamsToShare([]);
//     setExpandedTeam(null);
//   };

//   const predictCaptainAndViceCaptain = (team: Player[]) => {
//     const battersAndAllRounders = team.filter(
//       (player) => player.role.includes("Batter") || player.role.includes("All-Rounder")
//     );
//     const sortedPlayers = [...battersAndAllRounders].sort(() => Math.random() - 0.5);
//     return {
//       captain: sortedPlayers[0],
//       viceCaptain: sortedPlayers[1]
//     };
//   };

//   const countPlayersByRole = (team: Player[]) => {
//     return {
//       WK: team.filter((player) => player.role.includes("WK")).length,
//       BAT: team.filter((player) => player.role.includes("Batter") && !player.role.includes("WK")).length,
//       AR: team.filter((player) => player.role.includes("All-Rounder")).length,
//       BOWL: team.filter((player) => player.role.includes("Bowler")).length,
//     };
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const toggleTeamExpansion = (index: number) => {
//     setExpandedTeam(expandedTeam === index ? null : index);
//   };

//   const shareTeams = () => {
//     const message = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map((team, i) => {
//         const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
        
//         // Sort players by role: WK -> BAT -> AR -> BOWL
//         const sortedPlayers = [...team].sort((a, b) => {
//           const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//           return roleOrder[a.role.split(' ')[0]] - roleOrder[b.role.split(' ')[0]];
//         });

//         return `Team ${i+1}:\nC: ${captain?.name}\nVC: ${viceCaptain?.name}\nPlayers:\n${
//           sortedPlayers.map(p => `${p.name} (${p.role.includes('WK') ? 'Wicketkeeper' : p.role})`).join('\n')
//         }`;
//       })
//       .join('\n\n');
    
//     const shareUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
//     window.open(shareUrl, '_blank');
//   };

//   const saveTeam = () => {
//     console.log("Saving team:", {
//       matchId,
//       players: selectedPlayers,
//       riskLevel
//     });
//     alert("Team saved successfully!");
//   };

//   const renderGeneratedTeams = () => {
//     return generatedTeams.map((team, index) => {
//       const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//       const roleCounts = countPlayersByRole(team);
//       const isExpanded = showFullTeams || expandedTeam === index;

//       return (
//         <Card key={index} className="mb-4">
//           <CardHeader className="pb-2">
//             <div className="flex justify-between items-center">
//               <CardTitle>Team {index + 1}</CardTitle>
//               <input
//                 type="checkbox"
//                 checked={selectedTeamsToShare.includes(index)}
//                 onChange={() => toggleTeamSelection(index)}
//                 className="h-5 w-5"
//               />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between mb-4">
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={captain?.image || "/fallback.jpg"}
//                   alt={captain?.name || "Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-yellow-500 mb-1"
//                 />
//                 <span className="font-medium">C: {captain?.name}</span>
//               </div>
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={viceCaptain?.image || "/fallback.jpg"}
//                   alt={viceCaptain?.name || "Vice Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-blue-500 mb-1"
//                 />
//                 <span className="font-medium">VC: {viceCaptain?.name}</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//               {Object.entries(roleCounts).map(([role, count]) => (
//                 <div key={role} className="bg-gray-100 p-2 rounded text-center">
//                   <div className="font-bold">{count}</div>
//                   <div>{role}</div>
//                 </div>
//               ))}
//             </div>

//             {isExpanded && (
//               <div className="space-y-2">
//                 {team
//                   .sort((a, b) => {
//                     const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//                     return roleOrder[a.role.split(' ')[0]] - roleOrder[b.role.split(' ')[0]];
//                   })
//                   .map((player, i) => (
//                     <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
//                       <Image
//                         src={player.image || "/fallback.jpg"}
//                         alt={player.name}
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium">{player.name}</p>
//                         <p className="text-sm text-gray-500">
//                           {player.role.includes('WK') ? 'Wicketkeeper' : player.role}
//                         </p>
//                       </div>
//                       {player.name === captain?.name && (
//                         <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                           C
//                         </span>
//                       )}
//                       {player.name === viceCaptain?.name && (
//                         <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                           VC
//                         </span>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             )}

//             <Button
//               variant="ghost"
//               size="sm"
//               className="w-full mt-2"
//               onClick={() => toggleTeamExpansion(index)}
//             >
//               {isExpanded ? "Hide Team" : "View Full Team"}
//             </Button>
//           </CardContent>
//         </Card>
//       );
//     });
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!team1 || !team2) {
//     return <div className="p-4 text-center">Match data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//       <TeamSlider
//         value={numTeams}
//         onChange={setNumTeams}
//         onGenerate={generateMultipleTeams}
//       />

//       {generatedTeams.length > 0 && (
//         <div className="mb-8 ">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold ">Generated Teams ({generatedTeams.length})</h2>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="showFullTeams"
//                   checked={showFullTeams}
//                   onChange={() => setShowFullTeams(!showFullTeams)}
//                   className="h-4 w-4"
//                 />
//                 <label htmlFor="showFullTeams" className="text-sm">
//                   Show Full Teams
//                 </label>
//               </div>
//               {selectedTeamsToShare.length > 0 && (
//                 <Button
//                   onClick={shareTeams}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   Share ({selectedTeamsToShare.length})
//                 </Button>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
//             {renderGeneratedTeams()}
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           Save Team
//         </Button>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Button } from "../../../components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { IPL, teamAbbreviations } from "@/data/iplTeams";

// interface Player {
//   name: string;
//   role: string;
//   image: string;
//   team?: string;
// }

// interface TeamData {
//   Batters: Player[];
//   "All Rounders": Player[];
//   Bowlers: Player[];
//   "Playing XI"?: Player[];
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     if (risk === 0) return { rank: "3,590,001", prize: "49 Rs" };
//     if (risk <= 10) return { rank: "1,798,400", prize: "55 Rs" };
//     if (risk <= 20) return { rank: "359,000", prize: "100 Rs" };
//     if (risk <= 30) return { rank: "301,000", prize: "1,000 Rs" };
//     if (risk <= 40) return { rank: "251,000", prize: "1,500 Rs" };
//     if (risk <= 50) return { rank: "201,000", prize: "2,000 Rs" };
//     if (risk <= 60) return { rank: "151,000", prize: "2,500 Rs" };
//     if (risk <= 70) return { rank: "101,000", prize: "3,000 Rs" };
//     if (risk <= 80) return { rank: "21", prize: "9,000 Rs" };
//     if (risk <= 85) return { rank: "13", prize: "20,000 Rs" };
//     if (risk <= 90) return { rank: "12", prize: "25,000 Rs" };
//     if (risk <= 92) return { rank: "11", prize: "50,000 Rs" };
//     if (risk <= 94) return { rank: "10", prize: "1,00,000 Rs" };
//     if (risk <= 96) return { rank: "8", prize: "1,50,000 Rs" };
//     if (risk <= 98) return { rank: "6", prize: "2,00,000 Rs" };
//     if (risk <= 99) return { rank: "5", prize: "2,00,000 Rs" };
//     if (risk === 100) return { rank: "1", prize: "3 Crore Rs" };
//     return { rank: "1", prize: "3 Crore Rs" };
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-4 p-4 bg-white rounded-lg shadow-sm">
//       <div className="flex justify-between mb-2">
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       import { Slider } from "@/components/ui/slider"; // Adjust based on your setup

// <Slider
//   value={[value]}
//   onValueChange={([val]) => onChange(val)}
//   min={0}
//   max={100}
//   step={1}
//   className="w-full"
//   style={{
//     "--tw-slider-color": value <= 20 ? "#22c55e" :  // Green
//                         value <= 50 ? "#fbbf24" :  // Amber
//                         value <= 80 ? "#f97316" :  // Orange
//                                       "#dc2626",  // Red
//   } as React.CSSProperties}
// />

// <style>
//   {`
//     /* Slider Thumb (Dot) */
//     .w-full [role="slider"] {
//       height: 16px;
//       width: 16px;
//       background-color: var(--tw-slider-color) !important;
//       border-radius: 50%;
//     }

//     /* Focus Effect */
//     .w-full [role="slider"]:focus {
//       outline: none;
//       box-shadow: 0 0 6px var(--tw-slider-color);
//     }

//     /* Default Track (Unfilled Part) */
//     .w-full [role="slider-track"] {
//       background-color: #e5e7eb; /* Gray */
//       height: 4px;
//       border-radius: 9999px;
//     }

//     /* Filled Track (Moves with Value) */
//     .w-full [role="slider-range"] {
//       background-color: var(--tw-slider-color) !important;
//       height: 4px;
//       border-radius: 9999px;
//     }
//   `}
// </style>

// <div className="flex justify-between mt-2 px-1">
//   <span className="text-green-600">Safe</span>
//   <span className="text-red-600">Aggressive</span>
// </div>

//     </div>
//   );
// };

// const TeamSlider = ({ value, onChange, onGenerate }: {
//   value: number;
//   onChange: (value: number) => void;
//   onGenerate: () => void;
// }) => {
//   return (
//     <div className="w-full max-w-2xl mx-auto mb-6 p-4 bg-green-600 rounded-lg shadow-sm">
//       <div className="flex flex-col gap-4">
//         <div className="flex items-center justify-between">
//           <span className="text-lg font-medium text-white">Number of Teams: <span className="text-black"> {value}</span> </span>
//           {/* <span className="text-lg font-bold text-yellow-300">₹{value * 5}</span> */}
//         </div>
//         <Slider
//           value={[value]}
//           onValueChange={([val]) => onChange(val)}
//           min={1}
//           max={100}
//           step={1}
//           className="w-full"
//         />
//         <div className="flex justify-between text-sm text-grey-800">
//           <span>1 Team</span>
//           <span>Max 100Team</span>
//         </div>
//         <Button
//           onClick={onGenerate}
//           className="bg-blue-600 hover:bg-blue-700 text-lg py-6"
//         >
//          <span className="text-black"> Generate Teams</span> <span className="text-yellow-300"> ₹{value *5}</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);
//   const [showFullTeams, setShowFullTeams] = useState(false);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//   const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
//   const [lastGeneratedCount, setLastGeneratedCount] = useState(0);

//   useEffect(() => {
//     const fetchMatchDetails = async () => {
//       try {
//         const docRef = doc(db, "cricket", "upcomingMatches");
//         const docSnap = await getDoc(docRef);
        
//         if (!docSnap.exists()) {
//           setError("No matches data found in Firestore");
//           return;
//         }
  
//         const data = docSnap.data();
        
//         if (!data.matches || !Array.isArray(data.matches)) {
//           setError("Matches data is not in expected format");
//           return;
//         }
  
//         const numericMatchId = Number(matchId);
//         const currentMatch = data.matches.find((match: any) =>
//           match.id === numericMatchId || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }
  
//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching match:", err);
//         setError("Failed to load match data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchDetails();
//   }, [matchId]);

//   const team1Abbr = teamAbbreviations[team1];
//   const team2Abbr = teamAbbreviations[team2];
//   const team1Data = team1Abbr ? IPL[team1Abbr] : null;
//   const team2Data = team2Abbr ? IPL[team2Abbr] : null;

//   const generateRandomTeams = () => {
//     if (!team1Data || !team2Data) return [];
    
//     const team1Players = [...(team1Data["Batters"] || []), ...(team1Data["All Rounders"] || []), ...(team1Data["Bowlers"] || [])];
//     const team2Players = [...(team2Data["Batters"] || []), ...(team2Data["All Rounders"] || []), ...(team2Data["Bowlers"] || [])];
    
//     const shuffledTeam1 = [...team1Players].sort(() => Math.random() - 0.5);
//     const shuffledTeam2 = [...team2Players].sort(() => Math.random() - 0.5);

//     const team1Wicketkeeper = shuffledTeam1.find((player) => player.role.includes("WK"));
//     const team2Wicketkeeper = shuffledTeam2.find((player) => player.role.includes("WK"));

//     const team1Selection = shuffledTeam1.slice(0, 6);
//     const team2Selection = shuffledTeam2.slice(0, 5);

//     const combinedTeam = [...team1Selection, ...team2Selection];
//     if (!combinedTeam.some((player) => player.role.includes("WK"))) {
//       if (team1Wicketkeeper) combinedTeam.push(team1Wicketkeeper);
//       else if (team2Wicketkeeper) combinedTeam.push(team2Wicketkeeper);
//     }

//     return combinedTeam.sort(() => Math.random() - 0.5).slice(0, 11);
//   };

//   const generateMultipleTeams = () => {
//     const newTeams = Array.from({ length: numTeams }, () => generateRandomTeams());
//     setGeneratedTeams(newTeams);
//     setSelectedTeamsToShare([]);
//     setExpandedTeam(null);
//     setLastGeneratedCount(numTeams);
//   };

//   const predictCaptainAndViceCaptain = (team: Player[]) => {
//     const battersAndAllRounders = team.filter(
//       (player) => player.role.includes("Batter") || player.role.includes("All-Rounder")
//     );
//     const sortedPlayers = [...battersAndAllRounders].sort(() => Math.random() - 0.5);
//     return {
//       captain: sortedPlayers[0],
//       viceCaptain: sortedPlayers[1]
//     };
//   };

//   const countPlayersByRole = (team: Player[]) => {
//     return {
//       WK: team.filter((player) => player.role.includes("WK")).length,
//       BAT: team.filter((player) => player.role.includes("Batter") && !player.role.includes("WK")).length,
//       AR: team.filter((player) => player.role.includes("All-Rounder")).length,
//       BOWL: team.filter((player) => player.role.includes("Bowler")).length,
//     };
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const toggleTeamExpansion = (index: number) => {
//     setExpandedTeam(expandedTeam === index ? null : index);
//   };

//   const shareTeams = () => {
//     const message = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map((team, i) => {
//         const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
        
//         const sortedPlayers = [...team].sort((a, b) => {
//           const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//           return roleOrder[a.role.split(' ')[0]] - roleOrder[b.role.split(' ')[0]];
//         });

//         return `Team ${i+1}:\nC: ${captain?.name}\nVC: ${viceCaptain?.name}\nPlayers:\n${
//           sortedPlayers.map(p => `${p.name} (${p.role.includes('WK') ? 'Wicketkeeper' : p.role})`).join('\n')
//         }`;
//       })
//       .join('\n\n');
    
//     const shareUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
//     window.open(shareUrl, '_blank');
//   };

//   const saveTeam = () => {
//     console.log("Saving team:", {
//       matchId,
//       players: selectedPlayers,
//       riskLevel
//     });
//     alert("Team saved successfully!");
//   };

//   const renderGeneratedTeams = () => {
//     return generatedTeams.map((team, index) => {
//       const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//       const roleCounts = countPlayersByRole(team);
//       const isExpanded = showFullTeams || expandedTeam === index;

//       return (
//         <Card key={index} className="mb-4  bg-[url('/Grass.jpg')] bg-cover bg-center">
//           <CardHeader className="pb-2">
//             <div className="flex justify-between items-center">
//               <CardTitle>Team {index + 1}</CardTitle>
//               <input
//                 type="checkbox"
//                 checked={selectedTeamsToShare.includes(index)}
//                 onChange={() => toggleTeamSelection(index)}
//                 className="h-5 w-5"
//               />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between mb-4">
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={captain?.image || "/fallback.jpg"}
//                   alt={captain?.name || "Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-yellow-500 mb-1"
//                 />
//                 <span className="font-medium">C: {captain?.name}</span>
//               </div>
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={viceCaptain?.image || "/fallback.jpg"}
//                   alt={viceCaptain?.name || "Vice Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-blue-500 mb-1"
//                 />
//                 <span className="font-medium">VC: {viceCaptain?.name}</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//               {Object.entries(roleCounts).map(([role, count]) => (
//                 <div key={role} className="bg-gray-100 p-2 rounded text-center">
//                   <div className="font-bold">{count}</div>
//                   <div>{role}</div>
//                 </div>
//               ))}
//             </div>

//             {isExpanded && (
//               <div className="space-y-2">
//                 {team
//                   .sort((a, b) => {
//                     const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//                     return roleOrder[a.role.split(' ')[0]] - roleOrder[b.role.split(' ')[0]];
//                   })
//                   .map((player, i) => (
//                     <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
//                       <Image
//                         src={player.image || "/fallback.jpg"}
//                         alt={player.name}
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium">{player.name}</p>
//                         <p className="text-sm text-gray-500">
//                           {player.role.includes('WK') ? 'Wicketkeeper' : player.role}
//                         </p>
//                       </div>
//                       {player.name === captain?.name && (
//                         <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                           C
//                         </span>
//                       )}
//                       {player.name === viceCaptain?.name && (
//                         <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                           VC
//                         </span>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             )}

//             <Button
//               variant="ghost"
//               size="sm"
//               className="w-full mt-2"
//               onClick={() => toggleTeamExpansion(index)}
//             >
//               {isExpanded ? "Hide Team" : "View Full Team"}
//             </Button>
//           </CardContent>
//         </Card>
//       );
//     });
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!team1 || !team2) {
//     return <div className="p-4 text-center">Match data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//       <TeamSlider
//         value={numTeams}
//         onChange={setNumTeams}
//         onGenerate={generateMultipleTeams}
//       />

//       {generatedTeams.length > 0 && (
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Generated Teams ({lastGeneratedCount})</h2>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="showFullTeams"
//                   checked={showFullTeams}
//                   onChange={() => setShowFullTeams(!showFullTeams)}
//                   className="h-4 w-4"
//                 />
//                 <label htmlFor="showFullTeams" className="text-sm">
//                   Show Full Teams
//                 </label>
//               </div>
//               {selectedTeamsToShare.length > 0 && (
//                 <Button
//                   onClick={shareTeams}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   Share ({selectedTeamsToShare.length})
//                 </Button>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {renderGeneratedTeams()}
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           Save Team
//         </Button>
//       </div>
//     </div>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Button } from "../../../components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";

// interface Player {
//   id: number;
//   name: string;
//   fullName: string;
//   role: string;
//   isCaptain: boolean;
//   isKeeper: boolean;
//   battingStyle: string;
//   bowlingStyle: string;
//   imageId: number;
//   team?: string;
// }

// interface SquadData {
//   matchInfo: {
//     id: number;
//     teams: {
//       [key: string]: {
//         id: number;
//         shortName: string;
//         imageId: number;
//       };
//     };
//   };
//   players: {
//     [key: string]: Player[];
//   };
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     if (risk === 0) return { rank: "3,590,001", prize: "49 Rs" };
//     if (risk <= 10) return { rank: "1,798,400", prize: "55 Rs" };
//     if (risk <= 20) return { rank: "359,000", prize: "100 Rs" };
//     if (risk <= 30) return { rank: "301,000", prize: "1,000 Rs" };
//     if (risk <= 40) return { rank: "251,000", prize: "1,500 Rs" };
//     if (risk <= 50) return { rank: "201,000", prize: "2,000 Rs" };
//     if (risk <= 60) return { rank: "151,000", prize: "2,500 Rs" };
//     if (risk <= 70) return { rank: "101,000", prize: "3,000 Rs" };
//     if (risk <= 80) return { rank: "21", prize: "9,000 Rs" };
//     if (risk <= 85) return { rank: "13", prize: "20,000 Rs" };
//     if (risk <= 90) return { rank: "12", prize: "25,000 Rs" };
//     if (risk <= 92) return { rank: "11", prize: "50,000 Rs" };
//     if (risk <= 94) return { rank: "10", prize: "1,00,000 Rs" };
//     if (risk <= 96) return { rank: "8", prize: "1,50,000 Rs" };
//     if (risk <= 98) return { rank: "6", prize: "2,00,000 Rs" };
//     if (risk <= 99) return { rank: "5", prize: "2,00,000 Rs" };
//     if (risk === 100) return { rank: "1", prize: "3 Crore Rs" };
//     return { rank: "1", prize: "3 Crore Rs" };
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-4 p-4 bg-white rounded-lg shadow-sm">
//       <div className="flex justify-between mb-2">
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       import { Slider } from "@/components/ui/slider"; // Adjust based on your setup

// <Slider
//   value={[value]}
//   onValueChange={([val]) => onChange(val)}
//   min={0}
//   max={100}
//   step={1}
//   className="w-full"
//   style={{
//     "--tw-slider-color": value <= 20 ? "#22c55e" :  // Green
//                         value <= 50 ? "#fbbf24" :  // Amber
//                         value <= 80 ? "#f97316" :  // Orange
//                                       "#dc2626",  // Red
//   } as React.CSSProperties}
// />

// <style>
//   {`
//     /* Slider Thumb (Dot) */
//     .w-full [role="slider"] {
//       height: 16px;
//       width: 16px;
//       background-color: var(--tw-slider-color) !important;
//       border-radius: 50%;
//     }

//     /* Focus Effect */
//     .w-full [role="slider"]:focus {
//       outline: none;
//       box-shadow: 0 0 6px var(--tw-slider-color);
//     }

//     /* Default Track (Unfilled Part) */
//     .w-full [role="slider-track"] {
//       background-color: #e5e7eb; /* Gray */
//       height: 4px;
//       border-radius: 9999px;
//     }

//     /* Filled Track (Moves with Value) */
//     .w-full [role="slider-range"] {
//       background-color: var(--tw-slider-color) !important;
//       height: 4px;
//       border-radius: 9999px;
//     }
//   `}
// </style>

// <div className="flex justify-between mt-2 px-1">
//   <span className="text-green-600">Safe</span>
//   <span className="text-red-600">Aggressive</span>
// </div>

//     </div>
//   );
// };



// const TeamSlider = ({ value, onChange, onGenerate }: {
//   value: number;
//   onChange: (value: number) => void;
//   onGenerate: () => void;
// }) => {
//   return (
//     <div className="w-full max-w-2xl mx-auto mb-6 p-4 bg-green-600 rounded-lg shadow-sm">
//       <div className="flex flex-col gap-4">
//         <div className="flex items-center justify-between">
//           <span className="text-lg font-medium text-white">Number of Teams: <span className="text-black"> {value}</span> </span>
//           {/* <span className="text-lg font-bold text-yellow-300">₹{value * 5}</span> */}
//         </div>
//         <Slider
//           value={[value]}
//           onValueChange={([val]) => onChange(val)}
//           min={1}
//           max={100}
//           step={1}
//           className="w-full"
//         />
//         <div className="flex justify-between text-sm text-grey-800">
//           <span>1 Team</span>
//           <span>Max 100Team</span>
//         </div>
//         <Button
//           onClick={onGenerate}
//           className="bg-blue-600 hover:bg-blue-700 text-lg py-6"
//         >
//          <span className="text-black"> Generate Teams</span> <span className="text-yellow-300"> ₹{value *5}</span>
//         </Button>
//       </div>
//     </div>
//   );
// };


// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);
//   const [showFullTeams, setShowFullTeams] = useState(false);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//   const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
//   const [lastGeneratedCount, setLastGeneratedCount] = useState(0);
//   const [squadData, setSquadData] = useState<SquadData | null>(null);

//   useEffect(() => {
//     const fetchMatchAndSquadData = async () => {
//       try {
//         setLoading(true);
        
//         // 1. Fetch match details
//         const matchesRef = doc(db, "cricket", "upcomingMatches");
//         const matchesSnap = await getDoc(matchesRef);
        
//         if (!matchesSnap.exists()) {
//           setError("No matches data found");
//           return;
//         }
  
//         const matchesData = matchesSnap.data();
//         const currentMatch = matchesData.matches.find((match: any) =>
//           match.id === Number(matchId) || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }
  
//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
        
//         // 2. Fetch squad data
//         const squadRef = doc(db, "squads", `match_${matchId}`);
//         const squadSnap = await getDoc(squadRef);
        
//         if (!squadSnap.exists()) {
//           setError("Squad data not available yet");
//           return;
//         }
        
//         const squad = squadSnap.data() as SquadData;
//         setSquadData(squad);
        
//         setError("");
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchAndSquadData();
//   }, [matchId]);

//   const generateRandomTeams = () => {
//     if (!squadData) return [];
    
//     const team1Players = squadData.players[team1] || [];
//     const team2Players = squadData.players[team2] || [];
    
//     const shuffledTeam1 = [...team1Players].sort(() => Math.random() - 0.5);
//     const shuffledTeam2 = [...team2Players].sort(() => Math.random() - 0.5);

//     const team1Wicketkeeper = shuffledTeam1.find((player) => player.isKeeper);
//     const team2Wicketkeeper = shuffledTeam2.find((player) => player.isKeeper);

//     const team1Selection = shuffledTeam1.slice(0, 6);
//     const team2Selection = shuffledTeam2.slice(0, 5);

//     const combinedTeam = [...team1Selection, ...team2Selection];
//     if (!combinedTeam.some((player) => player.isKeeper)) {
//       if (team1Wicketkeeper) combinedTeam.push(team1Wicketkeeper);
//       else if (team2Wicketkeeper) combinedTeam.push(team2Wicketkeeper);
//     }

//     return combinedTeam
//       .map(player => ({
//         ...player,
//         team: team1Selection.includes(player) ? team1 : team2
//       }))
//       .sort(() => Math.random() - 0.5)
//       .slice(0, 11);
//   };

//   const generateMultipleTeams = () => {
//     const newTeams = Array.from({ length: numTeams }, () => generateRandomTeams());
//     setGeneratedTeams(newTeams);
//     setSelectedTeamsToShare([]);
//     setExpandedTeam(null);
//     setLastGeneratedCount(numTeams);
//   };

//   const predictCaptainAndViceCaptain = (team: Player[]) => {
//     const battersAndAllRounders = team.filter(
//       (player) => player.role.includes("Batter") || player.role.includes("All-Rounder")
//     );
//     const sortedPlayers = [...battersAndAllRounders].sort(() => Math.random() - 0.5);
//     return {
//       captain: sortedPlayers[0],
//       viceCaptain: sortedPlayers[1]
//     };
//   };

//   const countPlayersByRole = (team: Player[]) => {
//     return {
//       WK: team.filter((player) => player.isKeeper).length,
//       BAT: team.filter((player) =>
//         player.role.includes("Batter") && !player.isKeeper
//       ).length,
//       AR: team.filter((player) => player.role.includes("All-Rounder")).length,
//       BOWL: team.filter((player) => player.role.includes("Bowler")).length,
//     };
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const toggleTeamExpansion = (index: number) => {
//     setExpandedTeam(expandedTeam === index ? null : index);
//   };

//   const shareTeams = () => {
//     const message = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map((team, i) => {
//         const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
        
//         const sortedPlayers = [...team].sort((a, b) => {
//           const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//           return roleOrder[a.role.split(' ')[0]] - roleOrder[b.role.split(' ')[0]];
//         });

//         return `Team ${i+1}:\nC: ${captain?.name}\nVC: ${viceCaptain?.name}\nPlayers:\n${
//           sortedPlayers.map(p => `${p.name} (${p.role.includes('WK') ? 'Wicketkeeper' : p.role})`).join('\n')
//         }`;
//       })
//       .join('\n\n');
    
//     const shareUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
//     window.open(shareUrl, '_blank');
//   };

//   const saveTeam = () => {
//     console.log("Saving team:", {
//       matchId,
//       players: selectedPlayers,
//       riskLevel
//     });
//     alert("Team saved successfully!");
//   };


//   const renderGeneratedTeams = () => {
//     return generatedTeams.map((team, index) => {
//       const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//       const roleCounts = countPlayersByRole(team);
//       const isExpanded = showFullTeams || expandedTeam === index;

//       return (
//         <Card key={index} className="mb-4 bg-[url('/Grass.jpg')] bg-cover bg-center">
//           <CardHeader className="pb-2">
//             <div className="flex justify-between items-center">
//               <CardTitle>Team {index + 1}</CardTitle>
//               <input
//                 type="checkbox"
//                 checked={selectedTeamsToShare.includes(index)}
//                 onChange={() => toggleTeamSelection(index)}
//                 className="h-5 w-5"
//               />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between mb-4">
//               <div className="flex flex-col items-center text-center">
//                 <div className="w-12 h-12 rounded-full border-2 border-yellow-500 mb-1 bg-gray-200 flex items-center justify-center">
//                   {captain?.name.charAt(0)}
//                 </div>
//                 <span className="font-medium">C: {captain?.name}</span>
//                 <span className="text-xs">{captain?.team}</span>
//               </div>
//               <div className="flex flex-col items-center text-center">
//                 <div className="w-12 h-12 rounded-full border-2 border-blue-500 mb-1 bg-gray-200 flex items-center justify-center">
//                   {viceCaptain?.name.charAt(0)}
//                 </div>
//                 <span className="font-medium">VC: {viceCaptain?.name}</span>
//                 <span className="text-xs">{viceCaptain?.team}</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//               {Object.entries(roleCounts).map(([role, count]) => (
//                 <div key={role} className="bg-gray-100 p-2 rounded text-center">
//                   <div className="font-bold">{count}</div>
//                   <div>{role}</div>
//                 </div>
//               ))}
//             </div>

//             {isExpanded && (
//               <div className="space-y-2">
//                 {team
//                   .sort((a, b) => {
//                     const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//                     return roleOrder[a.role.split(' ')[0]] - roleOrder[b.role.split(' ')[0]];
//                   })
//                   .map((player, i) => (
//                     <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
//                       <Image
//                         src={player.image || "/fallback.jpg"}
//                         alt={player.name}
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium">{player.name}</p>
//                         <p className="text-sm text-gray-500">
//                           {player.role.includes('WK') ? 'Wicketkeeper' : player.role}
//                         </p>
//                       </div>
//                       {player.name === captain?.name && (
//                         <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                           C
//                         </span>
//                       )}
//                       {player.name === viceCaptain?.name && (
//                         <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                           VC
//                         </span>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             )}

//             <Button
//               variant="ghost"
//               size="sm"
//               className="w-full mt-2"
//               onClick={() => toggleTeamExpansion(index)}
//             >
//               {isExpanded ? "Hide Team" : "View Full Team"}
//             </Button>
//           </CardContent>
//         </Card>
//       );
//     });
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!squadData) {
//     return <div className="p-4 text-center">Squad data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//       <TeamSlider
//         value={numTeams}
//         onChange={setNumTeams}
//         onGenerate={generateMultipleTeams}
//       />

//       {generatedTeams.length > 0 && (
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Generated Teams ({lastGeneratedCount})</h2>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="showFullTeams"
//                   checked={showFullTeams}
//                   onChange={() => setShowFullTeams(!showFullTeams)}
//                   className="h-4 w-4"
//                 />
//                 <label htmlFor="showFullTeams" className="text-sm">
//                   Show Full Teams
//                 </label>
//               </div>
//               {selectedTeamsToShare.length > 0 && (
//                 <Button
//                   onClick={shareTeams}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   Share ({selectedTeamsToShare.length})
//                 </Button>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {renderGeneratedTeams()}
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           Save Team
//         </Button>
//       </div>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// // import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { Button } from "../../../components/ui/button";

// interface Player {
//   id: number;
//   name: string;
//   fullName: string;
//   role: string;
//   isCaptain: boolean;
//   isKeeper: boolean;
//   battingStyle: string;
//   bowlingStyle: string;
//   imageId: number;
//   team?: string;
// }

// interface SquadData {
//   matchInfo: {
//     id: number;
//     teams: {
//       [key: string]: {
//         id: number;
//         shortName: string;
//         imageId: number;
//       };
//     };
//   };
//   players: {
//     [key: string]: Player[];
//   };
//   lastUpdated: string;
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     if (risk === 0) return { rank: "3,590,001", prize: "49 Rs" };
//     if (risk <= 10) return { rank: "1,798,400", prize: "55 Rs" };
//     if (risk <= 20) return { rank: "359,000", prize: "100 Rs" };
//     if (risk <= 30) return { rank: "301,000", prize: "1,000 Rs" };
//     if (risk <= 40) return { rank: "251,000", prize: "1,500 Rs" };
//     if (risk <= 50) return { rank: "201,000", prize: "2,000 Rs" };
//     if (risk <= 60) return { rank: "151,000", prize: "2,500 Rs" };
//     if (risk <= 70) return { rank: "101,000", prize: "3,000 Rs" };
//     if (risk <= 80) return { rank: "21", prize: "9,000 Rs" };
//     if (risk <= 85) return { rank: "13", prize: "20,000 Rs" };
//     if (risk <= 90) return { rank: "12", prize: "25,000 Rs" };
//     if (risk <= 92) return { rank: "11", prize: "50,000 Rs" };
//     if (risk <= 94) return { rank: "10", prize: "1,00,000 Rs" };
//     if (risk <= 96) return { rank: "8", prize: "1,50,000 Rs" };
//     if (risk <= 98) return { rank: "6", prize: "20,000,00 Rs" };
//     if (risk <= 99) return { rank: "5", prize: "20,000,00 Rs" };
//     if (risk === 100) return { rank: "1", prize: "3 Crore Rs" };
//     return { rank: "1", prize: "3 Crore Rs" };
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-4 p-4 bg-white rounded-lg shadow-sm">
//       <div className="flex justify-between mb-2">
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={0}
//         max={100}
//         step={1}
//         className="w-full"
//       />
//       <div className="flex justify-between mt-2 px-1">
//         <span className="text-green-600">Safe</span>
//         <span className="text-red-600">Aggressive</span>
//       </div>
//     </div>
//   );
// };

// const TeamSlider = ({ value, onChange, onGenerate }: {
//   value: number;
//   onChange: (value: number) => void;
//   onGenerate: () => void;
// }) => {
//   return (
//     <div className="w-full max-w-2xl mx-auto mb-6 p-4 bg-green-600 rounded-lg shadow-sm">
//       <div className="flex flex-col gap-4">
//         <div className="flex items-center justify-between">
//           <span className="text-lg font-medium text-white">Number of Teams: <span className="text-black"> {value}</span> </span>
//         </div>
//         <Slider
//           value={[value]}
//           onValueChange={([val]) => onChange(val)}
//           min={1}
//           max={100}
//           step={1}
//           className="w-full"
//         />
//         <div className="flex justify-between text-sm text-grey-800">
//           <span>1 Team</span>
//           <span>Max 100Team</span>
//         </div>
//         <Button
//           onClick={onGenerate}
//           className="bg-blue-600 hover:bg-blue-700 text-lg py-6"
//         >
//          <span className="text-black"> Generate Teams</span> <span className="text-yellow-300"> ₹{value *5}</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);
//   const [showFullTeams, setShowFullTeams] = useState(false);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//   const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
//   const [lastGeneratedCount, setLastGeneratedCount] = useState(0);
//   const [squadData, setSquadData] = useState<SquadData | null>(null);
//   const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

//   useEffect(() => {
//     const fetchMatchAndSquadData = async () => {
//       try {
//         setLoading(true);
        
//         // 1. Fetch match details
//         const matchesRef = doc(db, "cricket", "upcomingMatches");
//         const matchesSnap = await getDoc(matchesRef);
        
//         if (!matchesSnap.exists()) {
//           setError("No matches data found");
//           return;
//         }
  
//         const matchesData = matchesSnap.data();
//         const currentMatch = matchesData.matches.find((match: any) =>
//           match.id === Number(matchId) || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }
  
//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
        
//         // 2. Fetch squad data
//         const squadRef = doc(db, "squads", `match_${matchId}`);
//         const squadSnap = await getDoc(squadRef);
        
//         if (!squadSnap.exists()) {
//           setError("Squad data not available yet");
//           return;
//         }
        
//         const squad = squadSnap.data() as SquadData;
//         setSquadData(squad);
        
//         setError("");
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchAndSquadData();
//   }, [matchId]);

//   const generateRandomTeams = () => {
//     if (!squadData) return [];
    
//     const team1Players = squadData.players[team1] || [];
//     const team2Players = squadData.players[team2] || [];
    
//     const shuffledTeam1 = [...team1Players].sort(() => Math.random() - 0.5);
//     const shuffledTeam2 = [...team2Players].sort(() => Math.random() - 0.5);

//     const team1Wicketkeeper = shuffledTeam1.find((player) => player.isKeeper);
//     const team2Wicketkeeper = shuffledTeam2.find((player) => player.isKeeper);

//     const team1Selection = shuffledTeam1.slice(0, 6);
//     const team2Selection = shuffledTeam2.slice(0, 5);

//     const combinedTeam = [...team1Selection, ...team2Selection];
//     if (!combinedTeam.some((player) => player.isKeeper)) {
//       if (team1Wicketkeeper) combinedTeam.push(team1Wicketkeeper);
//       else if (team2Wicketkeeper) combinedTeam.push(team2Wicketkeeper);
//     }

//     return combinedTeam
//       .map(player => ({
//         ...player,
//         team: team1Selection.includes(player) ? team1 : team2
//       }))
//       .sort(() => Math.random() - 0.5)
//       .slice(0, 11);
//   };

//   const generateMultipleTeams = () => {
//     const newTeams = Array.from({ length: numTeams }, () => generateRandomTeams());
//     setGeneratedTeams(newTeams);
//     setSelectedTeamsToShare([]);
//     setExpandedTeam(null);
//     setLastGeneratedCount(numTeams);
//   };

//   const predictCaptainAndViceCaptain = (team: Player[]) => {
//     const battersAndAllRounders = team.filter(
//       (player) => player.role.includes("Batter") || player.role.includes("All-Rounder")
//     );
//     const sortedPlayers = [...battersAndAllRounders].sort(() => Math.random() - 0.5);
//     return {
//       captain: sortedPlayers[0],
//       viceCaptain: sortedPlayers[1]
//     };
//   };

//   const countPlayersByRole = (team: Player[]) => {
//     return {
//       WK: team.filter((player) => player.isKeeper).length,
//       BAT: team.filter((player) =>
//         player.role.includes("Batter") && !player.isKeeper
//       ).length,
//       AR: team.filter((player) => player.role.includes("All-Rounder")).length,
//       BOWL: team.filter((player) => player.role.includes("Bowler")).length,
//     };
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const toggleTeamExpansion = (index: number) => {
//     setExpandedTeam(expandedTeam === index ? null : index);
//   };

//   const shareTeams = () => {
//     const message = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map((team, i) => {
//         const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
        
//         const sortedPlayers = [...team].sort((a, b) => {
//           const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//           return roleOrder[a.role.split(' ')[0]] - roleOrder[b.role.split(' ')[0]];
//         });

//         return `Team ${i+1}:\nC: ${captain?.name}\nVC: ${viceCaptain?.name}\nPlayers:\n${
//           sortedPlayers.map(p => `${p.name} (${p.role.includes('WK') ? 'Wicketkeeper' : p.role})`).join('\n')
//         }`;
//       })
//       .join('\n\n');
    
//     const shareUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
//     window.open(shareUrl, '_blank');
//   };

//   const saveTeam = () => {
//     if (selectedPlayers.length !== 11) {
//       alert("Please select exactly 11 players before saving");
//       return;
//     }

//     console.log("Saving team:", {
//       matchId,
//       players: selectedPlayers,
//       riskLevel
//     });
    
//     alert("Team saved successfully!");
//   };

//   const renderGeneratedTeams = () => {
//     return generatedTeams.map((team, index) => {
//       const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//       const roleCounts = countPlayersByRole(team);
//       const isExpanded = showFullTeams || expandedTeam === index;

//       return (
//         <Card key={index} className="mb-4 bg-[url('/Grass.jpg')] bg-cover bg-center">
//           <CardHeader className="pb-2">
//             <div className="flex justify-between items-center">
//               <CardTitle>Team {index + 1}</CardTitle>
//               <input
//                 type="checkbox"
//                 checked={selectedTeamsToShare.includes(index)}
//                 onChange={() => toggleTeamSelection(index)}
//                 className="h-5 w-5"
//               />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between mb-4">
//               <div className="flex flex-col items-center text-center">
//                 <div className="w-12 h-12 rounded-full border-2 border-yellow-500 mb-1 bg-gray-200 flex items-center justify-center">
//                   {captain?.name.charAt(0)}
//                 </div>
//                 <span className="font-medium">C: {captain?.name}</span>
//                 <span className="text-xs">{captain?.team}</span>
//               </div>
//               <div className="flex flex-col items-center text-center">
//                 <div className="w-12 h-12 rounded-full border-2 border-blue-500 mb-1 bg-gray-200 flex items-center justify-center">
//                   {viceCaptain?.name.charAt(0)}
//                 </div>
//                 <span className="font-medium">VC: {viceCaptain?.name}</span>
//                 <span className="text-xs">{viceCaptain?.team}</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//               {Object.entries(roleCounts).map(([role, count]) => (
//                 <div key={role} className="bg-gray-100 p-2 rounded text-center">
//                   <div className="font-bold">{count}</div>
//                   <div>{role}</div>
//                 </div>
//               ))}
//             </div>

//             {isExpanded && (
//               <div className="space-y-2">
//                 {team
//                   .sort((a, b) => {
//                     const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//                     return roleOrder[a.role.split(' ')[0]] - roleOrder[b.role.split(' ')[0]];
//                   })
//                   .map((player, i) => (
//                     <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
//                       <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//                         {player.name.charAt(0)}
//                       </div>
//                       <div className="flex-1">
//                         <p className="font-medium">{player.name}</p>
//                         <p className="text-sm text-gray-500">
//                           {player.role.includes('WK') ? 'Wicketkeeper' : player.role}
//                         </p>
//                       </div>
//                       {player.name === captain?.name && (
//                         <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                           C
//                         </span>
//                       )}
//                       {player.name === viceCaptain?.name && (
//                         <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                           VC
//                         </span>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             )}

//             <Button
//               variant="ghost"
//               size="sm"
//               className="w-full mt-2"
//               onClick={() => toggleTeamExpansion(index)}
//             >
//               {isExpanded ? "Hide Team" : "View Full Team"}
//             </Button>
//           </CardContent>
//         </Card>
//       );
//     });
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!squadData) {
//     return <div className="p-4 text-center">Squad data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-center">
//         {team1} vs {team2}
//       </h1>
      
//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//       <TeamSlider
//         value={numTeams}
//         onChange={setNumTeams}
//         onGenerate={generateMultipleTeams}
//       />

//       {generatedTeams.length > 0 && (
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Generated Teams ({lastGeneratedCount})</h2>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="showFullTeams"
//                   checked={showFullTeams}
//                   onChange={() => setShowFullTeams(!showFullTeams)}
//                   className="h-4 w-4"
//                 />
//                 <label htmlFor="showFullTeams" className="text-sm">
//                   Show Full Teams
//                 </label>
//               </div>
//               {selectedTeamsToShare.length > 0 && (
//                 <Button
//                   onClick={shareTeams}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   Share ({selectedTeamsToShare.length})
//                 </Button>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {renderGeneratedTeams()}
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           Save Team
//         </Button>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { collection, doc, getDoc, getDocs } from "firebase/firestore";
// import { Button } from "../../../components/ui/button";

// interface Player {
//   id: string;
//   name: string;
//   role: string;
//   isCaptain?: boolean;
//   isKeeper?: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   image?: string;
//   team?: string;
// }

// interface SquadData {
//   matchInfo: {
//     id: number;
//     teams: {
//       [key: string]: {
//         id: number;
//         shortName: string;
//         imageId: number;
//       };
//     };
//   };
//   players: {
//     [key: string]: Player[];
//   };
//   lastUpdated: string;
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     if (risk === 0) return { rank: "3,590,001", prize: "49 Rs" };
//     if (risk <= 10) return { rank: "1,798,400", prize: "55 Rs" };
//     if (risk <= 20) return { rank: "359,000", prize: "100 Rs" };
//     if (risk <= 30) return { rank: "301,000", prize: "1,000 Rs" };
//     if (risk <= 40) return { rank: "251,000", prize: "1,500 Rs" };
//     if (risk <= 50) return { rank: "201,000", prize: "2,000 Rs" };
//     if (risk <= 60) return { rank: "151,000", prize: "2,500 Rs" };
//     if (risk <= 70) return { rank: "101,000", prize: "3,000 Rs" };
//     if (risk <= 80) return { rank: "21", prize: "9,000 Rs" };
//     if (risk <= 85) return { rank: "13", prize: "20,000 Rs" };
//     if (risk <= 90) return { rank: "12", prize: "25,000 Rs" };
//     if (risk <= 92) return { rank: "11", prize: "50,000 Rs" };
//     if (risk <= 94) return { rank: "10", prize: "1,00,000 Rs" };
//     if (risk <= 96) return { rank: "8", prize: "1,50,000 Rs" };
//     if (risk <= 98) return { rank: "6", prize: "2,00,000 Rs" };
//     if (risk <= 99) return { rank: "5", prize: "2,00,000 Rs" };
//     if (risk === 100) return { rank: "1", prize: "3 Crore Rs" };
//     return { rank: "1", prize: "3 Crore Rs" };
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-4 p-4 bg-white rounded-lg shadow-sm">
//       <div className="flex justify-between mb-2">
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={0}
//         max={100}
//         step={1}
//         className="w-full"
//       />
//       <div className="flex justify-between mt-2 px-1">
//         <span className="text-green-600">Safe</span>
//         <span className="text-red-600">Aggressive</span>
//       </div>
//     </div>
//   );
// };

// const TeamSlider = ({ value, onChange, onGenerate }: {
//   value: number;
//   onChange: (value: number) => void;
//   onGenerate: () => void;
// }) => {
//   return (
//     <div className="w-full max-w-2xl mx-auto mb-6 p-4 bg-green-600 rounded-lg shadow-sm">
//       <div className="flex flex-col gap-4">
//         <div className="flex items-center justify-between">
//           <span className="text-lg font-medium text-white">Number of Teams: <span className="p-2 rounded-full bg-gray-600"> {value}</span> </span>
//         </div>
//         <Slider
//           value={[value]}
//           onValueChange={([val]) => onChange(val)}
//           min={1}
//           max={100}
//           step={1}
//           className="w-full"
//         />
//         <div className="flex justify-between text-sm text-grey-800">
//           <span>1 Team</span>
//           <span>Max 100Team</span>
//         </div>
//         <Button
//           onClick={onGenerate}
//           className="bg-blue-600 hover:bg-blue-700 text-lg py-6"
//         >
//          <span className="text-white"> Generate Teams</span> <span className="text-yellow-300"> ₹{value *5}</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);
//   const [showFullTeams, setShowFullTeams] = useState(false);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//   const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
//   const [lastGeneratedCount, setLastGeneratedCount] = useState(0);
//   const [squadData, setSquadData] = useState<SquadData | null>(null);
//   const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

//   useEffect(() => {
//     const fetchMatchAndSquadData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch match data
//         const matchesRef = doc(db, "cricket", "upcomingMatches");
//         const matchesSnap = await getDoc(matchesRef);
        
//         if (!matchesSnap.exists()) {
//           setError("No matches data found");
//           return;
//         }

//         const matchesData = matchesSnap.data();
//         const currentMatch = matchesData.matches.find((match: any) =>
//           match.id === Number(matchId) || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }

//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
        
//         // Fetch players from Firestore teams collection
//         const fetchTeamPlayers = async (teamShortName: string) => {
//           try {
//             const teamRef = collection(db, "teams", teamShortName, "players");
//             const querySnapshot = await getDocs(teamRef);
//             return querySnapshot.docs.map(doc => ({
//               id: doc.id,
//               name: doc.data().name || "Unknown Player",
//               role: doc.data().role || "Player",
//               isCaptain: doc.data().isCaptain || false,
//               isKeeper: doc.data().isKeeper || false,
//               battingStyle: doc.data().battingStyle || "",
//               bowlingStyle: doc.data().bowlingStyle || "",
//               image: doc.data().image || "/fallback.jpg",
//               team: teamShortName
//             })) as Player[];
//           } catch (err) {
//             console.error(`Error fetching players for ${teamShortName}:`, err);
//             return [];
//           }
//         };

//         const [team1Players, team2Players] = await Promise.all([
//           fetchTeamPlayers(currentMatch.team1),
//           fetchTeamPlayers(currentMatch.team2)
//         ]);

//         console.log("Fetched players:", {
//           team1: currentMatch.team1,
//           team1Players,
//           team2: currentMatch.team2,
//           team2Players
//         });

//         // Create squad data structure
//         const squad: SquadData = {
//           matchInfo: {
//             id: Number(matchId),
//             teams: {
//               [currentMatch.team1]: {
//                 id: 0,
//                 shortName: currentMatch.team1,
//                 imageId: 0
//               },
//               [currentMatch.team2]: {
//                 id: 0,
//                 shortName: currentMatch.team2,
//                 imageId: 0
//               }
//             },
//           },
//           players: {
//             [currentMatch.team1]: team1Players,
//             [currentMatch.team2]: team2Players
//           },
//           lastUpdated: new Date().toISOString()
//         };

//         setSquadData(squad);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchAndSquadData();
//   }, [matchId]);

//   const generateRandomTeams = () => {
//     if (!squadData) return [];
    
//     const team1Players = squadData.players[team1] || [];
//     const team2Players = squadData.players[team2] || [];
    
//     console.log("Generating teams from:", {
//       team1,
//       team1Players,
//       team2,
//       team2Players
//     });

//     // Enhance players with team information
//     const enhancedTeam1Players = team1Players.map(player => ({
//       ...player,
//       team: team1
//     }));

//     const enhancedTeam2Players = team2Players.map(player => ({
//       ...player,
//       team: team2
//     }));

//     const shuffledTeam1 = [...enhancedTeam1Players].sort(() => Math.random() - 0.5);
//     const shuffledTeam2 = [...enhancedTeam2Players].sort(() => Math.random() - 0.5);

//     const team1Wicketkeeper = shuffledTeam1.find((player) => player.isKeeper);
//     const team2Wicketkeeper = shuffledTeam2.find((player) => player.isKeeper);

//     const team1Selection = shuffledTeam1.slice(0, 6);
//     const team2Selection = shuffledTeam2.slice(0, 5);

//     const combinedTeam = [...team1Selection, ...team2Selection];
//     if (!combinedTeam.some((player) => player.isKeeper)) {
//       if (team1Wicketkeeper) combinedTeam.push(team1Wicketkeeper);
//       else if (team2Wicketkeeper) combinedTeam.push(team2Wicketkeeper);
//     }

//     const finalTeam = combinedTeam.sort(() => Math.random() - 0.5).slice(0, 11);
//     console.log("Generated team:", finalTeam);
//     return finalTeam;
//   };

//   const generateMultipleTeams = () => {
//     const newTeams = Array.from({ length: numTeams }, () => generateRandomTeams());
//     setGeneratedTeams(newTeams);
//     setSelectedTeamsToShare([]);
//     setExpandedTeam(null);
//     setLastGeneratedCount(numTeams);
//   };

//   const predictCaptainAndViceCaptain = (team: Player[]) => {
//     const battersAndAllRounders = team.filter(
//       (player) => player.role.includes("Batter") || player.role.includes("All-Rounder")
//     );
//     const sortedPlayers = [...battersAndAllRounders].sort(() => Math.random() - 0.5);
//     return {
//       captain: sortedPlayers[0],
//       viceCaptain: sortedPlayers[1]
//     };
//   };

//   const countPlayersByRole = (team: Player[]) => {
//     return {
//       WK: team.filter((player) => player.isKeeper).length,
//       BAT: team.filter((player) =>
//         player.role.includes("Batter") && !player.isKeeper
//       ).length,
//       AR: team.filter((player) => player.role.includes("All-Rounder")).length,
//       BOWL: team.filter((player) => player.role.includes("Bowler")).length,
//     };
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const toggleTeamExpansion = (index: number) => {
//     setExpandedTeam(expandedTeam === index ? null : index);
//   };

//   const shareTeams = () => {
//     const message = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map((team, i) => {
//         const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
        
//         const sortedPlayers = [...team].sort((a, b) => {
//           const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//           return roleOrder[a.role.split(' ')[0]] - roleOrder[b.role.split(' ')[0]];
//         });

//         return `Team ${i+1}:\nC: ${captain?.name}\nVC: ${viceCaptain?.name}\nPlayers:\n${
//           sortedPlayers.map(p => `${p.name} (${p.role.includes('WK') ? 'Wicketkeeper' : p.role})`).join('\n')
//         }`;
//       })
//       .join('\n\n');
    
//     const shareUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
//     window.open(shareUrl, '_blank');
//   };

//   const saveTeam = () => {
//     if (selectedPlayers.length !== 11) {
//       alert("Please select exactly 11 players before saving");
//       return;
//     }

//     console.log("Saving team:", {
//       matchId,
//       players: selectedPlayers,
//       riskLevel
//     });
    
//     alert("Team saved successfully!");
//   };

//   const renderGeneratedTeams = () => {
//     return generatedTeams.map((team, index) => {
//       const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//       const roleCounts = countPlayersByRole(team);
//       const isExpanded = showFullTeams || expandedTeam === index;

//       return (
//         <Card key={index} className="mb-4 bg-[url('/Grass.jpg')] bg-cover bg-center">
//           <CardHeader className="pb-2">
//             <div className="flex justify-between items-center">
//               <CardTitle>Team {index + 1}</CardTitle>
//               <input
//                 type="checkbox"
//                 checked={selectedTeamsToShare.includes(index)}
//                 onChange={() => toggleTeamSelection(index)}
//                 className="h-5 w-5"
//               />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between mb-4">
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={captain?.image || "/fallback.jpg"}
//                   alt={captain?.name || "Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-yellow-500 mb-1"
//                 />
//                 <span className="font-medium">C: {captain?.name || "Captain"}</span>
//                 <span className="text-xs">{captain?.team}</span>
//               </div>
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={viceCaptain?.image || "/fallback.jpg"}
//                   alt={viceCaptain?.name || "Vice Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-blue-500 mb-1"
//                 />
//                 <span className="font-medium">VC: {viceCaptain?.name || "Vice Captain"}</span>
//                 <span className="text-xs">{viceCaptain?.team}</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//               {Object.entries(roleCounts).map(([role, count]) => (
//                 <div key={role} className="bg-gray-100 p-2 rounded text-center">
//                   <div className="font-bold">{count}</div>
//                   <div>{role}</div>
//                 </div>
//               ))}
//             </div>

//             {isExpanded && (
//               <div className="space-y-2">
//                 {team
//                   .sort((a, b) => {
//                     const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//                     return roleOrder[a.role.split(' ')[0]] - roleOrder[b.role.split(' ')[0]];
//                   })
//                   .map((player, i) => (
//                     <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
//                       <Image
//                         src={player.image || "/fallback.jpg"}
//                         alt={player.name || "Player"}
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium">{player.name || "Unknown Player"}</p>
//                         <p className="text-sm text-gray-500">
//                           {player.role?.includes('WK') ? 'Wicketkeeper' : player.role || "Player"}
//                         </p>
//                       </div>
//                       {player.name === captain?.name && (
//                         <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                           C
//                         </span>
//                       )}
//                       {player.name === viceCaptain?.name && (
//                         <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                           VC
//                         </span>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             )}

//             <Button
//               variant="ghost"
//               size="sm"
//               className="w-full mt-2 text-white"
//               onClick={() => toggleTeamExpansion(index)}
//             >
//               {isExpanded ? "Hide Team" : "View Full Team"}
//             </Button>
//           </CardContent>
//         </Card>
//       );
//     });
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!squadData) {
//     return <div className="p-4 text-center">Squad data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-center">
//         {team1} vs {team2}
//       </h1>
      
//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//       <TeamSlider
//         value={numTeams}
//         onChange={setNumTeams}
//         onGenerate={generateMultipleTeams}
//       />

//       {generatedTeams.length > 0 && (
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Generated Teams ({lastGeneratedCount})</h2>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="showFullTeams"
//                   checked={showFullTeams}
//                   onChange={() => setShowFullTeams(!showFullTeams)}
//                   className="h-4 w-4"
//                 />
//                 <label htmlFor="showFullTeams" className="text-sm">
//                   Show Full Teams
//                 </label>
//               </div>
//               {selectedTeamsToShare.length > 0 && (
//                 <Button
//                   onClick={shareTeams}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   Share ({selectedTeamsToShare.length})
//                 </Button>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {renderGeneratedTeams()}
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           Save Team
//         </Button>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { collection, doc, getDoc, getDocs } from "firebase/firestore";
// import { Button } from "../../../components/ui/button";
// // import { Button } from "@/components/ui/button";

// interface Player {
//   id: string;
//   name: string;
//   role: string;
//   isCaptain?: boolean;
//   isKeeper?: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   image?: string;
//   team?: string;
// }

// interface SquadData {
//   matchInfo: {
//     id: number;
//     teams: {
//       [key: string]: {
//         id: number;
//         shortName: string;
//         imageId: number;
//       };
//     };
//   };
//   players: {
//     [key: string]: Player[];
//   };
//   lastUpdated: string;
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     if (risk === 0) return { rank: "3,590,001", prize: "49 Rs" };
//     if (risk <= 10) return { rank: "1,798,400", prize: "55 Rs" };
//     if (risk <= 20) return { rank: "359,000", prize: "100 Rs" };
//     if (risk <= 30) return { rank: "301,000", prize: "1,000 Rs" };
//     if (risk <= 40) return { rank: "251,000", prize: "1,500 Rs" };
//     if (risk <= 50) return { rank: "201,000", prize: "2,000 Rs" };
//     if (risk <= 60) return { rank: "151,000", prize: "2,500 Rs" };
//     if (risk <= 70) return { rank: "101,000", prize: "3,000 Rs" };
//     if (risk <= 80) return { rank: "21", prize: "9,000 Rs" };
//     if (risk <= 85) return { rank: "13", prize: "20,000 Rs" };
//     if (risk <= 90) return { rank: "12", prize: "25,000 Rs" };
//     if (risk <= 92) return { rank: "11", prize: "50,000 Rs" };
//     if (risk <= 94) return { rank: "10", prize: "1,00,000 Rs" };
//     if (risk <= 96) return { rank: "8", prize: "1,50,000 Rs" };
//     if (risk <= 98) return { rank: "6", prize: "2,00,000 Rs" };
//     if (risk <= 99) return { rank: "5", prize: "2,00,000 Rs" };
//     if (risk === 100) return { rank: "1", prize: "3 Crore Rs" };
//     return { rank: "1", prize: "3 Crore Rs" };
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-4 p-4 bg-white rounded-lg shadow-sm">
//       <div className="flex justify-between mb-2">
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={0}
//         max={100}
//         step={1}
//         className="w-full"
//       />
//       <div className="flex justify-between mt-2 px-1">
//         <span className="text-green-600">Safe</span>
//         <span className="text-red-600">Aggressive</span>
//       </div>
//     </div>
//   );
// };

// const TeamSlider = ({ value, onChange, onGenerate }: {
//   value: number;
//   onChange: (value: number) => void;
//   onGenerate: () => void;
// }) => {
//   return (
//     <div className="w-full max-w-2xl mx-auto mb-6 p-4 bg-green-600 rounded-lg shadow-sm">
//       <div className="flex flex-col gap-4">
//         <div className="flex items-center justify-between">
//           <span className="text-lg font-medium text-white">Number of Teams: <span className="p-2 rounded-full bg-gray-600"> {value}</span> </span>
//         </div>
//         <Slider
//           value={[value]}
//           onValueChange={([val]) => onChange(val)}
//           min={1}
//           max={100}
//           step={1}
//           className="w-full"
//         />
//         <div className="flex justify-between text-sm text-grey-800">
//           <span>1 Team</span>
//           <span>Max 100Team</span>
//         </div>
//         <Button
//           onClick={onGenerate}
//           className="bg-blue-600 hover:bg-blue-700 text-lg py-6"
//         >
//          <span className="text-white"> Generate Teams</span> <span className="text-yellow-300"> ₹{value *5}</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);
//   const [showFullTeams, setShowFullTeams] = useState(false);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//   const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
//   const [lastGeneratedCount, setLastGeneratedCount] = useState(0);
//   const [squadData, setSquadData] = useState<SquadData | null>(null);
//   const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

//   const fetchTeamPlayers = async (teamShortName: string) => {
//     try {
//       const teamRef = collection(db, "teams", teamShortName, "players");
//       const querySnapshot = await getDocs(teamRef);
//       return querySnapshot.docs.map(doc => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           name: data.name || "Unknown Player",
//           role: data.role || "Player",
//           isCaptain: data.captain || false,
//           isKeeper: data.role?.includes("WK") || false,
//           battingStyle: data.battingStyle || "",
//           bowlingStyle: data.bowlingStyle || "",
//           image: data.imageId ? `https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/${data.imageId}.png` : "/fallback.jpg",
//           team: teamShortName
//         } as Player;
//       });
//     } catch (err) {
//       console.error(`Error fetching players for ${teamShortName}:`, err);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const fetchMatchAndSquadData = async () => {
//       try {
//         setLoading(true);
        
//         const matchesRef = doc(db, "cricket", "upcomingMatches");
//         const matchesSnap = await getDoc(matchesRef);
        
//         if (!matchesSnap.exists()) {
//           setError("No matches data found");
//           return;
//         }

//         const matchesData = matchesSnap.data();
//         const currentMatch = matchesData.matches.find((match: any) =>
//           match.id === Number(matchId) || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }

//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
        
//         const [team1Players, team2Players] = await Promise.all([
//           fetchTeamPlayers(currentMatch.team1),
//           fetchTeamPlayers(currentMatch.team2)
//         ]);

//         const squad: SquadData = {
//           matchInfo: {
//             id: Number(matchId),
//             teams: {
//               [currentMatch.team1]: {
//                 id: 0,
//                 shortName: currentMatch.team1,
//                 imageId: 0
//               },
//               [currentMatch.team2]: {
//                 id: 0,
//                 shortName: currentMatch.team2,
//                 imageId: 0
//               }
//             },
//           },
//           players: {
//             [currentMatch.team1]: team1Players,
//             [currentMatch.team2]: team2Players
//           },
//           lastUpdated: new Date().toISOString()
//         };

//         setSquadData(squad);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchAndSquadData();
//   }, [matchId]);

//   const generateRandomTeam = (): Player[] => {
//     if (!squadData) return [];
    
//     const { players } = squadData;
//     const team1Players = players[team1] || [];
//     const team2Players = players[team2] || [];
//     const allPlayers = [...team1Players, ...team2Players];
    
//     const wicketkeepers = allPlayers.filter(p => p.role.includes('WK'));
//     const batsmen = allPlayers.filter(p => p.role.includes('Batter'));
//     const allRounders = allPlayers.filter(p => p.role.includes('Allrounder'));
//     const bowlers = allPlayers.filter(p => p.role.includes('Bowler'));

//     const teamComposition = {
//       wk: 1,
//       bat: 3,
//       ar: 2,
//       bowl: 5
//     };

//     if (riskLevel > 70) {
//       teamComposition.bat = 2;
//       teamComposition.ar = 3;
//     } else if (riskLevel < 30) {
//       teamComposition.bat = 4;
//       teamComposition.ar = 1;
//     }

//     const selectedWk = selectRandomPlayers(wicketkeepers, teamComposition.wk);
//     const selectedBat = selectRandomPlayers(batsmen, teamComposition.bat);
//     const selectedAr = selectRandomPlayers(allRounders, teamComposition.ar);
//     const selectedBowl = selectRandomPlayers(bowlers, teamComposition.bowl);

//     const team = [...selectedWk, ...selectedBat, ...selectedAr, ...selectedBowl];

//     if (team.length < 11) {
//       const remaining = 11 - team.length;
//       const remainingPlayers = allPlayers.filter(p => !team.includes(p));
//       team.push(...selectRandomPlayers(remainingPlayers, remaining));
//     }

//     const team1Count = team.filter(p => p.team === team1).length;
//     const team2Count = team.filter(p => p.team === team2).length;
    
//     if (team1Count === 0) {
//       const team1Player = selectRandomPlayers(team1Players, 1)[0];
//       team[0] = team1Player;
//     } else if (team2Count === 0) {
//       const team2Player = selectRandomPlayers(team2Players, 1)[0];
//       team[0] = team2Player;
//     }

//     return team;
//   };

//   const selectRandomPlayers = (players: Player[], count: number): Player[] => {
//     if (players.length <= count) return [...players];
//     const shuffled = [...players].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   };

//   const predictCaptainAndViceCaptain = (team: Player[]) => {
//     // Safely filter players with optional chaining
//     const captains = team?.filter(p => p?.isCaptain) || [];
//     const keepers = team?.filter(p => p?.isKeeper) || [];
//     const batsmen = team?.filter(p =>
//       p?.role?.includes("Batter") || p?.role?.includes("All-Rounder")
//     ) || [];
  
//     // Fallback to first player if no suitable candidates found
//     const captain = captains[0] ||
//                    batsmen[0] ||
//                    (team?.length > 0 ? team[0] : null);
    
//     const viceCaptain = captains[1] ||
//                         keepers[0] ||
//                         batsmen[1] ||
//                         (team?.length > 1 ? team[1] : null);
  
//     return {
//       captain: captain || null,
//       viceCaptain: viceCaptain || null
//     };
//   };

//   const countPlayersByRole = (team: Player[]) => {
//     const counts: Record<string, number> = {
//       'WK': 0,
//       'BAT': 0,
//       'AR': 0,
//       'BOWL': 0
//     };
    
//     team.forEach(player => {
//       if (player.role.includes('WK')) counts['WK']++;
//       else if (player.role.includes('Batter')) counts['BAT']++;
//       else if (player.role.includes('Allrounder')) counts['AR']++;
//       else if (player.role.includes('Bowler')) counts['BOWL']++;
//     });
    
//     return counts;
//   };

//   const generateMultipleTeams = () => {
//     const teams: Player[][] = [];
//     for (let i = 0; i < numTeams; i++) {
//       teams.push(generateRandomTeam());
//     }
//     setGeneratedTeams(teams);
//     setLastGeneratedCount(numTeams);
//     setSelectedTeamsToShare([]);
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const toggleTeamExpansion = (index: number) => {
//     setExpandedTeam(expandedTeam === index ? null : index);
//   };

//   const shareTeams = () => {
//     const message = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map((team, i) => {
//         const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
        
//         const sortedPlayers = [...team].sort((a, b) => {
//           const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//           return roleOrder[a.role.split(' ')[0]] - roleOrder[b.role.split(' ')[0]];
//         });

//         return `Team ${i+1}:\nC: ${captain?.name}\nVC: ${viceCaptain?.name}\nPlayers:\n${
//           sortedPlayers.map(p => `${p.name} (${p.role.includes('WK') ? 'Wicketkeeper' : p.role})`).join('\n')
//         }`;
//       })
//       .join('\n\n');
    
//     const shareUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
//     window.open(shareUrl, '_blank');
//   };

//   const saveTeam = () => {
//     if (selectedPlayers.length !== 11) {
//       alert("Please select exactly 11 players before saving");
//       return;
//     }
    
//     alert("Team saved successfully!");
//   };

//   const renderGeneratedTeams = () => {
//     return generatedTeams.map((team, index) => {
//       const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//       const roleCounts = countPlayersByRole(team);
//       const isExpanded = showFullTeams || expandedTeam === index;

//       return (
//         <Card key={index} className="mb-4 bg-[url('/Grass.jpg')] bg-cover bg-center">
//           <CardHeader className="pb-2">
//             <div className="flex justify-between items-center">
//               <CardTitle className="text-lg">Team {index + 1}</CardTitle>
//               <input
//                 type="checkbox"
//                 checked={selectedTeamsToShare.includes(index)}
//                 onChange={() => toggleTeamSelection(index)}
//                 className="h-5 w-5"
//               />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between mb-4">
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={captain?.image || "/fallback.jpg"}
//                   alt={captain?.name || "Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-yellow-500 mb-1"
//                 />
//                 <span className="font-medium">C: {captain?.name || "Captain"}</span>
//                 <span className="text-xs">{captain?.team}</span>
//               </div>
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={viceCaptain?.image || "/fallback.jpg"}
//                   alt={viceCaptain?.name || "Vice Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-blue-500 mb-1"
//                 />
//                 <span className="font-medium">VC: {viceCaptain?.name || "Vice Captain"}</span>
//                 <span className="text-xs">{viceCaptain?.team}</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//               {Object.entries(roleCounts).map(([role, count]) => (
//                 <div key={role} className="bg-gray-100 p-2 rounded text-center">
//                   <div className="font-bold">{count}</div>
//                   <div>{role}</div>
//                 </div>
//               ))}
//             </div>

//             {isExpanded && (
//               <div className="space-y-2">
//                 {team
//                   .sort((a, b) => {
//                     const roleOrder = { 'WK': 0, 'BAT': 1, 'AR': 2, 'BOWL': 3 };
//                     const aRole = a.role.includes('WK') ? 'WK' :
//                                  a.role.includes('Batter') ? 'BAT' :
//                                  a.role.includes('Allrounder') ? 'AR' : 'BOWL';
//                     const bRole = b.role.includes('WK') ? 'WK' :
//                                  b.role.includes('Batter') ? 'BAT' :
//                                  b.role.includes('Allrounder') ? 'AR' : 'BOWL';
//                     return roleOrder[aRole] - roleOrder[bRole];
//                   })
//                   .map((player, i) => (
//                     <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
//                       <Image
//                         src={player.image || "/fallback.jpg"}
//                         alt={player.name || "Player"}
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium">{player.name || "Unknown Player"}</p>
//                         <p className="text-sm text-gray-500">
//                           {player.role?.includes('WK') ? 'Wicketkeeper' : player.role || "Player"}
//                         </p>
//                       </div>
//                       {player.name === captain?.name && (
//                         <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                           C
//                         </span>
//                       )}
//                       {player.name === viceCaptain?.name && (
//                         <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                           VC
//                         </span>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             )}

//             <Button
//               variant="ghost"
//               size="sm"
//               className="w-full mt-2 text-white"
//               onClick={() => toggleTeamExpansion(index)}
//             >
//               {isExpanded ? "Hide Team" : "View Full Team"}
//             </Button>
//           </CardContent>
//         </Card>
//       );
//     });
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!squadData) {
//     return <div className="p-4 text-center">Squad data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-center">
//         {team1} vs {team2}
//       </h1>
      
//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//       <TeamSlider
//         value={numTeams}
//         onChange={setNumTeams}
//         onGenerate={generateMultipleTeams}
//       />

//       {generatedTeams.length > 0 && (
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Generated Teams ({lastGeneratedCount})</h2>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="showFullTeams"
//                   checked={showFullTeams}
//                   onChange={() => setShowFullTeams(!showFullTeams)}
//                   className="h-4 w-4"
//                 />
//                 <label htmlFor="showFullTeams" className="text-sm">
//                   Show Full Teams
//                 </label>
//               </div>
//               {selectedTeamsToShare.length > 0 && (
//                 <Button
//                   onClick={shareTeams}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   Share ({selectedTeamsToShare.length})
//                 </Button>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {renderGeneratedTeams()}
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center">
//         <Button
//           onClick={saveTeam}
//           disabled={selectedPlayers.length !== 11}
//           className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
//         >
//           Save Team
//         </Button>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { Button } from "../../../components/ui/button";

// interface Player {
//   id: string;
//   name: string;
//   role: string;
//   isCaptain?: boolean;
//   isKeeper?: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   image?: string;
//   team?: string;
// }

// interface SquadData {
//   matchInfo: {
//     id: number;
//     teams: {
//       [key: string]: {
//         id: number;
//         shortName: string;
//         imageId: number;
//       };
//     };
//   };
//   players: {
//     [key: string]: Player[];
//   };
//   lastUpdated: string;
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     const ranks = [
//       { threshold: 0, rank: "3,590,001", prize: "49 Rs" },
//       { threshold: 10, rank: "1,798,400", prize: "55 Rs" },
//       { threshold: 20, rank: "359,000", prize: "100 Rs" },
//       { threshold: 30, rank: "301,000", prize: "1,000 Rs" },
//       { threshold: 40, rank: "251,000", prize: "1,500 Rs" },
//       { threshold: 50, rank: "201,000", prize: "2,000 Rs" },
//       { threshold: 60, rank: "151,000", prize: "2,500 Rs" },
//       { threshold: 70, rank: "101,000", prize: "3,000 Rs" },
//       { threshold: 80, rank: "21", prize: "9,000 Rs" },
//       { threshold: 85, rank: "13", prize: "20,000 Rs" },
//       { threshold: 90, rank: "12", prize: "25,000 Rs" },
//       { threshold: 92, rank: "11", prize: "50,000 Rs" },
//       { threshold: 94, rank: "10", prize: "1,00,000 Rs" },
//       { threshold: 96, rank: "8", prize: "1,50,000 Rs" },
//       { threshold: 98, rank: "6", prize: "2,00,000 Rs" },
//       { threshold: 99, rank: "5", prize: "2,00,000 Rs" },
//       { threshold: 100, rank: "1", prize: "3 Crore Rs" }
//     ];

//     const result = ranks.find(r => risk <= r.threshold) || ranks[ranks.length - 1];
//     return { rank: result.rank, prize: result.prize };
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-4 p-4 bg-white rounded-lg shadow-sm">
//       <div className="flex justify-between mb-2">
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={0}
//         max={100}
//         step={1}
//         className="w-full"
//       />
//       <div className="flex justify-between mt-2 px-1">
//         <span className="text-green-600">Safe</span>
//         <span className="text-red-600">Aggressive</span>
//       </div>
//     </div>
//   );
// };

// const TeamSlider = ({ value, onChange, onGenerate }: {
//   value: number;
//   onChange: (value: number) => void;
//   onGenerate: () => void;
// }) => {
//   return (
//     <div className="w-full max-w-2xl mx-auto mb-6 p-4 bg-green-600 rounded-lg shadow-sm">
//       <div className="flex flex-col gap-4">
//         <div className="flex items-center justify-between">
//           <span className="text-lg font-medium text-white">Number of Teams: <span className="p-2 rounded-full bg-gray-600"> {value}</span> </span>
//         </div>
//         <Slider
//           value={[value]}
//           onValueChange={([val]) => onChange(val)}
//           min={1}
//           max={100}
//           step={1}
//           className="w-full"
//         />
//         <div className="flex justify-between text-sm text-grey-800">
//           <span>1 Team</span>
//           <span>Max 100 Teams</span>
//         </div>
//         <Button
//           onClick={onGenerate}
//           className="bg-blue-600 hover:bg-blue-700 text-lg py-6"
//         >
//           <span className="text-white">Generate Teams</span>
//           <span className="text-yellow-300"> ₹{value * 5}</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default function BuildTeamPage() {
//   const { matchId } = useParams<{ matchId: string }>();
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [team1, setTeam1] = useState("");
//   const [team2, setTeam2] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);
//   const [showFullTeams, setShowFullTeams] = useState(false);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//   const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
//   const [lastGeneratedCount, setLastGeneratedCount] = useState(0);
//   const [squadData, setSquadData] = useState<SquadData | null>(null);

//   useEffect(() => {
//     const fetchMatchAndSquadData = async () => {
//       try {
//         setLoading(true);
        
//         // 1. Fetch match data to get team1 and team2
//         const matchesRef = doc(db, "cricket", "upcomingMatches");
//         const matchesSnap = await getDoc(matchesRef);
        
//         if (!matchesSnap.exists()) {
//           setError("No matches data found");
//           return;
//         }

//         const matchesData = matchesSnap.data();
//         const currentMatch = matchesData.matches.find((match: any) =>
//           match.id === Number(matchId) || match.id === matchId
//         );
        
//         if (!currentMatch) {
//           setError(`Match with ID ${matchId} not found`);
//           return;
//         }

//         setTeam1(currentMatch.team1);
//         setTeam2(currentMatch.team2);
        
//         // 2. Fetch squad data for both teams
//         const [team1Doc, team2Doc] = await Promise.all([
//           getDoc(doc(db, "teams", currentMatch.team1)),
//           getDoc(doc(db, "teams", currentMatch.team2))
//         ]);

//         if (!team1Doc.exists() || !team2Doc.exists()) {
//           setError("Team data not found");
//           return;
//         }

//         const team1Squad = team1Doc.data().squadData || [];
//         const team2Squad = team2Doc.data().squadData || [];

//         // 3. Create squad data structure
//         const squad: SquadData = {
//           matchInfo: {
//             id: Number(matchId),
//             teams: {
//               [currentMatch.team1]: {
//                 id: 0,
//                 shortName: currentMatch.team1,
//                 imageId: 0
//               },
//               [currentMatch.team2]: {
//                 id: 0,
//                 shortName: currentMatch.team2,
//                 imageId: 0
//               }
//             },
//           },
//           players: {
//             [currentMatch.team1]: team1Squad.map((player: any) => ({
//               ...player,
//               team: currentMatch.team1,
//               image: player.image || "/fallback.jpg"
//             })),
//             [currentMatch.team2]: team2Squad.map((player: any) => ({
//               ...player,
//               team: currentMatch.team2,
//               image: player.image || "/fallback.jpg"
//             }))
//           },
//           lastUpdated: new Date().toISOString()
//         };

//         setSquadData(squad);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMatchAndSquadData();
//   }, [matchId]);

//   const generateRandomTeam = (): Player[] => {
//     if (!squadData) return [];
    
//     const { players } = squadData;
//     const team1Players = players[team1] || [];
//     const team2Players = players[team2] || [];
//     const allPlayers = [...team1Players, ...team2Players];
    
//     // Filter players by role with null checks
//     const wicketkeepers = allPlayers.filter(p => p?.role?.includes('WK'));
//     const batsmen = allPlayers.filter(p => p?.role?.includes('Batter'));
//     const allRounders = allPlayers.filter(p => p?.role?.includes('Allrounder'));
//     const bowlers = allPlayers.filter(p => p?.role?.includes('Bowler'));

//     // Team composition rules
//     const teamComposition = {
//       wk: 1,
//       bat: 3,
//       ar: 2,
//       bowl: 5
//     };

//     // Adjust composition based on risk level
//     if (riskLevel > 70) {
//       teamComposition.bat = 2;
//       teamComposition.ar = 3;
//     } else if (riskLevel < 30) {
//       teamComposition.bat = 4;
//       teamComposition.ar = 1;
//     }

//     // Select players for each role
//     const selectedWk = selectRandomPlayers(wicketkeepers, teamComposition.wk);
//     const selectedBat = selectRandomPlayers(batsmen, teamComposition.bat);
//     const selectedAr = selectRandomPlayers(allRounders, teamComposition.ar);
//     const selectedBowl = selectRandomPlayers(bowlers, teamComposition.bowl);

//     // Combine all selected players
//     let team = [...selectedWk, ...selectedBat, ...selectedAr, ...selectedBowl];

//     // Ensure we have exactly 11 players
//     if (team.length < 11) {
//       const remaining = 11 - team.length;
//       const remainingPlayers = allPlayers.filter(p => !team.includes(p));
//       team = [...team, ...selectRandomPlayers(remainingPlayers, remaining)];
//     } else if (team.length > 11) {
//       team = team.slice(0, 11);
//     }

//     // Ensure team has players from both teams
//     const team1Count = team.filter(p => p?.team === team1).length;
//     const team2Count = team.filter(p => p?.team === team2).length;
    
//     if (team1Count === 0 && team1Players.length > 0) {
//       const team1Player = selectRandomPlayers(team1Players, 1)[0];
//       if (team1Player) team[0] = team1Player;
//     } else if (team2Count === 0 && team2Players.length > 0) {
//       const team2Player = selectRandomPlayers(team2Players, 1)[0];
//       if (team2Player) team[0] = team2Player;
//     }

//     return team;
//   };

//   const selectRandomPlayers = (players: Player[], count: number): Player[] => {
//     if (!players || players.length === 0 || count <= 0) return [];
//     if (players.length <= count) return [...players];
    
//     const shuffled = [...players].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   };

//   const predictCaptainAndViceCaptain = (team: Player[] = []) => {
//     try {
//       const captains = team?.filter(p => p?.isCaptain) || [];
//       const keepers = team?.filter(p => p?.isKeeper) || [];
//       const batsmen = team?.filter(p =>
//         p?.role?.includes("Batter") || p?.role?.includes("All-Rounder")
//       ) || [];
    
//       const captain = captains[0] || batsmen[0] || (team?.length > 0 ? team[0] : null);
//       const viceCaptain = captains[1] || keepers[0] || batsmen[1] || (team?.length > 1 ? team[1] : null);
    
//       return {
//         captain: captain || null,
//         viceCaptain: viceCaptain || null
//       };
//     } catch (error) {
//       console.error("Error predicting captains:", error);
//       return { captain: null, viceCaptain: null };
//     }
//   };

//   const countPlayersByRole = (team: Player[] = []) => {
//     const counts: Record<string, number> = {
//       'WK': 0,
//       'BAT': 0,
//       'AR': 0,
//       'BOWL': 0
//     };
    
//     team?.forEach(player => {
//       if (!player?.role) return;
      
//       if (player.role.includes('WK')) counts['WK']++;
//       else if (player.role.includes('Batter')) counts['BAT']++;
//       else if (player.role.includes('Allrounder')) counts['AR']++;
//       else if (player.role.includes('Bowler')) counts['BOWL']++;
//     });
    
//     return counts;
//   };

//   const generateMultipleTeams = () => {
//     const teams: Player[][] = [];
//     for (let i = 0; i < numTeams; i++) {
//       teams.push(generateRandomTeam());
//     }
//     setGeneratedTeams(teams);
//     setLastGeneratedCount(numTeams);
//     setSelectedTeamsToShare([]);
//     setExpandedTeam(null);
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const toggleTeamExpansion = (index: number) => {
//     setExpandedTeam(expandedTeam === index ? null : index);
//   };

//   const shareTeams = () => {
//     const message = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map((team, i) => {
//         const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
        
//         const sortedPlayers = [...team].sort((a, b) => {
//           const roleOrder = { 'WK': 0, 'Batter': 1, 'All-Rounder': 2, 'Bowler': 3 };
//           const aRole = a?.role?.split(' ')[0] || '';
//           const bRole = b?.role?.split(' ')[0] || '';
//           return roleOrder[aRole] - roleOrder[bRole];
//         });

//         return `Team ${i+1}:\nC: ${captain?.name || "Not Selected"}\nVC: ${viceCaptain?.name || "Not Selected"}\nPlayers:\n${
//           sortedPlayers.map(p => `${p?.name || "Unknown Player"} (${p?.role?.includes('WK') ? 'Wicketkeeper' : p?.role || "Player"})`).join('\n')
//         }`;
//       })
//       .join('\n\n');
    
//     const shareUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
//     window.open(shareUrl, '_blank');
//   };

//   const renderGeneratedTeams = () => {
//     return generatedTeams.map((team, index) => {
//       const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//       const roleCounts = countPlayersByRole(team);
//       const isExpanded = showFullTeams || expandedTeam === index;

//       return (
//         <Card key={index} className="mb-4 bg-[url('/Grass.jpg')] bg-cover bg-center">
//           <CardHeader className="pb-2">
//             <div className="flex justify-between items-center">
//               <CardTitle className="text-lg">Team {index + 1}</CardTitle>
//               <input
//                 type="checkbox"
//                 checked={selectedTeamsToShare.includes(index)}
//                 onChange={() => toggleTeamSelection(index)}
//                 className="h-5 w-5"
//               />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between mb-4">
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={captain?.image || "/fallback.jpg"}
//                   alt={captain?.name || "Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-yellow-500 mb-1"
//                 />
//                 <span className="font-medium">C: {captain?.name || "Not Selected"}</span>
//                 <span className="text-xs">{captain?.team || ""}</span>
//               </div>
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={viceCaptain?.image || "/fallback.jpg"}
//                   alt={viceCaptain?.name || "Vice Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-blue-500 mb-1"
//                 />
//                 <span className="font-medium">VC: {viceCaptain?.name || "Not Selected"}</span>
//                 <span className="text-xs">{viceCaptain?.team || ""}</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//               {Object.entries(roleCounts).map(([role, count]) => (
//                 <div key={role} className="bg-gray-100 p-2 rounded text-center">
//                   <div className="font-bold">{count}</div>
//                   <div>{role}</div>
//                 </div>
//               ))}
//             </div>

//             {isExpanded && (
//               <div className="space-y-2">
//                 {team
//                   .sort((a, b) => {
//                     const roleOrder = { 'WK': 0, 'BAT': 1, 'AR': 2, 'BOWL': 3 };
//                     const aRole = a?.role?.includes('WK') ? 'WK' :
//                                  a?.role?.includes('Batter') ? 'BAT' :
//                                  a?.role?.includes('Allrounder') ? 'AR' : 'BOWL';
//                     const bRole = b?.role?.includes('WK') ? 'WK' :
//                                  b?.role?.includes('Batter') ? 'BAT' :
//                                  b?.role?.includes('Allrounder') ? 'AR' : 'BOWL';
//                     return roleOrder[aRole] - roleOrder[bRole];
//                   })
//                   .map((player, i) => (
//                     <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
//                       <Image
//                         src={player?.image || "/fallback.jpg"}
//                         alt={player?.name || "Player"}
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium">{player?.name || "Unknown Player"}</p>
//                         <p className="text-sm text-gray-500">
//                           {player?.role?.includes('WK') ? 'Wicketkeeper' : player?.role || "Player"}
//                         </p>
//                       </div>
//                       {player?.name === captain?.name && (
//                         <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                           C
//                         </span>
//                       )}
//                       {player?.name === viceCaptain?.name && (
//                         <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                           VC
//                         </span>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             )}

//             <Button
//               variant="ghost"
//               size="sm"
//               className="w-full mt-2 text-white"
//               onClick={() => toggleTeamExpansion(index)}
//             >
//               {isExpanded ? "Hide Team" : "View Full Team"}
//             </Button>
//           </CardContent>
//         </Card>
//       );
//     });
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!squadData) {
//     return <div className="p-4 text-center">Squad data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-center">
//         {team1} vs {team2}
//       </h1>
      
//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//       <TeamSlider
//         value={numTeams}
//         onChange={setNumTeams}
//         onGenerate={generateMultipleTeams}
//       />

//       {generatedTeams.length > 0 && (
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Generated Teams ({lastGeneratedCount})</h2>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="showFullTeams"
//                   checked={showFullTeams}
//                   onChange={() => setShowFullTeams(!showFullTeams)}
//                   className="h-4 w-4"
//                 />
//                 <label htmlFor="showFullTeams" className="text-sm">
//                   Show Full Teams
//                 </label>
//               </div>
//               {selectedTeamsToShare.length > 0 && (
//                 <Button
//                   onClick={shareTeams}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   Share ({selectedTeamsToShare.length})
//                 </Button>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {renderGeneratedTeams()}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { Button } from "../../../components/ui/button";

// interface Player {
//   id: string | number;
//   name: string;
//   role: string;
//   isCaptain?: boolean;
//   isKeeper?: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   image?: string;
//   team?: string;
//   faceImageId?: number;
//   substitute?: boolean;
// }

// interface MatchInfo {
//   id: string | number;
//   team1: string;
//   team2: string;
//   venue: string;
//   date: string;
//   time: string;
//   series: string;
// }

// interface SquadData {
//   matchInfo: MatchInfo;
//   players: {
//     [key: string]: Player[];
//   };
//   lastUpdated: string;
// }

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     const ranks = [
//       { threshold: 0, rank: "3,590,001", prize: "49 Rs" },
//       { threshold: 10, rank: "1,798,400", prize: "55 Rs" },
//       { threshold: 20, rank: "359,000", prize: "100 Rs" },
//       { threshold: 30, rank: "301,000", prize: "1,000 Rs" },
//       { threshold: 40, rank: "251,000", prize: "1,500 Rs" },
//       { threshold: 50, rank: "201,000", prize: "2,000 Rs" },
//       { threshold: 60, rank: "151,000", prize: "2,500 Rs" },
//       { threshold: 70, rank: "101,000", prize: "3,000 Rs" },
//       { threshold: 80, rank: "21", prize: "9,000 Rs" },
//       { threshold: 85, rank: "13", prize: "20,000 Rs" },
//       { threshold: 90, rank: "12", prize: "25,000 Rs" },
//       { threshold: 92, rank: "11", prize: "50,000 Rs" },
//       { threshold: 94, rank: "10", prize: "1,00,000 Rs" },
//       { threshold: 96, rank: "8", prize: "1,50,000 Rs" },
//       { threshold: 98, rank: "6", prize: "2,00,000 Rs" },
//       { threshold: 99, rank: "5", prize: "2,00,000 Rs" },
//       { threshold: 100, rank: "1", prize: "3 Crore Rs" }
//     ];

//     const result = ranks.find(r => risk <= r.threshold) || ranks[ranks.length - 1];
//     return { rank: result.rank, prize: result.prize };
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-4 p-4 bg-white rounded-lg shadow-sm">
//       <div className="flex justify-between mb-2">
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={0}
//         max={100}
//         step={1}
//         className="w-full"
//       />
//       <div className="flex justify-between mt-2 px-1">
//         <span className="text-green-600">Safe</span>
//         <span className="text-red-600">Aggressive</span>
//       </div>
//     </div>
//   );
// };

// const TeamSlider = ({ value, onChange, onGenerate }: {
//   value: number;
//   onChange: (value: number) => void;
//   onGenerate: () => void;
// }) => {
//   return (
//     <div className="w-full max-w-2xl mx-auto mb-6 p-4 bg-green-600 rounded-lg shadow-sm">
//       <div className="flex flex-col gap-4">
//         <div className="flex items-center justify-between">
//           <span className="text-lg font-medium text-white">Number of Teams: <span className="p-2 rounded-full bg-gray-600"> {value}</span> </span>
//         </div>
//         <Slider
//           value={[value]}
//           onValueChange={([val]) => onChange(val)}
//           min={1}
//           max={100}
//           step={1}
//           className="w-full"
//         />
//         <div className="flex justify-between text-sm text-grey-800">
//           <span>1 Team</span>
//           <span>Max 100 Teams</span>
//         </div>
//         <Button
//           onClick={onGenerate}
//           className="bg-blue-600 hover:bg-blue-700 text-lg py-6"
//         >
//           <span className="text-white">Generate Teams</span>
//           <span className="text-yellow-300"> ₹{value * 5}</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default function BuildTeamPage() {
//   const params = useParams<{ matchId: string }>();
//   const matchId = params?.matchId;
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);
//   const [showFullTeams, setShowFullTeams] = useState(false);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//   const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
//   const [lastGeneratedCount, setLastGeneratedCount] = useState(0);
//   const [squadData, setSquadData] = useState<SquadData | null>(null);

//   useEffect(() => {
//     const fetchMatchAndSquadData = async () => {
//       try {
//         setLoading(true);
        
//         if (!matchId) {
//           setError("Match ID is missing");
//           return;
//         }

//         // 1. Fetch match info from matchinfo collection
//         const matchRef = doc(db, "matchinfo", matchId);
//         const matchSnap = await getDoc(matchRef);
        
//         if (!matchSnap.exists()) {
//           setError("Match not found");
//           return;
//         }

//         const matchData = matchSnap.data();
        
//         if (!matchData?.team1?.playerDetails || !matchData?.team2?.playerDetails) {
//           setError("Team data is incomplete");
//           return;
//         }

//         // Process team1 players
//         const team1Players = matchData.team1.playerDetails
//           .filter((player: any) => !player.isSupportStaff && !player.substitute)
//           .map((player: any) => ({
//             id: player.id,
//             name: player.name,
//             role: player.role.includes('WK') ? 'WK' :
//                  player.role.includes('Batter') ? 'BAT' :
//                  player.role.includes('Allrounder') ? 'AR' : 'BOWL',
//             isCaptain: player.captain,
//             isKeeper: player.keeper,
//             battingStyle: player.battingStyle,
//             bowlingStyle: player.bowlingStyle,
//             image: player.faceImageId ? `https://example.com/images/${player.faceImageId}.jpg` : "/fallback.jpg",
//             team: matchData.team1.shortName
//           }));

//         // Process team2 players
//         const team2Players = matchData.team2.playerDetails
//           .filter((player: any) => !player.isSupportStaff && !player.substitute)
//           .map((player: any) => ({
//             id: player.id,
//             name: player.name,
//             role: player.role.includes('WK') ? 'WK' :
//                  player.role.includes('Batter') ? 'BAT' :
//                  player.role.includes('Allrounder') ? 'AR' : 'BOWL',
//             isCaptain: player.captain,
//             isKeeper: player.keeper,
//             battingStyle: player.battingStyle,
//             bowlingStyle: player.bowlingStyle,
//             image: player.faceImageId ? `https://example.com/images/${player.faceImageId}.jpg` : "/fallback.jpg",
//             team: matchData.team2.shortName
//           }));

//         // Create squad data structure
//         const squad: SquadData = {
//           matchInfo: {
//             id: matchData.matchInfo.matchId,
//             team1: matchData.team1.shortName,
//             team2: matchData.team2.shortName,
//             venue: matchData.venue?.name || "Unknown Venue",
//             date: new Date(matchData.matchInfo.matchStartTimestamp).toLocaleDateString(),
//             time: new Date(matchData.matchInfo.matchStartTimestamp).toLocaleTimeString(),
//             series: matchData.series?.name || "Unknown Series"
//           },
//           players: {
//             [matchData.team1.shortName]: team1Players,
//             [matchData.team2.shortName]: team2Players
//           },
//           lastUpdated: new Date().toISOString()
//         };

//         setSquadData(squad);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     if (matchId) {
//       fetchMatchAndSquadData();
//     }
//   }, [matchId]);

//   const generateRandomTeam = (): Player[] => {
//     if (!squadData) return [];
    
//     const { players, matchInfo } = squadData;
//     const team1Players = players[matchInfo.team1] || [];
//     const team2Players = players[matchInfo.team2] || [];
//     const allPlayers = [...team1Players, ...team2Players];
    
//     // Filter players by role with null checks
//     const wicketkeepers = allPlayers.filter(p => p?.role?.includes('WK'));
//     const batsmen = allPlayers.filter(p => p?.role?.includes('BAT'));
//     const allRounders = allPlayers.filter(p => p?.role?.includes('AR'));
//     const bowlers = allPlayers.filter(p => p?.role?.includes('BOWL'));

//     // Team composition rules
//     const teamComposition = {
//       wk: 1,
//       bat: 3,
//       ar: 2,
//       bowl: 5
//     };

//     // Adjust composition based on risk level
//     if (riskLevel > 70) {
//       teamComposition.bat = 2;
//       teamComposition.ar = 3;
//     } else if (riskLevel < 30) {
//       teamComposition.bat = 4;
//       teamComposition.ar = 1;
//     }

//     // Select players for each role
//     const selectedWk = selectRandomPlayers(wicketkeepers, teamComposition.wk);
//     const selectedBat = selectRandomPlayers(batsmen, teamComposition.bat);
//     const selectedAr = selectRandomPlayers(allRounders, teamComposition.ar);
//     const selectedBowl = selectRandomPlayers(bowlers, teamComposition.bowl);

//     // Combine all selected players
//     let team = [...selectedWk, ...selectedBat, ...selectedAr, ...selectedBowl];

//     // Ensure we have exactly 11 players
//     if (team.length < 11) {
//       const remaining = 11 - team.length;
//       const remainingPlayers = allPlayers.filter(p => !team.includes(p));
//       team = [...team, ...selectRandomPlayers(remainingPlayers, remaining)];
//     } else if (team.length > 11) {
//       team = team.slice(0, 11);
//     }

//     // Ensure team has players from both teams
//     const team1Count = team.filter(p => p?.team === matchInfo.team1).length;
//     const team2Count = team.filter(p => p?.team === matchInfo.team2).length;
    
//     if (team1Count === 0 && team1Players.length > 0) {
//       const team1Player = selectRandomPlayers(team1Players, 1)[0];
//       if (team1Player) team[0] = team1Player;
//     } else if (team2Count === 0 && team2Players.length > 0) {
//       const team2Player = selectRandomPlayers(team2Players, 1)[0];
//       if (team2Player) team[0] = team2Player;
//     }

//     return team;
//   };

//   const selectRandomPlayers = (players: Player[], count: number): Player[] => {
//     if (!players || players.length === 0 || count <= 0) return [];
//     if (players.length <= count) return [...players];
    
//     const shuffled = [...players].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   };

//   const predictCaptainAndViceCaptain = (team: Player[] = []) => {
//     try {
//       const captains = team?.filter(p => p?.isCaptain) || [];
//       const keepers = team?.filter(p => p?.isKeeper) || [];
//       const batsmen = team?.filter(p =>
//         p?.role?.includes("BAT") || p?.role?.includes("AR")
//       ) || [];
    
//       const captain = captains[0] || batsmen[0] || (team?.length > 0 ? team[0] : null);
//       const viceCaptain = captains[1] || keepers[0] || batsmen[1] || (team?.length > 1 ? team[1] : null);
    
//       return {
//         captain: captain || null,
//         viceCaptain: viceCaptain || null
//       };
//     } catch (error) {
//       console.error("Error predicting captains:", error);
//       return { captain: null, viceCaptain: null };
//     }
//   };

//   const countPlayersByRole = (team: Player[] = []) => {
//     const counts: Record<string, number> = {
//       'WK': 0,
//       'BAT': 0,
//       'AR': 0,
//       'BOWL': 0
//     };
    
//     team?.forEach(player => {
//       if (!player?.role) return;
      
//       if (player.role.includes('WK')) counts['WK']++;
//       else if (player.role.includes('BAT')) counts['BAT']++;
//       else if (player.role.includes('AR')) counts['AR']++;
//       else if (player.role.includes('BOWL')) counts['BOWL']++;
//     });
    
//     return counts;
//   };

//   const generateMultipleTeams = () => {
//     const teams: Player[][] = [];
//     for (let i = 0; i < numTeams; i++) {
//       teams.push(generateRandomTeam());
//     }
//     setGeneratedTeams(teams);
//     setLastGeneratedCount(numTeams);
//     setSelectedTeamsToShare([]);
//     setExpandedTeam(null);
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const toggleTeamExpansion = (index: number) => {
//     setExpandedTeam(expandedTeam === index ? null : index);
//   };

//   const shareTeams = () => {
//     if (!squadData) return;

//     const message = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map((team, i) => {
//         const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
        
//         const sortedPlayers = [...team].sort((a, b) => {
//           const roleOrder = { 'WK': 0, 'BAT': 1, 'AR': 2, 'BOWL': 3 };
//           const aRole = a?.role?.split(' ')[0] || '';
//           const bRole = b?.role?.split(' ')[0] || '';
//           return roleOrder[aRole] - roleOrder[bRole];
//         });

//         return `Team ${i+1}:\nC: ${captain?.name || "Not Selected"}\nVC: ${viceCaptain?.name || "Not Selected"}\nPlayers:\n${
//           sortedPlayers.map(p => `${p?.name || "Unknown Player"} (${p?.role?.includes('WK') ? 'Wicketkeeper' : p?.role || "Player"})`).join('\n')
//         }`;
//       })
//       .join('\n\n');
    
//     const shareUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
//     window.open(shareUrl, '_blank');
//   };

//   const renderGeneratedTeams = () => {
//     if (!squadData) return null;

//     return generatedTeams.map((team, index) => {
//       const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//       const roleCounts = countPlayersByRole(team);
//       const isExpanded = showFullTeams || expandedTeam === index;

//       return (
//         <Card key={index} className="mb-4 bg-[url('/Grass.jpg')] bg-cover bg-center">
//           <CardHeader className="pb-2">
//             <div className="flex justify-between items-center">
//               <CardTitle className="text-lg">Team {index + 1}</CardTitle>
//               <input
//                 type="checkbox"
//                 checked={selectedTeamsToShare.includes(index)}
//                 onChange={() => toggleTeamSelection(index)}
//                 className="h-5 w-5"
//               />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between mb-4">
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={captain?.image || "/fallback.jpg"}
//                   alt={captain?.name || "Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-yellow-500 mb-1"
//                 />
//                 <span className="font-medium">C: {captain?.name || "Not Selected"}</span>
//                 <span className="text-xs">{captain?.team || ""}</span>
//               </div>
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={viceCaptain?.image || "/fallback.jpg"}
//                   alt={viceCaptain?.name || "Vice Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-blue-500 mb-1"
//                 />
//                 <span className="font-medium">VC: {viceCaptain?.name || "Not Selected"}</span>
//                 <span className="text-xs">{viceCaptain?.team || ""}</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//               {Object.entries(roleCounts).map(([role, count]) => (
//                 <div key={role} className="bg-gray-100 p-2 rounded text-center">
//                   <div className="font-bold">{count}</div>
//                   <div>{role}</div>
//                 </div>
//               ))}
//             </div>

//             {isExpanded && (
//               <div className="space-y-2">
//                 {team
//                   .sort((a, b) => {
//                     const roleOrder = { 'WK': 0, 'BAT': 1, 'AR': 2, 'BOWL': 3 };
//                     const aRole = a?.role || '';
//                     const bRole = b?.role || '';
//                     return roleOrder[aRole] - roleOrder[bRole];
//                   })
//                   .map((player, i) => (
//                     <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
//                       <Image
//                         src={player?.image || "/fallback.jpg"}
//                         alt={player?.name || "Player"}
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium">{player?.name || "Unknown Player"}</p>
//                         <p className="text-sm text-gray-500">
//                           {player?.role?.includes('WK') ? 'Wicketkeeper' :
//                            player?.role?.includes('BAT') ? 'Batsman' :
//                            player?.role?.includes('AR') ? 'All-Rounder' : 'Bowler'}
//                         </p>
//                       </div>
//                       {player?.name === captain?.name && (
//                         <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                           C
//                         </span>
//                       )}
//                       {player?.name === viceCaptain?.name && (
//                         <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                           VC
//                         </span>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             )}

//             <Button
//               variant="ghost"
//               size="sm"
//               className="w-full mt-2 text-white"
//               onClick={() => toggleTeamExpansion(index)}
//             >
//               {isExpanded ? "Hide Team" : "View Full Team"}
//             </Button>
//           </CardContent>
//         </Card>
//       );
//     });
//   };

//   if (!matchId) {
//     return <div className="p-4 text-center text-red-500">Match ID is required</div>;
//   }

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!squadData) {
//     return <div className="p-4 text-center">Squad data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <div className="text-center mb-6">
//         <h1 className="text-2xl font-bold">
//           {squadData.matchInfo.team1} vs {squadData.matchInfo.team2}
//         </h1>
//         <p className="text-gray-600">{squadData.matchInfo.series}</p>
//         <p className="text-sm text-gray-500">
//           {squadData.matchInfo.venue} • {squadData.matchInfo.date} • {squadData.matchInfo.time}
//         </p>
//       </div>
      
//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//       <TeamSlider
//         value={numTeams}
//         onChange={setNumTeams}
//         onGenerate={generateMultipleTeams}
//       />

//       {generatedTeams.length > 0 && (
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Generated Teams ({lastGeneratedCount})</h2>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="showFullTeams"
//                   checked={showFullTeams}
//                   onChange={() => setShowFullTeams(!showFullTeams)}
//                   className="h-4 w-4"
//                 />
//                 <label htmlFor="showFullTeams" className="text-sm">
//                   Show Full Teams
//                 </label>
//               </div>
//               {selectedTeamsToShare.length > 0 && (
//                 <Button
//                   onClick={shareTeams}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   Share ({selectedTeamsToShare.length})
//                 </Button>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {renderGeneratedTeams()}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }













// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// // ---------- Types ----------

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   faceImageId?: number;
// }

// interface Team {
//   id: number;
//   name: string;
//   playerDetails: PlayerDetail[];
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   team1: Team;
//   team2: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// // ---------- Component ----------

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMatch = async () => {
//       if (!matchId) return;

//       try {
//         const docRef = doc(db, "matchinfo", matchId as string);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setMatchData(docSnap.data() as MatchData);
//         } else {
//           console.log("No such match!");
//         }
//       } catch (error) {
//         console.error("Error fetching match:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatch();
//   }, [matchId]);

//   if (loading) return <p>Loading match details...</p>;
//   if (!matchData) return <p>No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Match Details</h1>

//       <p><strong>Match:</strong> {matchInfo.matchDescription}</p>
//       <p><strong>Format:</strong> {matchInfo.matchFormat}</p>
//       <p><strong>Date:</strong> {new Date(matchInfo.matchStartTimestamp).toLocaleString()}</p>

//       {matchInfo.venue && (
//         <p>
//           <strong>Venue:</strong> {matchInfo.venue.name}, {matchInfo.venue.city}, {matchInfo.venue.country}
//         </p>
//       )}

//       {/* Team 1 */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">{team1.name}</h2>
//         <ul className="list-disc pl-6">
//           {team1.playerDetails.map((player) => (
//             <li key={player.id}>
//               {player.fullName}{" "}
//               {player.captain && <span className="text-sm text-blue-600">(C)</span>}
//               {player.keeper && <span className="text-sm text-green-600"> (WK)</span>}
//               {player.substitute && <span className="text-sm text-orange-500"> (Sub)</span>}
//               {player.isOverseas && <span className="text-sm text-purple-600"> (Overseas)</span>}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Team 2 */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">{team2.name}</h2>
//         <ul className="list-disc pl-6">
//           {team2.playerDetails.map((player) => (
//             <li key={player.id}>
//               {player.fullName}{" "}
//               {player.captain && <span className="text-sm text-blue-600">(C)</span>}
//               {player.keeper && <span className="text-sm text-green-600"> (WK)</span>}
//               {player.substitute && <span className="text-sm text-orange-500"> (Sub)</span>}
//               {player.isOverseas && <span className="text-sm text-purple-600"> (Overseas)</span>}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }


















// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Slider } from "@/components/ui/slider";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { Button } from "../../../components/ui/button";

// // ---------- Type Definitions ----------
// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   faceImageId?: number;
//   isOverseas?: boolean;
// }

// interface Team {
//   id: number;
//   name: string;
//   shortName: string;
//   playerDetails: PlayerDetail[];
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   matchStartTimestamp: number;
//   team1: Team;
//   team2: Team;
//   venue?: Venue;
//   series?: {
//     name: string;
//   };
// }

// interface Player {
//   id: number;
//   name: string;
//   role: string;
//   isCaptain?: boolean;
//   isKeeper?: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   image?: string;
//   team?: string;
// }

// interface SquadData {
//   matchInfo: {
//     id: number;
//     team1: string;
//     team2: string;
//     venue: string;
//     date: string;
//     time: string;
//     series: string;
//   };
//   players: {
//     [key: string]: Player[];
//   };
//   lastUpdated: string;
// }

// // ---------- Components ----------
// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     const ranks = [
//       { threshold: 0, rank: "3,590,001", prize: "49 Rs" },
//       { threshold: 10, rank: "1,798,400", prize: "55 Rs" },
//       { threshold: 20, rank: "359,000", prize: "100 Rs" },
//       { threshold: 30, rank: "301,000", prize: "1,000 Rs" },
//       { threshold: 40, rank: "251,000", prize: "1,500 Rs" },
//       { threshold: 50, rank: "201,000", prize: "2,000 Rs" },
//       { threshold: 60, rank: "151,000", prize: "2,500 Rs" },
//       { threshold: 70, rank: "101,000", prize: "3,000 Rs" },
//       { threshold: 80, rank: "21", prize: "9,000 Rs" },
//       { threshold: 85, rank: "13", prize: "20,000 Rs" },
//       { threshold: 90, rank: "12", prize: "25,000 Rs" },
//       { threshold: 92, rank: "11", prize: "50,000 Rs" },
//       { threshold: 94, rank: "10", prize: "1,00,000 Rs" },
//       { threshold: 96, rank: "8", prize: "1,50,000 Rs" },
//       { threshold: 98, rank: "6", prize: "2,00,000 Rs" },
//       { threshold: 99, rank: "5", prize: "2,00,000 Rs" },
//       { threshold: 100, rank: "1", prize: "3 Crore Rs" }
//     ];

//     const result = ranks.find(r => risk <= r.threshold) || ranks[ranks.length - 1];
//     return { rank: result.rank, prize: result.prize };
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full max-w-2xl mx-auto mb-4 p-4 bg-white rounded-lg shadow-sm">
//       <div className="flex justify-between mb-2">
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={0}
//         max={100}
//         step={1}
//         className="w-full"
//       />
//       <div className="flex justify-between mt-2 px-1">
//         <span className="text-green-600">Safe</span>
//         <span className="text-red-600">Aggressive</span>
//       </div>
//     </div>
//   );
// };

// const TeamSlider = ({ value, onChange, onGenerate }: {
//   value: number;
//   onChange: (value: number) => void;
//   onGenerate: () => void;
// }) => {
//   return (
//     <div className="w-full max-w-2xl mx-auto mb-6 p-4 bg-green-600 rounded-lg shadow-sm">
//       <div className="flex flex-col gap-4">
//         <div className="flex items-center justify-between">
//           <span className="text-lg font-medium text-white">Number of Teams: <span className="p-2 rounded-full bg-gray-600"> {value}</span> </span>
//         </div>
//         <Slider
//           value={[value]}
//           onValueChange={([val]) => onChange(val)}
//           min={1}
//           max={100}
//           step={1}
//           className="w-full"
//         />
//         <div className="flex justify-between text-sm text-grey-800">
//           <span>1 Team</span>
//           <span>Max 100 Teams</span>
//         </div>
//         <Button
//           onClick={onGenerate}
//           className="bg-blue-600 hover:bg-blue-700 text-lg py-6"
//         >
//           <span className="text-white">Generate Teams</span>
//           <span className="text-yellow-300"> ₹{value * 5}</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// // ---------- Main Component ----------
// export default function BuildTeamPage() {
//   const params = useParams<{ matchId: string }>();
//   const matchId = params?.matchId;
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [numTeams, setNumTeams] = useState(1);
//   const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);
//   const [showFullTeams, setShowFullTeams] = useState(false);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//   const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
//   const [lastGeneratedCount, setLastGeneratedCount] = useState(0);
//   const [squadData, setSquadData] = useState<SquadData | null>(null);

//   useEffect(() => {
//     const fetchMatchAndSquadData = async () => {
//       try {
//         setLoading(true);
        
//         if (!matchId) {
//           setError("Match ID is missing");
//           return;
//         }

//         const matchRef = doc(db, "matchinfo", matchId);
//         const matchSnap = await getDoc(matchRef);
        
//         if (!matchSnap.exists()) {
//           setError("Match not found");
//           return;
//         }

//         const matchData = matchSnap.data() as MatchInfo;
        
//         if (!matchData?.team1?.playerDetails || !matchData?.team2?.playerDetails) {
//           setError("Team data is incomplete");
//           return;
//         }

//         // Process team1 players
//         const team1Players = matchData.team1.playerDetails
//           .filter(player => !player.substitute)
//           .map(player => ({
//             id: player.id,
//             name: player.name,
//             role: player.role.includes('WK') ? 'WK' :
//                  player.role.includes('Batter') ? 'BAT' :
//                  player.role.includes('Allrounder') ? 'AR' : 'BOWL',
//             isCaptain: player.captain,
//             isKeeper: player.keeper,
//             battingStyle: player.battingStyle,
//             bowlingStyle: player.bowlingStyle,
//             image: player.faceImageId ? `https://example.com/images/${player.faceImageId}.jpg` : "/fallback.jpg",
//             team: matchData.team1.shortName
//           }));

//         // Process team2 players
//         const team2Players = matchData.team2.playerDetails
//           .filter(player => !player.substitute)
//           .map(player => ({
//             id: player.id,
//             name: player.name,
//             role: player.role.includes('WK') ? 'WK' :
//                  player.role.includes('Batter') ? 'BAT' :
//                  player.role.includes('Allrounder') ? 'AR' : 'BOWL',
//             isCaptain: player.captain,
//             isKeeper: player.keeper,
//             battingStyle: player.battingStyle,
//             bowlingStyle: player.bowlingStyle,
//             image: player.faceImageId ? `https://example.com/images/${player.faceImageId}.jpg` : "/fallback.jpg",
//             team: matchData.team2.shortName
//           }));

//         // Create squad data structure
//         const squad: SquadData = {
//           matchInfo: {
//             id: matchData.matchId,
//             team1: matchData.team1.shortName,
//             team2: matchData.team2.shortName,
//             venue: matchData.venue?.name || "Unknown Venue",
//             date: new Date(matchData.matchStartTimestamp).toLocaleDateString(),
//             time: new Date(matchData.matchStartTimestamp).toLocaleTimeString(),
//             series: matchData.series?.name || "Unknown Series"
//           },
//           players: {
//             [matchData.team1.shortName]: team1Players,
//             [matchData.team2.shortName]: team2Players
//           },
//           lastUpdated: new Date().toISOString()
//         };

//         setSquadData(squad);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     if (matchId) {
//       fetchMatchAndSquadData();
//     }
//   }, [matchId]);

//   const generateRandomTeam = (): Player[] => {
//     if (!squadData) return [];
    
//     const { players, matchInfo } = squadData;
//     const team1Players = players[matchInfo.team1] || [];
//     const team2Players = players[matchInfo.team2] || [];
//     const allPlayers = [...team1Players, ...team2Players];
    
//     // Filter players by role with null checks
//     const wicketkeepers = allPlayers.filter(p => p?.role?.includes('WK'));
//     const batsmen = allPlayers.filter(p => p?.role?.includes('BAT'));
//     const allRounders = allPlayers.filter(p => p?.role?.includes('AR'));
//     const bowlers = allPlayers.filter(p => p?.role?.includes('BOWL'));

//     // Team composition rules
//     const teamComposition = {
//       wk: 1,
//       bat: 3,
//       ar: 2,
//       bowl: 5
//     };

//     // Adjust composition based on risk level
//     if (riskLevel > 70) {
//       teamComposition.bat = 2;
//       teamComposition.ar = 3;
//     } else if (riskLevel < 30) {
//       teamComposition.bat = 4;
//       teamComposition.ar = 1;
//     }

//     // Select players for each role
//     const selectedWk = selectRandomPlayers(wicketkeepers, teamComposition.wk);
//     const selectedBat = selectRandomPlayers(batsmen, teamComposition.bat);
//     const selectedAr = selectRandomPlayers(allRounders, teamComposition.ar);
//     const selectedBowl = selectRandomPlayers(bowlers, teamComposition.bowl);

//     // Combine all selected players
//     let team = [...selectedWk, ...selectedBat, ...selectedAr, ...selectedBowl];

//     // Ensure we have exactly 11 players
//     if (team.length < 11) {
//       const remaining = 11 - team.length;
//       const remainingPlayers = allPlayers.filter(p => !team.includes(p));
//       team = [...team, ...selectRandomPlayers(remainingPlayers, remaining)];
//     } else if (team.length > 11) {
//       team = team.slice(0, 11);
//     }

//     // Ensure team has players from both teams
//     const team1Count = team.filter(p => p?.team === matchInfo.team1).length;
//     const team2Count = team.filter(p => p?.team === matchInfo.team2).length;
    
//     if (team1Count === 0 && team1Players.length > 0) {
//       const team1Player = selectRandomPlayers(team1Players, 1)[0];
//       if (team1Player) team[0] = team1Player;
//     } else if (team2Count === 0 && team2Players.length > 0) {
//       const team2Player = selectRandomPlayers(team2Players, 1)[0];
//       if (team2Player) team[0] = team2Player;
//     }

//     return team;
//   };

//   const selectRandomPlayers = (players: Player[], count: number): Player[] => {
//     if (!players || players.length === 0 || count <= 0) return [];
//     if (players.length <= count) return [...players];
    
//     const shuffled = [...players].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   };

//   const predictCaptainAndViceCaptain = (team: Player[] = []) => {
//     try {
//       const captains = team?.filter(p => p?.isCaptain) || [];
//       const keepers = team?.filter(p => p?.isKeeper) || [];
//       const batsmen = team?.filter(p =>
//         p?.role?.includes("BAT") || p?.role?.includes("AR")
//       ) || [];
    
//       const captain = captains[0] || batsmen[0] || (team?.length > 0 ? team[0] : null);
//       const viceCaptain = captains[1] || keepers[0] || batsmen[1] || (team?.length > 1 ? team[1] : null);
    
//       return {
//         captain: captain || null,
//         viceCaptain: viceCaptain || null
//       };
//     } catch (error) {
//       console.error("Error predicting captains:", error);
//       return { captain: null, viceCaptain: null };
//     }
//   };

//   const countPlayersByRole = (team: Player[] = []) => {
//     const counts: Record<string, number> = {
//       'WK': 0,
//       'BAT': 0,
//       'AR': 0,
//       'BOWL': 0
//     };
    
//     team?.forEach(player => {
//       if (!player?.role) return;
      
//       if (player.role.includes('WK')) counts['WK']++;
//       else if (player.role.includes('BAT')) counts['BAT']++;
//       else if (player.role.includes('AR')) counts['AR']++;
//       else if (player.role.includes('BOWL')) counts['BOWL']++;
//     });
    
//     return counts;
//   };

//   const generateMultipleTeams = () => {
//     const teams: Player[][] = [];
//     for (let i = 0; i < numTeams; i++) {
//       teams.push(generateRandomTeam());
//     }
//     setGeneratedTeams(teams);
//     setLastGeneratedCount(numTeams);
//     setSelectedTeamsToShare([]);
//     setExpandedTeam(null);
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const toggleTeamExpansion = (index: number) => {
//     setExpandedTeam(expandedTeam === index ? null : index);
//   };

//   const shareTeams = () => {
//     if (!squadData) return;

//     const message = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map((team, i) => {
//         const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
        
//         const sortedPlayers = [...team].sort((a, b) => {
//           const roleOrder = { 'WK': 0, 'BAT': 1, 'AR': 2, 'BOWL': 3 };
//           const aRole = a?.role?.split(' ')[0] || '';
//           const bRole = b?.role?.split(' ')[0] || '';
//           return roleOrder[aRole] - roleOrder[bRole];
//         });

//         return `Team ${i+1}:\nC: ${captain?.name || "Not Selected"}\nVC: ${viceCaptain?.name || "Not Selected"}\nPlayers:\n${
//           sortedPlayers.map(p => `${p?.name || "Unknown Player"} (${p?.role?.includes('WK') ? 'Wicketkeeper' : p?.role || "Player"})`).join('\n')
//         }`;
//       })
//       .join('\n\n');
    
//     const shareUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
//     window.open(shareUrl, '_blank');
//   };

//   const renderGeneratedTeams = () => {
//     if (!squadData) return null;

//     return generatedTeams.map((team, index) => {
//       const { captain, viceCaptain } = predictCaptainAndViceCaptain(team);
//       const roleCounts = countPlayersByRole(team);
//       const isExpanded = showFullTeams || expandedTeam === index;

//       return (
//         <Card key={index} className="mb-4 bg-[url('/Grass.jpg')] bg-cover bg-center">
//           <CardHeader className="pb-2">
//             <div className="flex justify-between items-center">
//               <CardTitle className="text-lg">Team {index + 1}</CardTitle>
//               <input
//                 type="checkbox"
//                 checked={selectedTeamsToShare.includes(index)}
//                 onChange={() => toggleTeamSelection(index)}
//                 className="h-5 w-5"
//               />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between mb-4">
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={captain?.image || "/fallback.jpg"}
//                   alt={captain?.name || "Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-yellow-500 mb-1"
//                 />
//                 <span className="font-medium">C: {captain?.name || "Not Selected"}</span>
//                 <span className="text-xs">{captain?.team || ""}</span>
//               </div>
//               <div className="flex flex-col items-center text-center">
//                 <Image
//                   src={viceCaptain?.image || "/fallback.jpg"}
//                   alt={viceCaptain?.name || "Vice Captain"}
//                   width={50}
//                   height={50}
//                   className="rounded-full border-2 border-blue-500 mb-1"
//                 />
//                 <span className="font-medium">VC: {viceCaptain?.name || "Not Selected"}</span>
//                 <span className="text-xs">{viceCaptain?.team || ""}</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//               {Object.entries(roleCounts).map(([role, count]) => (
//                 <div key={role} className="bg-gray-100 p-2 rounded text-center">
//                   <div className="font-bold">{count}</div>
//                   <div>{role}</div>
//                 </div>
//               ))}
//             </div>

//             {isExpanded && (
//               <div className="space-y-2">
//                 {team
//                   .sort((a, b) => {
//                     const roleOrder = { 'WK': 0, 'BAT': 1, 'AR': 2, 'BOWL': 3 };
//                     const aRole = a?.role || '';
//                     const bRole = b?.role || '';
//                     return roleOrder[aRole] - roleOrder[bRole];
//                   })
//                   .map((player, i) => (
//                     <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
//                       <Image
//                         src={player?.image || "/fallback.jpg"}
//                         alt={player?.name || "Player"}
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium">{player?.name || "Unknown Player"}</p>
//                         <p className="text-sm text-gray-500">
//                           {player?.role?.includes('WK') ? 'Wicketkeeper' :
//                            player?.role?.includes('BAT') ? 'Batsman' :
//                            player?.role?.includes('AR') ? 'All-Rounder' : 'Bowler'}
//                         </p>
//                       </div>
//                       {player?.name === captain?.name && (
//                         <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                           C
//                         </span>
//                       )}
//                       {player?.name === viceCaptain?.name && (
//                         <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                           VC
//                         </span>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             )}

//             <Button
//               variant="ghost"
//               size="sm"
//               className="w-full mt-2 text-white"
//               onClick={() => toggleTeamExpansion(index)}
//             >
//               {isExpanded ? "Hide Team" : "View Full Team"}
//             </Button>
//           </CardContent>
//         </Card>
//       );
//     });
//   };

//   if (!matchId) {
//     return <div className="p-4 text-center text-red-500">Match ID is required</div>;
//   }

//   if (loading) {
//     return <div className="p-4 text-center">Loading match details...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   if (!squadData) {
//     return <div className="p-4 text-center">Squad data not available</div>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <div className="text-center mb-6">
//         <h1 className="text-2xl font-bold">
//           {squadData.matchInfo.team1} vs {squadData.matchInfo.team2}
//         </h1>
//         <p className="text-gray-600">{squadData.matchInfo.series}</p>
//         <p className="text-sm text-gray-500">
//           {squadData.matchInfo.venue} • {squadData.matchInfo.date} • {squadData.matchInfo.time}
//         </p>
//       </div>
      
//       <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//       <TeamSlider
//         value={numTeams}
//         onChange={setNumTeams}
//         onGenerate={generateMultipleTeams}
//       />

//       {generatedTeams.length > 0 && (
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Generated Teams ({lastGeneratedCount})</h2>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="showFullTeams"
//                   checked={showFullTeams}
//                   onChange={() => setShowFullTeams(!showFullTeams)}
//                   className="h-4 w-4"
//                 />
//                 <label htmlFor="showFullTeams" className="text-sm">
//                   Show Full Teams
//                 </label>
//               </div>
//               {selectedTeamsToShare.length > 0 && (
//                 <Button
//                   onClick={shareTeams}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   Share ({selectedTeamsToShare.length})
//                 </Button>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {renderGeneratedTeams()}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




















// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// // ---------- Types ----------

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   faceImageId?: number;
// }

// interface Team {
//   id: number;
//   name: string;
//   playerDetails: PlayerDetail[];
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   team1: Team;
//   team2: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// // ---------- Component ----------

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMatch = async () => {
//       if (!matchId) return;

//       try {
//         const docRef = doc(db, "matchinfo", matchId as string);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setMatchData(docSnap.data() as MatchData);
//         } else {
//           console.log("No such match!");
//         }
//       } catch (error) {
//         console.error("Error fetching match:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatch();
//   }, [matchId]);

//   if (loading) return <p>Loading match details...</p>;
//   if (!matchData) return <p>No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Match Details</h1>

//       <p><strong>Match:</strong> {matchInfo.matchDescription}</p>
//       <p><strong>Format:</strong> {matchInfo.matchFormat}</p>
//       <p><strong>Date:</strong> {new Date(matchInfo.matchStartTimestamp).toLocaleString()}</p>

//       {matchInfo.venue && (
//         <p>
//           <strong>Venue:</strong> {matchInfo.venue.name}, {matchInfo.venue.city}, {matchInfo.venue.country}
//         </p>
//       )}

//       {/* Team 1 */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">{team1.name}</h2>
//         <ul className="list-disc pl-6">
//           {team1.playerDetails.map((player) => (
//             <li key={player.id}>
//               {player.fullName}{" "}
//               {player.captain && <span className="text-sm text-blue-600">(C)</span>}
//               {player.keeper && <span className="text-sm text-green-600"> (WK)</span>}
//               {player.substitute && <span className="text-sm text-orange-500"> (Sub)</span>}
//               {player.isOverseas && <span className="text-sm text-purple-600"> (Overseas)</span>}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Team 2 */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">{team2.name}</h2>
//         <ul className="list-disc pl-6">
//           {team2.playerDetails.map((player) => (
//             <li key={player.id}>
//               {player.fullName}{" "}
//               {player.captain && <span className="text-sm text-blue-600">(C)</span>}
//               {player.keeper && <span className="text-sm text-green-600"> (WK)</span>}
//               {player.substitute && <span className="text-sm text-orange-500"> (Sub)</span>}
//               {player.isOverseas && <span className="text-sm text-purple-600"> (Overseas)</span>}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState, useMemo } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { Button } from "../../../components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Slider } from "@/components/ui/slider";

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   faceImageId?: number;
//   selectionPercentage?: number;
// }

// interface Team {
//   id: number;
//   name: string;
//   playerDetails: PlayerDetail[];
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   team1: Team;
//   team2: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// interface SelectedPlayer extends PlayerDetail {
//   teamId: number;
//   isCaptain?: boolean;
//   isViceCaptain?: boolean;
// }

// const ROLE_CONSTRAINTS = {
//   WK: { min: 1, max: 4 },
//   BAT: { min: 1, max: 6 },
//   AR: { min: 1, max: 6 },
//   BWL: { min: 1, max: 6 },
// };

// const RiskSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
//   const [rank, setRank] = useState("3,590,001");
//   const [prize, setPrize] = useState("49 Rs");

//   const getRankAndPrize = (risk: number) => {
//     const ranks = [
//       { threshold: 0, rank: "3,590,001", prize: "49 Rs" },
//       { threshold: 10, rank: "1,798,400", prize: "55 Rs" },
//       { threshold: 20, rank: "359,000", prize: "100 Rs" },
//       { threshold: 30, rank: "301,000", prize: "1,000 Rs" },
//       { threshold: 40, rank: "251,000", prize: "1,500 Rs" },
//       { threshold: 50, rank: "201,000", prize: "2,000 Rs" },
//       { threshold: 60, rank: "151,000", prize: "2,500 Rs" },
//       { threshold: 70, rank: "101,000", prize: "3,000 Rs" },
//       { threshold: 80, rank: "21", prize: "9,000 Rs" },
//       { threshold: 85, rank: "13", prize: "20,000 Rs" },
//       { threshold: 90, rank: "12", prize: "25,000 Rs" },
//       { threshold: 92, rank: "11", prize: "50,000 Rs" },
//       { threshold: 94, rank: "10", prize: "1,00,000 Rs" },
//       { threshold: 96, rank: "8", prize: "1,50,000 Rs" },
//       { threshold: 98, rank: "6", prize: "2,00,000 Rs" },
//       { threshold: 99, rank: "5", prize: "2,00,000 Rs" },
//       { threshold: 100, rank: "1", prize: "3 Crore Rs" }
//     ];

//     const result = ranks.find(r => risk <= r.threshold) || ranks[ranks.length - 1];
//     return { rank: result.rank, prize: result.prize };
//   };

//   useEffect(() => {
//     const { rank, prize } = getRankAndPrize(value);
//     setRank(rank);
//     setPrize(prize);
//   }, [value]);

//   return (
//     <div className="w-full mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
//       <div className="flex justify-between mb-2">
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Prize</span>
//           <p className="text-lg font-bold text-green-600">🏆 {prize}</p>
//         </div>
//         <div className="text-center">
//           <span className="text-sm text-gray-600">Expected Rank</span>
//           <p className="text-lg font-bold text-blue-600">🏅 {rank}</p>
//         </div>
//       </div>
//       <Slider
//         value={[value]}
//         onValueChange={([val]) => onChange(val)}
//         min={0}
//         max={100}
//         step={1}
//         className="w-full"
//       />
//       <div className="flex justify-between mt-2 px-1">
//         <span className="text-green-600">Safe</span>
//         <span className="text-red-600">Aggressive</span>
//       </div>
//     </div>
//   );
// };

// const TeamSlider = ({ value, onChange, onGenerate }: {
//   value: number;
//   onChange: (value: number) => void;
//   onGenerate: () => void;
// }) => {
//   return (
//     <div className="w-full mb-6 p-4 bg-green-600 rounded-lg shadow-sm">
//       <div className="flex flex-col gap-4">
//         <div className="flex items-center justify-between">
//           <span className="text-lg font-medium text-white">Number of Teams: <span className="p-2 rounded-full bg-gray-600"> {value}</span> </span>
//         </div>
//         <Slider
//           value={[value]}
//           onValueChange={([val]) => onChange(val)}
//           min={1}
//           max={100}
//           step={1}
//           className="w-full"
//         />
//         <div className="flex justify-between text-sm text-white">
//           <span>1 Team</span>
//           <span>Max 100 Teams</span>
//         </div>
//         <Button
//           onClick={onGenerate}
//           className="bg-blue-600 hover:bg-blue-700 text-lg py-6"
//         >
//           <span className="text-white">Generate Teams</span>
//           <span className="text-yellow-300"> ₹{value * 5}</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [playerSelectionData, setPlayerSelectionData] = useState<Record<string, Record<string, number>>>({});
//   const [loading, setLoading] = useState(true);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(1);
//   const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([]);
//   const [teamComposition, setTeamComposition] = useState({
//     WK: 0,
//     BAT: 0,
//     AR: 0,
//     BWL: 0,
//   });
//   const [isAfter7AM, setIsAfter7AM] = useState(false);
//   const [selectionCounts, setSelectionCounts] = useState<Record<number, number>>({});

//   useEffect(() => {
//     const checkTime = () => {
//       const now = new Date();
//       const sevenAM = new Date();
//       sevenAM.setHours(7, 0, 0, 0);
//       setIsAfter7AM(now >= sevenAM);
//     };
    
//     checkTime();
//     const interval = setInterval(checkTime, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!matchId) return;

//       try {
//         setLoading(true);
        
//         const matchDocRef = doc(db, "matchinfo", matchId as string);
//         const matchDocSnap = await getDoc(matchDocRef);

//         if (matchDocSnap.exists()) {
//           setMatchData(matchDocSnap.data() as MatchData);
//         }

//         const selectionDocRef = doc(db, "playerSelections", matchId as string);
//         const selectionDocSnap = await getDoc(selectionDocRef);

//         if (selectionDocSnap.exists()) {
//           setPlayerSelectionData(selectionDocSnap.data() as Record<string, Record<string, number>>);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [matchId]);

//   const enhancedMatchData = useMemo(() => {
//     if (!matchData || !playerSelectionData) return null;

//     const enhancedData = JSON.parse(JSON.stringify(matchData)) as MatchData;

//     enhancedData.matchInfo.team1.playerDetails.forEach((player) => {
//       player.selectionPercentage =
//         playerSelectionData[enhancedData.matchInfo.team1.name]?.[player.fullName] || 0;
//     });

//     enhancedData.matchInfo.team2.playerDetails.forEach((player) => {
//       player.selectionPercentage =
//         playerSelectionData[enhancedData.matchInfo.team2.name]?.[player.fullName] || 0;
//     });

//     return enhancedData;
//   }, [matchData, playerSelectionData]);

//   const togglePlayerSelection = (player: PlayerDetail, teamId: number) => {
//     if ((player.selectionPercentage || 0) <= 0) return;

//     setSelectedPlayers((prev) => {
//       const isSelected = prev.some((p) => p.id === player.id);
      
//       if (isSelected) {
//         return prev.filter((p) => p.id !== player.id);
//       } else {
//         const role = getPlayerRole(player);
//         const currentCount = prev.filter((p) => getPlayerRole(p) === role).length;
        
//         if (currentCount >= ROLE_CONSTRAINTS[role].max) {
//           return prev;
//         }
        
//         const newPlayer: SelectedPlayer = { ...player, teamId };
//         return [...prev, newPlayer];
//       }
//     });

//     setSelectionCounts(prev => ({
//       ...prev,
//       [player.id]: (prev[player.id] || 0) + 1
//     }));
//   };

//   const generateCombination = () => {
//     if (!enhancedMatchData) return;

//     const allPlayers = [
//       ...enhancedMatchData.matchInfo.team1.playerDetails.map((p) => ({
//         ...p,
//         teamId: enhancedMatchData.matchInfo.team1.id,
//       })),
//       ...enhancedMatchData.matchInfo.team2.playerDetails.map((p) => ({
//         ...p,
//         teamId: enhancedMatchData.matchInfo.team2.id,
//       })),
//     ].filter((p) => !p.substitute && (p.selectionPercentage || 0) > 0);

//     const sortedPlayers = [...allPlayers].sort((a, b) => {
//       const aRiskAdjusted = riskLevel > 50 ?
//         100 - (a.selectionPercentage || 0) :
//         a.selectionPercentage || 0;
//       const bRiskAdjusted = riskLevel > 50 ?
//         100 - (b.selectionPercentage || 0) :
//         b.selectionPercentage || 0;
//       return bRiskAdjusted - aRiskAdjusted;
//     });

//     const newTeam: SelectedPlayer[] = [];
//     const roleCounts = { WK: 0, BAT: 0, AR: 0, BWL: 0 };
//     const newCounts = {...selectionCounts};

//     const tryAddPlayer = (player: SelectedPlayer) => {
//       const role = getPlayerRole(player);
//       if (roleCounts[role] < ROLE_CONSTRAINTS[role].max) {
//         newTeam.push({ ...player });
//         roleCounts[role]++;
//         newCounts[player.id] = (newCounts[player.id] || 0) + 1;
//         return true;
//       }
//       return false;
//     };

//     for (const player of sortedPlayers) {
//       if (newTeam.length >= 11) break;
//       const role = getPlayerRole(player);
//       if (roleCounts[role] < ROLE_CONSTRAINTS[role].min) {
//         tryAddPlayer(player);
//       }
//     }

//     for (const player of sortedPlayers) {
//       if (newTeam.length >= 11) break;
//       if (!newTeam.some((p) => p.id === player.id)) {
//         tryAddPlayer(player);
//       }
//     }

//     if (newTeam.length > 0) {
//       const captain = [...newTeam].sort((a, b) =>
//         (b.selectionPercentage || 0) - (a.selectionPercentage || 0)
//       )[0];
//       captain.isCaptain = true;

//       const vc = [...newTeam]
//         .filter(p => p.id !== captain.id)
//         .sort((a, b) =>
//           (b.selectionPercentage || 0) - (a.selectionPercentage || 0)
//         )[0];
//       if (vc) vc.isViceCaptain = true;
//     }

//     setSelectionCounts(newCounts);
//     setSelectedPlayers(newTeam);
//     setTeamComposition(roleCounts);
//   };

//   const getPlayerRole = (player: PlayerDetail): keyof typeof ROLE_CONSTRAINTS => {
//     if (player.keeper) return "WK";
//     if (player.role?.toLowerCase().includes("batter")) return "BAT";
//     if (player.role?.toLowerCase().includes("allrounder")) return "AR";
//     return "BWL";
//   };

//   const getRiskColor = (percentage: number) => {
//     if (percentage > 75) return "text-green-600";
//     if (percentage > 50) return "text-yellow-600";
//     if (percentage > 25) return "text-orange-600";
//     return "text-red-600";
//   };

//   const renderPlayerItem = (player: PlayerDetail, teamId: number) => {
//     const isSelected = selectedPlayers.some((p) => p.id === player.id);
//     const selectionCount = selectionCounts[player.id] || 0;

//     return (
//       <div
//         key={player.id}
//         className={`flex items-center justify-between p-2 rounded ${
//           isSelected
//             ? "bg-blue-50 border border-blue-200"
//             : player.substitute
//             ? "bg-gray-100 border border-gray-200"
//             : "hover:bg-gray-50 border border-gray-100"
//         }`}
//       >
//         <div className="flex items-center">
//           {!player.substitute && (
//             <div className={`w-2 h-2 rounded-full mr-2 ${
//               isAfter7AM && !player.substitute ? 'bg-green-500' : 'bg-blue-500'
//             }`} />
//           )}
//           <Checkbox
//             checked={isSelected}
//             onCheckedChange={() => togglePlayerSelection(player, teamId)}
//             disabled={player.substitute || (player.selectionPercentage || 0) <= 0}
//             className="mr-2"
//           />
//           <div className="flex flex-col">
//             <span className="text-gray-800">
//               {player.fullName}
//               {player.captain && <span className="ml-1 text-xs bg-blue-500 text-white px-1 rounded">C</span>}
//               {player.keeper && <span className="ml-1 text-xs bg-green-500 text-white px-1 rounded">WK</span>}
//               {player.substitute && <span className="ml-1 text-xs bg-gray-500 text-white px-1 rounded">SUB</span>}
//             </span>
//             {selectionCount > 0 && (
//               <span className="text-xs text-gray-500">
//                 Selected {selectionCount} time{selectionCount !== 1 ? 's' : ''}
//               </span>
//             )}
//           </div>
//         </div>
//         <span className={`text-xs ${getRiskColor(player.selectionPercentage || 0)}`}>
//           {player.selectionPercentage}%
//         </span>
//       </div>
//     );
//   };

//   if (loading) return <div className="flex justify-center items-center h-screen"><p>Loading match details...</p></div>;
//   if (!enhancedMatchData) return <div className="flex justify-center items-center h-screen"><p>No match data found.</p></div>;

//   const { matchInfo } = enhancedMatchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">Match Details</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         <div className="lg:col-span-1 space-y-4">
//           <RiskSlider value={riskLevel} onChange={setRiskLevel} />
//           <TeamSlider
//             value={teamCount}
//             onChange={setTeamCount}
//             onGenerate={generateCombination}
//           />

//           <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
//             <h3 className="font-medium mb-2 text-gray-800">Team Composition</h3>
//             <div className="grid grid-cols-2 gap-2">
//               <div className="bg-gray-100 p-2 rounded border border-gray-200">
//                 <p className="font-medium text-gray-800">WK: {teamComposition.WK}/1-4</p>
//               </div>
//               <div className="bg-gray-100 p-2 rounded border border-gray-200">
//                 <p className="font-medium text-gray-800">BAT: {teamComposition.BAT}/1-6</p>
//               </div>
//               <div className="bg-gray-100 p-2 rounded border border-gray-200">
//                 <p className="font-medium text-gray-800">AR: {teamComposition.AR}/1-6</p>
//               </div>
//               <div className="bg-gray-100 p-2 rounded border border-gray-200">
//                 <p className="font-medium text-gray-800">BWL: {teamComposition.BWL}/1-6</p>
//               </div>
//             </div>
//           </div>

//           {selectedPlayers.length > 0 && (
//             <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
//               <h3 className="font-medium mb-2 text-gray-800">Your Team ({selectedPlayers.length}/11)</h3>
//               <div className="bg-gray-100 p-2 rounded border border-gray-200 max-h-60 overflow-y-auto">
//                 {selectedPlayers.map((player) => (
//                   <div key={player.id} className="flex items-center justify-between py-1 border-b border-gray-200">
//                     <span className="text-gray-800">
//                       {player.fullName}
//                       {player.isCaptain && <span className="ml-1 text-xs bg-blue-500 text-white px-1 rounded">C</span>}
//                       {player.isViceCaptain && <span className="ml-1 text-xs bg-green-500 text-white px-1 rounded">VC</span>}
//                     </span>
//                     <span className={`text-xs ${getRiskColor(player.selectionPercentage || 0)}`}>
//                       {player.selectionPercentage}%
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="lg:col-span-3">
//           <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
//             <h2 className="text-xl font-semibold mb-2 text-gray-800">Match Info</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
//               <div>
//                 <p><strong>Match:</strong> {matchInfo.matchDescription}</p>
//                 <p><strong>Format:</strong> {matchInfo.matchFormat}</p>
//                 <p><strong>Date:</strong> {new Date(matchInfo.matchStartTimestamp).toLocaleString()}</p>
//               </div>
//               <div>
//                 <p><strong>Pitch:</strong> Batting</p>
//                 <p><strong>Good for:</strong> Pace</p>
//                 <p><strong>Avg Score:</strong> 201</p>
//                 {matchInfo.venue && (
//                   <p><strong>Venue:</strong> {matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
//               <h2 className="text-xl font-semibold mb-2 text-gray-800">{team1.name}</h2>
//               <div className="space-y-2">
//                 {team1.playerDetails
//                   .filter(player => isAfter7AM || !player.substitute)
//                   .filter(player => (player.selectionPercentage || 0) > 0)
//                   .map((player) => renderPlayerItem(player, team1.id))}
//               </div>
//             </div>

//             <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
//               <h2 className="text-xl font-semibold mb-2 text-gray-800">{team2.name}</h2>
//               <div className="space-y-2">
//                 {team2.playerDetails
//                   .filter(player => isAfter7AM || !player.substitute)
//                   .filter(player => (player.selectionPercentage || 0) > 0)
//                   .map((player) => renderPlayerItem(player, team2.id))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// // ---------- Types ----------

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   faceImageId?: number;
// }

// interface Team {
//   id: number;
//   name: string;
//   playerDetails: PlayerDetail[];
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   team1: Team;
//   team2: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// // ---------- Component ----------

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMatch = async () => {
//       if (!matchId) return;

//       try {
//         const docRef = doc(db, "matchinfo", matchId as string);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setMatchData(docSnap.data() as MatchData);
//         } else {
//           console.log("No such match!");
//         }
//       } catch (error) {
//         console.error("Error fetching match:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatch();
//   }, [matchId]);

//   if (loading) return <p>Loading match details...</p>;
//   if (!matchData) return <p>No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Match Details</h1>

//       <p><strong>Match:</strong> {matchInfo.matchDescription}</p>
//       <p><strong>Format:</strong> {matchInfo.matchFormat}</p>
//       <p><strong>Date:</strong> {new Date(matchInfo.matchStartTimestamp).toLocaleString()}</p>

//       {matchInfo.venue && (
//         <p>
//           <strong>Venue:</strong> {matchInfo.venue.name}, {matchInfo.venue.city}, {matchInfo.venue.country}
//         </p>
//       )}

//       {/* Team 1 */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">{team1.name}</h2>
//         <ul className="list-disc pl-6">
//           {team1.playerDetails.map((player) => (
//             <li key={player.id}>
//               {player.fullName}{" "}
//               {player.captain && <span className="text-sm text-blue-600">(C)</span>}
//               {player.keeper && <span className="text-sm text-green-600"> (WK)</span>}
//               {player.substitute && <span className="text-sm text-orange-500"> (Sub)</span>}
//               {player.isOverseas && <span className="text-sm text-purple-600"> (Overseas)</span>}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Team 2 */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">{team2.name}</h2>
//         <ul className="list-disc pl-6">
//           {team2.playerDetails.map((player) => (
//             <li key={player.id}>
//               {player.fullName}{" "}
//               {player.captain && <span className="text-sm text-blue-600">(C)</span>}
//               {player.keeper && <span className="text-sm text-green-600"> (WK)</span>}
//               {player.substitute && <span className="text-sm text-orange-500"> (Sub)</span>}
//               {player.isOverseas && <span className="text-sm text-purple-600"> (Overseas)</span>}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// // ---------- Types ----------

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   faceImageId?: number;
// }

// interface Team {
//   id: number;
//   name: string;
//   playerDetails: PlayerDetail[];
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   team1: Team;
//   team2: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// // ---------- Component ----------

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMatch = async () => {
//       if (!matchId) return;

//       try {
//         const docRef = doc(db, "matchinfo", matchId as string);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setMatchData(docSnap.data() as MatchData);
//         } else {
//           console.log("No such match!");
//         }
//       } catch (error) {
//         console.error("Error fetching match:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatch();
//   }, [matchId]);

//   if (loading) return <p className="p-6">Loading match details...</p>;
//   if (!matchData) return <p className="p-6">No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2, venue } = matchInfo;

//   // Dot component (Tailwind style)
//   const Dot = ({ color }: { color: "green" | "blue" }) => (
//     <span
//       className={`inline-block w-2 h-2 rounded-full mr-2 ${
//         color === "green" ? "bg-green-500" : "bg-blue-500"
//       }`}
//     />
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">{matchInfo.matchDescription}</h1>

//       <div className="mb-4 text-sm text-gray-700">
//         <p><strong>Format:</strong> {matchInfo.matchFormat}</p>
//         <p><strong>Type:</strong> {matchInfo.matchType}</p>
//         <p><strong>Year:</strong> {matchInfo.year}</p>
//         {venue && (
//           <p>
//             <strong>Venue:</strong> {venue.name}, {venue.city}, {venue.country}
//           </p>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Team 1 */}
//         <div>
//           <h2 className="text-xl font-semibold mb-2">{team1.name}</h2>
//           <ul className="list-none pl-0 space-y-1">
//             {team1.playerDetails.map((player) => (
//               <li key={player.id} className="flex items-center">
//                 <Dot color={player.substitute === true ? "blue" : "green"} />

//                 <span>{player.fullName} ({player.role})</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Team 2 */}
//         <div>
//           <h2 className="text-xl font-semibold mb-2">{team2.name}</h2>
//           <ul className="list-none pl-0 space-y-1">
//             {team2.playerDetails.map((player) => (
//               <li key={player.id} className="flex items-center">
//                 <Dot color={player.substitute ? "blue" : "green"} />
//                 <span>{player.fullName} ({player.role})</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }












// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";

// // ---------- Types ----------

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   image?: string;
// }

// interface Team {
//   id: number;
//   name: string;
//   playerDetails: PlayerDetail[];
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   team1: Team;
//   team2: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// // ---------- Component ----------

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMatch = async () => {
//       if (!matchId) return;

//       try {
//         const docRef = doc(db, "matchinfo", matchId as string);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setMatchData(docSnap.data() as MatchData);
//         } else {
//           console.log("No such match!");
//         }
//       } catch (error) {
//         console.error("Error fetching match:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatch();
//   }, [matchId]);

//   if (loading) return <p className="p-6">Loading match details...</p>;
//   if (!matchData) return <p className="p-6">No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2, venue } = matchInfo;

//   // Dot component (Tailwind style)
//   const Dot = ({ color }: { color: "green" | "blue" }) => (
//     <span
//       className={`inline-block w-2 h-2 rounded-full mr-2 ${
//         color === "green" ? "bg-green-500" : "bg-blue-500"
//       }`}
//     />
//   );

//     return (
//         <div>
//       <Header/>
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">{matchInfo.matchDescription}</h1>

//       <div className="mb-4 text-sm text-gray-700">
//         <p><strong>Format:</strong> {matchInfo.matchFormat}</p>
//         <p><strong>Type:</strong> {matchInfo.matchType}</p>
//         <p><strong>Year:</strong> {matchInfo.year}</p>
//         {venue && (
//           <p>
//             <strong>Venue:</strong> {venue.name}, {venue.city}, {venue.country}
//           </p>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Team 1 */}
//         <div>
//           <h2 className="text-xl font-semibold mb-2">{team1.name}</h2>
//           <ul className="list-none pl-0 space-y-2">
//             {team1.playerDetails.map((player) => (
//               <li key={player.id} className="flex items-center space-x-2">
//                 <img
//                   src={player.image || "/default-player.png"}
//                   alt={player.fullName}
//                   className="w-10 h-10 rounded-full object-cover border border-gray-300"
//                 />
//                 <Dot color={player.substitute ? "blue" : "green"} />
//                 <span>{player.fullName} ({player.role})</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Team 2 */}
//         <div>
//           <h2 className="text-xl font-semibold mb-2">{team2.name}</h2>
//           <ul className="list-none pl-0 space-y-2">
//             {team2.playerDetails.map((player) => (
//               <li key={player.id} className="flex items-center space-x-2">
//                 <img
//                   src={player.image || "/default-player.png"}
//                   alt={player.fullName}
//                   className="w-10 h-10 rounded-full object-cover border border-gray-300"
//                 />
//                 <Dot color={player.substitute ? "blue" : "green"} />
//                 <span>{player.fullName} ({player.role})</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//             </div>
//             </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";

// // ---------- Types ----------

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   image?: string;
// }

// interface Team {
//   id: number;
//   name: string;
//   logo?: string;
//   playerDetails: PlayerDetail[];
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
//   ground?: string;
//   avgScore?: string;
//   pitchType?: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   team1: Team;
//   team2: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// // ---------- Component ----------

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMatch = async () => {
//       if (!matchId) return;

//       try {
//         const docRef = doc(db, "matchinfo", matchId as string);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setMatchData(docSnap.data() as MatchData);
//         } else {
//           console.log("No such match!");
//         }
//       } catch (error) {
//         console.error("Error fetching match:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatch();
//   }, [matchId]);

//   if (loading) return <p className="p-6">Loading match details...</p>;
//   if (!matchData) return <p className="p-6">No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2, venue } = matchInfo;

//   // Dot component (Tailwind style)
//   const Dot = ({ color }: { color: "green" | "blue" }) => (
//     <span
//       className={`inline-block w-2 h-2 rounded-full mr-2 ${
//         color === "green" ? "bg-green-500" : "bg-blue-500"
//       }`}
//     />
//   );

//   return (
//     <div>
//       <Header />

//       {/* Match Header */}
//       <div className="bg-gray-100 p-4 text-center">
//         <h1 className="text-2xl font-bold mb-2">{matchInfo.matchDescription}</h1>
//         <div className="flex items-center justify-center space-x-6">
//           {/* Team 1 */}
//           <div className="flex items-center space-x-2">
//             <img src={team1.logo || "/default-team.png"} alt={team1.name} className="w-12 h-12 object-contain" />
//             <h2 className="text-lg font-semibold">{team1.name}</h2>
//           </div>
//           <span className="text-xl font-bold">VS</span>
//           {/* Team 2 */}
//           <div className="flex items-center space-x-2">
//             <h2 className="text-lg font-semibold">{team2.name}</h2>
//             <img src={team2.logo || "/default-team.png"} alt={team2.name} className="w-12 h-12 object-contain" />
//           </div>
//         </div>
//       </div>

//       {/* Venue Info */}
//       {venue && (
//         <div className="bg-blue-100 p-4 text-center rounded-md mt-4 mx-6">
//           <h2 className="text-lg font-semibold">Venue Information</h2>
//           <p><strong>Ground:</strong> {venue.ground || "N/A"}</p>
//           <p><strong>Average Score:</strong> {venue.avgScore || "N/A"}</p>
//           <p><strong>Pitch Type:</strong> {venue.pitchType || "N/A"}</p>
//           <p><strong>Location:</strong> {venue.name}, {venue.city}, {venue.country}</p>
//         </div>
//       )}

//       {/* Match Details */}
//       <div className="p-6">
//         <h2 className="text-xl font-semibold mb-4">Match Details</h2>
//         <div className="mb-4 text-sm text-gray-700">
//           <p><strong>Format:</strong> {matchInfo.matchFormat}</p>
//           <p><strong>Type:</strong> {matchInfo.matchType}</p>
//           <p><strong>Year:</strong> {matchInfo.year}</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Team 1 Players */}
//           <div>
//             <h2 className="text-xl font-semibold mb-2">{team1.name}</h2>
//             <ul className="list-none pl-0 space-y-2">
//               {team1.playerDetails.map((player) => (
//                 <li key={player.id} className="flex items-center space-x-2">
//                   <img
//                     src={player.image || "/default-player.png"}
//                     alt={player.fullName}
//                     className="w-10 h-10 rounded-full object-cover border border-gray-300"
//                   />
//                   <Dot color={player.substitute ? "blue" : "green"} />
//                   <span>{player.fullName} ({player.role})</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Team 2 Players */}
//           <div>
//             <h2 className="text-xl font-semibold mb-2">{team2.name}</h2>
//             <ul className="list-none pl-0 space-y-2">
//               {team2.playerDetails.map((player) => (
//                 <li key={player.id} className="flex items-center space-x-2">
//                   <img
//                     src={player.image || "/default-player.png"}
//                     alt={player.fullName}
//                     className="w-10 h-10 rounded-full object-cover border border-gray-300"
//                   />
//                   <Dot color={player.substitute ? "blue" : "green"} />
//                   <span>{player.fullName} ({player.role})</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }










// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";

// // Team logos mapping
// const IPL_TEAM_IMAGES: { [key: string]: string } = {
//     "Chennai Super Kings": "/images/CSK.png",
//     "Mumbai Indians": "/images/MI.webp",
//     "Kolkata Knight Riders": "/images/kkr.png",
//     "Sunrisers Hyderabad": "/images/SRH (2).png",
//     "Delhi Capitals": "/images/DC.webp",
//     "Lucknow Super Giants": "/images/LSG (2).png",
//     "Rajasthan Royals": "/images/RR (2).png",
//     "Punjab Kings": "/images/PBKS.webp",
//     "Gujarat Titans": "/images/GT.webp",
//     "Royal Challengers Bengaluru": "/images/rcb.png",
//     "New Zealand": "/images/nz.png",
//     "Pakistan": "/images/pak.png",
// };

// const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback.png";

// // ---------- Types ----------

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   image?: string;
// }

// interface Team {
//   id: number;
//   name: string;
//   logo?: string;
//   playerDetails: PlayerDetail[];
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
//   ground?: string;
//   avgscore?: string;
//   pitchtype?: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   tossResults?: string;
//   team1?: Team;
//   team2?: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// // ---------- Component ----------

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMatch = async () => {
//       if (!matchId) {
//         setError("Invalid match ID");
//         setLoading(false);
//         return;
//       }

//       try {
//         const docRef = doc(db, "matchinfo", matchId as string);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setMatchData(docSnap.data() as MatchData);
//         } else {
//           console.log("No such match!");
//           setError("Match data not found");
//         }
//       } catch (error) {
//         console.error("Error fetching match:", error);
//         setError("Failed to fetch match data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatch();
//   }, [matchId]);

//   if (loading) return <p className="p-6 text-white">Loading match details...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!matchData || !matchData.matchInfo) return <p className="p-6 text-white">No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2, venue, tossResults } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />

//       {/* Match Header */}
//       <div className="bg-gray-800 p-4 text-center rounded-md shadow-md">
//         <h1 className="text-2xl font-bold mb-2">{matchInfo.matchDescription}</h1>
//         <p className="text-yellow-400 font-semibold">Toss Result: {tossResults || "update soon"}</p>
//         <div className="flex items-center justify-center space-x-6">
//           {team1 && (
//             <div className="flex items-center space-x-2">
//               <img src={getTeamImage(team1.name)} alt={team1.name} className="w-12 h-12 object-contain" />
//               <h2 className="text-lg font-semibold">{team1.name}</h2>
//             </div>
//           )}
//           <span className="text-xl font-bold">VS</span>
//           {team2 && (
//             <div className="flex items-center space-x-2">
//               <h2 className="text-lg font-semibold">{team2.name}</h2>
//               <img src={getTeamImage(team2.name)} alt={team2.name} className="w-12 h-12 object-contain" />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Player List */}
//       {team1?.playerDetails && team2?.playerDetails && (
//         <div className="p-6">
//           {[team1, team2].map((team) => (
//             <div key={team.id} className="mb-6">
//               <h2 className="text-xl font-bold mb-2">{team.name} Players</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {team.playerDetails.map((player) => (
//                   <div key={player.id} className="bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
//                     <img src={player.image || "/fallback.png"} alt={player.name} className="w-12 h-12 object-cover rounded-full" />
//                     <span className="w-3 h-3 rounded-full" style={{ backgroundColor: player.substitute ? "blue" : "green" }}></span>
//                     <p className="text-white">{player.name}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }






// // app/build-team/[matchId]/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import MatchHeader from "@/components/MatchHeader";
// import PlayerList from "@/components/PlayerList";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamGenerator from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";
// import { useUser } from "@clerk/nextjs";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "../../../components/ui/button";
// import { Share, Loader2, X } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "../../../components/ui/dialog";

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const { user } = useUser();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(10);
//   const [userBalance, setUserBalance] = useState(0);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//   const [paymentAmount, setPaymentAmount] = useState(10);
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   // Fetch match data
//   useEffect(() => {
//     const fetchMatch = async () => {
//       if (!matchId) {
//         setError("Invalid match ID");
//         setLoading(false);
//         return;
//       }

//       try {
//         const docRef = doc(db, "matchinfo", matchId as string);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setMatchData(docSnap.data() as MatchData);
//         } else {
//           setError("Match data not found");
//         }
//       } catch (error) {
//         console.error("Error fetching match:", error);
//         setError("Failed to fetch match data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatch();
//   }, [matchId]);

//   // Fetch user balance
//   useEffect(() => {
//     const fetchUserBalance = async () => {
//       if (!user) return;
      
//       try {
//         const userRef = doc(db, "users", user.id);
//         const userDoc = await getDoc(userRef);
        
//         if (userDoc.exists()) {
//           setUserBalance(userDoc.data().credits || 0);
//         } else {
//           await setDoc(userRef, {
//             credits: 0,
//             email: user.emailAddresses[0]?.emailAddress,
//             name: user.fullName
//           });
//           setUserBalance(0);
//         }
//       } catch (err) {
//         console.error("Error fetching user balance:", err);
//       }
//     };

//     fetchUserBalance();
//   }, [user]);

//   const { generatedTeams, isGenerating, generateTeams, cost } = TeamGenerator({
//     team1: matchData?.matchInfo.team1!,
//     team2: matchData?.matchInfo.team2!,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance
//   });

//   const handlePayment = async () => {
//     setIsProcessingPayment(true);
//     try {
//       // Simulate payment processing (replace with actual payment API call)
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       const newBalance = userBalance + paymentAmount;
//       setUserBalance(newBalance);
      
//       if (user) {
//         const userRef = doc(db, "users", user.id);
//         await setDoc(userRef, {
//           credits: newBalance,
//           email: user.emailAddresses[0]?.emailAddress,
//           name: user.fullName
//         }, { merge: true });
//       }
      
//       setPaymentSuccess(true);
//       setTimeout(() => {
//         setShowPaymentDialog(false);
//         setPaymentSuccess(false);
//       }, 2000);
//     } catch (error) {
//       console.error("Payment failed:", error);
//     } finally {
//       setIsProcessingPayment(false);
//     }
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const shareTeams = () => {
//     if (!matchData) return;
    
//     const teamsToShare = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map(team => {
//         return `*${team.teamName}*\n` +
//           `Captain: ${team.captain.fullName}\n` +
//           `Vice-Captain: ${team.viceCaptain.fullName}\n` +
//           `Players:\n${team.players.map(p => p.fullName).join(', ')}`;
//       })
//       .join('\n\n');
    
//     const shareText = `Check out my fantasy teams for ${matchData.matchInfo.matchDescription}:\n\n${teamsToShare}`;
//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center h-screen bg-gray-900">
//       <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
//     </div>
//   );
  
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!matchData || !matchData.matchInfo) return <p className="p-6 text-white">No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />

//       <div className="container mx-auto p-4">
//         <MatchHeader matchInfo={matchInfo} />

//         {/* Team Generation Controls */}
//         <div className="p-6 bg-gray-800 rounded-lg my-4">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />
//             <TeamCountSlider teamCount={teamCount} setTeamCount={setTeamCount} />
//           </div>

//           {/* Generate Teams Button */}
//           <Button
//             onClick={() => {
//               if (userBalance >= cost) {
//                 generateTeams();
//               } else {
//                 setShowPaymentDialog(true);
//               }
//             }}
//             disabled={isGenerating}
//             className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
//           >
//             {isGenerating ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Generating Teams...
//               </>
//             ) : (
//               `Generate ${teamCount} Teams (Cost: ₹${cost})`
//             )}
//           </Button>

//           {/* Balance Info */}
//           <div className="mt-4 flex justify-between items-center">
//             <p className="text-sm text-gray-400">
//               Your balance: ₹{userBalance}
//             </p>
//             {userBalance < cost && (
//               <Button
//                 variant="link"
//                 className="text-blue-400 hover:text-blue-300 p-0"
//                 onClick={() => setShowPaymentDialog(true)}
//               >
//                 Add Funds
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* Payment Dialog */}
//         <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
//           <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
//             <DialogHeader>
//               <DialogTitle className="text-white">Add Funds</DialogTitle>
//               <DialogDescription className="text-gray-400">
//                 Add money to your account to generate teams
//               </DialogDescription>
//             </DialogHeader>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-gray-300">
//                   Amount (₹)
//                 </label>
//                 <Input
//                   type="number"
//                   value={paymentAmount}
//                   onChange={(e) => setPaymentAmount(Math.max(10, Number(e.target.value)))}
//                   min="10"
//                   step="10"
//                   className="bg-gray-700 border-gray-600 text-white"
//                 />
//               </div>
              
//               {paymentSuccess ? (
//                 <div className="p-3 bg-green-900/30 text-green-400 rounded-md flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                   </svg>
//                   Payment successful! Your balance has been updated.
//                 </div>
//               ) : (
//                 <Button
//                   onClick={handlePayment}
//                   disabled={isProcessingPayment}
//                   className="w-full bg-green-600 hover:bg-green-700"
//                 >
//                   {isProcessingPayment ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Processing Payment...
//                     </>
//                   ) : (
//                     `Pay ₹${paymentAmount}`
//                   )}
//                 </Button>
//               )}
              
//               <p className="text-sm text-gray-400 text-center">
//                 Current balance: ₹{userBalance}
//               </p>
//             </div>
//           </DialogContent>
//         </Dialog>

//         {/* Generated Teams Section */}
//         {generatedTeams.length > 0 && (
//           <div className="p-6 bg-gray-800 rounded-lg my-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Generated Teams</h2>
//               {selectedTeamsToShare.length > 0 && (
//                 <Button
//                   onClick={shareTeams}
//                   className="gap-2"
//                 >
//                   <Share className="w-4 h-4" />
//                   Share {selectedTeamsToShare.length} Team(s)
//                 </Button>
//               )}
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {generatedTeams.map((team, index) => (
//                 <Card key={index} className="bg-gray-700 border-gray-600">
//                   <CardHeader className="pb-2">
//                     <div className="flex justify-between items-center">
//                       <CardTitle>{team.teamName}</CardTitle>
//                       <input
//                         type="checkbox"
//                         checked={selectedTeamsToShare.includes(index)}
//                         onChange={() => toggleTeamSelection(index)}
//                         className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="mb-2">
//                       <span className="font-bold">Captain: </span>
//                       <span className="text-blue-400">{team.captain.fullName}</span>
//                     </div>
//                     <div className="mb-2">
//                       <span className="font-bold">Vice-Captain: </span>
//                       <span className="text-green-400">{team.viceCaptain.fullName}</span>
//                     </div>
//                     <div className="grid grid-cols-2 gap-2">
//                       {team.players.map((player, i) => (
//                         <div key={i} className="text-sm flex items-center gap-1">
//                           <span className="truncate">{player.fullName}</span>
//                           {player.keeper && <span className="text-yellow-400">(WK)</span>}
//                           {player.isOverseas && <span className="text-red-400">(OS)</span>}
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Player Lists */}
//         <div className="p-6 bg-gray-800 rounded-lg my-4">
//           <h2 className="text-xl font-bold mb-4 text-center">Players</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {team1 && <PlayerList team={team1} />}
//             {team2 && <PlayerList team={team2} />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
















// // app/build-team/[matchId]/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import MatchHeader from "@/components/MatchHeader";
// import PlayerList from "@/components/PlayerList";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import { MatchData, Player, Team } from "@/types/match";
// import { useUser } from "@clerk/nextjs";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Share, Loader2, CheckCircle } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";

// const BALANCE_STORAGE_KEY = 'fantasyUserBalance';
// const PLAYERS_STORAGE_KEY = 'fantasyPlayers';

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const { user } = useUser();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(10);
//   const [userBalance, setUserBalance] = useState(0);
//   const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//   const [paymentAmount, setPaymentAmount] = useState(10);
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [generatedTeams, setGeneratedTeams] = useState<Team[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [expandedTeams, setExpandedTeams] = useState<number[]>([]);

//   // Load initial data from localStorage
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const savedBalance = localStorage.getItem(BALANCE_STORAGE_KEY);
//       if (savedBalance) setUserBalance(Number(savedBalance));
      
//       const savedPlayers = localStorage.getItem(PLAYERS_STORAGE_KEY);
//       if (savedPlayers) setMatchData(JSON.parse(savedPlayers));
//     }
//   }, []);

//   // Fetch match data
//   useEffect(() => {
//     const fetchMatch = async () => {
//       if (!matchId) {
//         setError("Invalid match ID");
//         setLoading(false);
//         return;
//       }

//       try {
//         const docRef = doc(db, "matchinfo", matchId as string);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;
//           setMatchData(data);
//           localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(data));
//         } else {
//           setError("Match data not found");
//         }
//       } catch (error) {
//         console.error("Error fetching match:", error);
//         setError("Failed to fetch match data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatch();
//   }, [matchId]);

//   // Fetch user balance
//   useEffect(() => {
//     const fetchUserBalance = async () => {
//       if (!user) return;
      
//       try {
//         const userRef = doc(db, "users", user.id);
//         const userDoc = await getDoc(userRef);
        
//         if (userDoc.exists()) {
//           const balance = userDoc.data().credits || 0;
//           setUserBalance(balance);
//           localStorage.setItem(BALANCE_STORAGE_KEY, balance.toString());
//         } else {
//           await setDoc(userRef, {
//             credits: userBalance,
//             email: user.emailAddresses[0]?.emailAddress,
//             name: user.fullName
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching user balance:", err);
//       }
//     };

//     fetchUserBalance();
//   }, [user]);

//   const generateTeams = async () => {
//     if (!matchData) return;
    
//     setIsGenerating(true);
//     try {
//       // Calculate cost based on team count
//       const cost = teamCount * 10; // ₹10 per team
      
//       if (userBalance < cost) {
//         setShowPaymentDialog(true);
//         return;
//       }

//       // Generate teams algorithm
//       const teams: Team[] = [];
//       const { team1, team2 } = matchData.matchInfo;
//       const allPlayers = [...team1.players, ...team2.players];
      
//       for (let i = 0; i < teamCount; i++) {
//         // Shuffle players based on risk level
//         const shuffled = [...allPlayers].sort(() => 0.5 - Math.random());
        
//         // Select team composition (adjust based on risk level)
//         const composition = {
//           WK: 1,
//           BAT: 3 + Math.floor(Math.random() * (riskLevel > 70 ? 2 : 1)),
//           AR: 2 + Math.floor(Math.random() * (riskLevel > 50 ? 2 : 1)),
//           BOWL: 5 - Math.floor(Math.random() * (riskLevel > 30 ? 2 : 1))
//         };

//         // Select players
//         const teamPlayers: Player[] = [];
//         const roles = { WK: 0, BAT: 0, AR: 0, BOWL: 0 };
        
//         shuffled.forEach(player => {
//           const role = player.role?.split(' ')[0];
//           if (role && roles[role] < composition[role]) {
//             teamPlayers.push(player);
//             roles[role]++;
//           }
//         });

//         // Select captain and vice-captain
//         const captain = teamPlayers[Math.floor(Math.random() * teamPlayers.length)];
//         const viceCaptain = teamPlayers.find(p => p !== captain) || teamPlayers[0];

//         teams.push({
//           teamName: `Team ${i + 1}`,
//           players: teamPlayers,
//           captain,
//           viceCaptain,
//           creditsUsed: 100, // Example value
//           points: 0,
//           createdAt: new Date().toISOString()
//         });
//       }

//       setGeneratedTeams(teams);
      
//       // Save teams to Firestore if user is logged in
//       if (user) {
//         const teamsCollection = collection(db, "users", user.id, "teams");
//         await Promise.all(teams.map(team => addDoc(teamsCollection, {
//           ...team,
//           matchId,
//           userId: user.id
//         }));
//       }

//       // Deduct balance
//       const newBalance = userBalance - cost;
//       setUserBalance(newBalance);
//       localStorage.setItem(BALANCE_STORAGE_KEY, newBalance.toString());
      
//       if (user) {
//         const userRef = doc(db, "users", user.id);
//         await setDoc(userRef, { credits: newBalance }, { merge: true });
//       }

//     } catch (error) {
//       console.error("Error generating teams:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const toggleTeamExpansion = (index: number) => {
//     setExpandedTeams(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const toggleTeamSelection = (index: number) => {
//     setSelectedTeamsToShare(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const shareTeams = () => {
//     if (!matchData) return;
    
//     const teamsToShare = generatedTeams
//       .filter((_, index) => selectedTeamsToShare.includes(index))
//       .map(team => {
//         return `*${team.teamName}*\n` +
//           `Captain: ${team.captain.name}\n` +
//           `Vice-Captain: ${team.viceCaptain.name}\n` +
//           `Players:\n${team.players.map(p => p.name).join(', ')}`;
//       })
//       .join('\n\n');
    
//     const shareText = `Check out my fantasy teams for ${matchData.matchInfo.matchDescription}:\n\n${teamsToShare}`;
//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   const handlePayment = async () => {
//     setIsProcessingPayment(true);
//     try {
//       // Simulate payment processing
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       const newBalance = userBalance + paymentAmount;
//       setUserBalance(newBalance);
//       localStorage.setItem(BALANCE_STORAGE_KEY, newBalance.toString());
      
//       if (user) {
//         const userRef = doc(db, "users", user.id);
//         await setDoc(userRef, {
//           credits: newBalance,
//         }, { merge: true });
//       }
      
//       setPaymentSuccess(true);
//       setTimeout(() => {
//         setShowPaymentDialog(false);
//         setPaymentSuccess(false);
//       }, 2000);
//     } catch (error) {
//       console.error("Payment failed:", error);
//     } finally {
//       setIsProcessingPayment(false);
//     }
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center h-screen bg-gray-900">
//       <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
//     </div>
//   );
  
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!matchData || !matchData.matchInfo) return <p className="p-6 text-white">No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />

//       <div className="container mx-auto p-4">
//         <MatchHeader matchInfo={matchInfo} />

//         {/* Team Generation Controls */}
//         <div className="p-6 bg-gray-800 rounded-lg my-4">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />
//             <TeamCountSlider teamCount={teamCount} setTeamCount={setTeamCount} />
//           </div>

//           {/* Generate Teams Button */}
//           <Button
//             onClick={generateTeams}
//             disabled={isGenerating}
//             className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
//           >
//             {isGenerating ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Generating Teams...
//               </>
//             ) : (
//               `Generate ${teamCount} Teams (Cost: ₹${teamCount * 10})`
//             )}
//           </Button>

//           {/* Balance Info */}
//           <div className="mt-4 flex justify-between items-center">
//             <p className="text-sm text-gray-400">
//               Your balance: ₹{userBalance}
//             </p>
//             {userBalance < (teamCount * 10) && (
//               <Button
//                 variant="link"
//                 className="text-blue-400 hover:text-blue-300 p-0"
//                 onClick={() => setShowPaymentDialog(true)}
//               >
//                 Add Funds
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* Payment Dialog */}
//         <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
//           <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
//             <DialogHeader>
//               <DialogTitle className="text-white">Add Funds</DialogTitle>
//               <DialogDescription className="text-gray-400">
//                 Add money to your account to generate teams
//               </DialogDescription>
//             </DialogHeader>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-gray-300">
//                   Amount (₹)
//                 </label>
//                 <Input
//                   type="number"
//                   value={paymentAmount}
//                   onChange={(e) => setPaymentAmount(Math.max(10, Number(e.target.value)))}
//                   min="10"
//                   step="10"
//                   className="bg-gray-700 border-gray-600 text-white"
//                 />
//               </div>
              
//               {paymentSuccess ? (
//                 <div className="p-3 bg-green-900/30 text-green-400 rounded-md flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5" />
//                   Payment successful! Your balance has been updated.
//                 </div>
//               ) : (
//                 <Button
//                   onClick={handlePayment}
//                   disabled={isProcessingPayment}
//                   className="w-full bg-green-600 hover:bg-green-700"
//                 >
//                   {isProcessingPayment ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Processing Payment...
//                     </>
//                   ) : (
//                     `Pay ₹${paymentAmount}`
//                   )}
//                 </Button>
//               )}
              
//               <p className="text-sm text-gray-400 text-center">
//                 Current balance: ₹{userBalance}
//               </p>
//             </div>
//           </DialogContent>
//         </Dialog>

//         {/* Generated Teams Section */}
//         {generatedTeams.length > 0 && (
//           <div className="p-6 bg-gray-800 rounded-lg my-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Generated Teams</h2>
//               {selectedTeamsToShare.length > 0 && (
//                 <Button
//                   onClick={shareTeams}
//                   className="gap-2"
//                 >
//                   <Share className="w-4 h-4" />
//                   Share {selectedTeamsToShare.length} Team(s)
//                 </Button>
//               )}
//             </div>
            
//             <div className="grid grid-cols-1 gap-4">
//               {generatedTeams.map((team, index) => {
//                 const isExpanded = expandedTeams.includes(index);
//                 const captain = team.captain;
//                 const viceCaptain = team.viceCaptain;
                
//                 // Calculate role counts
//                 const roleCounts = team.players.reduce((acc, player) => {
//                   const role = player.role?.split(' ')[0] || 'Unknown';
//                   acc[role] = (acc[role] || 0) + 1;
//                   return acc;
//                 }, {} as Record<string, number>);

//                 return (
//                   <Card key={index} className="mb-4 bg-[url('/Grass.jpg')] bg-cover bg-center">
//                     <CardHeader className="pb-2">
//                       <div className="flex justify-between items-center">
//                         <CardTitle>Team {index + 1}</CardTitle>
//                         <input
//                           type="checkbox"
//                           checked={selectedTeamsToShare.includes(index)}
//                           onChange={() => toggleTeamSelection(index)}
//                           className="h-5 w-5"
//                         />
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="flex justify-between mb-4">
//                         <div className="flex flex-col items-center text-center">
//                           <Image
//                             src={captain?.image || "/fallback.jpg"}
//                             alt={captain?.name || "Captain"}
//                             width={50}
//                             height={50}
//                             className="rounded-full border-2 border-yellow-500 mb-1"
//                           />
//                           <span className="font-medium">C: {captain?.name || "Captain"}</span>
//                           <span className="text-xs">{captain?.team}</span>
//                         </div>
//                         <div className="flex flex-col items-center text-center">
//                           <Image
//                             src={viceCaptain?.image || "/fallback.jpg"}
//                             alt={viceCaptain?.name || "Vice Captain"}
//                             width={50}
//                             height={50}
//                             className="rounded-full border-2 border-blue-500 mb-1"
//                           />
//                           <span className="font-medium">VC: {viceCaptain?.name || "Vice Captain"}</span>
//                           <span className="text-xs">{viceCaptain?.team}</span>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//                         {Object.entries(roleCounts).map(([role, count]) => (
//                           <div key={role} className="bg-gray-100 p-2 rounded text-center">
//                             <div className="font-bold">{count}</div>
//                             <div>{role}</div>
//                           </div>
//                         ))}
//                       </div>

//                       {isExpanded && (
//                         <div className="space-y-2">
//                           {team.players
//                             .sort((a, b) => {
//                               const roleOrder = { 'WK': 0, 'BAT': 1, 'AR': 2, 'BOWL': 3 };
//                               return roleOrder[a.role?.split(' ')[0]] - roleOrder[b.role?.split(' ')[0]];
//                             })
//                             .map((player, i) => (
//                               <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
//                                 <Image
//                                   src={player.image || "/fallback.jpg"}
//                                   alt={player.name || "Player"}
//                                   width={40}
//                                   height={40}
//                                   className="rounded-full"
//                                 />
//                                 <div className="flex-1">
//                                   <p className="font-medium">{player.name || "Unknown Player"}</p>
//                                   <p className="text-sm text-gray-500">
//                                     {player.role?.includes('WK') ? 'Wicketkeeper' : player.role || "Player"}
//                                   </p>
//                                 </div>
//                                 {player.name === captain?.name && (
//                                   <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                                     C
//                                   </span>
//                                 )}
//                                 {player.name === viceCaptain?.name && (
//                                   <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                                     VC
//                                   </span>
//                                 )}
//                               </div>
//                             ))}
//                         </div>
//                       )}

//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="w-full mt-2 text-white"
//                         onClick={() => toggleTeamExpansion(index)}
//                       >
//                         {isExpanded ? "Hide Team" : "View Full Team"}
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Player Lists */}
//         <div className="p-6 bg-gray-800 rounded-lg my-4">
//           <h2 className="text-xl font-bold mb-4 text-center">Players</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {team1 && <PlayerList team={team1} />}
//             {team2 && <PlayerList team={team2} />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


























// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";

// // Team logos mapping
// const IPL_TEAM_IMAGES: { [key: string]: string } = {
//   "Chennai Super Kings": "/images/CSK.png",
//   "Mumbai Indians": "/images/MI.webp",
//   "Kolkata Knight Riders": "/images/kkr.png",
//   "Sunrisers Hyderabad": "/images/SRH (2).png",
//   "Delhi Capitals": "/images/DC.webp",
//   "Lucknow Super Giants": "/images/LSG (2).png",
//   "Rajasthan Royals": "/images/RR (2).png",
//   "Punjab Kings": "/images/PBKS.webp",
//   "Gujarat Titans": "/images/GT.webp",
//   "Royal Challengers Bengaluru": "/images/rcb.png",
//   "New Zealand": "/images/nz.png",
//   "Pakistan": "/images/pak.png",
// };

// const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback.png";

// // ---------- Types ----------

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   img?: string;
// }

// interface Team {
//   id: number;
//   name: string;
//   logo?: string;
//   playerDetails: PlayerDetail[];
// }

// interface TossResults {
//   tossWinnerId: number;
//   decision: string;
//   tossWinnerName: string;
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
//   ground?: string;
//   avgscore?: string;
//   pitchtype?: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   tossResults?: TossResults;
//   team1?: Team;
//   team2?: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// // ---------- Component ----------

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMatch = async () => {
//       if (!matchId) {
//         setError("Invalid match ID");
//         setLoading(false);
//         return;
//       }

//       try {
//         const docRef = doc(db, "matchinfo", matchId as string);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setMatchData(docSnap.data() as MatchData);
//         } else {
//           console.log("No such match!");
//           setError("Match data not found");
//         }
//       } catch (error) {
//         console.error("Error fetching match:", error);
//         setError("Failed to fetch match data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatch();
//   }, [matchId]);

//   if (loading) return <p className="p-6 text-white">Loading match details...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!matchData || !matchData.matchInfo) return <p className="p-6 text-white">No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2, venue, tossResults } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />

//       {/* Match Header */}
//       <div className="bg-gray-800 p-4 text-center rounded-md shadow-md">
//         <h1 className="text-2xl font-bold mb-2">{matchInfo.matchDescription}</h1>
//         <p className="text-yellow-400 font-semibold">
//           Toss Result:{" "}
//           {tossResults
//             ? `${tossResults.tossWinnerName} won the toss and chose to ${tossResults.decision}`
//             : "update soon"}
//         </p>
//         <div className="flex items-center justify-center space-x-6">
//           {team1 && (
//             <div className="flex items-center space-x-2">
//               <img src={getTeamImage(team1.name)} alt={team1.name} className="w-12 h-12 object-contain" />
//               <h2 className="text-lg font-semibold">{team1.name}</h2>
//             </div>
//           )}
//           <span className="text-xl font-bold">VS</span>
//           {team2 && (
//             <div className="flex items-center space-x-2">
//               <h2 className="text-lg font-semibold">{team2.name}</h2>
//               <img src={getTeamImage(team2.name)} alt={team2.name} className="w-12 h-12 object-contain" />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Player List */}
//       {team1?.playerDetails && team2?.playerDetails && (
//         <div className="p-6">
//           {[team1, team2].map((team) => (
//             <div key={team.id} className="mb-6">
//               <h2 className="text-xl font-bold mb-2">{team.name} Players</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {team.playerDetails.map((player) => (
//                   <div key={player.id} className="bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
//                     <img src={player.img || "/fallback.png"} alt={player.name} className="w-12 h-12 object-cover rounded-full" />
//                     <span className="w-3 h-3 rounded-full" style={{ backgroundColor: player.substitute ? "blue" : "green" }}></span>
//                     <p className="text-white">{player.name}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

















// // app/build-team/[matchId]/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc, setDoc, collection, writeBatch, increment } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import MatchHeader from "@/components/MatchHeader";
// import PlayerList from "@/components/PlayerList";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import { useUser } from "@clerk/nextjs";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "../../../components/ui/button";
// import { Share, Loader2, CheckCircle } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "../../../components/ui/dialog";
// import { Slider } from "@/components/ui/slider";


// // Team logos mapping
// const IPL_TEAM_IMAGES: { [key: string]: string } = {
//   "Chennai Super Kings": "/images/CSK.png",
//   "Mumbai Indians": "/images/MI.webp",
//   // ... other team images
// };

// const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback.png";

// interface PlayerDetail {
//   id: number;
//   name: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   teamName?: string;
//   img?: string;
//   selectedCount?: number; // From Firestore
// }

// interface Team {
//   id: number;
//   name: string;
//   playerDetails: PlayerDetail[];
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   team1?: Team;
//   team2?: Team;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// interface FantasyTeam {
//   players: PlayerDetail[];
//   captain: PlayerDetail;
//   viceCaptain: PlayerDetail;
// }

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(10);
//   const [generatedTeams, setGeneratedTeams] = useState<FantasyTeam[]>([]);
//   const [playerPopularity, setPlayerPopularity] = useState<Record<string, number>>({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch match data
//         const matchRef = doc(db, "matchinfo", matchId as string);
//         const matchSnap = await getDoc(matchRef);
        
//         // Fetch popularity data
//         const popularityRef = doc(db, "matchPopularity", matchId as string);
//         const popularitySnap = await getDoc(popularityRef);

//         if (matchSnap.exists()) {
//           const data = matchSnap.data() as MatchData;
//           setMatchData(data);
          
//           if (popularitySnap.exists()) {
//             setPlayerPopularity(popularitySnap.data());
//           }
//         }
//       } catch (err) {
//         setError("Failed to load match data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [matchId]);

//   const getFantasyRole = (role: string, isKeeper: boolean): string => {
//     if (isKeeper) return "WK";
//     if (role.includes("Batter") || role.includes("Batsman")) return "BAT";
//     if (role.includes("Allrounder")) return "AR";
//     if (role.includes("Bowler")) return "BOWL";
//     return "AR";
//   };

//   const generateTeams = async () => {
//     if (!matchData?.matchInfo?.team1?.playerDetails || !matchData?.matchInfo?.team2?.playerDetails) {
//       setError("Team data incomplete");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // Prepare player pool (non-substitutes only)
//       const allPlayers = [
//         ...matchData.matchInfo.team1.playerDetails,
//         ...matchData.matchInfo.team2.playerDetails
//       ]
//       .filter(p => !p.substitute)
//       .map(p => ({
//         ...p,
//         fantasyRole: getFantasyRole(p.role, p.keeper),
//         selectedCount: playerPopularity[p.id] || 0
//       }));

//       if (allPlayers.length < 11) {
//         setError("Not enough players available");
//         return;
//       }

//       const teams: FantasyTeam[] = [];
//       const batch = writeBatch(db);

//       for (let i = 0; i < teamCount; i++) {
//         const team = generateSingleTeam(allPlayers, riskLevel);
//         teams.push(team);

//         // Update popularity counts
//         team.players.forEach(player => {
//           batch.set(doc(db, "matchPopularity", matchId as string), {
//             [player.id]: increment(1)
//           }, { merge: true });
//         });
//       }

//       await batch.commit();
//       setGeneratedTeams(teams);

//     } catch (err) {
//       setError("Failed to generate teams");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateSingleTeam = (players: PlayerDetail[], risk: number): FantasyTeam => {
//     // Sort players by popularity (selectedCount from Firestore)
//     const sortedPlayers = [...players].sort((a, b) => b.selectedCount! - a.selectedCount!);
    
//     // Determine how many top players to consider based on risk
//     const topPlayerPoolSize = Math.max(
//       11,
//       Math.min(players.length, Math.round(players.length * (1 - risk/100)))
//     );
    
//     const topPlayers = sortedPlayers.slice(0, topPlayerPoolSize);
//     const remainingPlayers = sortedPlayers.slice(topPlayerPoolSize);
    
//     // Select 11 players with weighted randomness
//     const teamPlayers: PlayerDetail[] = [];
//     const roleCounts = { WK: 0, BAT: 0, AR: 0, BOWL: 0 };
    
//     // Fill required roles
//     const composition = {
//       WK: 1 + (risk > 70 ? Math.floor(Math.random() * 2) : 0),
//       BAT: 3 + (risk > 50 ? Math.floor(Math.random() * 2) : 0),
//       AR: 2 + (risk > 70 ? Math.floor(Math.random() * 2) : 0),
//       BOWL: 5 - (risk > 50 ? Math.floor(Math.random() * 2) : 0)
//     };

//     for (const [role, count] of Object.entries(composition)) {
//       while (roleCounts[role as keyof typeof roleCounts] < count && teamPlayers.length < 11) {
//         const candidates = topPlayers.filter(p =>
//           p.fantasyRole === role &&
//           !teamPlayers.includes(p)
//         );
        
//         if (candidates.length === 0) break;
        
//         const selected = candidates[Math.floor(Math.random() * candidates.length)];
//         teamPlayers.push(selected);
//         roleCounts[role as keyof typeof roleCounts]++;
//       }
//     }

//     // Fill remaining spots with random players
//     while (teamPlayers.length < 11) {
//       const available = [...topPlayers, ...remainingPlayers]
//         .filter(p => !teamPlayers.includes(p));
      
//       if (available.length === 0) break;
      
//       const selected = available[Math.floor(Math.random() * available.length)];
//       teamPlayers.push(selected);
//       roleCounts[selected.fantasyRole as keyof typeof roleCounts]++;
//     }

//     // Select captain and vice-captain
//     const captain = selectCaptain(teamPlayers, risk);
//     const viceCaptain = selectViceCaptain(teamPlayers, captain, risk);

//     return { players: teamPlayers, captain, viceCaptain };
//   };

//   const selectCaptain = (players: PlayerDetail[], risk: number): PlayerDetail => {
//     // For low risk, pick from top 3 most popular
//     if (risk < 30) {
//       const candidates = [...players]
//         .sort((a, b) => b.selectedCount! - a.selectedCount!)
//         .slice(0, 3);
//       return candidates[Math.floor(Math.random() * candidates.length)];
//     }
//     // For high risk, pick from middle popularity
//     else if (risk > 70) {
//       const sorted = [...players].sort((a, b) => a.selectedCount! - b.selectedCount!);
//       const midPoint = Math.floor(sorted.length / 2);
//       return sorted[midPoint];
//     }
//     // Medium risk - random from top half
//     else {
//       const sorted = [...players].sort((a, b) => b.selectedCount! - a.selectedCount!);
//       return sorted[Math.floor(Math.random() * sorted.length / 2)];
//     }
//   };

//   const selectViceCaptain = (players: PlayerDetail[], captain: PlayerDetail, risk: number): PlayerDetail => {
//     const otherPlayers = players.filter(p => p !== captain);
    
//     // For low risk, pick another popular player
//     if (risk < 30) {
//       return [...otherPlayers]
//         .sort((a, b) => b.selectedCount! - a.selectedCount!)
//         [0];
//     }
//     // For high risk, pick a less popular player
//     else if (risk > 70) {
//       return [...otherPlayers]
//         .sort((a, b) => a.selectedCount! - b.selectedCount!)
//         [0];
//     }
//     // Medium risk - random
//     else {
//       return otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
//     }
//   };

//   if (loading) return <div className="p-6 text-white">Loading...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData) return <div className="p-6 text-white">No match data found</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
      
//       <div className="container mx-auto p-4">
//         {/* Match Header */}
//         <div className="bg-gray-800 p-4 rounded-md mb-6">
//           <h1 className="text-2xl font-bold">{matchInfo.matchDescription}</h1>
//         </div>

//         {/* Team Generator Controls */}
//         <div className="bg-gray-800 p-6 rounded-lg mb-6">
//           <div className="mb-6">
//             <label className="block mb-2">Risk Level: {riskLevel}</label>
//             <Slider
//               value={[riskLevel]}
//               onValueChange={([val]) => setRiskLevel(val)}
//               min={1}
//               max={100}
//               step={1}
//             />
//           </div>
          
//           <div className="mb-6">
//             <label className="block mb-2">Number of Teams: {teamCount}</label>
//             <Slider
//               value={[teamCount]}
//               onValueChange={([val]) => setTeamCount(val)}
//               min={1}
//               max={100}
//               step={1}
//             />
//           </div>
          
//           <Button
//             onClick={generateTeams}
//             disabled={loading}
//             className="w-full"
//           >
//             {loading ? "Generating..." : `Generate ${teamCount} Teams`}
//           </Button>
//         </div>

//         {/* Generated Teams */}
//         {generatedTeams.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {generatedTeams.map((team, index) => (
//               <Card key={index} className="bg-gray-800">
//                 <CardHeader>
//                   <CardTitle>Team {index + 1}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="mb-4">
//                     <p className="font-bold">Captain: {team.captain.name}</p>
//                     <p>Vice Captain: {team.viceCaptain.name}</p>
//                   </div>
                  
//                   <div className="space-y-2">
//                     {team.players.map((player, i) => (
//                       <div key={i} className="flex items-center gap-3 p-2 bg-gray-700 rounded">
//                         <Image
//                           src={player.img || "/fallback.png"}
//                           alt={player.name}
//                           width={40}
//                           height={40}
//                           className="rounded-full"
//                         />
//                         <div>
//                           <p>{player.name}</p>
//                           <p className="text-sm text-gray-400">
//                             {player.teamName} • {player.fantasyRole}
//                             {player === team.captain && " • C"}
//                             {player === team.viceCaptain && " • VC"}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










// "use client";

// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { Button } from "../../../components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
// import Image from "next/image";
// import { motion, AnimatePresence } from 'framer-motion';
// import { cn } from "@/lib/utils";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
// import { toast } from 'sonner';

// // Team logos mapping
// const IPL_TEAM_IMAGES: { [key: string]: string } = {
//     "Chennai Super Kings": "/images/CSK.png",
//     "Mumbai Indians": "/images/MI.webp",
//     "Kolkata Knight Riders": "/images/KKR.png",
//     "Royal Challengers Bangalore": "/images/RCB.png",
//     "Delhi Capitals": "/images/DC.png",
//     "Gujarat Titans": "/images/GT.png",
//     "Lucknow Super Giants": "/images/LSG.png",
//     "Sunrisers Hyderabad": "/images/SRH.png",
//     "Punjab Kings": "/images/PK.png",
//     "Rajasthan Royals": "/images/RR.png",
// };

// const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback.png";

// interface PlayerDetail {
//     id: number;
//     name: string;
//     role: string;
//     captain: boolean;
//     keeper: boolean;
//     substitute: boolean;
//     teamName?: string;
//     img?: string;
//     avgSelectPercentage?: number;
// }

// interface Team {
//     id: number;
//     name: string;
//     playerDetails: PlayerDetail[];
// }

// interface MatchInfo {
//     matchId: number;
//     matchDescription: string;
//     team1?: Team;
//     team2?: Team;
// }

// interface MatchData {
//     matchInfo: MatchInfo;
// }

// interface FantasyTeam {
//     players: PlayerDetail[];
//     captain: PlayerDetail;
//     viceCaptain: PlayerDetail;
// }

// const ROLE_CONSTRAINTS = {
//     min: { WK: 1, BAT: 2, AR: 1, BOWL: 2 },
//     max: { WK: 4, BAT: 6, AR: 6, BOWL: 6 }
// };

// const MAX_PLAYERS_FROM_TEAM = 7;

// // Animation Variants
// const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
// };

// // Helper function to get fantasy role
// const getFantasyRole = (role: string, isKeeper: boolean): string => {
//     if (isKeeper) return "WK";
//     if (role.includes("Batter") || role.includes("Batsman")) return "BAT";
//     if (role.includes("Allrounder")) return "AR";
//     if (role.includes("Bowler")) return "BOWL";
//     return "AR";
// };

// export default function MatchPage() {
//     const { matchId } = useParams();
//     const [matchData, setMatchData] = useState<MatchData | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [riskLevel, setRiskLevel] = useState(50);
//     const [teamCount, setTeamCount] = useState(3);
//     const [generatedTeams, setGeneratedTeams] = useState<FantasyTeam[]>([]);
//     const [expandedTeamIndex, setExpandedTeamIndex] = useState<number | null>(null);
//     const [selectedTeamsToShare, setSelectedTeamsToShare] = useState<number[]>([]);
//     const [isGenerating, setIsGenerating] = useState(false);
//     const [showAllTeams, setShowAllTeams] = useState(false);
//     const carouselRef = useRef<HTMLDivElement>(null);

//     // Fetch match data
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const matchRef = doc(db, "matchinfo", matchId as string);
//                 const matchSnap = await getDoc(matchRef);

//                 if (matchSnap.exists()) {
//                     const data = matchSnap.data() as MatchData;
//                     setMatchData(data);
//                 } else {
//                     setError("Match data not found");
//                 }
//             } catch (err) {
//                 console.error("Error fetching match data:", err);
//                 setError("Failed to load match data");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [matchId]);

//     // Function to generate fantasy teams
//     const generateTeams = useCallback(async () => {
//         if (!matchData?.matchInfo?.team1?.playerDetails || !matchData?.matchInfo?.team2?.playerDetails) {
//             setError("Team data incomplete");
//             return;
//         }

//         setIsGenerating(true);
//         setError(null);
//         setGeneratedTeams([]);
//         setExpandedTeamIndex(null);
//         setSelectedTeamsToShare([]);
//         setShowAllTeams(false);

//         try {
//             const allPlayers = [
//                 ...matchData.matchInfo.team1.playerDetails.map(p => ({ ...p, teamName: matchData.matchInfo.team1?.name })),
//                 ...matchData.matchInfo.team2.playerDetails.map(p => ({ ...p, teamName: matchData.matchInfo.team2?.name })),
//             ].filter(p => !p.substitute);

//             if (allPlayers.length < 11) {
//                 setError("Not enough non-substitute players available");
//                 return;
//             }

//             const teams: FantasyTeam[] = [];

//             for (let i = 0; i < teamCount; i++) {
//                 const team = generateSingleTeam(allPlayers, riskLevel);
//                 teams.push(team);
//             }

//             setGeneratedTeams(teams);

//         } catch (err) {
//             console.error("Error generating teams:", err);
//             setError("Failed to generate teams");
//         } finally {
//             setIsGenerating(false);
//         }
//     }, [matchData, teamCount, riskLevel]);

//     // Function to generate a single fantasy team
//     const generateSingleTeam = (players: PlayerDetail[], risk: number): FantasyTeam => {
//         const availablePlayers = [...players];
//         const selectedPlayers: PlayerDetail[] = [];
//         const roleCounts = { WK: 0, BAT: 0, AR: 0, BOWL: 0 };
//         const selectedTeams = new Set<string>();
//         let attempts = 0;

//         while (selectedPlayers.length < 11 && attempts < 1000) {
//             attempts++;
//             const playerIndex = Math.floor(Math.random() * availablePlayers.length);
//             const player = availablePlayers[playerIndex];
//             const fantasyRole = getFantasyRole(player.role, player.keeper);

//             const currentTeamCount = [...selectedPlayers, player].filter(p => p.teamName === player.teamName).length;

//             if (currentTeamCount <= MAX_PLAYERS_FROM_TEAM) {
//                 if (selectedPlayers.every(p => p.id !== player.id)) {
//                     let canAdd = false;
//                     switch (fantasyRole) {
//                         case "WK":
//                             if (roleCounts.WK < ROLE_CONSTRAINTS.max.WK) canAdd = true;
//                             break;
//                         case "BAT":
//                             if (roleCounts.BAT < ROLE_CONSTRAINTS.max.BAT) canAdd = true;
//                             break;
//                         case "AR":
//                             if (roleCounts.AR < ROLE_CONSTRAINTS.max.AR) canAdd = true;
//                             break;
//                         case "BOWL":
//                             if (roleCounts.BOWL < ROLE_CONSTRAINTS.max.BOWL) canAdd = true;
//                             break;
//                     }

//                     if (canAdd) {
//                         selectedPlayers.push(player);
//                         roleCounts[fantasyRole]++;
//                         selectedTeams.add(player.teamName!);
//                         availablePlayers.splice(playerIndex, 1);
//                     }
//                 }
//             }

//             if (selectedPlayers.length === 11) break;
//             if (availablePlayers.length <= 0) break;
//         }

//         if (selectedPlayers.length !== 11) {
//             console.warn("Could not form a valid team after multiple attempts. Retrying with a less strict approach.");
//             return generateSingleTeamFallback(players, risk);
//         }
//         const captain = selectCaptain(selectedPlayers, risk);
//         const viceCaptain = selectViceCaptain(selectedPlayers, captain, risk);

//         return { players: selectedPlayers, captain, viceCaptain };
//     };

//     // Fallback team generation
//     const generateSingleTeamFallback = (players: PlayerDetail[], risk: number): FantasyTeam => {
//         const shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
//         const teamPlayers = shuffledPlayers.slice(0, 11);
//         const captain = teamPlayers[Math.floor(Math.random() * teamPlayers.length)];
//         const viceCaptain = teamPlayers.filter(p => p.id !== captain.id)[Math.floor(Math.random() * (teamPlayers.length - 1))];
//         return { players: teamPlayers, captain, viceCaptain };
//     };

//     // Select captain
//     const selectCaptain = (players: PlayerDetail[], risk: number): PlayerDetail => {
//         const sortedByAvg = [...players].sort((a, b) => (b.avgSelectPercentage || 0) - (a.avgSelectPercentage || 0));
//         if (risk < 30) {
//             return sortedByAvg[Math.floor(Math.random() * Math.min(3, sortedByAvg.length))];
//         } else if (risk > 70) {
//             return sortedByAvg[Math.floor(Math.random() * Math.max(1, sortedByAvg.length - 3))];
//         } else {
//             return sortedByAvg[Math.floor(Math.random() * Math.ceil(sortedByAvg.length / 2))];
//         }
//     };

//     // Select vice-captain
//     const selectViceCaptain = (players: PlayerDetail[], captain: PlayerDetail, risk: number): PlayerDetail => {
//         const otherPlayers = players.filter(p => p.id !== captain.id);
//         const sortedByAvg = [...otherPlayers].sort((a, b) => (b.avgSelectPercentage || 0) - (a.avgSelectPercentage || 0));
//         if (risk < 30) {
//             return sortedByAvg[Math.floor(Math.random() * Math.min(3, sortedByAvg.length))];
//         } else if (risk > 70) {
//             return sortedByAvg[Math.floor(Math.random() * Math.max(1, sortedByAvg.length - 3))];
//         } else {
//             return sortedByAvg[Math.floor(Math.random() * Math.ceil(sortedByAvg.length / 2))];
//         }
//     };

//     // Toggle team expansion
//     const toggleTeamExpansion = (index: number) => {
//         setExpandedTeamIndex(expandedTeamIndex === index ? null : index);
//     };

//     // Handle team selection for sharing
//     const toggleTeamSelection = (index: number) => {
//         setSelectedTeamsToShare(prev =>
//             prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
//         );
//     };

//     // Handle WhatsApp sharing
//     const handleWhatsAppShare = () => {
//         if (selectedTeamsToShare.length === 0) {
//             toast.warning("Please select at least one team to share.");
//             return;
//         }

//         let shareText = "My Fantasy Teams:\n\n";

//         selectedTeamsToShare.forEach(index => {
//             const team = generatedTeams[index];
//             if (team) {
//                 shareText += `Team ${index + 1}\n`;
//                 shareText += `Captain: ${team.captain.name}\n`;
//                 shareText += `Vice Captain: ${team.viceCaptain.name}\n\n`;
//                 shareText += "Players:\n";
//                 team.players.forEach(player => {
//                     shareText += `${player.name} (${player.teamName}, ${getFantasyRole(player.role, player.keeper)})\n`;
//                 });
//                 shareText += "\n";
//             }
//         });

//         shareText += "Generated with [Your App Name]";

//         const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
//         window.open(whatsappUrl, "_blank");
//     };

//     // Risk Slider Colors
//     const getRiskSliderColor = (value: number) => {
//         if (value <= 30) return "bg-green-500";
//         if (value >= 70) return "bg-red-500";
//         return "bg-yellow-500";
//     };

//     // Render loading state
//     if (loading) return <div className="p-6 text-white">Loading match data...</div>;

//     // Render error state
//     if (error) return <div className="p-6 text-red-500">{error}</div>;

//     // Render no match data state
//     if (!matchData) return <div className="p-6 text-white">No match data found.</div>;

//     const { matchInfo } = matchData;
//     const { team1, team2 } = matchInfo;

//     return (
//         <div className="bg-gray-900 min-h-screen text-white">
//             <Header />

//             <div className="container mx-auto p-4">
//                 {/* Match Header */}
//                 <div className="bg-gray-800 p-4 rounded-md mb-6">
//                     <h1 className="text-2xl font-bold">{matchInfo.matchDescription}</h1>
//                 </div>

//                 {/* Team Generator Controls */}
//                 <div className="bg-gray-800 p-6 rounded-lg mb-6 flex flex-col md:flex-row items-start gap-6">
//                     <div className="flex-1">
//                         <div className="mb-6">
//                             <label className="block mb-2">Risk Level: {riskLevel}%</label>
//                             <Slider
//                                 value={[riskLevel]}
//                                 onValueChange={([val]) => setRiskLevel(val)}
//                                 min={1}
//                                 max={100}
//                                 step={1}
//                                 className={cn(
//                                     "relative",
//                                     getRiskSliderColor(riskLevel),
//                                     "[&_[role=presentation]]:h-2.5 [&_[role=presentation]]:top-0",
//                                     "[&_[role=presentation]_>_div]:rounded-full [&_[role=presentation]_>_div]:h-2.5"
//                                 )}
//                             />
//                             <div className="flex justify-between text-sm mt-1">
//                                 <span>Safe</span>
//                                 <span>Balanced</span>
//                                 <span>Risky</span>
//                             </div>
//                         </div>

//                         <div className="mb-6">
//                             <label className="block mb-2">Number of Teams: {teamCount}</label>
//                             <Slider
//                                 value={[teamCount]}
//                                 onValueChange={([val]) => setTeamCount(val)}
//                                 min={1}
//                                 max={10}
//                                 step={1}
//                             />
//                         </div>

//                         <Button
//                             onClick={generateTeams}
//                             disabled={isGenerating}
//                             className="w-full"
//                         >
//                             {isGenerating ? "Generating teams..." : `Generate ${teamCount} Teams`}
//                         </Button>
//                     </div>
//                     {generatedTeams.length > 0 && (
//                         <div className="flex flex-col gap-4">
//                             <Button
//                                 onClick={handleWhatsAppShare}
//                                 className="w-full bg-green-500 hover:bg-green-600"
//                             >
//                                 Share on WhatsApp
//                             </Button>
//                             <Button
//                                 onClick={() => setShowAllTeams(prev => !prev)}
//                                 className="w-full"
//                             >
//                                 {showAllTeams ? "View as Carousel" : "View All Teams"}
//                             </Button>
//                         </div>
//                     )}
//                 </div>

//                 {/* Generated Teams */}
//                 {generatedTeams.length > 0 && (
//                     <div className="space-y-4">
//                         <h2 className="text-2xl font-bold mb-4">Your Generated Teams</h2>
//                         {showAllTeams ? (
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                                 <AnimatePresence>
//                                     {generatedTeams.map((team, index) => (
//                                         <motion.div
//                                             key={index}
//                                             variants={cardVariants}
//                                             initial="hidden"
//                                             animate="visible"
//                                             exit="exit"
//                                         >
//                                             <TeamCard
//                                                 team={team}
//                                                 index={index}
//                                                 selectedTeamsToShare={selectedTeamsToShare}
//                                                 toggleTeamSelection={toggleTeamSelection}
//                                                 expandedTeamIndex={expandedTeamIndex}
//                                                 toggleTeamExpansion={toggleTeamExpansion}
//                                                 getFantasyRole={getFantasyRole}
//                                             />
//                                         </motion.div>
//                                     ))}
//                                 </AnimatePresence>
//                             </div>

//                         ) : (
//                             <Carousel
//                                 className="w-full"
//                                 opts={{
//                                     align: "center",
//                                     loop: true,
//                                 }}
//                                 setApi={(api) => {
//                                     if (carouselRef.current) {
//                                         carouselRef.current = api.containerNode()
//                                     }
//                                 }}
//                             >
//                                 <CarouselContent>
//                                     {generatedTeams.map((team, index) => (
//                                         <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
//                                             <div className="p-1">
//                                                 <TeamCard
//                                                     team={team}
//                                                     index={index}
//                                                     selectedTeamsToShare={selectedTeamsToShare}
//                                                     toggleTeamSelection={toggleTeamSelection}
//                                                     expandedTeamIndex={expandedTeamIndex}
//                                                     toggleTeamExpansion={toggleTeamExpansion}
//                                                     getFantasyRole={getFantasyRole}
//                                                 />
//                                             </div>
//                                         </CarouselItem>
//                                     ))}
//                                 </CarouselContent>
//                                 <CarouselPrevious />
//                                 <CarouselNext />
//                             </Carousel>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// const TeamCard: React.FC<{
//     team: FantasyTeam;
//     index: number;
//     selectedTeamsToShare: number[];
//     toggleTeamSelection: (index: number) => void;
//     expandedTeamIndex: number | null;
//     toggleTeamExpansion: (index: number) => void;
//     getFantasyRole: (role: string, isKeeper: boolean) => string;
// }> = ({ team, index, selectedTeamsToShare, toggleTeamSelection, expandedTeamIndex, toggleTeamExpansion, getFantasyRole }) => {
//     const captain = team.captain;
//     const viceCaptain = team.viceCaptain;
//     const roleCounts = team.players.reduce((acc, player) => {
//         const role = getFantasyRole(player.role, player.keeper);
//         acc[role] = (acc[role] || 0) + 1;
//         return acc;
//     }, {} as { [key: string]: number });
//     const isExpanded = expandedTeamIndex === index;

//     return (
//         <Card className="bg-[url('/Grass.jpg')] bg-cover bg-center text-white border-2 border-green-700">
//             <CardHeader className="pb-2">
//                 <div className="flex justify-between items-center">
//                     <CardTitle className="text-lg font-bold">Team {index + 1}</CardTitle>
//                     <div className="flex items-center gap-2">
//                         <label htmlFor={`team-select-${index}`} className="text-sm">Select</label>
//                         <Checkbox
//                             id={`team-select-${index}`}
//                             checked={selectedTeamsToShare.includes(index)}
//                             onCheckedChange={() => toggleTeamSelection(index)}
//                             className="h-5 w-5 text-green-500"
//                         />
//                     </div>
//                 </div>
//             </CardHeader>
//             <CardContent>
//                 <div className="flex justify-between mb-4">
//                     <div className="flex flex-col items-center text-center">
//                         <Image
//                             src={captain?.img || "/fallback.png"}
//                             alt={captain?.name || "Captain"}
//                             width={50}
//                             height={50}
//                             className="rounded-full border-2 border-yellow-500 mb-1"
//                         />
//                         <span className="font-medium">C: {captain?.name || "Captain"}</span>
//                         <span className="text-xs">{captain?.teamName}</span>
//                     </div>
//                     <div className="flex flex-col items-center text-center">
//                         <Image
//                             src={viceCaptain?.img || "/fallback.png"}
//                             alt={viceCaptain?.name || "Vice Captain"}
//                             width={50}
//                             height={50}
//                             className="rounded-full border-2 border-blue-500 mb-1"
//                         />
//                         <span className="font-medium">VC: {viceCaptain?.name || "Vice Captain"}</span>
//                         <span className="text-xs">{viceCaptain?.teamName}</span>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
//                     {Object.entries(roleCounts).map(([role, count]) => (
//                         <div key={role} className="bg-gray-100 p-2 rounded text-center text-gray-800">
//                             <div className="font-bold">{count}</div>
//                             <div>{role}</div>
//                         </div>
//                     ))}
//                 </div>

//                 {isExpanded && (
//                     <div className="space-y-2">
//                         {team.players
//                             .sort((a, b) => {
//                                 const roleOrder = { 'WK': 0, 'BAT': 1, 'AR': 2, 'BOWL': 3 };
//                                 const roleA = getFantasyRole(a.role, a.keeper);
//                                 const roleB = getFantasyRole(b.role, b.keeper);
//                                 return roleOrder[roleA] - roleOrder[roleB];
//                             })
//                             .map((player, i) => (
//                                 <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded text-gray-800">
//                                     <Image
//                                         src={player.img || "/fallback.png"}
//                                         alt={player.name || "Player"}
//                                         width={40}
//                                         height={40}
//                                         className="rounded-full"
//                                     />
//                                     <div className="flex-1">
//                                         <p className="font-medium">{player.name || "Unknown Player"}</p>
//                                         <p className="text-sm text-gray-500">
//                                             {player.teamName} • {getFantasyRole(player.role, player.keeper)}
//                                         </p>
//                                     </div>
//                                     {player.id === captain?.id && (
//                                         <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
//                                             C
//                                         </span>
//                                     )}
//                                     {player.id === viceCaptain?.id && (
//                                         <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
//                                             VC
//                                         </span>
//                                     )}
//                                 </div>
//                             ))}
//                     </div>
//                 )}

//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     className="w-full mt-2 text-white"
//                     onClick={() => toggleTeamExpansion(index)}
//                 >
//                     {isExpanded ? "Hide Team" : "View Full Team"}
//                 </Button>
//             </CardContent>
//         </Card>
//     )
// }























// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";

// // Team logos mapping
// const IPL_TEAM_IMAGES: { [key: string]: string } = {
//   "Chennai Super Kings": "/images/CSK.png",
//   "Mumbai Indians": "/images/MI.webp",
//   "Kolkata Knight Riders": "/images/kkr.png",
//   "Sunrisers Hyderabad": "/images/SRH (2).png",
//   "Delhi Capitals": "/images/DC.webp",
//   "Lucknow Super Giants": "/images/LSG (2).png",
//   "Rajasthan Royals": "/images/RR (2).png",
//   "Punjab Kings": "/images/PBKS.webp",
//   "Gujarat Titans": "/images/GT.webp",
//   "Royal Challengers Bengaluru": "/images/rcb.png",
//   "New Zealand": "/images/nz.png",
//   "Pakistan": "/images/pak.png",
// };

// const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback.png";

// // ---------- Types ----------

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   img?: string;
// }

// interface Team {
//   id: number;
//   name: string;
//   logo?: string;
//   playerDetails: PlayerDetail[];
// }

// interface TossResults {
//   tossWinnerId: number;
//   decision: string;
//   tossWinnerName: string;
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
//   ground?: string;
//   avgscore?: string;
//   pitchtype?: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   tossResults?: TossResults;
//   team1?: Team;
//   team2?: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// // ---------- Component ----------

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMatch = async () => {
//       if (!matchId) {
//         setError("Invalid match ID");
//         setLoading(false);
//         return;
//       }

//       try {
//         const docRef = doc(db, "matchinfo", matchId as string);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setMatchData(docSnap.data() as MatchData);
//         } else {
//           console.log("No such match!");
//           setError("Match data not found");
//         }
//       } catch (error) {
//         console.error("Error fetching match:", error);
//         setError("Failed to fetch match data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatch();
//   }, [matchId]);

//   if (loading) return <p className="p-6 text-white">Loading match details...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!matchData || !matchData.matchInfo) return <p className="p-6 text-white">No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2, venue, tossResults } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />

//       {/* Match Header */}
//       <div className="bg-gray-800 p-4 text-center rounded-md shadow-md">
//         <h1 className="text-2xl font-bold mb-2">{matchInfo.matchDescription}</h1>
//         <p className="text-yellow-400 font-semibold">
//           Toss Result:{" "}
//           {tossResults
//             ? `${tossResults.tossWinnerName} won the toss and chose to ${tossResults.decision}`
//             : "update soon"}
//         </p>
//         <div className="flex items-center justify-center space-x-6">
//           {team1 && (
//             <div className="flex items-center space-x-2">
//               <img src={getTeamImage(team1.name)} alt={team1.name} className="w-12 h-12 object-contain" />
//               <h2 className="text-lg font-semibold">{team1.name}</h2>
//             </div>
//           )}
//           <span className="text-xl font-bold">VS</span>
//           {team2 && (
//             <div className="flex items-center space-x-2">
//               <h2 className="text-lg font-semibold">{team2.name}</h2>
//               <img src={getTeamImage(team2.name)} alt={team2.name} className="w-12 h-12 object-contain" />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Player List */}
//       {team1?.playerDetails && team2?.playerDetails && (
//         <div className="p-6">
//           {[team1, team2].map((team) => (
//             <div key={team.id} className="mb-6">
//               <h2 className="text-xl font-bold mb-2">{team.name} Players</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {team.playerDetails.map((player) => (
//                   <div key={player.id} className="bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
//                     <img src={player.img || "/fallback.png"} alt={player.name} className="w-12 h-12 object-cover rounded-full" />
//                     <span className="w-3 h-3 rounded-full" style={{ backgroundColor: player.substitute ? "blue" : "green" }}></span>
//                     <p className="text-white">{player.name}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }











// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, getDoc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";

// // Team logos mapping
// const IPL_TEAM_IMAGES: { [key: string]: string } = {
//   "Chennai Super Kings": "/images/CSK.png",
//   "Mumbai Indians": "/images/MI.webp",
//   "Kolkata Knight Riders": "/images/kkr.png",
//   "Sunrisers Hyderabad": "/images/SRH (2).png",
//   "Delhi Capitals": "/images/DC.webp",
//   "Lucknow Super Giants": "/images/LSG (2).png",
//   "Rajasthan Royals": "/images/RR (2).png",
//   "Punjab Kings": "/images/PBKS.webp",
//   "Gujarat Titans": "/images/GT.webp",
//   "Royal Challengers Bengaluru": "/images/rcb.png",
//   "New Zealand": "/images/nz.png",
//   "Pakistan": "/images/pak.png",
// };

// const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback.png";

// // ---------- Types ----------

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   img?: string;
// }

// interface Team {
//   id: number;
//   name: string;
//   logo?: string;
//   playerDetails: PlayerDetail[];
// }

// interface TossResults {
//   tossWinnerId: number;
//   decision: string;
//   tossWinnerName: string;
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
//   ground?: string;
//   avgscore?: string;
//   pitchtype?: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   tossResults?: TossResults;
//   team1?: Team;
//   team2?: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// // ---------- Component ----------

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           setMatchData(docSnap.data() as MatchData);
//         } else {
//           console.log("No such match!");
//           setError("Match data not found");
//           setMatchData(null);
//         }
//       },
//       (error) => {
//         setLoading(false);
//         console.error("Error fetching match:", error);
//         setError("Failed to fetch match data");
//       }
//     );

//     // Unsubscribe from the listener when the component unmounts
//     return () => unsubscribe();
//   }, [matchId]);

//   if (loading) return <p className="p-6 text-white">Loading match details...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!matchData || !matchData.matchInfo) return <p className="p-6 text-white">No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2, venue, tossResults } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />

//       {/* Match Header */}
//       <div className="bg-gray-800 p-4 text-center rounded-md shadow-md">
//         <h1 className="text-2xl font-bold mb-2">{matchInfo.matchDescription}</h1>
//         <p className="text-yellow-400 font-semibold">
//           Toss Result:{" "}
//           {tossResults
//             ? `${tossResults.tossWinnerName} won the toss and chose to ${tossResults.decision}`
//             : "updating..."}
//         </p>
//         <div className="flex items-center justify-center space-x-6">
//           {team1 && (
//             <div className="flex items-center space-x-2">
//               <img src={getTeamImage(team1.name)} alt={team1.name} className="w-12 h-12 object-contain" />
//               <h2 className="text-lg font-semibold">{team1.name}</h2>
//             </div>
//           )}
//           <span className="text-xl font-bold">VS</span>
//           {team2 && (
//             <div className="flex items-center space-x-2">
//               <h2 className="text-lg font-semibold">{team2.name}</h2>
//               <img src={getTeamImage(team2.name)} alt={team2.name} className="w-12 h-12 object-contain" />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Player List */}
//       {team1?.playerDetails && team2?.playerDetails && (
//         <div className="p-6">
//           {[team1, team2].map((team) => (
//             <div key={team.id} className="mb-6">
//               <h2 className="text-xl font-bold mb-2">{team.name} Players</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {team.playerDetails.map((player) => (
//                   <div key={player.id} className="bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
//                     <img src={player.img || "/fallback.png"} alt={player.name} className="w-12 h-12 object-cover rounded-full" />
//                     <span className="w-3 h-3 rounded-full" style={{ backgroundColor: player.substitute ? "blue" : "green" }}></span>
//                     <p className="text-white">{player.name}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format } from 'date-fns';
// import { enIN } from 'date-fns/locale';

// // Team logos mapping
// const IPL_TEAM_IMAGES: { [key: string]: string } = {
//   "Chennai Super Kings": "/images/CSK.png",
//   "Mumbai Indians": "/images/MI.webp",
//   "Kolkata Knight Riders": "/images/kkr.png",
//   "Sunrisers Hyderabad": "/images/SRH (2).png",
//   "Delhi Capitals": "/images/DC.webp",
//   "Lucknow Super Giants": "/images/LSG (2).png",
//   "Rajasthan Royals": "/images/RR (2).png",
//   "Punjab Kings": "/images/PBKS.webp",
//   "Gujarat Titans": "/images/GT.webp",
//   "Royal Challengers Bengaluru": "/images/rcb.png",
//   "New Zealand": "/images/nz.png",
//   "Pakistan": "/images/pak.png",
// };

// const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback.png";

// // ---------- Types ----------

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   img?: string;
// }

// interface Team {
//   id: number;
//   name: string;
//   logo?: string;
//   playerDetails: PlayerDetail[];
// }

// interface TossResults {
//   tossWinnerId: number;
//   decision: string;
//   tossWinnerName: string;
//   announcedAt?: number; // Timestamp of when the toss was announced
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
//   ground?: string;
//   avgscore?: string;
//   pitchtype?: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   tossResults?: TossResults;
//   team1?: Team;
//   team2?: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// // ---------- Component ----------

// export default function MatchPage() {
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [tossAnnounced, setTossAnnounced] = useState(false);
//   const [tossAnnouncementTime, setTossAnnouncementTime] = useState<string | null>(null);

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;
//           setMatchData(data);
//           if (data.matchInfo?.tossResults?.announcedAt) {
//             setTossAnnounced(true);
//             const announcementDate = new Date(data.matchInfo.tossResults.announcedAt);
//             // Format the time to Indian Standard Time (IST)
//             const istTime = format(announcementDate, 'h:mm aa', { locale: enIN });
//             setTossAnnouncementTime(istTime);
//           } else {
//             setTossAnnounced(false);
//             setTossAnnouncementTime(null);
//           }
//         } else {
//           console.log("No such match!");
//           setError("Match data not found");
//           setMatchData(null);
//           setTossAnnounced(false);
//           setTossAnnouncementTime(null);
//         }
//       },
//       (error) => {
//         setLoading(false);
//         console.error("Error fetching match:", error);
//         setError("Failed to fetch match data");
//         setTossAnnounced(false);
//         setTossAnnouncementTime(null);
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   if (loading) return <p className="p-6 text-white">Loading match details...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!matchData || !matchData.matchInfo) return <p className="p-6 text-white">No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2, tossResults } = matchInfo;

//   const shouldShowTossResult = tossAnnounced && tossResults?.tossWinnerName && tossResults?.decision;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />

//       {/* Match Header */}
//       <div className="bg-gray-800 p-4 text-center rounded-md shadow-md">
//         <h1 className="text-2xl font-bold mb-2">{matchInfo.matchDescription}</h1>
//         <p className="text-yellow-400 font-semibold">
//           Toss Result:{" "}
//           {!tossAnnounced ? (
//             "Toss will be announced at 7:00 AM IST"
//           ) : tossAnnouncementTime ? (
//             `Toss announced at ${tossAnnouncementTime}`
//           ) : (
//             "Updating toss information..."
//           )}
//         </p>
//         {shouldShowTossResult && (
//           <p className="text-green-500 font-semibold mt-2">
//             {tossResults.tossWinnerName} won the toss and chose to {tossResults.decision}
//           </p>
//         )}
//         <div className="flex items-center justify-center space-x-6 mt-4">
//           {team1 && (
//             <div className="flex items-center space-x-2">
//               <img src={getTeamImage(team1.name)} alt={team1.name} className="w-12 h-12 object-contain" />
//               <h2 className="text-lg font-semibold">{team1.name}</h2>
//             </div>
//           )}
//           <span className="text-xl font-bold">VS</span>
//           {team2 && (
//             <div className="flex items-center space-x-2">
//               <h2 className="text-lg font-semibold">{team2.name}</h2>
//               <img src={getTeamImage(team2.name)} alt={team2.name} className="w-12 h-12 object-contain" />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Player List */}
//       {team1?.playerDetails && team2?.playerDetails && (
//         <div className="p-6">
//           {[team1, team2].map((team) => (
//             <div key={team.id} className="mb-6">
//               <h2 className="text-xl font-bold mb-2">{team.name} Players</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {team.playerDetails.map((player) => (
//                   <div key={player.id} className="bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
//                     <img src={player.img || "/fallback.png"} alt={player.name} className="w-12 h-12 object-cover rounded-full" />
//                     <span className="w-3 h-3 rounded-full" style={{ backgroundColor: player.substitute ? "blue" : "green" }}></span>
//                     <p className="text-white">{player.name}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }














// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format } from "date-fns";
// import { enIN } from "date-fns/locale";
// import RiskSlider from "@/components/RiskSlider";

// // Team logos mapping
// const IPL_TEAM_IMAGES: { [key: string]: string } = {
//   "Chennai Super Kings": "/images/CSK.png",
//   "Mumbai Indians": "/images/MI.webp",
//   "Kolkata Knight Riders": "/images/kkr.png",
//   "Sunrisers Hyderabad": "/images/SRH (2).png",
//   "Delhi Capitals": "/images/DC.webp",
//   "Lucknow Super Giants": "/images/LSG (2).png",
//   "Rajasthan Royals": "/images/RR (2).png",
//   "Punjab Kings": "/images/PBKS.webp",
//   "Gujarat Titans": "/images/GT.webp",
//   "Royal Challengers Bengaluru": "/images/rcb.png",
//   "New Zealand": "/images/nz.png",
//   "Pakistan": "/images/pak.png",
// };

// const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback.png";

// // ---------- Types ----------

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   img?: string;
//   selectionPercentage: number;
//   captainPercentage: number;
//   viceCaptainPercentage: number;
// }

// interface Team {
//   id: number;
//   name: string;
//   logo?: string;
//   playerDetails: PlayerDetail[];
// }

// interface TossResults {
//   tossWinnerId: number;
//   decision: string;
//   tossWinnerName: string;
//   announcedAt?: number;
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
//   ground?: string;
//   avgscore?: string;
//   pitchtype?: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   tossResults?: TossResults;
//   team1?: Team;
//   team2?: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// // ---------- Component ----------

// export default function MatchPage() {
//     const [riskLevel, setRiskLevel] = useState(0); // Default risk level
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [tossAnnounced, setTossAnnounced] = useState(false);
//   const [tossAnnouncementTime, setTossAnnouncementTime] = useState<string | null>(null);

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;

//           // Ensure player details include selection & captain percentages
//           const updatedMatchData = {
//             ...data,
//             matchInfo: {
//               ...data.matchInfo,
//               team1: {
//                 ...data.matchInfo.team1,
//                 playerDetails: data.matchInfo.team1?.playerDetails.map(player => ({
//                   ...player,
//                   selectionPercentage: player.selectionPercentage ?? 0,  // Ensure default value
//                   captainPercentage: player.captainPercentage ?? 0,
//                   viceCaptainPercentage: player.viceCaptainPercentage ?? 0,
//                 })) || [],
//               },
//               team2: {
//                 ...data.matchInfo.team2,
//                 playerDetails: data.matchInfo.team2?.playerDetails.map(player => ({
//                   ...player,
//                   selectionPercentage: player.selectionPercentage ?? 0,
//                   captainPercentage: player.captainPercentage ?? 0,
//                   viceCaptainPercentage: player.viceCaptainPercentage ?? 0,
//                 })) || [],
//               },
//             },
//           };
          

//           setMatchData(updatedMatchData);

//           if (data.matchInfo?.tossResults?.announcedAt) {
//             setTossAnnounced(true);
//             const announcementDate = new Date(data.matchInfo.tossResults.announcedAt);
//             const istTime = format(announcementDate, "h:mm aa", { locale: enIN });
//             setTossAnnouncementTime(istTime);
//           } else {
//             setTossAnnounced(false);
//             setTossAnnouncementTime(null);
//           }
//         } else {
//           setError("Match data not found");
//           setMatchData(null);
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   if (loading) return <p className="p-6 text-white">Loading match details...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!matchData || !matchData.matchInfo) return <p className="p-6 text-white">No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2, tossResults } = matchInfo;
//   const shouldShowTossResult = tossAnnounced && tossResults?.tossWinnerName && tossResults?.decision;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />

//           {/* Match Header */}
          
     
//       <div className="bg-gray-800 p-4 text-center rounded-md shadow-md">
//         <h1 className="text-2xl font-bold mb-2">{matchInfo.matchDescription}</h1>
//         <p className="text-yellow-400 font-semibold">
//           Toss Result:{" "}
//           {!tossAnnounced ? (
//             "Toss will be announced at 7:00 AM IST"
//           ) : tossAnnouncementTime ? (
//             `Toss announced at ${tossAnnouncementTime}`
//           ) : (
//             "Updating toss information..."
//           )}
//         </p>
//         {shouldShowTossResult && (
//           <p className="text-green-500 font-semibold mt-2">
//             {tossResults.tossWinnerName} won the toss and chose to {tossResults.decision}
//           </p>
//         )}
//           </div>
                   
//           <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />;
         

//       {/* Player List */}
//       {team1?.playerDetails && team2?.playerDetails && (
//   <div className="p-6">
//     {[team1, team2].map((team) => (
//       <div key={team.id} className="mb-6">
//         <h2 className="text-xl font-bold mb-2">{team.name} Players</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {team.playerDetails.map((player) => {
//             // Fix spaces in field names
//             const selectionPercentage = player.selectionPercentage || player[" selectionPercentage"];
//             const captainPercentage = player.captainPercentage || player[" captainPercentage"];
//             const viceCaptainPercentage = player.viceCaptainPercentage || player[" viceCaptainPercentage"];

//             return (
//               <div key={player.id} className="bg-gray-700 p-4 rounded-lg flex flex-col items-center">
//                 <img
//                   src={player.img || "/fallback.png"}
//                   alt={player.name}
//                   className="w-12 h-12 object-cover rounded-full"
//                 />
//                 <p className="text-white font-semibold">{player.name}</p>

//                 {/* Substitute Status */}
//                 <div className="flex items-center space-x-2">
//                   <div
//                     className={`w-3 h-3 rounded-full ${player.substitute ? "bg-red-500" : "bg-blue-500"}`}
//                   ></div>
//                   <p className="text-white text-sm">
//                     {player.substitute ? "Substitute Player" : "Last Match Playing"}
//                   </p>
//                 </div>

//                 {/* Selection Percentages - Properly formatted */}
//                 <p className="text-green-400">
//                   Selection:{" "}
//                   {selectionPercentage !== undefined
//                     ? `${(selectionPercentage * 100).toFixed(1)}%`
//                     : "N/A"}
//                 </p>
//                 <p className="text-blue-400">
//                   C:{" "}
//                   {captainPercentage !== undefined
//                     ? `${(captainPercentage * 100).toFixed(1)}%`
//                     : "N/A"}
//                 </p>
//                 <p className="text-red-400">
//                   VC:{" "}
//                   {viceCaptainPercentage !== undefined
//                     ? `${(viceCaptainPercentage * 100).toFixed(1)}%`
//                     : "N/A"}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     ))}
//   </div>
// )}

//     </div>
//   );
// }





// // app/build-team/[matchId]/page.tsx


// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format } from "date-fns";
// import { enIN } from "date-fns/locale";
// import RiskSlider from "@/components/RiskSlider";

// // Team logos mapping
// const IPL_TEAM_IMAGES: { [key: string]: string } = {
//   "Chennai Super Kings": "/images/CSK.png",
//   "Mumbai Indians": "/images/MI.webp",
//   "Kolkata Knight Riders": "/images/kkr.png",
//   "Sunrisers Hyderabad": "/images/SRH (2).png",
//   "Delhi Capitals": "/images/DC.webp",
//   "Lucknow Super Giants": "/images/LSG (2).png",
//   "Rajasthan Royals": "/images/RR (2).png",
//   "Punjab Kings": "/images/PBKS.webp",
//   "Gujarat Titans": "/images/GT.webp",
//   "Royal Challengers Bengaluru": "/images/rcb.png",
//   "New Zealand": "/images/nz.png",
//   "Pakistan": "/images/pak.png",
// };

// const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback.png";

// // ---------- Types ----------

// interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   img?: string;
//   selectionPercentage?: number;
//   captainPercentage?: number;
//   viceCaptainPercentage?: number;
// }

// interface Team {
//   id: number;
//   name: string;
//   logo?: string;
//   playerDetails: PlayerDetail[];
// }

// interface TossResults {
//   tossWinnerId?: number;
//   decision?: string;
//   tossWinnerName?: string;
//   announcedAt?: number;
// }

// interface Venue {
//   name: string;
//   city: string;
//   country: string;
//   ground?: string;
//   avgscore?: string;
//   pitchtype?: string;
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   tossResults?: TossResults;
//   team1?: Team;
//   team2?: Team;
//   venue?: Venue;
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// // ---------- Component ----------

// export default function MatchPage() {
//   const [riskLevel, setRiskLevel] = useState(0); // Default risk level
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [tossAnnounced, setTossAnnounced] = useState(false);
//   const [tossAnnouncementTime, setTossAnnouncementTime] = useState<string | null>(null);
//   const [lineupAnnounced, setLineupAnnounced] = useState(false); // State for lineup announcement
//   const [tossResultData, setTossResultData] = useState<TossResults | null>(null); // State to hold toss result

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;

//           // Ensure player details include selection & captain percentages
//           const updatedMatchData = {
//             ...data,
//             matchInfo: {
//               ...data.matchInfo,
//               team1: {
//                 ...data.matchInfo.team1,
//                 playerDetails: data.matchInfo.team1?.playerDetails.map(player => ({
//                   ...player,
//                   selectionPercentage: player.selectionPercentage ?? 0,  // Ensure default value
//                   captainPercentage: player.captainPercentage ?? 0,
//                   viceCaptainPercentage: player.viceCaptainPercentage ?? 0,
//                 })) || [],
//               },
//               team2: {
//                 ...data.matchInfo.team2,
//                 playerDetails: data.matchInfo.team2?.playerDetails.map(player => ({
//                   ...player,
//                   selectionPercentage: player.selectionPercentage ?? 0,
//                   captainPercentage: player.captainPercentage ?? 0,
//                   viceCaptainPercentage: player.viceCaptainPercentage ?? 0,
//                 })) || [],
//               },
//             },
//           };

//           setMatchData(updatedMatchData);

//           // Check for lineup announcement
//           if (data.matchInfo?.team1?.playerDetails?.length > 0 && data.matchInfo?.team2?.playerDetails?.length > 0) {
//             setLineupAnnounced(true);
//           } else {
//             setLineupAnnounced(false);
//           }

//           // Check for toss results
//           if (data.matchInfo?.tossResults?.announcedAt !== undefined && data.matchInfo.tossResults.tossWinnerName && data.matchInfo.tossResults.decision) {
//             setTossAnnounced(true);
//             setTossResultData(data.matchInfo.tossResults);
//             const announcementDate = new Date(data.matchInfo.tossResults.announcedAt);
//             const istTime = format(announcementDate, "h:mm aa", { locale: enIN });
//             setTossAnnouncementTime(istTime);
//           } else {
//             setTossAnnounced(false);
//             setTossResultData(null);
//             setTossAnnouncementTime(null);
//           }
//         } else {
//           setError("Match data not found");
//           setMatchData(null);
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   if (loading) return <p className="p-6 text-white">Loading match details...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!matchData || !matchData.matchInfo) return <p className="p-6 text-white">No match data found.</p>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;
//   const shouldShowTossResult = tossAnnounced && tossResultData?.tossWinnerName && tossResultData?.decision;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />

//       {/* Announcement Bar */}
//       <div className="bg-gray-800 p-3 text-center">
//         {!lineupAnnounced && (
//           <p className="text-yellow-500 font-semibold">Lineup will be announced soon.</p>
//         )}
//         {lineupAnnounced && !tossAnnounced && (
//           <p className="text-yellow-500 font-semibold">Toss will be announced at 7:00 AM IST.</p>
//         )}
//         {lineupAnnounced && tossAnnounced && tossAnnouncementTime && !shouldShowTossResult && (
//           <p className="text-green-500 font-semibold">Toss announced at {tossAnnouncementTime}. Result updating...</p>
//         )}
//         {lineupAnnounced && shouldShowTossResult && tossResultData && (
//           <p className="text-green-500 font-semibold">
//             {tossResultData.tossWinnerName} won the toss and chose to {tossResultData.decision}.
//           </p>
//         )}
//       </div>

//       {/* Match Header */}
//       <div className="bg-gray-800 p-4 text-center rounded-md shadow-md mt-2">
//         <h1 className="text-2xl font-bold mb-2">{matchInfo.matchDescription}</h1>
//         {!lineupAnnounced && (
//           <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
//             Lineup Awaited
//           </button>
//         )}
//         {lineupAnnounced && !tossAnnounced && (
//           <p className="text-yellow-400 font-semibold">
//             Toss will be announced at 7:00 AM IST
//           </p>
//         )}
//         {lineupAnnounced && tossAnnounced && tossAnnouncementTime && !shouldShowTossResult && (
//           <p className="text-yellow-400 font-semibold">
//             Toss announced at {tossAnnouncementTime}. Result updating...
//           </p>
//         )}
//         {lineupAnnounced && shouldShowTossResult && tossResultData && (
//           <p className="text-green-500 font-semibold mt-2">
//             {tossResultData.tossWinnerName} won the toss and chose to {tossResultData.decision}
//           </p>
//         )}
//       </div>

//       {lineupAnnounced && (
//         <>
//           <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />

//           {/* Player List */}
//           {team1?.playerDetails && team2?.playerDetails && (
//             <div className="p-6">
//               {[team1, team2].map((team) => (
//                 <div key={team.id} className="mb-6">
//                   <h2 className="text-xl font-bold mb-2">{team.name} Players</h2>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {team.playerDetails.map((player) => (
//                       <div key={player.id} className="bg-gray-700 p-4 rounded-lg flex flex-col items-center">
//                         <img
//                           src={player.img || "/fallback.png"}
//                           alt={player.name}
//                           className="w-12 h-12 object-cover rounded-full"
//                         />
//                         <p className="text-white font-semibold text-center">{player.name}</p>

//                         {/* Substitute Status */}
//                         <div className="flex items-center space-x-2 mt-1">
//                           <div
//                             className={`w-3 h-3 rounded-full ${player.substitute ? "bg-green-500" : "bg-red-500"}`}
//                           ></div>
//                           <p className="text-white text-xs">
//                             {player.substitute ? "Playing XI" : " Substitute"}
//                           </p>
//                         </div>

//                         {/* Selection Percentages */}
//                         {player.selectionPercentage !== undefined && (
//                           <p className="text-green-400 text-xs">
//                             Sel: ₹{(player.selectionPercentage * 100).toFixed(1)}%
//                           </p>
//                         )}
//                         {player.captainPercentage !== undefined && (
//                           <p className="text-blue-400 text-xs">
//                             C: ₹{(player.captainPercentage * 100).toFixed(1)}%
//                           </p>
//                         )}
//                         {player.viceCaptainPercentage !== undefined && (
//                           <p className="text-red-400 text-xs">
//                             VC: ₹{(player.viceCaptainPercentage * 100).toFixed(1)}%
//                           </p>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }












// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format } from "date-fns";
// import { enIN } from "date-fns/locale";
// import RiskSlider from "@/components/RiskSlider";

// // Team logos mapping
// const IPL_TEAM_IMAGES: { [key: string]: string } = {
//   "Chennai Super Kings": "/images/CSK.png",
//   "Mumbai Indians": "/images/MI.webp",
//   "Kolkata Knight Riders": "/images/kkr.png",
//   "Sunrisers Hyderabad": "/images/SRH (2).png",
//   "Delhi Capitals": "/images/DC.webp",
//   "Lucknow Super Giants": "/images/LSG (2).png",
//   "Rajasthan Royals": "/images/RR (2).png",
//   "Punjab Kings": "/images/PBKS.webp",
//   "Gujarat Titans": "/images/GT.webp",
//   "Royal Challengers Bengaluru": "/images/rcb.png",
// };

// const getTeamImage = (teamName?: string) => teamName ? (IPL_TEAM_IMAGES[teamName] || "/fallback.png") : "/fallback.png";

// // ---------- Types ----------
// interface PlayerDetail {
//   id: number;
//   name: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   teamName?: string;
//   img?: string;
//   selectionPercentage: number;
//   captainPercentage: number;
//   viceCaptainPercentage: number;
// }

// interface Team {
//   id: number;
//   name: string;
//   playerDetails: PlayerDetail[];
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   team1?: Team;
//   team2?: Team;
//   tossResults?: {
//     tossWinnerName?: string;
//     decision?: string;
//     announcedAt?: number;
//   };
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// interface FantasyPlayer extends PlayerDetail {
//   points: number;
// }

// interface FantasyTeam {
//   players: FantasyPlayer[];
//   captain: FantasyPlayer;
//   viceCaptain: FantasyPlayer;
//   totalPoints: number;
// }

// // ---------- Component ----------
// export default function MatchPage() {
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamSize, setTeamSize] = useState(11);
//   const [shouldGenerateTeams, setShouldGenerateTeams] = useState(false);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [tossAnnounced, setTossAnnounced] = useState(false);
//   const [tossAnnouncementTime, setTossAnnouncementTime] = useState<string | null>(null);
//   const [fantasyTeams, setFantasyTeams] = useState<FantasyTeam[]>([]);

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         try {
//           setLoading(false);
//           if (!docSnap.exists()) {
//             setError("Match data not found");
//             return;
//           }

//           const data = docSnap.data() as MatchData;
//           const updatedMatchData = {
//             ...data,
//             matchInfo: {
//               ...data.matchInfo,
//               team1: data.matchInfo.team1 ? {
//                 ...data.matchInfo.team1,
//                 playerDetails: data.matchInfo.team1.playerDetails?.map(player => ({
//                   ...player,
//                   selectionPercentage: player.selectionPercentage ?? 0,
//                   captainPercentage: player.captainPercentage ?? 0,
//                   viceCaptainPercentage: player.viceCaptainPercentage ?? 0,
//                 })) || []
//               } : undefined,
//               team2: data.matchInfo.team2 ? {
//                 ...data.matchInfo.team2,
//                 playerDetails: data.matchInfo.team2.playerDetails?.map(player => ({
//                   ...player,
//                   selectionPercentage: player.selectionPercentage ?? 0,
//                   captainPercentage: player.captainPercentage ?? 0,
//                   viceCaptainPercentage: player.viceCaptainPercentage ?? 0,
//                 })) || []
//               } : undefined,
//             },
//           };

//           setMatchData(updatedMatchData);

//           if (data.matchInfo?.tossResults?.announcedAt) {
//             setTossAnnounced(true);
//             const announcementDate = new Date(data.matchInfo.tossResults.announcedAt);
//             const istTime = format(announcementDate, "h:mm aa", { locale: enIN });
//             setTossAnnouncementTime(istTime);
//           }
//         } catch (err) {
//           setLoading(false);
//           setError("Failed to process match data");
//           console.error(err);
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   const calculatePlayerPoints = (player: PlayerDetail): number => {
//     const basePoints = player.selectionPercentage * 5;
//     const captaincyPoints = (player.captainPercentage * 3) + (player.viceCaptainPercentage * 2);
//     const riskFactor = (riskLevel / 100) * (1 - player.selectionPercentage) * 2;
//     return basePoints + captaincyPoints + riskFactor;
//   };

//   const generateFantasyTeams = () => {
//     try {
//       if (!matchData?.matchInfo?.team1?.playerDetails || !matchData?.matchInfo?.team2?.playerDetails) {
//         throw new Error("Incomplete team data");
//       }

//       const allPlayers: FantasyPlayer[] = [
//         ...matchData.matchInfo.team1.playerDetails,
//         ...matchData.matchInfo.team2.playerDetails
//       ].map(player => ({
//         ...player,
//         points: calculatePlayerPoints(player)
//       }));

//       // Filter players based on risk level
//       let filteredPlayers = allPlayers;
//       if (riskLevel < 30) {
//         filteredPlayers = allPlayers.filter(p => !p.substitute && p.selectionPercentage > 0.1);
//       } else if (riskLevel > 70) {
//         filteredPlayers = allPlayers;
//       } else {
//         filteredPlayers = allPlayers.filter(p => p.selectionPercentage > 0.05);
//       }

//       // Sort by points descending
//       const sortedPlayers = [...filteredPlayers].sort((a, b) => b.points - a.points);
//       const teamPlayers = sortedPlayers.slice(0, Math.min(teamSize, sortedPlayers.length));

//       if (teamPlayers.length < 2) {
//         throw new Error("Not enough players to form a team");
//       }

//       // Select captain and vice-captain
//       const captain = [...teamPlayers].sort((a, b) => b.captainPercentage - a.captainPercentage)[0];
//       const viceCaptain = [...teamPlayers]
//         .filter(p => p.id !== captain.id)
//         .sort((a, b) => b.viceCaptainPercentage - a.viceCaptainPercentage)[0];

//       const totalPoints = teamPlayers.reduce((sum, player) => sum + player.points, 0) +
//         captain.points + (viceCaptain.points * 0.5);

//       setFantasyTeams([{
//         players: teamPlayers,
//         captain,
//         viceCaptain,
//         totalPoints
//       }]);
//       setShouldGenerateTeams(true);
//     } catch (error) {
//       console.error("Team generation failed:", error);
//       setError("Failed to generate team. Please try again.");
//     }
//   };

//   const renderFantasyTeams = () => {
//     if (!shouldGenerateTeams || fantasyTeams.length === 0) return null;

//     return (
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Fantasy Team (Risk: {riskLevel}, Size: {teamSize})
//         </h2>
        
//         {fantasyTeams.map((team, index) => (
//           <div key={index} className="mb-8 bg-gray-800 p-6 rounded-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">Team {index + 1}</h3>
//               <p className="text-yellow-400 font-semibold">
//                 Projected Points: {team.totalPoints.toFixed(1)}
//               </p>
//             </div>
            
//             <div className="mb-4 flex flex-wrap gap-4">
//               <div className="bg-yellow-900 px-3 py-1 rounded-full">
//                 <p className="text-yellow-400 font-semibold">
//                   Captain: {team.captain.name} ({(team.captain.captainPercentage * 100).toFixed(1)}%)
//                 </p>
//               </div>
//               <div className="bg-blue-900 px-3 py-1 rounded-full">
//                 <p className="text-blue-400 font-semibold">
//                   Vice-Captain: {team.viceCaptain.name} ({(team.viceCaptain.viceCaptainPercentage * 100).toFixed(1)}%)
//                 </p>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {team.players.map((player) => (
//                 <div
//                   key={player.id}
//                   className={`bg-gray-700 p-3 rounded-lg flex flex-col items-center
//                     ${player.id === team.captain.id ? 'border-2 border-yellow-400' : ''}
//                     ${player.id === team.viceCaptain.id ? 'border-2 border-blue-400' : ''}`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <img
//                       src={player.img || "/fallback.png"}
//                       alt={player.name}
//                       className="w-10 h-10 object-cover rounded-full"
//                       onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src = "/fallback.png";
//                       }}
//                     />
//                     <img
//                       src={getTeamImage(player.teamName)}
//                       alt={player.teamName || "Team"}
//                       className="w-6 h-6 object-contain"
//                       onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src = "/fallback.png";
//                       }}
//                     />
//                   </div>
//                   <p className="text-white font-semibold text-center mt-1">{player.name}</p>
//                   <p className="text-sm text-gray-300">{player.role}</p>
//                   <div className="flex flex-wrap justify-center gap-1 mt-1">
//                     <span className="text-green-400 text-xs">
//                       {(player.selectionPercentage * 100).toFixed(0)}%
//                     </span>
//                     {player.captainPercentage > 0 && (
//                       <span className="text-yellow-400 text-xs">
//                         C:{(player.captainPercentage * 100).toFixed(0)}%
//                       </span>
//                     )}
//                     {player.viceCaptainPercentage > 0 && (
//                       <span className="text-blue-400 text-xs">
//                         VC:{(player.viceCaptainPercentage * 100).toFixed(0)}%
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />

//       <div className="bg-gray-800 p-4 text-center rounded-md shadow-md mx-4 mt-4">
//         <h1 className="text-2xl font-bold mb-2">{matchData.matchInfo.matchDescription}</h1>
//         {tossAnnounced && tossAnnouncementTime && (
//           <p className="text-yellow-400 font-semibold">
//             Toss announced at {tossAnnouncementTime}
//           </p>
//         )}
//         {matchData.matchInfo.tossResults?.tossWinnerName && (
//           <p className="text-green-500 font-semibold mt-2">
//             {matchData.matchInfo.tossResults.tossWinnerName} won the toss and chose to {matchData.matchInfo.tossResults.decision}
//           </p>
//         )}
//       </div>

//       <div className="p-4 bg-gray-800 rounded-lg mx-4 mt-4">
//         <RiskSlider
//           riskLevel={riskLevel}
//           setRiskLevel={setRiskLevel}
//           disabled={shouldGenerateTeams}
//         />
        
//         <div className="mt-4">
//           <label className="block text-white mb-2">Team Size (1-20):</label>
//           <input
//             type="number"
//             min="1"
//             max="20"
//             value={teamSize}
//             onChange={(e) => {
//               const value = parseInt(e.target.value);
//               if (!isNaN(value)) {
//                 setTeamSize(Math.max(1, Math.min(20, value)));
//               }
//             }}
//             className="w-full p-2 rounded bg-gray-700 text-white"
//             disabled={shouldGenerateTeams}
//           />
//         </div>
        
//         <button
//           onClick={generateFantasyTeams}
//           disabled={shouldGenerateTeams}
//           className={`mt-4 w-full py-2 px-4 rounded font-bold ${
//             shouldGenerateTeams
//               ? 'bg-gray-600 cursor-not-allowed'
//               : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           {shouldGenerateTeams ? 'Team Generated' : 'Generate Team'}
//         </button>
        
//         {shouldGenerateTeams && (
//           <button
//             onClick={() => setShouldGenerateTeams(false)}
//             className="mt-2 w-full py-2 px-4 rounded font-bold bg-red-600 hover:bg-red-700"
//           >
//             Reset Team
//           </button>
//         )}
//       </div>
      
//       {renderFantasyTeams()}

//       {matchData.matchInfo.team1 && matchData.matchInfo.team2 && (
//         <div className="p-6">
//           {[matchData.matchInfo.team1, matchData.matchInfo.team2].map((team) => (
//             <div key={team.id} className="mb-6">
//               <h2 className="text-xl font-bold mb-2">{team.name} Players</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {team.playerDetails?.map((player) => (
//                   <div key={player.id} className="bg-gray-700 p-4 rounded-lg flex flex-col items-center">
//                     <img
//                       src={player.img || "/fallback.png"}
//                       alt={player.name}
//                       className="w-12 h-12 object-cover rounded-full"
//                       onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src = "/fallback.png";
//                       }}
//                     />
//                     <p className="text-white font-semibold">{player.name}</p>
//                     <p className="text-sm text-gray-300">{player.role}</p>
//                     <div className="flex items-center space-x-2 mt-1">
//                       <div
//                         className={`w-3 h-3 rounded-full ${player.substitute ? "bg-red-500" : "bg-blue-500"}`}
//                       />
//                       <span className="text-xs">
//                         {player.substitute ? "Sub" : "Playing"}
//                       </span>
//                     </div>
//                     <div className="flex flex-wrap justify-center gap-1 mt-1">
//                       <span className="text-green-400 text-xs">
//                         {(player.selectionPercentage * 100).toFixed(0)}%
//                       </span>
//                       {player.captainPercentage > 0 && (
//                         <span className="text-yellow-400 text-xs">
//                           C:{(player.captainPercentage * 100).toFixed(0)}%
//                         </span>
//                       )}
//                       {player.viceCaptainPercentage > 0 && (
//                         <span className="text-blue-400 text-xs">
//                           VC:{(player.viceCaptainPercentage * 100).toFixed(0)}%
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
















// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format } from "date-fns";
// import { enIN } from "date-fns/locale";
// import RiskSlider from "@/components/RiskSlider";

// // Team logos mapping
// const IPL_TEAM_IMAGES: { [key: string]: string } = {
//   "Chennai Super Kings": "/images/CSK.png",
//   "Mumbai Indians": "/images/MI.webp",
//   "Kolkata Knight Riders": "/images/kkr.png",
//   "Sunrisers Hyderabad": "/images/SRH (2).png",
//   "Delhi Capitals": "/images/DC.webp",
//   "Lucknow Super Giants": "/images/LSG (2).png",
//   "Rajasthan Royals": "/images/RR (2).png",
//   "Punjab Kings": "/images/PBKS.webp",
//   "Gujarat Titans": "/images/GT.webp",
//   "Royal Challengers Bengaluru": "/images/rcb.png",
// };

// const getTeamImage = (teamName?: string) => teamName ? (IPL_TEAM_IMAGES[teamName] || "/fallback.png") : "/fallback.png";

// // ---------- Types ----------
// interface PlayerDetail {
//   id: number;
//   name: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   substitute: boolean;
//   teamName?: string;
//   img?: string;
//   selectionPercentage: number;
//   captainPercentage: number;
//   viceCaptainPercentage: number;
// }

// interface Team {
//   id: number;
//   name: string;
//   playerDetails: PlayerDetail[];
// }

// interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   team1?: Team;
//   team2?: Team;
//   tossResults?: {
//     tossWinnerName?: string;
//     decision?: string;
//     announcedAt?: number;
//   };
// }

// interface MatchData {
//   matchInfo: MatchInfo;
// }

// interface FantasyPlayer extends PlayerDetail {
//   points: number;
// }

// interface FantasyTeam {
//   players: FantasyPlayer[];
//   captain: FantasyPlayer;
//   viceCaptain: FantasyPlayer;
//   totalPoints: number;
// }

// // ---------- Component ----------
// export default function MatchPage() {
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamSize, setTeamSize] = useState(11);
//   const [shouldGenerateTeams, setShouldGenerateTeams] = useState(false);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [tossAnnounced, setTossAnnounced] = useState(false);
//   const [tossAnnouncementTime, setTossAnnouncementTime] = useState<string | null>(null);
//   const [fantasyTeams, setFantasyTeams] = useState<FantasyTeam[]>([]);

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         try {
//           setLoading(false);
//           if (!docSnap.exists()) {
//             setError("Match data not found");
//             return;
//           }

//           const data = docSnap.data() as MatchData;
//           const updatedMatchData = {
//             ...data,
//             matchInfo: {
//               ...data.matchInfo,
//               team1: data.matchInfo.team1 ? {
//                 ...data.matchInfo.team1,
//                 playerDetails: data.matchInfo.team1.playerDetails?.map(player => ({
//                   ...player,
//                   selectionPercentage: player.selectionPercentage ?? 0,
//                   captainPercentage: player.captainPercentage ?? 0,
//                   viceCaptainPercentage: player.viceCaptainPercentage ?? 0,
//                 })) || []
//               } : undefined,
//               team2: data.matchInfo.team2 ? {
//                 ...data.matchInfo.team2,
//                 playerDetails: data.matchInfo.team2.playerDetails?.map(player => ({
//                   ...player,
//                   selectionPercentage: player.selectionPercentage ?? 0,
//                   captainPercentage: player.captainPercentage ?? 0,
//                   viceCaptainPercentage: player.viceCaptainPercentage ?? 0,
//                 })) || []
//               } : undefined,
//             },
//           };

//           setMatchData(updatedMatchData);

//           if (data.matchInfo?.tossResults?.announcedAt) {
//             setTossAnnounced(true);
//             const announcementDate = new Date(data.matchInfo.tossResults.announcedAt);
//             const istTime = format(announcementDate, "h:mm aa", { locale: enIN });
//             setTossAnnouncementTime(istTime);
//           }
//         } catch (err) {
//           setLoading(false);
//           setError("Failed to process match data");
//           console.error(err);
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   const calculatePlayerPoints = (player: PlayerDetail): number => {
//     let basePoints = player.selectionPercentage * 5;
//     const captaincyPoints = (player.captainPercentage * 3) + (player.viceCaptainPercentage * 2);
//     let riskFactor = (riskLevel / 100) * (1 - player.selectionPercentage) * 2;

//     // Enhanced points calculation based on risk level
//     if (riskLevel < 40) {
//       riskFactor *= 0.5; // Reduce the impact of the risk factor
//       basePoints *= (1 + (0.6 - (riskLevel / 100))); // Increase base points based on selection
//     } else if (riskLevel > 70) {
//       // Keep the risk factor as is or increase it for higher risk
//       riskFactor *= 1.2;
//     }

//     return basePoints + captaincyPoints + riskFactor;
//   };

//   const getRandomVariation = (value: number, maxVariation: number) => {
//     const variation = (Math.random() * 2 - 1) * maxVariation; // Random value between -maxVariation and +maxVariation
//     return Math.max(0, Math.min(1, value + variation)); // Ensure result stays between 0 and 1
//   };

//   const generateFantasyTeams = () => {
//     try {
//       if (!matchData?.matchInfo?.team1?.playerDetails || !matchData?.matchInfo?.team2?.playerDetails) {
//         throw new Error("Incomplete team data");
//       }

//       const allPlayers: FantasyPlayer[] = [
//         ...matchData.matchInfo.team1.playerDetails,
//         ...matchData.matchInfo.team2.playerDetails
//       ].map(player => ({
//         ...player,
//         points: calculatePlayerPoints(player)
//       }));

//       const numberOfTeams = 3; // Generate 3 different teams
//       const generatedTeams: FantasyTeam[] = [];

//       for (let i = 0; i < numberOfTeams; i++) {
//         // Filter players based on risk level with some variation
//         let filteredPlayers = [...allPlayers];
//         if (riskLevel < 30) {
//           // For low risk, focus on high selection percentage players
//           const threshold = getRandomVariation(0.15, 0.05);
//           filteredPlayers = filteredPlayers.filter(p => !p.substitute && p.selectionPercentage > threshold);
//           filteredPlayers.sort((a, b) => b.selectionPercentage - a.selectionPercentage);
//         } else if (riskLevel > 70) {
//           // For high risk, include more players with some randomness
//           const threshold = getRandomVariation(0.03, 0.02);
//           filteredPlayers = filteredPlayers.filter(p => p.selectionPercentage > threshold);
//         } else {
//           // Medium risk - balanced approach
//           const threshold = getRandomVariation(0.05, 0.03);
//           filteredPlayers = filteredPlayers.filter(p => p.selectionPercentage > threshold);
//         }

//         // Sort by points descending
//         const sortedPlayers = [...filteredPlayers].sort((a, b) => b.points - a.points);
//         const availablePlayers = sortedPlayers.slice(0, Math.min(teamSize + 5, sortedPlayers.length));

//         if (availablePlayers.length < teamSize) {
//           continue; // Skip this iteration if not enough players
//         }

//         // Select team with some variation
//         let teamPlayers: FantasyPlayer[] = [];
//         if (riskLevel < 40) {
//           // For low risk, take mostly top players with some variation
//           const topCount = Math.floor(teamSize * 0.8);
//           const remainingCount = teamSize - topCount;
          
//           teamPlayers = [...availablePlayers.slice(0, topCount)];
//           teamPlayers.push(...availablePlayers
//             .slice(topCount)
//             .sort(() => 0.5 - Math.random())
//             .slice(0, remainingCount));
//         } else {
//           // For medium/high risk, more variation in selection
//           teamPlayers = [...availablePlayers]
//             .sort((a, b) => (b.points * (0.9 + Math.random() * 0.2)) - (a.points * (0.9 + Math.random() * 0.2)))
//             .slice(0, teamSize);
//         }

//         // Ensure we have the correct number of players
//         if (teamPlayers.length !== teamSize) {
//           continue;
//         }

//         // Select captain and vice-captain with some variation
//         let captain: FantasyPlayer;
//         let viceCaptain: FantasyPlayer;

//         if (riskLevel < 40) {
//           // For low risk, choose from top candidates with some randomness
//           const topCaptainCandidates = [...teamPlayers]
//             .sort((a, b) => b.captainPercentage - a.captainPercentage)
//             .slice(0, 3);
//           captain = topCaptainCandidates[Math.floor(Math.random() * topCaptainCandidates.length)];
          
//           const topVCCandidates = [...teamPlayers]
//             .filter(p => p.id !== captain.id)
//             .sort((a, b) => b.viceCaptainPercentage - a.viceCaptainPercentage)
//             .slice(0, 3);
//           viceCaptain = topVCCandidates[Math.floor(Math.random() * topVCCandidates.length)];
//         } else {
//           // For higher risk, more variation in captain selection
//           const captainCandidates = [...teamPlayers]
//             .sort((a, b) => (b.captainPercentage * (0.8 + Math.random() * 0.4)) - (a.captainPercentage * (0.8 + Math.random() * 0.4)));
//           captain = captainCandidates[0];
          
//           const vcCandidates = [...teamPlayers]
//             .filter(p => p.id !== captain.id)
//             .sort((a, b) => (b.viceCaptainPercentage * (0.8 + Math.random() * 0.4)) - (a.viceCaptainPercentage * (0.8 + Math.random() * 0.4)));
//           viceCaptain = vcCandidates[0];
//         }

//         const totalPoints = teamPlayers.reduce((sum, player) => sum + player.points, 0) +
//           captain.points + (viceCaptain.points * 0.5);

//         generatedTeams.push({
//           players: teamPlayers,
//           captain,
//           viceCaptain,
//           totalPoints
//         });
//       }

//       // Sort teams by total points descending
//       generatedTeams.sort((a, b) => b.totalPoints - a.totalPoints);
//       setFantasyTeams(generatedTeams);
//       setShouldGenerateTeams(true);
//     } catch (error) {
//       console.error("Team generation failed:", error);
//       setError("Failed to generate team. Please try again.");
//     }
//   };

//   const renderFantasyTeams = () => {
//     if (!shouldGenerateTeams || fantasyTeams.length === 0) return null;

//     return (
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Generated Fantasy Teams (Risk: {riskLevel}, Size: {teamSize})
//         </h2>
        
//         {fantasyTeams.map((team, index) => (
//           <div key={index} className="mb-8 bg-gray-800 p-6 rounded-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">Team {index + 1}</h3>
//               <p className="text-yellow-400 font-semibold">
//                 Projected Points: {team.totalPoints.toFixed(1)}
//               </p>
//             </div>
            
//             <div className="mb-4 flex flex-wrap gap-4">
//               <div className="bg-yellow-900 px-3 py-1 rounded-full">
//                 <p className="text-yellow-400 font-semibold">
//                   Captain: {team.captain.name} ({(team.captain.captainPercentage * 100).toFixed(1)}%)
//                 </p>
//               </div>
//               <div className="bg-blue-900 px-3 py-1 rounded-full">
//                 <p className="text-blue-400 font-semibold">
//                   Vice-Captain: {team.viceCaptain.name} ({(team.viceCaptain.viceCaptainPercentage * 100).toFixed(1)}%)
//                 </p>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {team.players.map((player) => (
//                 <div
//                   key={player.id}
//                   className={`bg-gray-700 p-3 rounded-lg flex flex-col items-center
//                     ${player.id === team.captain.id ? 'border-2 border-yellow-400' : ''}
//                     ${player.id === team.viceCaptain.id ? 'border-2 border-blue-400' : ''}`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <img
//                       src={player.img || "/fallback.png"}
//                       alt={player.name}
//                       className="w-10 h-10 object-cover rounded-full"
//                       onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src = "/fallback.png";
//                       }}
//                     />
//                     <img
//                       src={getTeamImage(player.teamName)}
//                       alt={player.teamName || "Team"}
//                       className="w-6 h-6 object-contain"
//                       onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src = "/fallback.png";
//                       }}
//                     />
//                   </div>
//                   <p className="text-white font-semibold text-center mt-1">{player.name}</p>
//                   <p className="text-sm text-gray-300">{player.role}</p>
//                   <div className="flex flex-wrap justify-center gap-1 mt-1">
//                     <span className="text-green-400 text-xs">
//                       {(player.selectionPercentage * 100).toFixed(0)}%
//                     </span>
//                     {player.captainPercentage > 0 && (
//                       <span className="text-yellow-400 text-xs">
//                         C:{(player.captainPercentage * 100).toFixed(0)}%
//                       </span>
//                     )}
//                     {player.viceCaptainPercentage > 0 && (
//                       <span className="text-blue-400 text-xs">
//                         VC:{(player.viceCaptainPercentage * 100).toFixed(0)}%
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />

//       <div className="bg-gray-800 p-4 text-center rounded-md shadow-md mx-4 mt-4">
//         <h1 className="text-2xl font-bold mb-2">{matchData.matchInfo.matchDescription}</h1>
//         {tossAnnounced && tossAnnouncementTime && (
//           <p className="text-yellow-400 font-semibold">
//             Toss announced at {tossAnnouncementTime}
//           </p>
//         )}
//         {matchData.matchInfo.tossResults?.tossWinnerName && (
//           <p className="text-green-500 font-semibold mt-2">
//             {matchData.matchInfo.tossResults.tossWinnerName} won the toss and chose to {matchData.matchInfo.tossResults.decision}
//           </p>
//         )}
//       </div>

//       <div className="p-4 bg-gray-800 rounded-lg mx-4 mt-4">
//         <RiskSlider
//           riskLevel={riskLevel}
//           setRiskLevel={setRiskLevel}
//           disabled={shouldGenerateTeams}
//         />
        
//         <div className="mt-4">
//           <label className="block text-white mb-2">Team Size (1-20):</label>
//           <input
//             type="number"
//             min="1"
//             max="20"
//             value={teamSize}
//             onChange={(e) => {
//               const value = parseInt(e.target.value);
//               if (!isNaN(value)) {
//                 setTeamSize(Math.max(1, Math.min(20, value)));
//               }
//             }}
//             className="w-full p-2 rounded bg-gray-700 text-white"
//             disabled={shouldGenerateTeams}
//           />
//         </div>
        
//         <button
//           onClick={generateFantasyTeams}
//           disabled={shouldGenerateTeams}
//           className={`mt-4 w-full py-2 px-4 rounded font-bold ${
//             shouldGenerateTeams
//               ? 'bg-gray-600 cursor-not-allowed'
//               : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           {shouldGenerateTeams ? 'Teams Generated' : 'Generate Teams'}
//         </button>
        
//         {shouldGenerateTeams && (
//           <button
//             onClick={() => setShouldGenerateTeams(false)}
//             className="mt-2 w-full py-2 px-4 rounded font-bold bg-red-600 hover:bg-red-700"
//           >
//             Reset Teams
//           </button>
//         )}
//       </div>
      
//       {renderFantasyTeams()}

//       {matchData.matchInfo.team1 && matchData.matchInfo.team2 && (
//         <div className="p-6">
//           {[matchData.matchInfo.team1, matchData.matchInfo.team2].map((team) => (
//             <div key={team.id} className="mb-6">
//               <h2 className="text-xl font-bold mb-2">{team.name} Players</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {team.playerDetails?.map((player) => (
//                   <div key={player.id} className="bg-gray-700 p-4 rounded-lg flex flex-col items-center">
//                     <img
//                       src={player.img || "/fallback.png"}
//                       alt={player.name}
//                       className="w-12 h-12 object-cover rounded-full"
//                       onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src = "/fallback.png";
//                       }}
//                     />
//                     <p className="text-white font-semibold">{player.name}</p>
//                     <p className="text-sm text-gray-300">{player.role}</p>
//                     <div className="flex items-center space-x-2 mt-1">
//                       <div
//                         className={`w-3 h-3 rounded-full ${player.substitute ? "bg-red-500" : "bg-blue-500"}`}
//                       />
//                       <span className="text-xs">
//                         {player.substitute ? "Sub" : "Playing"}
//                       </span>
//                     </div>
//                     <div className="flex flex-wrap justify-center gap-1 mt-1">
//                       <span className="text-green-400 text-xs">
//                         {(player.selectionPercentage * 100).toFixed(0)}%
//                       </span>
//                       {player.captainPercentage > 0 && (
//                         <span className="text-yellow-400 text-xs">
//                           C:{(player.captainPercentage * 100).toFixed(0)}%
//                         </span>
//                       )}
//                       {player.viceCaptainPercentage > 0 && (
//                         <span className="text-blue-400 text-xs">
//                           VC:{(player.viceCaptainPercentage * 100).toFixed(0)}%
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
















// // app/build-team/[matchId]/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamGenerator from "@/components/TeamGenerator";
// import TeamCard from "@/components/TeamCard";
// import { MatchData, MatchInfo } from "@/types/match";

// export default function MatchPage() {
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);
//   const [userBalance, setUserBalance] = useState(100);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;
//           setMatchData(data);
//         } else {
//           setError("Match data not found");
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   const {
//     generatedTeams,
//     isGenerating,
//     generateTeams,
//     paymentDialog,
//     paymentInfo
//   } = TeamGenerator({
//     team1: team1!,
//     team2: team2!,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance
//   });

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
      
//       <div className="container mx-auto p-4">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />
//                 <TeamCountSlider teamCount={teamCount} setTeamCount={setTeamCount} />
//                 {paymentInfo}
//               </div>
//             </div>

//             {generatedTeams.length > 0 && (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={index}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName} won the toss and chose to {matchInfo.tossResults.decision}
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   {format(new Date(matchInfo.tossResults.announcedAt!), "h:mm a, MMMM d, yyyy", { locale: enIN })}
//                 </p>
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => (
//                   <div key={team?.id} className="bg-gray-700 p-3 rounded">
//                     <h4 className="font-medium flex items-center">
//                       <img
//                         src={team?.logo || "/fallback.png"}
//                         alt={team?.name}
//                         className="w-6 h-6 mr-2"
//                       />
//                       {team?.name}
//                     </h4>
//                     <div className="text-sm mt-2">
//                       {team?.playerDetails
//                         .filter(p => !p.substitute)
//                         .slice(0, 5)
//                         .map(p => p.name)
//                         .join(", ")}
//                       {team?.playerDetails.length! > 5 && "..."}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {paymentDialog}
//     </div>
//   );
// }










// // app/build-team/[matchId]/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamGenerator from "@/components/TeamGenerator";
// import TeamCard from "@/components/TeamCard";
// import { MatchData, MatchInfo } from "@/types/match";

// export default function MatchPage() {
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);
//   const [userBalance, setUserBalance] = useState(100);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;
//           setMatchData(data);
//         } else {
//           setError("Match data not found");
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   const {
//     generatedTeams,
//     isGenerating,
//     generateTeams,
//     paymentDialog,
//     paymentInfo
//   } = TeamGenerator({
//     team1: team1!,
//     team2: team2!,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance
//   });

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
      
//       <div className="container mx-auto p-4">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />
//                 <TeamCountSlider teamCount={teamCount} setTeamCount={setTeamCount} />
//                 {paymentInfo}
//               </div>
//             </div>

//             {generatedTeams.length > 0 && (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={index}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName} won the toss and chose to {matchInfo.tossResults.decision}
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   {format(new Date(matchInfo.tossResults.announcedAt!), "h:mm a, MMMM d, yyyy", { locale: enIN })}
//                 </p>
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => (
//                   <div key={team?.id} className="bg-gray-700 p-3 rounded">
//                     <h4 className="font-medium flex items-center">
//                       <img
//                         src={team?.logo || "/fallback.png"}
//                         alt={team?.name}
//                         className="w-6 h-6 mr-2"
//                       />
//                       {team?.name}
//                     </h4>
//                     <div className="text-sm mt-2">
//                       {team?.playerDetails
//                         .filter(p => !p.substitute)
//                         .slice(0, 5)
//                         .map(p => p.name)
//                         .join(", ")}
//                       {team?.playerDetails.length! > 5 && "..."}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {paymentDialog}
//     </div>
//   );
//}



// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";

// export default function MatchPage() {
//   // All hooks called unconditionally at the top
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);
//   const [userBalance, setUserBalance] = useState(100);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const {
//     generatedTeams,
//     isGenerating,
//     generateTeams,
//     paymentDialog,
//     paymentInfo
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance
//   });

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;
//           setMatchData(data);
//         } else {
//           setError("Match data not found");
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto p-4">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />
//                 <TeamCountSlider teamCount={teamCount} setTeamCount={setTeamCount} />
//                 {paymentInfo}
//                 <button
//                   onClick={generateTeams}
//                   disabled={isGenerating}
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
//                 >
//                   {isGenerating ? 'Generating...' : 'Generate Teams'}
//                 </button>
//               </div>
//             </div>

//             {generatedTeams.length > 0 && (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={index}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName} won the toss and chose to {matchInfo.tossResults.decision}
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   {format(new Date(matchInfo.tossResults.announcedAt!), "h:mm a, MMMM d, yyyy", { locale: enIN })}
//                 </p>
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => (
//                   <div key={team?.id} className="bg-gray-700 p-3 rounded">
//                     <h4 className="font-medium flex items-center">
//                       <img
//                         src={team?.logo || "/fallback.png"}
//                         alt={team?.name}
//                         className="w-6 h-6 mr-2"
//                       />
//                       {team?.name}
//                     </h4>
//                     <div className="text-sm mt-2">
//                       {team?.playerDetails
//                         ?.filter(p => !p.substitute)
//                         .slice(0, 5)
//                         .map(p => p.name)
//                         .join(", ")}
//                       {team?.playerDetails && team.playerDetails.length > 5 && "..."}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";

// export default function MatchPage() {
//   // All hooks called unconditionally at the top
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);
//   const [userBalance, setUserBalance] = useState(100);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const {
//     generatedTeams,
//     isGenerating,
//     generateTeams,
//     paymentDialog,
//     paymentInfo
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance
//   });

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;
//           setMatchData(data);
//         } else {
//           setError("Match data not found");
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   // Safe date formatting function
//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj)
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Invalid date";
//     }
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto p-4">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />
//                 <TeamCountSlider teamCount={teamCount} setTeamCount={setTeamCount} />
//                 {paymentInfo}
//               </div>
//             </div>

//             {generatedTeams.length > 0 && (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={index}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName} won the toss and chose to {matchInfo.tossResults.decision}
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                 </p>
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => (
//                   team && (
//                     <div key={team.id} className="bg-gray-700 p-3 rounded">
//                       <h4 className="font-medium flex items-center">
//                         <img
//                           src={team.logo || "/fallback.png"}
//                           alt={team.name}
//                           className="w-6 h-6 mr-2"
//                         />
//                         {team.name}
//                       </h4>
//                       <div className="text-sm mt-2">
//                         {team.playerDetails
//                           ?.filter(p => !p.substitute)
//                           .slice(0, 5)
//                           .map(p => p.name)
//                           .join(", ")}
//                         {team.playerDetails && team.playerDetails.length > 5 && "..."}
//                       </div>
//                     </div>
//                   )
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";

// export default function MatchPage() {
//   // State
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);
//   const [userBalance, setUserBalance] = useState(100);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Team generator hook
//   const {
//     generatedTeams,
//     isGenerating,
//     generateTeams,
//     paymentDialog,
//     paymentInfo,
//     teamError
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance
//   });

//   // Fetch match data
//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;
//           setMatchData(data);
//         } else {
//           setError("Match data not found");
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   // Loading/error states
//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   // Safe date formatting
//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj)
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Invalid date";
//     }
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto p-4">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />
//                 <TeamCountSlider teamCount={teamCount} setTeamCount={setTeamCount} />
//                 {paymentInfo}
//               </div>
//             </div>

//             {generatedTeams.length > 0 && (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={index}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName} won the toss and chose to {matchInfo.tossResults.decision}
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                 </p>
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => (
//                   team && (
//                     <div key={team.id} className="bg-gray-700 p-3 rounded">
//                       <h4 className="font-medium flex items-center">
//                         <img
//                           src={team.logo || "/fallback.png"}
//                           alt={team.name}
//                           className="w-6 h-6 mr-2"
//                         />
//                         {team.name}
//                       </h4>
//                       <div className="text-sm mt-2 space-y-1">
//                         {team.playerDetails
//                           ?.filter(p => !p.substitute)
//                           .slice(0, 5)
//                           .map(player => (
//                             <div key={player.id} className="flex items-center">
//                               <span
//                                 className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                                   player.select ? 'bg-green-500' : 'bg-gray-500'
//                                 }`}
//                               />
//                               {player.name}
//                             </div>
//                           ))}
//                         {team.playerDetails && team.playerDetails.length > 5 && "..."}
//                       </div>
//                     </div>
//                   )
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }













// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";

// export default function MatchPage() {
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);
//   const [userBalance, setUserBalance] = useState(100);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const {
//     generatedTeams,
//     isGenerating,
//     generateTeams,
//     paymentDialog,
//     paymentInfo,
//     teamError
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance
//   });

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;
//           setMatchData(data);
//         } else {
//           setError("Match data not found");
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj)
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Invalid date";
//     }
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto p-4">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />
//                 <TeamCountSlider teamCount={teamCount} setTeamCount={setTeamCount} />
//                 {paymentInfo}
//               </div>
//             </div>

//             {generatedTeams.length > 0 && (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={index}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName} won the toss and chose to {matchInfo.tossResults.decision}
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                 </p>
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => (
//                   team && (
//                     <div key={team.id} className="bg-gray-700 p-3 rounded">
//                       <h4 className="font-medium flex items-center">
//                         <img
//                           src={team.logo || "/fallback.png"}
//                           alt={team.name}
//                           className="w-6 h-6 mr-2"
//                         />
//                         {team.name}
//                       </h4>
//                       <div className="text-sm mt-2 space-y-1">
//                         {team.playerDetails?.map(player => (
//                           <div key={player.id} className="flex items-center">
//                             <span
//                               className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                                 player.substitute ? 'bg-red-500' : 'bg-green-500'
//                               }`}
//                             />
//                             {player.name}
//                             {player.substitute && (
//                               <span className="text-xs text-gray-400 ml-2">(Sub)</span>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }




// // app/build-team/[matchId]/page.tsx

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";

// export default function MatchPage() {
//   // State
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);
//   const [userBalance, setUserBalance] = useState(100);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Team generator hook
//   const {
//     generatedTeams,
//     isGenerating,
//     generateTeams,
//     paymentDialog,
//     paymentInfo,
//     teamError
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance
//   });

//   // Fetch match data
//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;
//           setMatchData(data);
//         } else {
//           setError("Match data not found");
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   // Loading/error states
//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   // Safe date formatting
//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj)
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Invalid date";
//     }
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto p-4">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />
//                 <TeamCountSlider teamCount={teamCount} setTeamCount={setTeamCount} />
//                 {paymentInfo}
//               </div>
//             </div>

//             {generatedTeams.length > 0 && (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={index}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName} won the toss and chose to {matchInfo.tossResults.decision}
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                 </p>
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => (
//                   team && (
//                     <div key={team.id} className="bg-gray-700 p-3 rounded">
//                       <h4 className="font-medium flex items-center">
//                         <img
//                           src={team.logo || "/fallback.png"}
//                           alt={team.name}
//                           className="w-6 h-6 mr-2"
//                         />
//                         {team.name}
//                       </h4>
//                       <div className="text-sm mt-2 space-y-1">
//                         {team.playerDetails
//                           ?.filter(p => !p.substitute)
//                           .slice(0, 5)
//                           .map(player => (
//                             <div key={player.id} className="flex items-center">
//                               <span
//                                 className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                                   player.select ? 'bg-green-500' : 'bg-gray-500'
//                                 }`}
//                               />
//                               {player.name}
//                             </div>
//                           ))}
//                         {team.playerDetails && team.playerDetails.length > 5 && "..."}
//                       </div>
//                     </div>
//                   )
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";

// export default function MatchPage() {
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);
//   const [userBalance, setUserBalance] = useState(100);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const {
//     generatedTeams,
//     isGenerating,
//     generateTeams,
//     paymentDialog,
//     paymentInfo,
//     teamError
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance
//   });

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;
//           setMatchData(data);
//         } else {
//           setError("Match data not found");
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj)
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Invalid date";
//     }
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto px-4 py-6">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />
//                 <TeamCountSlider teamCount={teamCount} setTeamCount={setTeamCount} />
//                 {paymentInfo}
//               </div>
//             </div>

//             {generatedTeams.length > 0 ? (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={index}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">No Teams Generated Yet</h2>
//                 <p className="text-gray-400">Adjust your settings and click "Generate Teams" to create fantasy teams.</p>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName} won the toss and chose to {matchInfo.tossResults.decision}
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                 </p>
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => (
//                   team && (
//                     <div key={team.id} className="bg-gray-700 p-3 rounded">
//                       <h4 className="font-medium flex items-center">
//                         <img
//                           src={team.logo || "/fallback.png"}
//                           alt={team.name}
//                           className="w-6 h-6 mr-2"
//                         />
//                         {team.name}
//                       </h4>
//                       <div className="text-sm mt-2 space-y-1">
//                         {team.playerDetails
//                           ?.filter(p => !p.substitute)
//                           .slice(0, 5)
//                           .map(player => (
//                             <div key={player.id} className="flex items-center">
//                               <span
//                                 className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                                   player.select ? 'bg-green-500' : 'bg-gray-500'
//                                 }`}
//                               />
//                               {player.name}
//                             </div>
//                           ))}
//                         {team.playerDetails && team.playerDetails.length > 5 && "..."}
//                       </div>
//                     </div>
//                   )
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }









// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";

// export default function MatchPage() {
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);
//   const [userBalance, setUserBalance] = useState(100);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const {
//     generatedTeams,
//     isGenerating,
//     generateTeams,
//     paymentDialog,
//     paymentInfo,
//     teamError
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance
//   });

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;
//           setMatchData(data);
//         } else {
//           setError("Match data not found");
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj)
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Invalid date";
//     }
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto px-4 py-6">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />
//                 <TeamCountSlider teamCount={teamCount} setTeamCount={setTeamCount} />
//                 {paymentInfo}
//               </div>
//             </div>

//             {generatedTeams.length > 0 ? (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={index}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">No Teams Generated Yet</h2>
//                 <p className="text-gray-400">Adjust your settings and click "Generate Teams" to create fantasy teams.</p>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName} won the toss and chose to {matchInfo.tossResults.decision}
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                 </p>
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => (
//                   team && (
//                     <div key={team.id} className="bg-gray-700 p-3 rounded">
//                       <h4 className="font-medium flex items-center">
//                         <img
//                           src={team.logo || "/fallback.png"}
//                           alt={team.name}
//                           className="w-6 h-6 mr-2"
//                         />
//                         {team.name}
//                       </h4>
//                       <div className="text-sm mt-2 space-y-1">
//                         {team.playerDetails
//                           ?.sort((a, b) => (a.substitute === b.substitute) ? 0 : a.substitute ? 1 : -1)
//                           .map(player => (
//                             <div key={player.id} className="flex items-center">
//                               <span
//                                 className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                                   player.substitute ? 'bg-red-500' : 'bg-green-500'
//                                 }`}
//                               />
//                               {player.imgURL ? (
//                                 <img
//                                   src={player.imgURL}
//                                   alt={player.name}
//                                   className="w-4 h-4 mr-2 rounded-full object-cover"
//                                   onError={(e) => {
//                                     (e.target as HTMLImageElement).src = '/fallback-player.png';
//                                   }}
//                                 />
//                               ) : (
//                                 <div className="w-4 h-4 mr-2 rounded-full bg-gray-500"></div>
//                               )}
//                               <span className={player.substitute ? 'text-gray-400' : ''}>
//                                 {player.name}
//                                 {player.substitute && ' (Sub)'}
//                               </span>
//                             </div>
//                           ))}
//                       </div>
//                     </div>
//                   )
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";

// export default function MatchPage() {
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);
//   const [userBalance, setUserBalance] = useState(100);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const {
//     generatedTeams,
//     isGenerating,
//     generateTeams,
//     paymentDialog,
//     paymentInfo,
//     teamError
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance
//   });

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;
//           setMatchData(data);
//         } else {
//           setError("Match data not found");
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj)
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Invalid date";
//     }
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto px-4 py-6">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />
//                 <TeamCountSlider teamCount={teamCount} setTeamCount={setTeamCount} />
//                 {paymentInfo}
//               </div>
//             </div>

//             {generatedTeams.length > 0 ? (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={index}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">No Teams Generated Yet</h2>
//                 <p className="text-gray-400">Adjust your settings and click "Generate Teams" to create fantasy teams.</p>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName} won the toss and chose to {matchInfo.tossResults.decision}
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                 </p>
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => (
//                   team && (
//                     <div key={team.id} className="bg-gray-700 p-3 rounded">
//                       <h4 className="font-medium flex items-center">
//                         <img
//                           src={team.logo || "/fallback.png"}
//                           alt={team.name}
//                           className="w-6 h-6 mr-2"
//                         />
//                         {team.name}
//                       </h4>
//                       <div className="text-sm mt-2 space-y-1">
//                         {team.playerDetails
//                           ?.sort((a, b) => (a.substitute === b.substitute) ? 0 : a.substitute ? 1 : -1)
//                           .map(player => (
//                             <div key={player.id} className="flex items-center">
//                               <span
//                                 className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                                   player.substitute ? 'bg-red-500' : 'bg-green-500'
//                                 }`}
//                               />
//                               {player.imgURL ? (
//                                 <img
//                                   src={player.imgURL}
//                                   alt={player.name}
//                                   className="w-4 h-4 mr-2 rounded-full object-cover"
//                                   onError={(e) => {
//                                     (e.target as HTMLImageElement).src = '/fallback-player.png';
//                                   }}
//                                 />
//                               ) : (
//                                 <div className="w-4 h-4 mr-2 rounded-full bg-gray-500"></div>
//                               )}
//                               <span className={player.substitute ? 'text-gray-400' : ''}>
//                                 {player.name}
//                                 {player.substitute && ' (Sub)'}
//                               </span>
//                             </div>
//                           ))}
//                       </div>
//                     </div>
//                   )
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }










// app/build-team/[matchID]/page.tsx



// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";

// export default function MatchPage() {
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);
//   const [userBalance, setUserBalance] = useState(100);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const {
//     generatedTeams,
//     isGenerating,
//     generateTeams,
//     paymentDialog,
//     paymentInfo,
//     teamError
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance
//   });

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const docRef = doc(db, "matchinfo", matchId as string);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as MatchData;
//           setMatchData(data);
//         } else {
//           setError("Match data not found");
//         }
//       },
//       (error) => {
//         setLoading(false);
//         setError("Failed to fetch match data");
//       }
//     );

//     return () => unsubscribe();
//   }, [matchId]);

//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj)
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Invalid date";
//     }
//   };

//   // Function to validate and prepare player data
//   const preparePlayers = (team: any) => {
//     if (!team?.playerDetails) return [];
    
//     return team.playerDetails.map((player: any) => ({
//       ...player,
//       // Ensure each player has a unique ID
//       id: player.id || `${team.id}-${player.name}-${Math.random().toString(36).substring(2, 9)}`,
//       // Ensure substitute flag exists
//       substitute: player.substitute || false,
//       // Ensure image URL has fallback
//       imgURL: player.imgURL || '/fallback-player.png'
//     }));
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto px-4 py-6">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider riskLevel={riskLevel} setRiskLevel={setRiskLevel} />
//                 <TeamCountSlider teamCount={teamCount} setTeamCount={setTeamCount} />
//                 {paymentInfo}
//               </div>
//             </div>

//             {generatedTeams.length > 0 ? (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={`team-${index}-${Date.now()}`}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">No Teams Generated Yet</h2>
//                 <p className="text-gray-400">Adjust your settings and click "Generate Teams" to create fantasy teams.</p>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName} won the toss and chose to {matchInfo.tossResults.decision}
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                 </p>
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => (
//                   team && (
//                     <div key={team.id} className="bg-gray-700 p-3 rounded">
//                       <h4 className="font-medium flex items-center">
//                         <img
//                           src={team.logo || "/fallback.png"}
//                           alt={team.name}
//                           className="w-6 h-6 mr-2"
//                           onError={(e) => {
//                             (e.target as HTMLImageElement).src = '/fallback.png';
//                           }}
//                         />
//                         {team.name}
//                       </h4>
//                       <div className="text-sm mt-2 space-y-1">
//                         {preparePlayers(team)
//                           .sort((a, b) => (a.substitute === b.substitute) ? 0 : a.substitute ? 1 : -1)
//                           .map(player => (
//                             <div key={player.id} className="flex items-center">
//                               <span
//                                 className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                                   player.substitute ? 'bg-red-500' : 'bg-green-500'
//                                 }`}
//                               />
//                               <img
//                                 src={player.imgURL}
//                                 alt={player.name}
//                                 className="w-4 h-4 mr-2 rounded-full object-cover"
//                                 onError={(e) => {
//                                   (e.target as HTMLImageElement).src = '/fallback-player.png';
//                                 }}
//                               />
//                               <span className={player.substitute ? 'text-gray-400' : ''}>
//                                 {player.name}
//                                 {player.substitute && ' (Sub)'}
//                               </span>
//                             </div>
//                           ))}
//                       </div>
//                     </div>
//                   )
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }










// // app/build-team/[matchid]/page.tsx

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";
// import { useUser } from "@clerk/nextjs";

// export default function MatchPage() {
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5)
//   const [userBalance, setUserBalance] = useState(0);
//   const { matchId } = useParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = useUser();

//   const {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     paymentInfo,
//     teamError
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance
//   });

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const unsubscribeMatch = onSnapshot(
//       doc(db, "matchinfo", matchId as string),
//       (docSnap) => {
//         setLoading(false);
//         setMatchData(docSnap.exists() ? (docSnap.data() as MatchData) : null);
//       },
//       (err) => {
//         setLoading(false);
//         setError("Failed to load match data");
//       }
//     );

//     let unsubscribeUser = () => {};
//     if (user?.id) {
//       unsubscribeUser = onSnapshot(
//         doc(db, "users", user.id),
//         (docSnap) => {
//           setUserBalance(docSnap.exists() ? docSnap.data().credits || 0 : 0);
//         },
//         (err) => {
//           console.error("Failed to load user balance:", err);
//         }
//       );
//     }

//     return () => {
//       unsubscribeMatch();
//       unsubscribeUser();
//     };
//   }, [matchId, user]);

//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj)
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Invalid date";
//     }
//   };

//   const preparePlayers = (team: any) => {
//     if (!team?.playerDetails) return [];
//     return team.playerDetails.map((player: any) => ({
//       ...player,
//       id: player.id || `${team.id}-${player.name}-${Math.random().toString(36).substring(2, 9)}`,
//       substitute: player.substitute || false,
//       imgURL: player.imgURL || '/fallback-player.png'
//     }));
//   };

//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto px-4 py-6">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//               <RiskSlider
//   value={riskLevel}
//   onChange={setRiskLevel}
// />
// <TeamCountSlider
//   value={teamCount}
//   onChange={setTeamCount}
// />
//                 {generateButton}
//                 {paymentInfo}
//                 {teamError && <div className="text-red-500">{teamError}</div>}
//               </div>
//             </div>

//             {generatedTeams.length > 0 ? (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={`team-${index}-${team.id || index}`}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">No Teams Generated Yet</h2>
//                 <p className="text-gray-400">
//                   {isGenerating
//                     ? "Generating teams..."
//                     : "Adjust settings and generate teams"}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName || "TBD"} won the toss and chose to {matchInfo.tossResults.decision || "TBD"}
//                 </p>
//                 {matchInfo.tossResults.announcedAt && (
//                   <p className="text-sm text-gray-400">
//                     {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                   </p>
//                 )}
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => team && (
//                   <div key={team.id} className="bg-gray-700 p-3 rounded">
//                     <h4 className="font-medium flex items-center">
//                       <img
//                         src={team.logo || "/fallback.png"}
//                         alt={team.name}
//                         className="w-6 h-6 mr-2"
//                         onError={(e) => (e.target as HTMLImageElement).src = '/fallback.png'}
//                       />
//                       {team.name}
//                     </h4>
//                     <div className="text-sm mt-2 space-y-1">
//                       {preparePlayers(team)
//                         .sort((a, b) => (a.substitute === b.substitute) ? 0 : a.substitute ? 1 : -1)
//                         .map(player => (
//                           <div key={player.id} className="flex items-center">
//                             <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                               player.substitute ? 'bg-red-500' : 'bg-green-500'
//                             }`} />
//                             <img
//                               src={player.imgURL}
//                               alt={player.name}
//                               className="w-4 h-4 mr-2 rounded-full object-cover"
//                               onError={(e) => (e.target as HTMLImageElement).src = '/fallback-player.png'}
//                             />
//                             <span className={player.substitute ? 'text-gray-400' : ''}>
//                               {player.name}
//                               {player.substitute && ' (Sub)'}
//                             </span>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";
// import { useUser } from "@clerk/nextjs";

// export default function MatchPage() {
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);
//   const [userBalance, setUserBalance] = useState(0);
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = useUser();

//   // Get matchId from both route params and query params for redundancy
//   const matchId = Array.isArray(params.matchid) ? params.matchid[0] : params.matchid;
//   const team1Name = searchParams.get('team1');
//   const team2Name = searchParams.get('team2');

//   if (!matchId) {
//     return <div className="p-6 text-red-500">Error: Match ID is missing</div>;
//   }

//   const {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error: teamError,
//     setError: setTeamError,
//     fetchSavedTeams
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance,
//     matchId
//   });

//   useEffect(() => {
//     if (!matchId) {
//       setError("Invalid match ID");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const unsubscribeMatch = onSnapshot(
//       doc(db, "matchinfo", matchId),
//       (docSnap) => {
//         setLoading(false);
//         setMatchData(docSnap.exists() ? (docSnap.data() as MatchData) : null);
//       },
//       (err) => {
//         setLoading(false);
//         setError("Failed to load match data");
//       }
//     );

//     let unsubscribeUser = () => {};
//     if (user?.id) {
//       unsubscribeUser = onSnapshot(
//         doc(db, "users", user.id),
//         (docSnap) => {
//           setUserBalance(docSnap.exists() ? docSnap.data().credits || 0 : 0);
//         },
//         (err) => {
//           console.error("Failed to load user balance:", err);
//         }
//       );
//     }

//     return () => {
//       unsubscribeMatch();
//       unsubscribeUser();
//     };
//   }, [matchId, user]);

//   useEffect(() => {
//     if (user && matchId) {
//       fetchSavedTeams().then(teams => {
//         setGeneratedTeams(teams);
//       });
//     }
//   }, [user, matchId]);

//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj)
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Invalid date";
//     }
//   };

//   const preparePlayers = (team: any) => {
//     if (!team?.playerDetails) return [];
//     return team.playerDetails.map((player: any) => ({
//       ...player,
//       id: player.id || `${team.id}-${player.name}-${Math.random().toString(36).substring(2, 9)}`,
//       substitute: player.substitute || false,
//       imgURL: player.imgURL || '/fallback-player.png'
//     }));
//   };

//   if (loading) return <div className="p-6 text-white">Loading match details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!matchData?.matchInfo) return <div className="p-6 text-white">No match data found.</div>;

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto px-4 py-6">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider
//                   value={riskLevel}
//                   onChange={setRiskLevel}
//                 />
//                 <TeamCountSlider
//                   value={teamCount}
//                   onChange={setTeamCount}
//                 />
//                 {generateButton}
//                 {paymentDialog}
//                 {teamError && <div className="text-red-500">{teamError}</div>}
//               </div>
//             </div>

//             {generatedTeams.length > 0 ? (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={`team-${index}-${team.matchId}`}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">No Teams Generated Yet</h2>
//                 <p className="text-gray-400">
//                   {isGenerating
//                     ? "Generating teams..."
//                     : "Adjust settings and generate teams"}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName || "TBD"} won the toss and chose to {matchInfo.tossResults.decision || "TBD"}
//                 </p>
//                 {matchInfo.tossResults.announcedAt && (
//                   <p className="text-sm text-gray-400">
//                     {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                   </p>
//                 )}
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => team && (
//                   <div key={team.id} className="bg-gray-700 p-3 rounded">
//                     <h4 className="font-medium flex items-center">
//                       <img
//                         src={team.logo || "/fallback.png"}
//                         alt={team.name}
//                         className="w-6 h-6 mr-2"
//                         onError={(e) => (e.target as HTMLImageElement).src = '/fallback.png'}
//                       />
//                       {team.name}
//                     </h4>
//                     <div className="text-sm mt-2 space-y-1">
//                       {preparePlayers(team)
//                         .sort((a, b) => (a.substitute === b.substitute) ? 0 : a.substitute ? 1 : -1)
//                         .map(player => (
//                           <div key={player.id} className="flex items-center">
//                             <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                               player.substitute ? 'bg-red-500' : 'bg-green-500'
//                             }`} />
//                             <img
//                               src={player.imgURL}
//                               alt={player.name}
//                               className="w-4 h-4 mr-2 rounded-full object-cover"
//                               onError={(e) => (e.target as HTMLImageElement).src = '/fallback-player.png'}
//                             />
//                             <span className={player.substitute ? 'text-gray-400' : ''}>
//                               {player.name} ({player.role})
//                               {player.substitute && ' (Sub)'}
//                             </span>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }








//  "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";

// export default function MatchPage() {
//     const params = useParams();
    
//     // Debugging: Log the params to console
//     console.log("Route params:", params);
    
//     // Correct parameter name - use matchId instead of matchid
//     const matchId = params?.matchId
//       ? (Array.isArray(params.matchId) ? params.matchId[0] : params.matchId)
//       : null;
  
//     // Immediate validation with proper error UI
//     if (!matchId) {
//       return (
//         <div className="bg-gray-900 min-h-screen text-white p-6">
//           <Header />
//           <div className="container mx-auto py-6">
//             <div className="bg-red-500 text-white p-4 rounded-lg">
//               <h2 className="text-xl font-bold">Invalid Match URL</h2>
//               <p className="mt-2">The match ID could not be found in the URL.</p>
//               <p className="mt-2 text-sm">Current URL params: {JSON.stringify(params)}</p>
//               <Link
//                 href="/"
//                 className="text-blue-300 hover:text-blue-200 mt-4 inline-block"
//               >
//                 ← Return to matches list
//               </Link>
//             </div>
//           </div>
//         </div>
//       );
//     }
  
  

//   const { user } = useUser();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [userBalance, setUserBalance] = useState(0);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);

//   const {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error: teamError,
//     setError: setTeamError,
//     fetchSavedTeams
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance,
//     matchId
//   });

//   useEffect(() => {
//     if (!matchId) return;

//     setLoading(true);
//     const unsubscribeMatch = onSnapshot(
//       doc(db, "matchinfo", matchId),
//       (docSnap) => {
//         setLoading(false);
//         setMatchData(docSnap.exists() ? (docSnap.data() as MatchData) : null);
//       },
//       (err) => {
//         setLoading(false);
//         setError("Failed to load match data");
//         console.error("Error loading match data:", err);
//       }
//     );

//     let unsubscribeUser = () => {};
//     if (user?.id) {
//       unsubscribeUser = onSnapshot(
//         doc(db, "users", user.id),
//         (docSnap) => {
//           setUserBalance(docSnap.exists() ? docSnap.data().credits || 0 : 0);
//         },
//         (err) => {
//           console.error("Failed to load user balance:", err);
//         }
//       );
//     }

//     return () => {
//       unsubscribeMatch();
//       unsubscribeUser();
//     };
//   }, [matchId, user]);

//   useEffect(() => {
//     if (user && matchId) {
//       fetchSavedTeams().catch(err => {
//         console.error("Failed to fetch saved teams:", err);
//       });
//     }
//   }, [user, matchId, fetchSavedTeams]);

//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj)
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Not available";
//     }
//   };

//   const preparePlayers = (team: any) => {
//     if (!team?.playerDetails) return [];
//     return team.playerDetails.map((player: any, index: number) => ({
//       ...player,
//       id: player.id || `${team.id}-${player.name}-${index}`,
//       substitute: player.substitute || false,
//       imgURL: player.imgURL || '/fallback-player.png'
//     }));
//   };

//   if (loading) return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="p-6 text-white">Loading match details...</div>
//     </div>
//   );

//   if (error) return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="p-6 text-red-500">{error}</div>
//     </div>
//   );

//   if (!matchData?.matchInfo) return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="p-6 text-white">No match data found.</div>
//     </div>
//   );

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto px-4 py-6">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider
//                   value={riskLevel}
//                   onChange={setRiskLevel}
//                 />
//                 <TeamCountSlider
//                   value={teamCount}
//                   onChange={setTeamCount}
//                 />
//                 {generateButton}
//                 {paymentDialog}
//                 {teamError && <div className="text-red-500">{teamError}</div>}
//               </div>
//             </div>

//             {generatedTeams.length > 0 ? (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Generated Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={`${matchId}-${index}`}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">No Teams Generated Yet</h2>
//                 <p className="text-gray-400">
//                   {isGenerating
//                     ? "Generating teams..."
//                     : "Adjust settings and generate teams"}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName || "TBD"} won the toss and chose to {matchInfo.tossResults.decision || "TBD"}
//                 </p>
//                 {matchInfo.tossResults.announcedAt && (
//                   <p className="text-sm text-gray-400">
//                     {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                   </p>
//                 )}
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => team && (
//                   <div key={team.id} className="bg-gray-700 p-3 rounded">
//                     <h4 className="font-medium flex items-center">
//                       <img
//                         src={team.logo || "/fallback.png"}
//                         alt={team.name}
//                         className="w-6 h-6 mr-2"
//                         onError={(e) => (e.currentTarget.src = '/fallback.png')}
//                       />
//                       {team.name}
//                     </h4>
//                     <div className="text-sm mt-2 space-y-1">
//                       {preparePlayers(team)
//                         .sort((a, b) => (a.substitute === b.substitute) ? 0 : a.substitute ? 1 : -1)
//                         .map(player => (
//                           <div key={player.id} className="flex items-center">
//                             <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                               player.substitute ? 'bg-red-500' : 'bg-green-500'
//                             }`} />
//                             <img
//                               src={player.imgURL}
//                               alt={player.name}
//                               className="w-4 h-4 mr-2 rounded-full object-cover"
//                               onError={(e) => (e.currentTarget.src = '/fallback-player.png')}
//                             />
//                             <span className={player.substitute ? 'text-gray-400' : ''}>
//                               {player.name} ({player.role})
//                               {player.substitute && ' (Sub)'}
//                             </span>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }






// // app/build-team/[matchID]/page.tsx

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";

// export default function MatchPage() {
//   const params = useParams();
  
//   // Debugging: Log the params to console
//   console.log("Route params:", params);
  
//   // Correct parameter name - use matchId instead of matchid
//   const matchId = params?.matchId
//     ? (Array.isArray(params.matchId) ? params.matchId[0] : params.matchId)
//     : null;

//   // Immediate validation with proper error UI
//   if (!matchId) {
//     return (
//       <div className="bg-gray-900 min-h-screen text-white p-6">
//         <Header />
//         <div className="container mx-auto py-6">
//           <div className="bg-red-500 text-white p-4 rounded-lg">
//             <h2 className="text-xl font-bold">Invalid Match URL</h2>
//             <p className="mt-2">The match ID could not be found in the URL.</p>
//             <p className="mt-2 text-sm">Current URL params: {JSON.stringify(params)}</p>
//             <Link
//               href="/"
//               className="text-blue-300 hover:text-blue-200 mt-4 inline-block"
//             >
//               ← Return to matches list
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const { user } = useUser();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [userBalance, setUserBalance] = useState(0);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);

//   const {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error: teamError,
//     setError: setTeamError,
//     fetchSavedTeams,
//     setGeneratedTeams
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance,
//     matchId
//   });

//   // Load match data and user balance
//   useEffect(() => {
//     if (!matchId) return;

//     setLoading(true);
//     const unsubscribeMatch = onSnapshot(
//       doc(db, "matchinfo", matchId),
//       (docSnap) => {
//         setLoading(false);
//         setMatchData(docSnap.exists() ? (docSnap.data() as MatchData) : null);
//       },
//       (err) => {
//         setLoading(false);
//         setError("Failed to load match data");
//         console.error("Error loading match data:", err);
//       }
//     );

//     let unsubscribeUser = () => {};
//     if (user?.id) {
//       unsubscribeUser = onSnapshot(
//         doc(db, "users", user.id),
//         (docSnap) => {
//           setUserBalance(docSnap.exists() ? docSnap.data().credits || 0 : 0);
//         },
//         (err) => {
//           console.error("Failed to load user balance:", err);
//         }
//       );
//     }

//     return () => {
//       unsubscribeMatch();
//       unsubscribeUser();
//     };
//   }, [matchId, user]);

//   // Load saved teams when component mounts or when user/matchId changes
//   useEffect(() => {
//     const loadSavedTeams = async () => {
//       try {
//         if (user && matchId) {
//           const savedTeams = await fetchSavedTeams();
//           setGeneratedTeams(savedTeams);
//         }
//       } catch (err) {
//         console.error("Failed to load saved teams:", err);
//       }
//     };

//     loadSavedTeams();
//   }, [user, matchId, fetchSavedTeams, setGeneratedTeams]);

//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj)
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Not available";
//     }
//   };

//   const preparePlayers = (team: any) => {
//     if (!team?.playerDetails) return [];
//     return team.playerDetails.map((player: any, index: number) => ({
//       ...player,
//       id: player.id || `${team.id}-${player.name}-${index}`,
//       substitute: player.substitute || false,
//       imgURL: player.imgURL || '/fallback-player.png'
//     }));
//   };

//   if (loading) return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="p-6 text-white">Loading match details...</div>
//     </div>
//   );

//   if (error) return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="p-6 text-red-500">{error}</div>
//     </div>
//   );

//   if (!matchData?.matchInfo) return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="p-6 text-white">No match data found.</div>
//     </div>
//   );

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto px-4 py-6">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider
//                   value={riskLevel}
//                   onChange={setRiskLevel}
//                 />
//                 <TeamCountSlider
//                   value={teamCount}
//                   onChange={setTeamCount}
//                 />
//                 {generateButton}
//                 {paymentDialog}
//                 {teamError && <div className="text-red-500">{teamError}</div>}
//               </div>
//             </div>

//             {generatedTeams.length > 0 ? (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Your Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={`${matchId}-${team.createdAt}-${index}`}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">No Teams Generated Yet</h2>
//                 <p className="text-gray-400">
//                   {isGenerating
//                     ? "Generating teams..."
//                     : "Adjust settings and generate teams"}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName || "TBD"} won the toss and chose to {matchInfo.tossResults.decision || "TBD"}
//                 </p>
//                 {matchInfo.tossResults.announcedAt && (
//                   <p className="text-sm text-gray-400">
//                     {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                   </p>
//                 )}
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => team && (
//                   <div key={team.id} className="bg-gray-700 p-3 rounded">
//                     <h4 className="font-medium flex items-center">
//                       <img
//                         src={team.logo || "/fallback.png"}
//                         alt={team.name}
//                         className="w-6 h-6 mr-2"
//                         onError={(e) => (e.currentTarget.src = '/fallback.png')}
//                       />
//                       {team.name}
//                     </h4>
//                     <div className="text-sm mt-2 space-y-1">
//                       {preparePlayers(team)
//                         .sort((a, b) => (a.substitute === b.substitute) ? 0 : a.substitute ? 1 : -1)
//                         .map(player => (
//                           <div key={player.id} className="flex items-center">
//                             <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                               player.substitute ? 'bg-red-500' : 'bg-green-500'
//                             }`} />
//                             <img
//                               src={player.imgURL}
//                               alt={player.name}
//                               className="w-4 h-4 mr-2 rounded-full object-cover"
//                               onError={(e) => (e.currentTarget.src = '/fallback-player.png')}
//                             />
//                             <span className={player.substitute ? 'text-gray-400' : ''}>
//                               {player.name} ({player.role})
//                               {player.substitute && ' (Sub)'}
//                             </span>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }










// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";

// export default function MatchPage() {
//   const params = useParams();
  
//   // Debugging: Log the params to console
//   console.log("Route params:", params);
  
//   // Correct parameter name - use matchId instead of matchid
//   const matchId = params?.matchId
//     ? (Array.isArray(params.matchId) ? params.matchId[0] : params.matchId)
//     : null;

//   // Immediate validation with proper error UI
//   if (!matchId) {
//     return (
//       <div className="bg-gray-900 min-h-screen text-white p-6">
        
//         <div className="container mx-auto py-6">
//           <div className="bg-red-500 text-white p-4 rounded-lg">
//             <h2 className="text-xl font-bold">Invalid Match URL</h2>
//             <p className="mt-2">The match ID could not be found in the URL.</p>
//             <p className="mt-2 text-sm">Current URL params: {JSON.stringify(params)}</p>
//             <Link
//               href="/"
//               className="text-blue-300 hover:text-blue-200 mt-4 inline-block"
//             >
//               ← Return to matches list
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const { user } = useUser();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [userBalance, setUserBalance] = useState(0);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);

//   const {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error: teamError,
//     setError: setTeamError,
//     fetchSavedTeams,
//     setGeneratedTeams,
//     checkLineupChanges
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance,
//     matchId
//   });

//   // Load match data and user balance
//   useEffect(() => {
//     if (!matchId) return;

//     setLoading(true);
//     const unsubscribeMatch = onSnapshot(
//       doc(db, "matchinfo", matchId),
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           setMatchData(docSnap.data() as MatchData);
//           // Check lineup changes when match data updates
//           checkLineupChanges();
//         } else {
//           setMatchData(null);
//         }
//       },
//       (err) => {
//         setLoading(false);
//         setError("Failed to load match data");
//         console.error("Error loading match data:", err);
//       }
//     );

//     let unsubscribeUser = () => {};
//     if (user?.id) {
//       unsubscribeUser = onSnapshot(
//         doc(db, "users", user.id),
//         (docSnap) => {
//           setUserBalance(docSnap.exists() ? docSnap.data().credits || 0 : 0);
//         },
//         (err) => {
//           console.error("Failed to load user balance:", err);
//         }
//       );
//     }

//     return () => {
//       unsubscribeMatch();
//       unsubscribeUser();
//     };
//   }, [matchId, user, checkLineupChanges]);

//   // Load saved teams when component mounts or when user/matchId changes
//   useEffect(() => {
//     const loadSavedTeams = async () => {
//       try {
//         if (user && matchId) {
//           const savedTeams = await fetchSavedTeams();
//           setGeneratedTeams(savedTeams);
//         }
//       } catch (err) {
//         console.error("Failed to load saved teams:", err);
//       }
//     };

//     loadSavedTeams();
//   }, [user, matchId, fetchSavedTeams, setGeneratedTeams]);

//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj)
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Not available";
//     }
//   };

//   const preparePlayers = (team: any) => {
//     if (!team?.playerDetails) return [];
//     return team.playerDetails.map((player: any, index: number) => ({
//       ...player,
//       id: player.id || `${team.id}-${player.name}-${index}`,
//       substitute: player.substitute || false,
//       imgURL: player.imgURL || '/fallback-player.png'
//     }));
//   };

//   if (loading) return (
//     <div className="bg-gray-900 min-h-screen text-white">
      
//       <div className="p-6 text-white">Loading match details...</div>
//     </div>
//   );

//   if (error) return (
//     <div className="bg-gray-900 min-h-screen text-white">
      
//       <div className="p-6 text-red-500">{error}</div>
//     </div>
//   );

//   if (!matchData?.matchInfo) return (
//     <div className="bg-gray-900 min-h-screen text-white">
     
//       <div className="p-6 text-white">No match data found.</div>
//     </div>
//   );

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
    
//       <div className="container mx-auto px-4 py-6">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider
//                   value={riskLevel}
//                   onChange={setRiskLevel}
//                 />
//                 <TeamCountSlider
//                   value={teamCount}
//                   onChange={setTeamCount}
//                 />
//                 {generateButton}
//                 {paymentDialog}
//                 {teamError && <div className="text-red-500">{teamError}</div>}
//               </div>
//             </div>

//             {generatedTeams.length > 0 ? (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Your Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                       key={`${matchId}-${team.createdAt}-${index}`}
//                       team={team}
//                       index={index}
//                       isSelected={false}
//                       onToggleSelect={() => {}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">No Teams Generated Yet</h2>
//                 <p className="text-gray-400">
//                   {isGenerating
//                     ? "Generating teams..."
//                     : "Adjust settings and generate teams"}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} |
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName || "TBD"} won the toss and chose to {matchInfo.tossResults.decision || "TBD"}
//                 </p>
//                 {matchInfo.tossResults.announcedAt && (
//                   <p className="text-sm text-gray-400">
//                     {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                   </p>
//                 )}
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => team && (
//                   <div key={team.id} className="bg-gray-700 p-3 rounded">
//                     <h4 className="font-medium flex items-center">
//                       <img
//                         src={team.logo || "/fallback.png"}
//                         alt={team.name}
//                         className="w-6 h-6 mr-2"
//                         onError={(e) => (e.currentTarget.src = '/fallback.png')}
//                       />
//                       {team.name}
//                     </h4>
//                     <div className="text-sm mt-2 space-y-1">
//                       {preparePlayers(team)
//                         .sort((a, b) => (a.substitute === b.substitute) ? 0 : a.substitute ? 1 : -1)
//                         .map(player => (
//                           <div key={player.id} className="flex items-center">
//                             <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                               player.substitute ? 'bg-red-500' : 'bg-green-500'
//                             }`} />
//                             <img
//                               src={player.imgURL}
//                               alt={player.name}
//                               className="w-4 h-4 mr-2 rounded-full object-cover"
//                               onError={(e) => (e.currentTarget.src = '/fallback-player.png')}
//                             />
//                             <span className={player.substitute ? 'text-gray-400' : ''}>
//                               {player.name} ({player.role})
//                               {player.substitute && ' (Sub)'}
//                             </span>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }










// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "@/components/Header";
// import { format, isValid } from "date-fns";
// import { enIN } from "date-fns/locale";
// import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
// import TeamCountSlider from "@/components/TeamCountSlider";
// import TeamCard from "@/components/TeamCard";
// import { useTeamGenerator } from "@/components/TeamGenerator";
// import { MatchData } from "../../../types/match";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";

// export default function MatchPage() {
//   const params = useParams();
  
//   // Debugging: Log the params to console
//   console.log("Route params:", params);
  
//   // Correct parameter name - use matchId instead of matchid
//   const matchId = params?.matchId 
//     ? (Array.isArray(params.matchId) ? params.matchId[0] : params.matchId)
//     : null;

//   // Immediate validation with proper error UI
//   if (!matchId) {
//     return (
//       <div className="bg-gray-900 min-h-screen text-white p-6">
//         <Header />
//         <div className="container mx-auto py-6">
//           <div className="bg-red-500 text-white p-4 rounded-lg">
//             <h2 className="text-xl font-bold">Invalid Match URL</h2>
//             <p className="mt-2">The match ID could not be found in the URL.</p>
//             <p className="mt-2 text-sm">Current URL params: {JSON.stringify(params)}</p>
//             <Link 
//               href="/" 
//               className="text-blue-300 hover:text-blue-200 mt-4 inline-block"
//             >
//               ← Return to matches list
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const { user } = useUser();
//   const [matchData, setMatchData] = useState<MatchData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [userBalance, setUserBalance] = useState(0);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [teamCount, setTeamCount] = useState(5);

//   const {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error: teamError,
//     setError: setTeamError,
//     fetchSavedTeams,
//     setGeneratedTeams,
//     checkLineupChanges
//   } = useTeamGenerator({
//     team1: matchData?.matchInfo?.team1,
//     team2: matchData?.matchInfo?.team2,
//     teamCount,
//     riskLevel,
//     userBalance,
//     onBalanceUpdate: setUserBalance,
//     matchId
//   });

//   // Load match data and user balance
//   useEffect(() => {
//     if (!matchId) return;

//     setLoading(true);
//     const unsubscribeMatch = onSnapshot(
//       doc(db, "matchinfo", matchId),
//       (docSnap) => {
//         setLoading(false);
//         if (docSnap.exists()) {
//           setMatchData(docSnap.data() as MatchData);
//           // Check lineup changes when match data updates
//           checkLineupChanges();
//         } else {
//           setMatchData(null);
//         }
//       },
//       (err) => {
//         setLoading(false);
//         setError("Failed to load match data");
//         console.error("Error loading match data:", err);
//       }
//     );

//     let unsubscribeUser = () => {};
//     if (user?.id) {
//       unsubscribeUser = onSnapshot(
//         doc(db, "users", user.id),
//         (docSnap) => {
//           setUserBalance(docSnap.exists() ? docSnap.data().credits || 0 : 0);
//         },
//         (err) => {
//           console.error("Failed to load user balance:", err);
//         }
//       );
//     }

//     return () => {
//       unsubscribeMatch();
//       unsubscribeUser();
//     };
//   }, [matchId, user, checkLineupChanges]);

//   // Load saved teams when component mounts or when user/matchId changes
//   useEffect(() => {
//     const loadSavedTeams = async () => {
//       try {
//         if (user && matchId) {
//           const savedTeams = await fetchSavedTeams();
//           setGeneratedTeams(savedTeams);
//         }
//       } catch (err) {
//         console.error("Failed to load saved teams:", err);
//       }
//     };

//     loadSavedTeams();
//   }, [user, matchId, fetchSavedTeams, setGeneratedTeams]);

//   const formatDateSafely = (date: any) => {
//     try {
//       if (!date) return "Not available";
//       const dateObj = new Date(date);
//       return isValid(dateObj) 
//         ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
//         : "Invalid date";
//     } catch {
//       return "Not available";
//     }
//   };

//   const preparePlayers = (team: any) => {
//     if (!team?.playerDetails) return [];
//     return team.playerDetails.map((player: any, index: number) => ({
//       ...player,
//       id: player.id || `${team.id}-${player.name}-${index}`,
//       substitute: player.substitute || false,
//       imgURL: player.imgURL || '/fallback-player.png'
//     }));
//   };

//   if (loading) return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
//         <div className="flex flex-col items-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//           <p className="text-white">Loading match details...</p>
//         </div>
//       </div>
//     </div>
//   );

//   if (error) return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="p-6 text-red-500">{error}</div>
//     </div>
//   );

//   if (!matchData?.matchInfo) return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="p-6 text-white">No match data found.</div>
//     </div>
//   );

//   const { matchInfo } = matchData;
//   const { team1, team2 } = matchInfo;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Header />
//       <div className="container mx-auto px-4 py-6">
//         <MatchHeader matchInfo={matchInfo} />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
//               <div className="space-y-6">
//                 <RiskSlider 
//                   value={riskLevel} 
//                   onChange={setRiskLevel} 
//                 />
//                 <TeamCountSlider 
//                   value={teamCount}
//                   onChange={setTeamCount}
//                 />
//                 {generateButton}
//                 {paymentDialog}
//                 {teamError && <div className="text-red-500">{teamError}</div>}
//               </div>
//             </div>

//             {isGenerating ? (
//               <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center h-40">
//                 <div className="flex flex-col items-center">
//                   <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
//                   <p className="text-gray-400">Generating teams...</p>
//                 </div>
//               </div>
//             ) : generatedTeams.length > 0 ? (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Your Teams ({generatedTeams.length})</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {generatedTeams.map((team, index) => (
//                     <TeamCard
//                     key={`${matchId}-${team.createdAt}-${index}`}
//                     team={team}
//                     index={index}
//                     isSelected={false}
//                     onToggleSelect={() => {}}
//                     onUpdateTeam={() => {}} // Add this line
//                   />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">No Teams Generated Yet</h2>
//                 <p className="text-gray-400">
//                   Adjust settings and generate teams
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Match Info</h2>
//             {matchInfo.venue && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Venue</h3>
//                 <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
//                 <p className="text-sm text-gray-400">
//                   Pitch: {matchInfo.venue.pitchtype || "Unknown"} | 
//                   Avg. Score: {matchInfo.venue.avgscore || "N/A"}
//                 </p>
//               </div>
//             )}
            
//             {matchInfo.tossResults && (
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg">Toss Result</h3>
//                 <p>
//                   {matchInfo.tossResults.tossWinnerName || "TBD"} won the toss and chose to {matchInfo.tossResults.decision || "TBD"}
//                 </p>
//                 {matchInfo.tossResults.announcedAt && (
//                   <p className="text-sm text-gray-400">
//                     {formatDateSafely(matchInfo.tossResults.announcedAt)}
//                   </p>
//                 )}
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
//               <div className="space-y-4">
//                 {[team1, team2].map((team) => team && (
//                   <div key={team.id} className="bg-gray-700 p-3 rounded">
//                     <h4 className="font-medium flex items-center">
//                       <img 
//                         src={team.logo || "/fallback.png"} 
//                         alt={team.name} 
//                         className="w-6 h-6 mr-2" 
//                         onError={(e) => (e.currentTarget.src = '/fallback.png')}
//                       />
//                       {team.name}
//                     </h4>
//                     <div className="text-sm mt-2 space-y-1">
//                       {preparePlayers(team)
//                         .sort((a, b) => (a.substitute === b.substitute) ? 0 : a.substitute ? 1 : -1)
//                         .map(player => (
//                           <div key={player.id} className="flex items-center">
//                             <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                               player.substitute ? 'bg-red-500' : 'bg-green-500'
//                             }`} />
//                             <img 
//                               src={player.imgURL} 
//                               alt={player.name} 
//                               className="w-4 h-4 mr-2 rounded-full object-cover"
//                               onError={(e) => (e.currentTarget.src = '/fallback-player.png')}
//                             />
//                             <span className={player.substitute ? 'text-gray-400' : ''}>
//                               {player.name} ({player.role})
//                               {player.substitute && ' (Sub)'}
//                             </span>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentDialog}
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/Header";
import { format, isValid } from "date-fns";
import { enIN } from "date-fns/locale";
import MatchHeader from "@/components/MatchHeader";
import RiskSlider from "@/components/RiskSlider";
import TeamCountSlider from "@/components/TeamCountSlider";
import TeamCard from "@/components/TeamCard";
import { useTeamGenerator } from "@/components/TeamGenerator";
import { MatchData } from "../../../types/match";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Team } from "../../../types/match"; // ✅ match this exactly

interface TossResults {
  tossWinnerName?: string;
  decision?: string;
  announcedAt?: Date | string;
}

interface Player {
  id?: string;
  name: string;
  role: string;
  substitute?: boolean;
  imgURL?: string;
}

// interface Team {
//   id: number;
//   name: string;
//   logo?: string;
//   playerDetails?: Player[];
// }

interface GeneratedTeam {
  id?: string;
  players?: Player[];
  createdAt?: Date | string;
  // Add other properties as needed
}

export default function MatchPage() {
  const params = useParams();
  
  const matchId = params?.matchId 
    ? (Array.isArray(params.matchId) ? params.matchId[0] : params.matchId)
    : null;

  if (!matchId) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-6">
        <Header />
        <div className="container mx-auto py-6">
          <div className="bg-red-500 text-white p-4 rounded-lg">
            <h2 className="text-xl font-bold">Invalid Match URL</h2>
            <p className="mt-2">The match ID could not be found in the URL.</p>
            <p className="mt-2 text-sm">Current URL params: {JSON.stringify(params)}</p>
            <Link 
              href="/" 
              className="text-blue-300 hover:text-blue-200 mt-4 inline-block"
            >
              ← Return to matches list
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { user } = useUser();
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState(0);
  const [riskLevel, setRiskLevel] = useState(50);
  const [teamCount, setTeamCount] = useState(5);

  const {
    generatedTeams,
    isGenerating,
    generateButton,
    paymentDialog,
    error: teamError,
    setError: setTeamError,
    fetchSavedTeams,
    setGeneratedTeams,
    checkLineupChanges
  } = useTeamGenerator({
    team1: matchData?.matchInfo?.team1,
    team2: matchData?.matchInfo?.team2,
    teamCount,
    riskLevel,
    userBalance,
    onBalanceUpdate: setUserBalance,
    matchId
  });

  useEffect(() => {
    if (!matchId) return;

    setLoading(true);
    const unsubscribeMatch = onSnapshot(
      doc(db, "matchinfo", matchId),
      (docSnap) => {
        setLoading(false);
        if (docSnap.exists()) {
          setMatchData(docSnap.data() as MatchData);
          checkLineupChanges();
        } else {
          setMatchData(null);
        }
      },
      (err) => {
        setLoading(false);
        setError("Failed to load match data");
        console.error("Error loading match data:", err);
      }
    );

    let unsubscribeUser = () => {};
    if (user?.id) {
      unsubscribeUser = onSnapshot(
        doc(db, "users", user.id),
        (docSnap) => {
          setUserBalance(docSnap.exists() ? docSnap.data().credits || 0 : 0);
        },
        (err) => {
          console.error("Failed to load user balance:", err);
        }
      );
    }

    return () => {
      unsubscribeMatch();
      unsubscribeUser();
    };
  }, [matchId, user, checkLineupChanges]);

  useEffect(() => {
    const loadSavedTeams = async () => {
      try {
        if (user && matchId) {
          const savedTeams = await fetchSavedTeams();
          setGeneratedTeams(savedTeams);
        }
      } catch (err) {
        console.error("Failed to load saved teams:", err);
      }
    };

    loadSavedTeams();
  }, [user, matchId, fetchSavedTeams, setGeneratedTeams]);

  const formatDateSafely = (date: unknown) => {
    try {
      if (!date) return "Not available";
      const dateObj = new Date(date as string);
      return isValid(dateObj) 
        ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
        : "Invalid date";
    } catch {
      return "Not available";
    }
  };

  const preparePlayers = (team: Team) => {
    if (!team?.playerDetails) return [];
    return team.playerDetails.map((player, index) => ({
      ...player,
      id: player.id || `${team.id}-${player.name}-${index}`,
      substitute: player.substitute || false,
      imgURL: player.imgURL || '/fallback-player.png'
    }));
  };

  if (loading) return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-white">Loading match details...</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <div className="p-6 text-red-500">{error}</div>
    </div>
  );

  if (!matchData?.matchInfo) return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <div className="p-6 text-white">No match data found.</div>
    </div>
  );

  const { matchInfo } = matchData;
  const { team1, team2 } = matchInfo;

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <MatchHeader matchInfo={matchInfo} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
              <div className="space-y-6">
                <RiskSlider 
                  value={riskLevel} 
                  onChange={setRiskLevel} 
                />
                <TeamCountSlider 
                  value={teamCount}
                  onChange={setTeamCount}
                />
                {generateButton}
                {paymentDialog}
                {teamError && <div className="text-red-500">{teamError}</div>}
              </div>
            </div>

            {isGenerating ? (
              <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center h-40">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                  <p className="text-gray-400">Generating teams...</p>
                </div>
              </div>
            ) : generatedTeams.length > 0 ? (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Your Teams ({generatedTeams.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedTeams.map((team, index) => (
                    <TeamCard
                      key={`${matchId}-${index}`}
                      team={team}
                      index={index}
                      isSelected={false}
                      onToggleSelect={() => {}}
                      onUpdateTeam={() => {}}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">No Teams Generated Yet</h2>
                <p className="text-gray-400">
                  Adjust settings and generate teams
                </p>
              </div>
            )}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Match Info</h2>
            {matchInfo.venue && (
              <div className="mb-4">
                <h3 className="font-semibold text-lg">Venue</h3>
                <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
                <p className="text-sm text-gray-400">
                  Pitch: {matchInfo.venue.pitchtype || "Unknown"} | 
                  Avg. Score: {matchInfo.venue.avgscore || "N/A"}
                </p>
              </div>
            )}
            
            {matchInfo.tossResults && (
              <div className="mb-4">
                <h3 className="font-semibold text-lg">Toss Result</h3>
                <p>
                  {matchInfo.tossResults.tossWinnerName || "TBD"} won the toss and chose to {matchInfo.tossResults.decision || "TBD"}
                </p>
                {(matchInfo.tossResults as TossResults).announcedAt && (
                  <p className="text-sm text-gray-400">
                    {formatDateSafely((matchInfo.tossResults as TossResults).announcedAt)}
                  </p>
                )}
              </div>
            )}

            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
              <div className="space-y-4">
                {[team1, team2].map((team) => team && (
                  <div key={team.id} className="bg-gray-700 p-3 rounded">
                    <h4 className="font-medium flex items-center">
                      <img 
                        src={team.logo || "/fallback.png"} 
                        alt={team.name} 
                        className="w-6 h-6 mr-2" 
                        onError={(e) => (e.currentTarget.src = '/fallback.png')}
                      />
                      {team.name}
                    </h4>
                    <div className="text-sm mt-2 space-y-1">
                      {preparePlayers(team)
                        .sort((a, b) => (a.substitute === b.substitute) ? 0 : a.substitute ? 1 : -1)
                        .map(player => (
                          <div key={player.id} className="flex items-center">
                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              player.substitute ? 'bg-red-500' : 'bg-green-500'
                            }`} />
                            <img 
                              src={player.imgURL} 
                              alt={player.name} 
                              className="w-4 h-4 mr-2 rounded-full object-cover"
                              onError={(e) => (e.currentTarget.src = '/fallback-player.png')}
                            />
                            <span className={player.substitute ? 'text-gray-400' : ''}>
                              {player.name} ({player.role})
                              {player.substitute && ' (Sub)'}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {paymentDialog}
    </div>
  );
}