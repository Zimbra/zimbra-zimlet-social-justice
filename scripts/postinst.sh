#!/bin/bash
echo "*** Configuring Zimbra-Zimlet-Autocomplete ***"
echo "*** Checking if Zimbra-Zimlet-Autocomplete  zimlet is installed. ***"
su - zimbra -c "zmmailboxdctl status"
if [ $? -ne 0 ]; then
   echo "*** Mailbox is not running... ***"
   echo "*** Follow the steps below as zimbra user ignore if installing through install.sh .. ***"
   echo "*** Install the Zimbra-Zimlet-Autocomplete  zimlet. ***"
   echo "*** zmzimletctl deploy /opt/zimbra/zimlets-network/zimbra-zimlet-autocomplete.zip ***"
   echo "*** zmprov fc zimlet ***"
else
   echo "*** Deploying Zimbra-Voice-Message  zimlet ***"
   su - zimbra -c  "zmzimletctl deploy /opt/zimbra/zimlets-network/zimbra-zimlet-autocomplete.zip"
   su - zimbra -c  "zmprov fc zimlet"
fi
echo "*** Zimbra-Zimlet-Autocomplete  Installation Completed. ***"
echo "*** Restart the mailbox service as zimbra user. Run ***"
echo "*** su - zimbra ***"
echo "*** zmmailboxdctl restart ***"
