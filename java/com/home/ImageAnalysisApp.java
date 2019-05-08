package com.home;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 *
 * @author michaeltorres
 */
public class ImageAnalysisApp {
    // ===================================
    // ===================================
    protected class AnalyzedData {
        protected int numSpots;
        protected Date timestamp;
        
        private AnalyzedData(int numSpots, Date timestamp) {
            this.numSpots = numSpots;
            this.timestamp = timestamp;
        }
    }
    
    // ===================================
    // The class will read and write to 
    // the tables below.
    //
    //   WARNING:
    //     As lots get added, more arrays
    //     will need to be added.
    // ===================================
    private Lock lock;
    private HashMap<String, AnalyzedData> lots;
    
    public ImageAnalysisApp() {
        lots = new HashMap<>();
        lock = new ReentrantLock();
    }
    
    /** ===================================
     * Outputs the list of a given lot.
     * 
     *  Lot [l]: numSpots=[ns] timestamp=[ts]
     *  ===================================
     */
    public void printLots() {
        for (Map.Entry<String, AnalyzedData> entry : lots.entrySet()) {
            String lot = entry.getKey();
            AnalyzedData aD = entry.getValue();
            System.out.println("Lot "+lot+": numSpots="+aD.numSpots+" timestamp="+aD.timestamp);
        }
    }
    
    /** ===================================
     * 
     * @param lot
     *      Used as the choice between what 
     *      table to read from.
     * @return
     * @throws NoSuchElementException 
     *      This will be thrown when there 
     *      are no elements in the lot.
     *  ===================================
     */
    public AnalyzedData read(char lot) throws NoSuchElementException {
        AnalyzedData a = null;
        
        try {   lock.lock();    System.out.println("lock table");
            a = lots.get(String.valueOf(lot));
            if ( a == null ) 
                throw new NoSuchElementException("Could not find key "+lot
                        +" in lot hashmap.");
        } finally {
            lock.unlock();      System.out.println("unlock table");
        }
        return a;
    }
    
    /** ===================================
     * 
     * @param lot
     * @param numSpots
     * @param datetimeString
     * @throws ParseException 
     *  Thrown when the simple-date-formatter 
     *  could not accept being sent 
     *  in to be write.
     *  ===================================
     */
    public void write(char lot, int numSpots, String datetimeString) throws ParseException {
        System.out.println("Performing write.");
        SimpleDateFormat format = new SimpleDateFormat("EEE MMM dd HH:mm:ss yyyy");
        Date timestamp = format.parse(datetimeString);
        
        AnalyzedData d = new AnalyzedData(numSpots, timestamp);
        try {   lock.lock();    System.out.println("lock table");
            lots.put(String.valueOf(lot), d);
        } finally {
            // remember, always release your locks ;)
            lock.unlock();      System.out.println("unlock table");
        }
        System.out.println("Write Success.");
    }
    
}
