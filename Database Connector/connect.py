## Jennifer Sullivan
import mysql.connector
from mysql.connector import Error, MySQLConnection
from datetime import datetime
import time


#function to post data to the database
def postDatabase(cars):

    #connect to mysql database, host=ip addresses of databse
    connection = mysql.connector.connect(host='192.81.218.39', database='parkingLot', user='backend', password='1234!')
    print(connection)

    #getting the current data
    date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print("Date",str(date))
    cars = 53       #number of cars

    #connect to database
    try:
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MYSQL databse, MYSQL server version on", db_Info)

            cursor = connection.cursor()
            cursor.execute("select database();")
            record = cursor.fetchone()
            print("Your connected to - ", record)

            #insert values into database
            query = "INSERT INTO t1 (cars) VALUES (%d)"
            args = (int(21))
            #execute the command to insert into database
            cursor.execute(("INSERT INTO trafficTracking (timeStamp, cars) VALUES (\""+str(date)+"\","+str(cars)+")"))
            if cursor.lastrowid:
                print('last insert id', cursor.lastrowid)
            else:
                print('last insert id not found')
            connection.commit()

    #throw an error if unable to connect
    except Error as e:
        print("Error while connecting to MYSQL", e)

    #close the connection
    finally:
        if(connection.is_connected()):
            cursor.close()
            connection.close
            print("MYSQL connection is closed")


