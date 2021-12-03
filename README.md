# TEAM GUINAN 

## Team Members
#### Kwather, Lakshay and Akash.

## Project Idea
**The idea of team Guinan is to implement an Online voting system so that the voting process could be more streamlined and made hassle-free. The target is that university clubs and student union elections can be conducted online.**

## Project background/Business Opportunity
**There are multiple reasons behind team Guinan's motivation to implement an online voting system:**
- **Ease:** It is easier to organize or manage to vote online than offline because Guess What ?? Machine will do almost everything. Voters just need to cast the votes and counting will be done by the machine.
- **Environment-friendly:** I hope you guys love the earth as team Guinan does!! We hate the use of paper and other things that affect the environment. So go online and save mother earth !!!
- **Online is safer:** Many people chose to vote via email in the federal election as well due to covid. So why not build the system for elections within the university so that everyone stay's safe.
- **Monetary benefits:** Vote and save money !! No, you are not getting paid to vote. But no need to travel now as just sit at home log in with your ID, Password and cast your vote.
- **Better and engaging Experience:** No waiting in queues to vote now. Get a better experience sitting at home. Save your time and invest it somewhere else.


##### We saw the need for our project due to the present situation where people try their best to make the least contact with the people outside. If you can shop and eat online then why not vote ?? Initially we are planning to implement it in one sector of the university, like student club's or unions but later, as the requirement increases, so will the innovation!!!

## Activity V-logs
#### Project idea selection & introduction vlog (Activity 1)- https://www.youtube.comwatchv=WL7dGYpT0xU

#### Project prerequisites/planning(Activity 2) - https://youtu.be/-FFOxKog9ks

#### Project design architecture(Activity 3)- https://youtu.be/4kjJW835Jls

---

# Installation Guide

## 1. Install Required softwares

+ [click to install "git"](https://git-scm.com/downloads)
+ [click to install "WinRAR"](https://www.win-rar.com/download.html?&L=0)
+ [Click to install "VSCode Studio"](https://code.visualstudio.com/download)
+ [Click to install "Node.js"](https://nodejs.org/en/download/)
+ Click to install "MongoDB Community Server"
[Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/) [Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) [MacOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
<br/>

## 2. Two methds to install the web application in your system:

### I. Clone the github repository in your system.
+ Create a new folder in your system with any name.
+ Open the folder and right click in the folder.
+ Select the **git bash here** option from the drop down.
+ Go to the github repository.
+ Click on **Code** at the top left of the github repository present in **green** color.
+ Copy the link of the github repository.
+ Go to the **git terminal** and use the command **git clone https://github.com/akashmarwaha1/ENSE-374--GROUP-PROJECT-TEAM-GUINAN.git**.
+ Open the folder in VSCode Studio and follow **Steps 3 & 4**.

### II. Download the zip file.
+ Click on the **Code** present in green color in the github repository.
+ Click on **Download ZIP** option from the dropdown.
+ Go to the downloaded zip file and extract the contents using a zip file extractor like **WinRAR**.
+ Open the folder in VSCode Studio and follow **Step 3 & 4**.
<br/>

---

## 3. Run MongoDB in your system.
+ Open two Windows PowerShell terminals as Admin and type the following commands in them.
```powershell
mongod
```
```powershell
mongo
```
#### Note for Windows:
#### If the above commands do not work, follow the steps below:
##### 1. **Make an Alias file:**  
Open powershell and open your powershell profile:
```powershell
notepad $profile
```
If you get an error that the path doesn’t exist, then you can create it with:
```powershell
New-item -Path $profile -ItemType File -Force
```
Then attempt to open the file again.
Now paste in:
```powershell
Set-Alias mongod "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe"
Set-Alias mongo "C:\Program Files\MongoDB\Server\5.0\bin\mongo.exe"
```
**Change the path of mongod and mongo if installed someplace other than C:/ drive** 
<br/>
Save, close, and restart powershell.
<br/>

**If you get text warning that you can’t run scripts, you will need to:**

Open a powershell as an administrator
Run the following:
```powershell
Set-ExecutionPolicy Unrestricted
```
Restart all powershell instances

---
##### 2. **Create a data directory**

create the folders:
```
c:/data
```
and
```
c:/data/db
```
This is where your databases will be stored.

Check it is working with:
```powershell
mongo --version
```
---

## 4. Open Vscode command line.
Install all the dependencies using given command:
```powershell
npm install express ejs mongoose passport passport-local passport-local-mongoose express-session dotenv
``` 
---

## 5. Running the web application:
### Two methods for running the webapp.
#### 1. Run the webpage using nodejs command:
```powershell
node app.js
```
Open the below link in your web browser:
```powershell
localhost:4000
```
<br/>

#### 2. Using nodemon.
##### Install nodemon using the command:
```powershell
npm i -g nodemon
```
#### After installing nodemon use the command:
```powershell
nodemon
```
Open the below link in your web browser:
```powershell
localhost:4000
```
(-g is used to install nodemon globally into the system)
<br/>

---
---

# User Guide

## To Register in the webapp, read the following instructions:
+ The username should be 6 letters including 3-alphabets and 3-numbers (eg. ame000)
+ The id number should be 9 digits (all numbers).
+ Use Uregina$%&2021 as the authentication token.

## To login
+ Enter the complete username. (eg. ame000@uregina.ca)
+ Passwords in both the fields should match.