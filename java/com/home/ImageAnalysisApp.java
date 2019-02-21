package com.home;

import java.text.DateFormat;
import java.text.ParseException;
import java.util.Date;
import java.util.Deque;
import java.util.LinkedList;
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
    private class AnalyzedData {
        protected int numSpots;
        protected Date timestamp;
        
        private AnalyzedData(int numSpots, Date timestamp) {
            this.numSpots = numSpots;
            this.timestamp = timestamp;
        }
    }
    // ===================================
    
    private final Lock lock;
    private Deque<AnalyzedData> lotA;
    private Deque<AnalyzedData> lotB;
    private final int MAX = 10;         // The max size of each deque.
    
    public ImageAnalysisApp() {
        lotA = new LinkedList<>();
        lotB = new LinkedList<>();
        lock = new ReentrantLock();
    }
    
    public void printLot(char lot) {
        switch(lot) {
            case 'A':
                for (AnalyzedData aD : lotA) 
                    System.out.println("Lot A: numSpots="+aD.numSpots+" timestamp="+aD.timestamp);
                break;
            case 'B':
                for (AnalyzedData aD : lotA) 
                    System.out.println("Lot B: numSpots="+aD.numSpots+" timestamp="+aD.timestamp);
                break;
        }
    }
    
    public void write(char lot, int numSpots, String datetimeString) throws ParseException {
        System.out.println("Performing write.");
        Date timestamp = DateFormat.getDateTimeInstance().parse(datetimeString);
        AnalyzedData d = new AnalyzedData(numSpots, timestamp);
        switch(lot) {
            case 'A':
                addToLot(lotA, d);
                break;
            case 'B':
                addToLot(lotB, d);
                break;
        }
    }
    /** 
     * may not work due to a potential new list.
     * 
     * @param lot
     * @param d 
     */
    private void addToLot(Deque<AnalyzedData> lot, AnalyzedData d) {
        if (lot.size() < MAX) {
            lot.addFirst(d);
        } else {
            lot.removeLast();
            lot.addFirst(d);
        }
    }
    
    public int read(char lot) {
        AnalyzedData d = null;
        int numSpots;
        try {
            switch (lot) {
                case 'A':
                    d = lotA.getFirst();
                    break;
                case 'B':
                    d = lotB.getFirst();
                    break;
            }
            numSpots = d.numSpots;
        } catch (NoSuchElementException nsee) {
            nsee.printStackTrace();
            numSpots = -1;
        }
        return numSpots;
    }
}
