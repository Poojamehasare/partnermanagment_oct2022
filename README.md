# Get the project base code from github by clone the below repo
# Use VS code or git command 
git clone https://github.com/ShareAndShine/partnermanagment_oct2022.git

# Import Partner Type 

# Bash Command
sfdx force:data:tree:import -p scripts/data/Partner_Type__c-plan.json -u <ReplaceWithOrgAliasName>
# windows command or powershell
sfdx force:data:tree:import -p scripts\data\Partner_Type__c-plan.json -u <ReplaceWithOrgAliasName>

# Import Partner Account & Contacts

# Bash Command
sfdx force:data:tree:import -p scripts/data/Account-Contact-plan.json -u <ReplaceWithOrgAliasName>

# windows command or powershell
sfdx force:data:tree:import -p scripts\data\Account-Contact-plan.json -u <ReplaceWithOrgAliasName>

# Run Data fix method from Developer console









## Further Reading
- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
