package com.adobe.aem.guides.wknd.core.chunks;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;

@Component(
        service = {Servlet.class},
        property = {
                "sling.servlet.resourceTypes=wknd/chunks/js",
                "sling.servlet.methods=GET"
        }
)
public class ChunkScriptTagPrinter extends SlingSafeMethodsServlet {
    
    public static final String SCRIPT_TAG = "<script type=\"text/javascript\" src=\"%s\"></script>";
    
    @Reference
    private AssetManifestService manifestService;
    
    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        final PrintWriter writer = response.getWriter();
    
        try {
            writer.append(printBootStrapJSTag(request));
            writer.append(printMainJSTag(request));
        } catch (LoginException e) {
            throw new ServletException(e);
        }
        
    }
  
    
    private String printBootStrapJSTag(SlingHttpServletRequest request) throws IOException, LoginException {
        return String.format(SCRIPT_TAG, manifestService.getManifest(request).getBootstrap());
    }
    
    private String printMainJSTag(SlingHttpServletRequest request) throws IOException, LoginException {
        return String.format(SCRIPT_TAG, manifestService.getManifest(request).getSiteJS());
    }
    
    
}
