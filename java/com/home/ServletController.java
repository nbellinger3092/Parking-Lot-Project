package com.home;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Stream;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author michaeltorres
 */
public class ServletController extends HttpServlet {
    ImageAnalysisApp imageApp = new ImageAnalysisApp();
    
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        char lot;
        int numCars;
        String timestamp;
        ImageAnalysisApp.AnalyzedData row;
        // Ionic request configurations.
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
        PrintWriter out = response.getWriter();     // Get ready to write.
        String sLot = request.getParameter("lot");  // Get the lot request.
        lot = sLot.charAt(0);
        System.out.println("got a get request for lot "+lot);
        try {
            row = imageApp.read(lot);
            numCars = row.numSpots;
            timestamp = row.timestamp.toString();
            out.println("numCars="+numCars);
            out.println("timestamp="+timestamp);
            imageApp.printLots();
            /* End */
        } catch(NoSuchElementException nsee) {
            nsee.printStackTrace();
            out.println("ERROR=No element exists in "+lot);
            /* End */
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String sLot;        char lot;
        String sNumCars;    int numCars;
        String timestamp;
        
        BufferedReader in = request.getReader();    // Get ready to read.
        Stream<String> lines = in.lines();          // Get all the data lines.
        Iterator iterator = lines.iterator();
        System.out.println("================================================\n");
        sLot = (String)iterator.next();             // Read the lot.
        sNumCars = (String)iterator.next();         // Read the num. of cars.
        timestamp = (String)iterator.next();        // Read the timestamp.
        System.out.println("sLot="+sLot+"\nsNumCars="+sNumCars+"\ntimestamp="+timestamp);
        lot = sLot.charAt(0);
        numCars = Integer.parseInt(sNumCars.substring(sNumCars.indexOf('[')+1, sNumCars.indexOf('.')));
        System.out.println("got a post request::"+lot+':'+numCars+':'+timestamp);
        try {
            System.out.println("ready to write::"+lot+':'+numCars+':'+timestamp);
            // Add the row to the table in memory.
            imageApp.write(lot, numCars, timestamp);
        } catch (ParseException ex) {
            System.err.println(ex.getMessage());
            Logger.getLogger(ServletController.class.getName()).log(Level.SEVERE, null, ex);
        }
        // Let's see the changes.
        imageApp.printLots();
        System.out.println("end");
    }
    
    // ===================================
    //          Unit Tests
    // ===================================
    public static void main(String args[]) {
        ImageAnalysisApp iApp = new ImageAnalysisApp();
        try {
            iApp.write('A', 5, "Thu Feb 28 15:44:29 2019");
        } catch (ParseException pe) {
           pe.printStackTrace();
        }
    }
}
