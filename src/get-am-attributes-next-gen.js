/**
 * Node outcomes
 */
var nodeOutcomes = {
    NEXT: "next",
    ERROR: "error"
};

/**
 * Node entry point
 */

(function() {
    logger.debug("Node starting");
    var attributes = [
        // AM core
        'uid',
        'userPassword',
        'givenName',
        'sn',
        'mail',
        'cn',
        'telephoneNumber',
        'memberof',
        'isMemberOf',
        'postalCode',
        'st',
        'street',
        'displayName',
        'description',
        'co',
        'l',
        // AM devices
        'webauthnDeviceProfiles',
        'pushDeviceProfiles',
        'oathDeviceProfiles',
        'deviceProfiles',
        'devicePrintProfiles',
        'oath2faEnabled',
        'push2faEnabled',
        'assignedDashboard',
        'labeledURI',
        // KBA
        'kbaInfo',
        'kbaActiveIndex',
        'kbaInfoAttempts',
        'memberof',
        'inetUserHttpURL',
        'preferredLocale',
        'preferredTimeZone',
        'iplanet-am-managed-person',
        'iplanet-am-user-service',
        'iplanet-am-user-success-url',
        'iplanet-am-user-failure-url',
        'iplanet-am-user-password-reset-options',
        'iplanet-am-user-password-reset-question-answer',
        'iplanet-am-user-password-reset-force-reset',
        'iplanet-am-user-auth-modules',
        'iplanet-am-user-admin-start-dn',
        'iplanet-am-user-service-status',
        'iplanet-am-user-login-status',
        'iplanet-am-user-account-life',
        'iplanet-am-user-auth-config',
        'iplanet-am-user-alias-list',
        'iplanet-am-auth-configuration',
        'iplanet-am-auth-configuration-service',
        'iplanet-am-auth-login-success-url',
        'iplanet-am-auth-login-failure-url',
        'iplanet-am-auth-post-login-process-class',
        'sunIdentityMSISDNNumber',
        // SAML2
        'sun-fm-saml2-nameid-infokey',
        'sun-fm-saml2-nameid-info',
        'sunFMSAML2NameIdentifier',
        'lastEmailSent',
        // Session Settings
        'iplanet-am-session-service',
        'iplanet-am-session-max-caching-time',
        'iplanet-am-session-max-idle-time',
        'iplanet-am-session-max-session-time',
        'iplanet-am-session-quota-limit',
        'iplanet-am-session-service-status',
        'iplanet-am-session-max-session-time',
        'iplanet-am-session-max-idle-time',
        'iplanet-am-session-max-caching-time',
        'iplanet-am-session-quota-limit',
        'iplanet-am-session-get-valid-sessions',
        'iplanet-am-session-destroy-sessions',
        // Account lockout
        'inetUserStatus',
        'sunAMAuthAccountLockout',
        'inetuser',
        'retryLimitNodeCount',
        'sunAMAuthInvalidAttemptsData',
        'iPlanetPreferences',
        // IDM Attributes
        'fr-idm-recon-id',
        'fr-idm-recon-targetIds',
        'fr-idm-condition',
        'fr-idm-name',
        'fr-idm-privilege',
        'fr-idm-temporal-constraints',
        'fr-idm-password',
        'fr-idm-link-firstId',
        'fr-idm-link-qualifier',
        'fr-idm-link-type',
        'fr-idm-link-secondId',
        'fr-idm-lock-nodeid',
        'fr-idm-reconassoc-reconid',
        'fr-idm-reconassoc-finishtime',
        'fr-idm-reconassoc-isanalysis',
        'fr-idm-reconassoc-mapping',
        'fr-idm-reconassoc-sourceresourcecollection',
        'fr-idm-reconassoc-targetresourcecollection',
        'fr-idm-reconassocentry-action',
        'fr-idm-reconassocentry-ambiguoustargetobjectids',
        'fr-idm-reconassocentry-exception',
        'fr-idm-reconassoc-isanalysis',
        'fr-idm-reconassocentry-linkqualifier',
        'fr-idm-reconassoc-mapping',
        'fr-idm-reconassocentry-message',
        'fr-idm-reconassocentry-messagedetail',
        'fr-idm-reconassocentry-phase',
        'fr-idm-reconassocentry-reconid',
        'fr-idm-reconassocentry-situation',
        'fr-idm-reconassocentry-sourceObjectId',
        'fr-idm-reconassoc-sourceresourcecollection',
        'fr-idm-reconassocentry-status',
        'fr-idm-reconassocentry-targetObjectId',
        'fr-idm-reconassoc-targetresourcecollection',
        'fr-idm-syncqueue-context',
        'fr-idm-syncqueue-createdate',
        'fr-idm-syncqueue-mapping',
        'fr-idm-syncqueue-newobject',
        'fr-idm-syncqueue-nodeid',
        'fr-idm-syncqueue-objectRev',
        'fr-idm-syncqueue-oldobject',
        'fr-idm-syncqueue-remainingretries',
        'fr-idm-syncqueue-resourcecollection',
        'fr-idm-syncqueue-resourceid',
        'fr-idm-syncqueue-state',
        'fr-idm-syncqueue-syncaction',
        'fr-attr-description',
        'fr-attr-scope',
        'fr-attr-jwks',
        'fr-idm-managed-user-meta',
        'fr-attr-group',
        'fr-idm-inviteDate',
        'fr-idm-jurisdiction',
        'fr-idm-onboardDate',
        'fr-idm-inviteDate',
        'fr-idm-jurisdiction',
        'fr-idm-onboardDate',
        'fr-attr-istr1',
        'fr-attr-istr2',
        'fr-attr-istr3',
        'fr-attr-istr4',
        'fr-attr-istr5',
        'fr-attr-str1',
        'fr-attr-str2',
        'fr-attr-str3',
        'fr-attr-str4',
        'fr-attr-str5',
        'fr-attr-imulti1',
        'fr-attr-imulti2',
        'fr-attr-imulti3',
        'fr-attr-imulti4',
        'fr-attr-imulti5',
        'fr-attr-multi1',
        'fr-attr-multi2',
        'fr-attr-multi3',
        'fr-attr-multi4',
        'fr-attr-multi5',
        'fr-attr-idate1',
        'fr-attr-idate2',
        'fr-attr-idate3',
        'fr-attr-idate4',
        'fr-attr-idate5',
        'fr-attr-date1',
        'fr-attr-date2',
        'fr-attr-date3',
        'fr-attr-date4',
        'fr-attr-date5',
        'fr-attr-iint1',
        'fr-attr-iint2',
        'fr-attr-iint3',
        'fr-attr-iint4',
        'fr-attr-iint5',
        'fr-attr-int1',
        'fr-attr-int2',
        'fr-attr-int3',
        'fr-attr-int4',
        'fr-attr-int5',
        'fr-idm-uuid',
        'fr-idm-managed-user-roles',
        'fr-idm-managed-user-manager',
        'fr-idm-managed-user-meta',
        'fr-idm-managed-user-notifications',
        'fr-idm-managed-user-authzroles-internal-role',
        'fr-idm-managed-organization-owner',
        'fr-idm-managed-organization-admin',
        'fr-idm-managed-organization-member',
        'fr-idm-managed-user-memberoforgid',
        'fr-idm-effectiveRole',
        'fr-idm-effectiveAssignment'
    ];
    try {
        logger.debug("The uid is: " + nodeState.get("_id"));
        var identity = idRepository.getIdentity(nodeState.get("_id"));
      	logger.debug("The identity value is: " + identity);
        if (callbacks.isEmpty()) {
            attributes.forEach(
                function(attribute) {
                    var value = identity.getAttributeValues(attribute);
                    logger.debug("The attribute value is: " + value);
                    if (!value.isEmpty()) {
                        if (value.toArray().length > 0) {
                            value.toArray().forEach(function(arrayValue) {
                                logger.debug("The multi-valued attribute " + attribute + " value is: " + arrayValue);
                                callbacksBuilder.stringAttributeInputCallback(attribute, "IdRepository.".concat(attribute), arrayValue, false);
                            });
                        } else {
                            logger.debug("The attribute " + attribute + " value is: " + value.iterator().next());
                            callbacksBuilder.stringAttributeInputCallback(attribute, "IdRepository.".concat(attribute), value.iterator().next(), false);
                        }
                    }
                }
            );

        } else {
            action.goTo(nodeOutcomes.NEXT);
        }
    } catch (e) {
        logger.debug("Encountered an exception: " + e);
        action.goTo(nodeOutcomes.ERROR).withErrorMessage("Something went wrong!");
        return;
    }
}());