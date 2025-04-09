// import { Player, TeamData, IPLTeams } from "../types/ipl";

// export const IPL: IPLTeams = {
//     KKR: {
//         Batters: [
//           {"name": "Ajinkya Rahane", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/44.png"},
//           {"name": "Rinku Singh", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/152.png"},
//           {"name": "Quinton de Kock", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/170.png"},
//           {"name": "Rahmanullah Gurbaz", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/641.png"},
//           {"name": "Angkrish Raghuvanshi", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/787.png"},
//           {"name": "Rovman Powell", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/329.png"},
//           {"name": "Manish Pandey", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/16.png"},
//           {"name": "Luvnith Sisodia", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1009.png"}
//         ],
//         "All Rounders": [
//           {"name": "Venkatesh Iyer", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/584.png"},
//           {"name": "Anukul Roy", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/160.png"},
//           {"name": "Moeen Ali", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/206.png"},
//           {"name": "Ramandeep Singh", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/991.png"},
//           {"name": "Andre Russell", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/141.png"},
//           {"name": "Sunil Narine", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/156.png"}
//         ],
//         Bowlers: [
//           {"name": "Anrich Nortje", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/142.png"},
//           {"name": "Vaibhav Arora", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/583.png"},
//           {"name": "Mayank Markande", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/87.png"},
//           {"name": "Spencer Johnson", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/2518.png"},
//           {"name": "Harshit Rana", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1013.png"},
//           {"name": "Varun Chakaravarthy", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/140.png"},
//           {"name": "Chetan Sakariya", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/592.png"}
//         ]
//       },
//       RCB: {
//         Batters: [
//           {"name": "Rajat Patidar", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/597.png"},
//           {"name": "Virat Kohli", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/2.png"},
//           {"name": "Phil Salt", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1220.png"},
//           {"name": "Jitesh Sharma", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1000.png"},
//           {"name": "Devdutt Padikkal", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/200.png"},
//           {"name": "Swastik Chhikara", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3102.png"}
//         ],
//         "All Rounders": [
//           {"name": "Liam Livingstone", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/183.png"},
//           {"name": "Krunal Pandya", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/17.png"},
//           {"name": "Swapnil Singh", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1483.png"},
//           {"name": "Tim David", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/636.png"},
//           {"name": "Romario Shepherd", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/371.png"},
//           {"name": "Manoj Bhandage", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1485.png"},
//           {"name": "Jacob Bethell", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/869.png"}
//         ],
//         Bowlers: [
//           {"name": "Josh Hazlewood", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/36.png"},
//           {"name": "Rasikh Dar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/172.png"},
//           {"name": "Suyash Sharma", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1932.png"},
//           {"name": "Bhuvneshwar Kumar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/15.png"},
//           {"name": "Nuwan Thushara", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/813.png"},
//           {"name": "Lungisani Ngidi", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/99.png"},
//           {"name": "Abhinandan Singh", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3574.png"},
//           {"name": "Mohit Rathee", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1935.png"},
//           {"name": "Yash Dayal", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/978.png"}
//         ]
//       },
//       SRH: {
//         Batters: [
//           {"name": "Ishan Kishan", "role": "WK-Batter", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee42c88ec80.07161393kus9q7ew.png"},
//           {"name": "Atharva Taide", "role": "Batter", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee13fa47017.25507614btem91fd.png"},
//           {"name": "Abhinav Manohar", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/974.png"},
//           {"name": "Aniket Verma", "role": "Batter", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee157dee754.27943533bf)xod(j.png"},
//           {"name": "Sachin Baby", "role": "Batter", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee16ca75159.77560477un$4jtey.png"},
//           {"name": "Heinrich Klaasen", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/202.png"},
//           {"name": "Travis Head", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/37.png"}
//         ],
//         "All Rounders": [
//           {"name": "Harshal Patel", "role": "All-Rounder", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee00907b481.96254448m$okwnzl.png"},
//           {"name": "Kamindu Mendis", "role": "All-Rounder", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee115a18f24.67736995p594$x1k.png"},
//           {"name": "Wiaan Mulder", "role": "All-Rounder", "image": "https://d13ir53smqqeyp.cloudfront.net/player-images/opta-cricket/9243.png"},
//           {"name": "Abhishek Sharma", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/212.png"},
//           {"name": "Nitish Kumar Reddy", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1944.png"},
//           {"name": "Brydon Carse", "role": "All-Rounder", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee183405e96.7501842024xmewjp.png"}
//         ],
//         Bowlers: [
//           {"name": "Pat Cummins", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/33.png"},
//           {"name": "Mohammad Shami", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee416b7ea12.405426875d8int1x.png"},
//           {"name": "Rahul Chahar", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee0e62ee861.711889401ylc$u0i.png"},
//           {"name": "Adam Zampa", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee0d97e50b3.853559074zn$0hvm.png"},
//           {"name": "Simarjeet Singh", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee0fe73db37.24811874ekj9)nq8.png"},
//           {"name": "Zeeshan Ansari", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee1327dbd11.533483987m4zwbe5.png"},
//           {"name": "Jaydev Unadkat", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-65fefdfbcd3c05.33790781o8)mzsc3.png"},
//           {"name": "Eshan Malinga", "role": "Bowler", "image": "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee12606d642.560857045p4hcq1g.png"}
//         ]
//       },
//       RR: {
//         Batters: [
//           {"name": "Sanju Samson", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/190.png"},
//           {"name": "Shubham Dubey", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/3112.png"},
//           {"name": "Vaibhav Suryavanshi", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1540.png"},
//           {"name": "Kunal Rathore", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1540.png"},
//           {"name": "Shimron Hetmyer", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/210.png"},
//           {"name": "Yashasvi Jaiswal", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/533.png"},
//           {"name": "Dhruv Jurel", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1004.png"},
//           {"name": "Riyan Parag", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/189.png"}
//         ],
//         "All Rounders": [
//           {"name": "Nitish Rana", "role": "All-Rounder", "image": "https://www.rajasthanroyals.com/static-assets/images/players/63649.png"},
//           {"name": "Yudhvir Singh", "role": "All-Rounder", "image": "https://www.rajasthanroyals.com/static-assets/images/players/74054.png"},
//           {"name": "Vaibhav Suryavanshi", "role": "All-Rounder", "image": "https://www.rajasthanroyals.com/static-assets/images/players/114349.png"}
//         ],
//         Bowlers: [
//           {"name": "Jofra Archer", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/64254.png"},
//           {"name": "Maheesh Theekshana", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/69274.png"},
//           {"name": "Wanindu Hasaranga", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/65027.png"},
//           {"name": "Akash Madhwal", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/74055.png"},
//           {"name": "Kumar Kartikeya Singh", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/70191.png"},
//           {"name": "Tushar Deshpande", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/65478.png"},
//           {"name": "Fazalhaq Farooqi", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/67927.png"},
//           {"name": "Kwena Maphaka", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/90908.png"},
//           {"name": "Ashok Sharma", "role": "Bowler", "image": "https://www.rajasthanroyals.com/static-assets/images/players/91316.png"},
//           {"name": "Sandeep Sharma", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/220.png"}
//         ]
//       },
//       LSG: {
//         Batters: [
//           {"name": "Rishabh Pant", "role": "WK-Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/65756.png"},
//           {"name": "David Miller", "role": "Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/5313.png"},
//           {"name": "Aiden Markram", "role": "Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/64219.png"},
//           {"name": "Aryan Juyal", "role": "WK-Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/68003.png"},
//           {"name": "Himmat Singh", "role": "Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/65152.png"},
//           {"name": "Matthew Breetzke", "role": "Batter", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/65618.png"},
//           {"name": "Nicholas Pooran", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/136.png"}
//         ],
//         "All Rounders": [
//           {"name": "Mitchell Marsh", "role": "All-Rounder", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/4311.png"},
//           {"name": "Abdul Samad", "role": "All-Rounder", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/71260.png"},
//           {"name": "Shahbaz Ahamad", "role": "All-Rounder", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/58223.png"},
//           {"name": "Yuvraj Chaudhary", "role": "All-Rounder", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/71367.png"},
//           {"name": "Rajvardhan Hangargekar", "role": "All-Rounder", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/71152.png"},
//           {"name": "Arshin Kulkarni", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/2788.png"},
//           {"name": "Ayush Badoni", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/985.png"}
//         ],
//         Bowlers: [
//           {"name": "Avesh Khan", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2023/109.png"},
//           {"name": "Akash Deep", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/71447.png"},
//           {"name": "M. Siddharth", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/532.png"},
//           {"name": "Digvesh Singh", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/100574.png"},
//           {"name": "Akash Singh", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/70376.png"},
//           {"name": "Shamar Joseph", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/101907.png"},
//           {"name": "Prince Yadav", "role": "Bowler", "image": "https://www.lucknowsupergiants.in/static-assets/images/players/100570.png"},
//           {"name": "Mayank Yadav", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/987.png"},
//           {"name": "Mohsin Khan", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/541.png"},
//           {"name": "Ravi Bishnoi", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/520.png"}
//         ]
//       },
//       DC: {
//         Batters: [
//           {"name": "KL Rahul", "role": "WK-Batter", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/60122.png"},
//           {"name": "Jake Fraser-McGurk", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/3115.png"},
//           {"name": "Karun Nair", "role": "Batter", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/62297.png"},
//           {"name": "Faf du Plessis", "role": "Batter", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/28891.png"},
//           {"name": "Donovan Ferreira", "role": "WK-Batter", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/23487.png"},
//           {"name": "Abishek Porel", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1580.png"},
//           {"name": "Tristan Stubbs", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1017.png"}
//         ],
//         "All Rounders": [
//           {"name": "Axar Patel", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/110.png"},
//           {"name": "Sameer Rizvi", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/71376.png"},
//           {"name": "Ashutosh Sharma", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/68176.png"},
//           {"name": "Darshan Nalkande", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/67489.png"},
//           {"name": "Vipraj Nigam", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/88677.png"},
//           {"name": "Ajay Mandal", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/66558.png"},
//           {"name": "Manvanth Kumar", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/98477.png"},
//           {"name": "Tripurana Vijay", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/90635.png"},
//           {"name": "Madhav Tiwari", "role": "All-Rounder", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/124649.png"}
//         ],
//         Bowlers: [
//           {"name": "Mitchell Starc", "role": "Bowler", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/10053.png"},
//           {"name": "T. Natarajan", "role": "Bowler", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/65160.png"},
//           {"name": "Mohit Sharma", "role": "Bowler", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/63341.png"},
//           {"name": "Mukesh Kumar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/1462.png"},
//           {"name": "Dushmantha Chameera", "role": "Bowler", "image": "https://www.delhicapitals.in/static-assets/images/players/ipl/58065.png"},
//           {"name": "Kuldeep Yadav", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/14.png"}
//         ]
//       },
//       GT: {
//         Batters: [
//           {"name": "Shubman Gill", "role": "Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/66818.png"},
//           {"name": "Jos Buttler", "role": "WK-Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/9782.png"},
//           {"name": "Kumar Kushagra", "role": "WK-Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/74097.png"},
//           {"name": "Anuj Rawat", "role": "WK-Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/67752.png"},
//           {"name": "Sherfane Rutherford", "role": "Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/67285.png"},
//           {"name": "Shahrukh Khan", "role": "Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/64721.png"},
//           {"name": "Glenn Phillips", "role": "Batter", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65295.png"}
//         ],
//         "All Rounders": [
//           {"name": "Nishant Sindhu", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/88873.png"},
//           {"name": "Mahipal Lomror", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65432.png"},
//           {"name": "Washington Sundar", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65859.png"},
//           {"name": "Mohd. Arshad Khan", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/82839.png"},
//           {"name": "Sai Kishore", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/66438.png"},
//           {"name": "Jayant Yadav", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/59611.png"},
//           {"name": "Karim Janat", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65875.png"},
//           {"name": "Sai Sudharsan", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/69500.png"},
//           {"name": "Rahul Tewatia", "role": "All-Rounder", "image": "https://www.gujarattitansipl.com/static-assets/images/players/64440.png"}
//         ],
//         Bowlers: [
//           {"name": "Kagiso Rabada", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/63611.png"},
//           {"name": "Mohammed Siraj", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65799.png"},
//           {"name": "Prasidh Krishna", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65702.png"},
//           {"name": "Manav Suthar", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/71149.png"},
//           {"name": "Gerald Coetzee", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/67443.png"},
//           {"name": "Gurnoor Singh Brar", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/90572.png"},
//           {"name": "Ishant Sharma", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/3899.png"},
//           {"name": "Kulwant Khejroliya", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/67136.png"},
//           {"name": "Rashid Khan", "role": "Bowler", "image": "https://www.gujarattitansipl.com/static-assets/images/players/65748.png"}
//         ]
//       },
//       PBKS: {
//         Batters: [
//           {"name": "Shreyas Iyer", "role": "Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/63961.png"},
//           {"name": "Nehal Wadhera", "role": "Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/69657.png"},
//           {"name": "Vishnu Vinod", "role": "WK-Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/64783.png"},
//           {"name": "Josh Inglis", "role": "WK-Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/65893.png"},
//           {"name": "Harnoor Pannu", "role": "Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/89196.png"},
//           {"name": "Pyla Avinash", "role": "Batter", "image": "https://www.punjabkingsipl.in/static-assets/images/players/81901.png"},
//           {"name": "Prabhsimran Singh", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/137.png"},
//           {"name": "Shashank Singh", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/191.png"}
//         ],
//         "All Rounders": [
//           {"name": "Marcus Stoinis", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/4311.png"},
//           {"name": "Glenn Maxwell", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/10085.png"},
//           {"name": "Harpreet Brar", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/130.png"},
//           {"name": "Marco Jansen", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/69409.png"},
//           {"name": "Azmatullah Omarzai", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/67516.png"},
//           {"name": "Priyansh Arya", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/71366.png"},
//           {"name": "Aaron Hardie", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/68072.png"},
//           {"name": "Musheer Khan", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/94786.png"},
//           {"name": "Suryansh Shedge", "role": "All-Rounder", "image": "https://www.punjabkingsipl.in/static-assets/images/players/71951.png"}
//         ],
//         Bowlers: [
//           {"name": "Arshdeep Singh", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2024/125.png"},
//           {"name": "Yuzvendra Chahal", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/9844.png"},
//           {"name": "Vyshak Vijaykumar", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/67628.png"},
//           {"name": "Yash Thakur", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/66819.png"},
//           {"name": "Lockie Ferguson", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/63719.png"},
//           {"name": "Kuldeep Sen", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/70402.png"},
//           {"name": "Xavier Bartlett", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/66516.png"},
//           {"name": "Pravin Dubey", "role": "Bowler", "image": "https://www.punjabkingsipl.in/static-assets/images/players/63550.png"}
//         ]
//       },
//       CSK: {
//         Batters: [
//           {"name": "Ruturaj Gaikwad", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/102.png"},
//           {"name": "MS Dhoni", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/57.png"},
//           {"name": "Devon Conway", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/601.png"},
//           {"name": "Rahul Tripathi", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/188.png"},
//           {"name": "Shaik Rasheed", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/778.png"},
//           {"name": "Vansh Bedi", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3558.png"},
//           {"name": "Andre Siddarth", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3157.png"}
//         ],
//         "All Rounders": [
//           {"name": "Rachin Ravindra", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/724.png"},
//           {"name": "Ravichandran Ashwin", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/45.png"},
//           {"name": "Vijay Shankar", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/61.png"},
//           {"name": "Sam Curran", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/138.png"},
//           {"name": "Anshul Kamboj", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3106.png"},
//           {"name": "Deepak Hooda", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/215.png"},
//           {"name": "Jamie Overton", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1216.png"},
//           {"name": "Kamlesh Nagarkoti", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/146.png"},
//           {"name": "Ramakrishna Ghosh", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3559.png"},
//           {"name": "Ravindra Jadeja", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/46.png"},
//           {"name": "Shivam Dube", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/211.png"}
//         ],
//         Bowlers: [
//           {"name": "Khaleel Ahmed", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/8.png"},
//           {"name": "Noor Ahmad", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/975.png"},
//           {"name": "Mukesh Choudhary", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/970.png"},
//           {"name": "Gurjapneet Singh", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/2256.png"},
//           {"name": "Nathan Ellis", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/633.png"},
//           {"name": "Shreyas Gopal", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/192.png"},
//           {"name": "Matheesha Pathirana", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1014.png"}
//         ]
//       },
//       MI: {
//         Batters: [
//           {"name": "Rohit Sharma", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/6.png"},
//           {"name": "Surya Kumar Yadav", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/174.png"},
//           {"name": "Robin Minz", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3103.png"},
//           {"name": "Ryan Rickelton", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/743.png"},
//           {"name": "Shrijith Krishnan", "role": "WK-Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3570.png"},
//           {"name": "Bevon Jacobs", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3567.png"},
//           {"name": "N. Tilak Varma", "role": "Batter", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/993.png"}
//         ],
//         "All Rounders": [
//           {"name": "Hardik Pandya", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/54.png"},
//           {"name": "Naman Dhir", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3107.png"},
//           {"name": "Will Jacks", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1941.png"},
//           {"name": "Mitchell Santner", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/75.png"},
//           {"name": "Raj Angad Bawa", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/781.png"},
//           {"name": "Vignesh Puthur", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3566.png"},
//           {"name": "Corbin Bosch", "role": "All-Rounder", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/1041.png"}
//         ],
//         Bowlers: [
//           {"name": "Trent Boult", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/66.png"},
//           {"name": "Karn Sharma", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/98.png"},
//           {"name": "Deepak Chahar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/91.png"},
//           {"name": "Ashwani Kumar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3569.png"},
//           {"name": "Reece Topley", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/574.png"},
//           {"name": "V.Satyanarayana Penmetsa", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/3568.png"},
//           {"name": "Arjun Tendulkar", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/585.png"},
//           {"name": "Mujeeb-ur-Rahman", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/134.png"},
//           {"name": "Jasprit Bumrah", "role": "Bowler", "image": "https://documents.iplt20.com/ipl/IPLHeadshot2025/9.png"}
//         ]
//       }
// };


