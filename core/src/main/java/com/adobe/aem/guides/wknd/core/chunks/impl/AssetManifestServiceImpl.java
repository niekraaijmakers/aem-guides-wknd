package com.adobe.aem.guides.wknd.core.chunks.impl;

import com.adobe.aem.guides.wknd.core.chunks.AssetManifestService;
import com.adobe.aem.guides.wknd.core.chunks.ChunkCssTagPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.tika.io.IOUtils;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import java.io.IOException;
import java.io.InputStream;


@Component(service = AssetManifestService.class)
public class AssetManifestServiceImpl implements AssetManifestService {
    
    private static final String PATH_TO_ASSET_MANIFEST = "/etc/wknd/clientlibs/clientlib-site/asset-manifest.json";
    
    @Reference
    private ResourceResolverFactory factory;
    
    @Override
    public Manifest getManifest(SlingHttpServletRequest request) throws IOException, LoginException {
    
        try(ResourceResolver rr = factory.getAdministrativeResourceResolver(null)){
            Resource assetManifestResource = rr.getResource(PATH_TO_ASSET_MANIFEST);
    
            if(assetManifestResource != null){
                InputStream file = assetManifestResource.adaptTo(InputStream.class);
                String fileString = IOUtils.toString(file);
                ObjectMapper objectMapper = new ObjectMapper();
                return objectMapper.readValue(fileString, Manifest.class);
            }else{
                throw new IOException("Could not load manifest file!");
            }
        }
        
        
    }
    
    
    
}
