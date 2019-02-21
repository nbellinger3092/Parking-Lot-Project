package com.home;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.text.ParseException;
import java.util.Iterator;
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
    ImageAnalysisApp imageApp;
    UserInterfaceApp userApp;
    
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
        PrintWriter out = response.getWriter();
        out.println("<html>");
            out.println("<body>");
                out.println("<h1>http get test</h1>");
            out.println("</body>");
        out.println("</html>");
        System.out.println("got a get request");
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
        PrintWriter out = response.getWriter();
        out.println("<html>");
            out.println("<body>");
                out.println("<h1>http post test</h1>");
            out.println("</body>");
        out.println("</html>");
        BufferedReader in = request.getReader();
        Stream<String> lines = in.lines();
        for (Iterator iterator = lines.iterator(); iterator.hasNext();) {
            String next = (String)iterator.next();
            System.out.println(next);
        }
        System.out.println("got a post request");
    }
    
    // ===================================
    //          Unit Tests
    // ===================================
    public static void main(String args[]) {
        ImageAnalysisApp iApp = new ImageAnalysisApp();
        try {
            iApp.write('A', 5, "02/14/2019");
        } catch (ParseException pe) {
           pe.printStackTrace();
        }
    }
}
