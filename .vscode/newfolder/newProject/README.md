# 1 - Base project setup
# Get the project base code from github by clone the below repo
# Use VS code or git command OR Use unmanaged package 
git clone https://github.com/ShareAndShine/partnermanagment_oct2022.git

#  Unmanaged package
https://login.salesforce.com/packaging/installPackage.apexp?p0=04t5g000000qDnIAAU


# 2 - Code deployment
# Deploy base code to your connected org
# Use SFDX command or VS code command palatte to deploy base code to the org
sfdx force:source:deploy -u <ReplaceWothOrgAliasName>
OR 
sfdx force:source:deploy -p force-app -u PRMOrg

# 3 - Assign Permission set & Load sample Data
# Use SFDX command
sfdx force:user:permset:assign -n Partner_Management_App


# Import Partner Type 

# 3.1 Bash Command
sfdx force:data:tree:import -p scripts/data/Partner_Type__c-plan.json -u <ReplaceWithOrgAliasName>
# windows command or powershell
sfdx force:data:tree:import -p scripts\data\Partner_Type__c-plan.json -u <ReplaceWithOrgAliasName>

# 3.2 Import Partner Account & Contacts

# Bash Command
sfdx force:data:tree:import -p scripts/data/Account-Contact-plan.json -u <ReplaceWithOrgAliasName>

# windows command or powershell
sfdx force:data:tree:import -p scripts\data\Account-Contact-plan.json -u <ReplaceWithOrgAliasName>


# 3.3 Fix missing data manually
#   3.1.1 Use Developer console and Run UpdatePartnerType method from DataFix class
    DataFix.UpdatePartnerType();

#   3.2.1 Go to Account list view -> Partner Accounts -> Manually update Primary contact POC for each account -> Save


## Further Reading
- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)

## For distribution
# create Package
sfdx force:package:create --name PartnerManagement --description "PRM Package" --packagetype Unlocked --path force-app --nonamespace --targetdevhubusername PRMOrg

# create Package Version
sfdx force:package:version:create -p PartnerManagement -d force-app -k test1234 --wait 10 -v PRMOrg

https://login.salesforce.com/packaging/installPackage.apexp?p0=04t5g000000qDnIAAU

# install using above URL or command
sfdx force:package:install --wait 10 --publishwait 10 --package PartnerManagement@1.0.0-1 -k test1234 -r -u <ReplaceWithOrgName> 




