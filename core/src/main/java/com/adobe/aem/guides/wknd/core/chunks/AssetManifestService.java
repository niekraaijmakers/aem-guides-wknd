package com.adobe.aem.guides.wknd.core.chunks;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;

import java.io.IOException;

public interface AssetManifestService {
    
    Manifest getManifest(SlingHttpServletRequest request) throws IOException, LoginException;
    
    @JsonIgnoreProperties(ignoreUnknown = true)
    class Manifest {
        
        @JsonProperty("site.js")
        private String siteJS;
    
        @JsonProperty("site.css")
        private String siteCss;
        
        @JsonProperty("bootstrap.js")
        private String bootstrap;
    
        public String getSiteJS() {
            return siteJS;
        }
    
        public String getSiteCss() {
            return siteCss;
        }
    
        public String getBootstrap() {
            return bootstrap;
        }
    }
}