// data/iplTeams.ts
interface Player {
    name: string;
    role: string;
    image: string;
  }
  
  interface TeamData {
    Batters: Player[];
    "All Rounders": Player[];
    Bowlers: Player[];
  }
  
  export interface IPLTeams {
    [key: string]: TeamData;
  }
  
  export const teamAbbreviations: Record<string, string> = {
    "Kolkata Knight Riders": "KKR",
    "Royal Challengers Bangalore": "RCB",
    "Sunrisers Hyderabad": "SRH",
    "Rajasthan Royals": "RR",
    "Lucknow Super Giants": "LSG",
    "Delhi Capitals": "DC",
    "Gujarat Titans": "GT",
    "Punjab Kings": "PBKS",
    "Chennai Super Kings": "CSK",
    "Mumbai Indians": "MI"
  };
  
  export const IPL: Record<string, TeamData> = {
    KKR: {
      Batters: [
        {name: "Ajinkya Rahane", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/44.png"},
        {name: "Rinku Singh", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/152.png"},
        {name: "Quinton de Kock", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/170.png"},
        {name: "Rahmanullah Gurbaz", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/641.png"},
        {name: "Angkrish Raghuvanshi", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/787.png"},
        {name: "Rovman Powell", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/329.png"},
        {name: "Manish Pandey", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/16.png"},
        {name: "Luvnith Sisodia", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/1009.png"}
      ],
      "All Rounders": [
        {name: "Venkatesh Iyer", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/584.png"},
        {name: "Anukul Roy", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/160.png"},
        {name: "Moeen Ali", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/206.png"},
        {name: "Ramandeep Singh", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/991.png"},
        {name: "Andre Russell", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/141.png"},
        {name: "Sunil Narine", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/156.png"}
      ],
      Bowlers: [
        {name: "Anrich Nortje", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/142.png"},
        {name: "Vaibhav Arora", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/583.png"},
        {name: "Mayank Markande", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/87.png"},
        {name: "Spencer Johnson", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/2518.png"},
        {name: "Harshit Rana", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/1013.png"},
        {name: "Varun Chakaravarthy", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/140.png"},
        {name: "Chetan Sakariya", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/592.png"}
      ]
    },
    RCB: {
      Batters: [
        {name: "Rajat Patidar", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/597.png"},
        {name: "Virat Kohli", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/2.png"},
        {name: "Phil Salt", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/1220.png"},
        {name: "Jitesh Sharma", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/1000.png"},
        {name: "Devdutt Padikkal", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/200.png"},
        {name: "Swastik Chhikara", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3102.png"}
      ],
      "All Rounders": [
        {name: "Liam Livingstone", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/183.png"},
        {name: "Krunal Pandya", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/17.png"},
        {name: "Swapnil Singh", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/1483.png"},
        {name: "Tim David", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/636.png"},
        {name: "Romario Shepherd", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/371.png"},
        {name: "Manoj Bhandage", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/1485.png"},
        {name: "Jacob Bethell", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/869.png"}
      ],
      Bowlers: [
        {name: "Josh Hazlewood", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/36.png"},
        {name: "Rasikh Dar", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/172.png"},
        {name: "Suyash Sharma", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/1932.png"},
        {name: "Bhuvneshwar Kumar", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/15.png"},
        {name: "Nuwan Thushara", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/813.png"},
        {name: "Lungisani Ngidi", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/99.png"},
        {name: "Abhinandan Singh", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3574.png"},
        {name: "Mohit Rathee", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/1935.png"},
        {name: "Yash Dayal", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/978.png"}
      ]
    },
    SRH: {
      Batters: [
        {name: "Ishan Kishan", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/164.png"},
        {name: "Atharva Taide", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/1001.png"},
        {name: "Abhinav Manohar", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/974.png"},
        {name: "Aniket Verma", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3576.png"},
        {name: "Sachin Baby", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/599.png"},
        {name: "Heinrich Klaasen", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/202.png"},
        {name: "Travis Head", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/37.png"}
      ],
      "All Rounders": [
        {name: "Harshal Patel", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/114.png"},
        {name: "Kamindu Mendis", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/627.png"},
        {name: "Wiaan Mulder", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/630.png"},
        {name: "Abhishek Sharma", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/212.png"},
        {name: "Nitish Kumar Reddy", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/1944.png"},
        // {name: "Brydon Carse", role: "All-Rounder", image: "https://www.sunrisershyderabad.in/uploads/image/SRH-674ee183405e96.7501842024xmewjp.png"}
      ],
      Bowlers: [
        {name: "Pat Cummins", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/33.png"},
        {name: "Mohammad Shami", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/47.png"},
        {name: "Rahul Chahar", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/171.png"},
        {name: "Adam Zampa", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/24.png"},
        {name: "Simarjeet Singh", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/622.png"},
        {name: "Zeeshan Ansari", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3575.png"},
        {name: "Jaydev Unadkat", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/180.png"},
        {name: "Eshan Malinga", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3339.png"}
      ]
    },
    RR: {
      Batters: [
        {name: "Sanju Samson", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/190.png"},
        {name: "Shubham Dubey", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/3112.png"},
        {name: "Vaibhav Suryavanshi", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/1540.png"},
        {name: "Kunal Rathore", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/1540.png"},
        {name: "Shimron Hetmyer", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/210.png"},
        {name: "Yashasvi Jaiswal", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/533.png"},
        {name: "Dhruv Jurel", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/1004.png"},
        {name: "Riyan Parag", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/189.png"}
      ],
      "All Rounders": [
        {name: "Nitish Rana", role: "All-Rounder", image: "https://www.rajasthanroyals.com/static-assets/images/players/63649.png"},
        {name: "Yudhvir Singh", role: "All-Rounder", image: "https://www.rajasthanroyals.com/static-assets/images/players/74054.png"},
        {name: "Vaibhav Suryavanshi", role: "All-Rounder", image: "https://www.rajasthanroyals.com/static-assets/images/players/114349.png"}
      ],
      Bowlers: [
        {name: "Jofra Archer", role: "Bowler", image: "https://www.rajasthanroyals.com/static-assets/images/players/64254.png"},
        {name: "Maheesh Theekshana", role: "Bowler", image: "https://www.rajasthanroyals.com/static-assets/images/players/69274.png"},
        {name: "Wanindu Hasaranga", role: "Bowler", image: "https://www.rajasthanroyals.com/static-assets/images/players/65027.png"},
        {name: "Akash Madhwal", role: "Bowler", image: "https://www.rajasthanroyals.com/static-assets/images/players/74055.png"},
        {name: "Kumar Kartikeya Singh", role: "Bowler", image: "https://www.rajasthanroyals.com/static-assets/images/players/70191.png"},
        {name: "Tushar Deshpande", role: "Bowler", image: "https://www.rajasthanroyals.com/static-assets/images/players/65478.png"},
        {name: "Fazalhaq Farooqi", role: "Bowler", image: "https://www.rajasthanroyals.com/static-assets/images/players/67927.png"},
        {name: "Kwena Maphaka", role: "Bowler", image: "https://www.rajasthanroyals.com/static-assets/images/players/90908.png"},
        {name: "Ashok Sharma", role: "Bowler", image: "https://www.rajasthanroyals.com/static-assets/images/players/91316.png"},
        {name: "Sandeep Sharma", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/220.png"}
      ]
    },
    LSG: {
      Batters: [
        {name: "Rishabh Pant", role: "WK-Batter", image: "https://www.lucknowsupergiants.in/static-assets/images/players/65756.png"},
        {name: "David Miller", role: "Batter", image: "https://www.lucknowsupergiants.in/static-assets/images/players/5313.png"},
        {name: "Aiden Markram", role: "Batter", image: "https://www.lucknowsupergiants.in/static-assets/images/players/64219.png"},
        {name: "Aryan Juyal", role: "WK-Batter", image: "https://www.lucknowsupergiants.in/static-assets/images/players/68003.png"},
        {name: "Himmat Singh", role: "Batter", image: "https://www.lucknowsupergiants.in/static-assets/images/players/65152.png"},
        {name: "Matthew Breetzke", role: "Batter", image: "https://www.lucknowsupergiants.in/static-assets/images/players/65618.png"},
        {name: "Nicholas Pooran", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/136.png"}
      ],
      "All Rounders": [
        {name: "Mitchell Marsh", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/40.png"},
        {name: "Abdul Samad", role: "All-Rounder", image: "https://www.lucknowsupergiants.in/static-assets/images/players/71260.png"},
        {name: "Shahbaz Ahamad", role: "All-Rounder", image: "https://www.lucknowsupergiants.in/static-assets/images/players/58223.png"},
        {name: "Yuvraj Chaudhary", role: "All-Rounder", image: "https://www.lucknowsupergiants.in/static-assets/images/players/71367.png"},
        {name: "Rajvardhan Hangargekar", role: "All-Rounder", image: "https://www.lucknowsupergiants.in/static-assets/images/players/71152.png"},
        {name: "Arshin Kulkarni", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/2788.png"},
        {name: "Ayush Badoni", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/985.png"}
      ],
      Bowlers: [
        {name: "Avesh Khan", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2023/109.png"},
        {name: "Akash Deep", role: "Bowler", image: "https://www.lucknowsupergiants.in/static-assets/images/players/71447.png"},
        {name: "M. Siddharth", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/532.png"},
        {name: "Digvesh Singh", role: "Bowler", image: "https://www.lucknowsupergiants.in/static-assets/images/players/100574.png"},
        {name: "Akash Singh", role: "Bowler", image: "https://www.lucknowsupergiants.in/static-assets/images/players/70376.png"},
        {name: "Shamar Joseph", role: "Bowler", image: "https://www.lucknowsupergiants.in/static-assets/images/players/101907.png"},
        {name: "Prince Yadav", role: "Bowler", image: "https://www.lucknowsupergiants.in/static-assets/images/players/100570.png"},
        {name: "Mayank Yadav", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/987.png"},
        {name: "Mohsin Khan", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/541.png"},
        {name: "Ravi Bishnoi", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/520.png"}
      ]
    },
    DC: {
      Batters: [
        {name: "KL Rahul", role: "WK-Batter", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/60122.png"},
        {name: "Jake Fraser-McGurk", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/3115.png"},
        {name: "Karun Nair", role: "Batter", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/62297.png"},
        {name: "Faf du Plessis", role: "Batter", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/28891.png"},
        {name: "Donovan Ferreira", role: "WK-Batter", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/23487.png"},
        {name: "Abishek Porel", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/1580.png"},
        {name: "Tristan Stubbs", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/1017.png"}
      ],
      "All Rounders": [
        {name: "Axar Patel", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/110.png"},
        {name: "Sameer Rizvi", role: "All-Rounder", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/71376.png"},
        {name: "Ashutosh Sharma", role: "All-Rounder", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/68176.png"},
        {name: "Darshan Nalkande", role: "All-Rounder", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/67489.png"},
        {name: "Vipraj Nigam", role: "All-Rounder", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/88677.png"},
        {name: "Ajay Mandal", role: "All-Rounder", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/66558.png"},
        {name: "Manvanth Kumar", role: "All-Rounder", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/98477.png"},
        {name: "Tripurana Vijay", role: "All-Rounder", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/90635.png"},
        {name: "Madhav Tiwari", role: "All-Rounder", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/124649.png"}
      ],
      Bowlers: [
        {name: "Mitchell Starc", role: "Bowler", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/10053.png"},
        {name: "T. Natarajan", role: "Bowler", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/65160.png"},
        {name: "Mohit Sharma", role: "Bowler", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/63341.png"},
        {name: "Mukesh Kumar", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/1462.png"},
        {name: "Dushmantha Chameera", role: "Bowler", image: "https://www.delhicapitals.in/static-assets/images/players/ipl/58065.png"},
        {name: "Kuldeep Yadav", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/14.png"}
      ]
    },
    GT: {
      Batters: [
        {name: "Shubman Gill", role: "Batter", image: "https://www.gujarattitansipl.com/static-assets/images/players/66818.png"},
        {name: "Jos Buttler", role: "WK-Batter", image: "https://www.gujarattitansipl.com/static-assets/images/players/9782.png"},
        {name: "Kumar Kushagra", role: "WK-Batter", image: "https://www.gujarattitansipl.com/static-assets/images/players/74097.png"},
        {name: "Anuj Rawat", role: "WK-Batter", image: "https://www.gujarattitansipl.com/static-assets/images/players/67752.png"},
        {name: "Sherfane Rutherford", role: "Batter", image: "https://www.gujarattitansipl.com/static-assets/images/players/67285.png"},
        {name: "Shahrukh Khan", role: "Batter", image: "https://www.gujarattitansipl.com/static-assets/images/players/64721.png"},
        {name: "Glenn Phillips", role: "Batter", image: "https://www.gujarattitansipl.com/static-assets/images/players/65295.png"}
      ],
      "All Rounders": [
        {name: "Nishant Sindhu", role: "All-Rounder", image: "https://www.gujarattitansipl.com/static-assets/images/players/88873.png"},
        {name: "Mahipal Lomror", role: "All-Rounder", image: "https://www.gujarattitansipl.com/static-assets/images/players/65432.png"},
        {name: "Washington Sundar", role: "All-Rounder", image: "https://www.gujarattitansipl.com/static-assets/images/players/65859.png"},
        {name: "Mohd. Arshad Khan", role: "All-Rounder", image: "https://www.gujarattitansipl.com/static-assets/images/players/82839.png"},
        {name: "Sai Kishore", role: "All-Rounder", image: "https://www.gujarattitansipl.com/static-assets/images/players/66438.png"},
        {name: "Jayant Yadav", role: "All-Rounder", image: "https://www.gujarattitansipl.com/static-assets/images/players/59611.png"},
        {name: "Karim Janat", role: "All-Rounder", image: "https://www.gujarattitansipl.com/static-assets/images/players/65875.png"},
        {name: "Sai Sudharsan", role: "All-Rounder", image: "https://www.gujarattitansipl.com/static-assets/images/players/69500.png"},
        {name: "Rahul Tewatia", role: "All-Rounder", image: "https://www.gujarattitansipl.com/static-assets/images/players/64440.png"}
      ],
      Bowlers: [
        {name: "Kagiso Rabada", role: "Bowler", image: "https://www.gujarattitansipl.com/static-assets/images/players/63611.png"},
        {name: "Mohammed Siraj", role: "Bowler", image: "https://www.gujarattitansipl.com/static-assets/images/players/65799.png"},
        {name: "Prasidh Krishna", role: "Bowler", image: "https://www.gujarattitansipl.com/static-assets/images/players/65702.png"},
        {name: "Manav Suthar", role: "Bowler", image: "https://www.gujarattitansipl.com/static-assets/images/players/71149.png"},
        {name: "Gerald Coetzee", role: "Bowler", image: "https://www.gujarattitansipl.com/static-assets/images/players/67443.png"},
        {name: "Gurnoor Singh Brar", role: "Bowler", image: "https://www.gujarattitansipl.com/static-assets/images/players/90572.png"},
        {name: "Ishant Sharma", role: "Bowler", image: "https://www.gujarattitansipl.com/static-assets/images/players/3899.png"},
        {name: "Kulwant Khejroliya", role: "Bowler", image: "https://www.gujarattitansipl.com/static-assets/images/players/67136.png"},
        {name: "Rashid Khan", role: "Bowler", image: "https://www.gujarattitansipl.com/static-assets/images/players/65748.png"}
      ]
    },
    PBKS: {
      Batters: [
        {name: "Shreyas Iyer", role: "Batter", image: "https://www.punjabkingsipl.in/static-assets/images/players/63961.png"},
        {name: "Nehal Wadhera", role: "Batter", image: "https://www.punjabkingsipl.in/static-assets/images/players/69657.png"},
        {name: "Vishnu Vinod", role: "WK-Batter", image: "https://www.punjabkingsipl.in/static-assets/images/players/64783.png"},
        {name: "Josh Inglis", role: "WK-Batter", image: "https://www.punjabkingsipl.in/static-assets/images/players/65893.png"},
        {name: "Harnoor Pannu", role: "Batter", image: "https://www.punjabkingsipl.in/static-assets/images/players/89196.png"},
        {name: "Pyla Avinash", role: "Batter", image: "https://www.punjabkingsipl.in/static-assets/images/players/81901.png"},
        {name: "Prabhsimran Singh", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/137.png"},
        {name: "Shashank Singh", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/191.png"}
      ],
      "All Rounders": [
        {name: "Marcus Stoinis", role: "All-Rounder", image: "https://www.punjabkingsipl.in/static-assets/images/players/4311.png"},
        {name: "Glenn Maxwell", role: "All-Rounder", image: "https://www.punjabkingsipl.in/static-assets/images/players/10085.png"},
        {name: "Harpreet Brar", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/130.png"},
        {name: "Marco Jansen", role: "All-Rounder", image: "https://www.punjabkingsipl.in/static-assets/images/players/69409.png"},
        {name: "Azmatullah Omarzai", role: "All-Rounder", image: "https://www.punjabkingsipl.in/static-assets/images/players/67516.png"},
        {name: "Priyansh Arya", role: "All-Rounder", image: "https://www.punjabkingsipl.in/static-assets/images/players/71366.png"},
        {name: "Aaron Hardie", role: "All-Rounder", image: "https://www.punjabkingsipl.in/static-assets/images/players/68072.png"},
        {name: "Musheer Khan", role: "All-Rounder", image: "https://www.punjabkingsipl.in/static-assets/images/players/94786.png"},
        {name: "Suryansh Shedge", role: "All-Rounder", image: "https://www.punjabkingsipl.in/static-assets/images/players/71951.png"}
      ],
      Bowlers: [
        {name: "Arshdeep Singh", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2024/125.png"},
        {name: "Yuzvendra Chahal", role: "Bowler", image: "https://www.punjabkingsipl.in/static-assets/images/players/9844.png"},
        {name: "Vyshak Vijaykumar", role: "Bowler", image: "https://www.punjabkingsipl.in/static-assets/images/players/67628.png"},
        {name: "Yash Thakur", role: "Bowler", image: "https://www.punjabkingsipl.in/static-assets/images/players/66819.png"},
        {name: "Lockie Ferguson", role: "Bowler", image: "https://www.punjabkingsipl.in/static-assets/images/players/63719.png"},
        {name: "Kuldeep Sen", role: "Bowler", image: "https://www.punjabkingsipl.in/static-assets/images/players/70402.png"},
        {name: "Xavier Bartlett", role: "Bowler", image: "https://www.punjabkingsipl.in/static-assets/images/players/66516.png"},
        {name: "Pravin Dubey", role: "Bowler", image: "https://www.punjabkingsipl.in/static-assets/images/players/63550.png"}
      ]
    },
    CSK: {
      Batters: [
        {name: "Ruturaj Gaikwad", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/102.png"},
        {name: "MS Dhoni", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/57.png"},
        {name: "Devon Conway", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/601.png"},
        {name: "Rahul Tripathi", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/188.png"},
        {name: "Shaik Rasheed", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/778.png"},
        {name: "Vansh Bedi", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3558.png"},
        {name: "Andre Siddarth", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3157.png"}
      ],
      "All Rounders": [
        {name: "Rachin Ravindra", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/724.png"},
        {name: "Ravichandran Ashwin", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/45.png"},
        {name: "Vijay Shankar", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/61.png"},
        {name: "Sam Curran", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/138.png"},
        {name: "Anshul Kamboj", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3106.png"},
        {name: "Deepak Hooda", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/215.png"},
        {name: "Jamie Overton", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/1216.png"},
        {name: "Kamlesh Nagarkoti", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/146.png"},
        {name: "Ramakrishna Ghosh", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3559.png"},
        {name: "Ravindra Jadeja", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/46.png"},
        {name: "Shivam Dube", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/211.png"}
      ],
      Bowlers: [
        {name: "Khaleel Ahmed", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/8.png"},
        {name: "Noor Ahmad", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/975.png"},
        {name: "Mukesh Choudhary", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/970.png"},
        {name: "Gurjapneet Singh", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/2256.png"},
        {name: "Nathan Ellis", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/633.png"},
        {name: "Shreyas Gopal", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/192.png"},
        {name: "Matheesha Pathirana", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/1014.png"}
      ]
    },
    MI: {
      Batters: [
        {name: "Rohit Sharma", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/6.png"},
        {name: "Surya Kumar Yadav", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/174.png"},
        {name: "Robin Minz", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3103.png"},
        {name: "Ryan Rickelton", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/743.png"},
        {name: "Shrijith Krishnan", role: "WK-Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3570.png"},
        {name: "Bevon Jacobs", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3567.png"},
        {name: "N. Tilak Varma", role: "Batter", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/993.png"}
      ],
      "All Rounders": [
        {name: "Hardik Pandya", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/54.png"},
        {name: "Naman Dhir", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3107.png"},
        {name: "Will Jacks", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/1941.png"},
        {name: "Mitchell Santner", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/75.png"},
        {name: "Raj Angad Bawa", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/781.png"},
        {name: "Vignesh Puthur", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3566.png"},
        {name: "Corbin Bosch", role: "All-Rounder", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/1041.png"}
      ],
      Bowlers: [
        {name: "Trent Boult", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/66.png"},
        {name: "Karn Sharma", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/98.png"},
        {name: "Deepak Chahar", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/91.png"},
        {name: "Ashwani Kumar", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3569.png"},
        {name: "Reece Topley", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/574.png"},
        {name: "V.Satyanarayana Penmetsa", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/3568.png"},
        {name: "Arjun Tendulkar", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/585.png"},
        {name: "Mujeeb-ur-Rahman", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/134.png"},
        {name: "Jasprit Bumrah", role: "Bowler", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/9.png"}
      ]
    }
  };
  
//   export default IPL;

