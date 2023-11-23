/**
 * Node config
 */
var nodeConfig = {
    nodeName: "****get-all-am-attributes"
};

/**
 * Node imports
 */

var javaImports = JavaImporter(
    org.forgerock.openam.auth.node.api.Action,
    org.forgerock.openam.authentication.callbacks.StringAttributeInputCallback
);
/**
 * Node outcomes
 */
var nodeOutcomes = {
    NEXT: "next",
    ERROR: "error"
};
/**
 * Logging function which injects the node name into the logging output
 * @type {Function}
 */
var nodeLogger = {
    debug: function(message) {
        logger.message(nodeConfig.nodeName + ": " + message);
    },
    warning: function(message) {
        logger.warning(nodeConfig.nodeName + ": " + message);
    },
    error: function(message) {
        logger.error(nodeConfig.nodeName + ": " + message);
    },
};

/**
 * Node entry point
 */

(function() {
    nodeLogger.debug("Node starting");
    var callbacksToSend = [];
    var attributes = [
        'webauthnDeviceProfiles',
        'pushDeviceProfiles',
        'oathDeviceProfiles',
        'deviceProfiles',
        'devicePrintProfiles',
        'assignedDashboard',
        'kbaInfo',
        'kbaActiveIndex',
        'kbaInfoAttempts',
        'memberof',
        'inetUserStatus',
        'oath2faEnabled',
        'push2faEnabled',
		'uid',
      	'sn',
      	'mail',
      	'telephoneNumber'
    ];
    try {
        // username must be the _id
        var username = nodeState.get("_id").asString();
        nodeLogger.debug("The uid is: " + username);
        attributes.forEach(
            function(attribute) {
                  var value = idRepository.getAttribute(username, attribute);
                  if (value.iterator().hasNext()) {
                        if (value.toArray().length > 1) {
        					value.toArray().forEach(function(arrayValue) {
                              	nodeLogger.debug("The multi-valued attribute " + attribute + " value is: " + arrayValue);
                              	callbacksToSend.push(javaImports.StringAttributeInputCallback(attribute, "IdRepository.".concat(attribute), arrayValue, false));
        					});
    					} else {
                  			nodeLogger.debug("The attribute " + attribute + " value is: " + value.iterator().next());
                  			callbacksToSend.push(javaImports.StringAttributeInputCallback(attribute, "IdRepository.".concat(attribute), value.iterator().next(), false));
                        }
               	 }
            }
        );
        if (callbacks.isEmpty()) {
            action = javaImports.Action.send.apply(
                null,
                callbacksToSend
            ).build()
        } else {
            action = javaImports.Action.goTo(nodeOutcomes.NEXT).build()
        }
    } catch (e) {
        nodeLogger.debug("Encountered an exception: " + e);
        action = javaImports.Action.goTo(nodeOutcomes.ERROR).withErrorMessage("Something went wrong!").build();
        return;
    }
}());