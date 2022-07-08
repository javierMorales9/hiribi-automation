import sys

transactionsPerDay = 2
initialCapital = 100
initialDesiredEarning = 500 
desiredEarningGrowthMonthOverMonth = 0.05
monthLength = 30

coinbaseFee = 0.006
hiribiInterest = 0.16
paypalFee = 0.029
paypalFixPrice = 0.3
paypalFeeFromDollarToEur = 0.04
paypalFeeForSendingToBank = 0.00

internalMultiplicator = (1-coinbaseFee)*(1+hiribiInterest)*(1-paypalFee) #1.1196018399999998
externalMultiplicator = (1-paypalFeeFromDollarToEur)*(1-paypalFeeForSendingToBank) #0.06

def calculateInversionInADay(day, month):
    return (calculatedEarningInADay(day, month) \
        + transactionsPerDay*paypalFixPrice*externalMultiplicator) \
        /(transactionsPerDay*(internalMultiplicator*externalMultiplicator - 1))

#---- Fixed calculations of earnings. Here is where the optmization can be done.
def calculatedEarningInADay(day, month):
    desiredEarning = calculateEarningInAMonht(month)
    return desiredEarning/30


def calculateEarningInAMonht(month):
    return initialDesiredEarning*(1+desiredEarningGrowthMonthOverMonth)**(month-1)


#---- Calculation of Earnings given the Inversion by using the formula.
def calculatePostTransactionEarning(singleTransactionInversion):
    return (singleTransactionInversion*internalMultiplicator - paypalFixPrice)*externalMultiplicator

def calculateEarningInADayByFormula(day, month):
    inversionThisDay = calculateInversionInADay(day, month)

    return transactionsPerDay * calculatePostTransactionEarning(inversionThisDay) \
        - transactionsPerDay * inversionThisDay

def calculateEarningInAMonthByFormula(month):

    calculatedEarning = 0
    for day in range(1, monthLength + 1):
        calculatedEarning += calculateEarningInADayByFormula(day, month)
    
    return calculatedEarning

#--- Calculate the accumulated capital
def calculateAccumulatedCapitalInaDay(day, month):
    currentCapital = initialCapital
    for i in range(1, month):
        for j in range(1, monthLength + 1):
            currentCapital += calculatedEarningInADay(j, i)
    
    for i in range(1, day):
        currentCapital += calculatedEarningInADay(i, month)
    
    return str(currentCapital)


#----------------------------------------------------------------------------------------------
day = int(sys.argv[1]) #If not 0 < day <= 30 throw error.
month = int(sys.argv[2]) #Should be a number so that month > 0
print("We are in the day " + str(day) + " of month " + str(month))

print("This month we want to earn " + str(calculateEarningInAMonht(month)))
print("The earnings of this day is " + str(calculateEarningInADayByFormula(day, month)))
print("The inversion this day is " + str(calculateInversionInADay(day, month)))

print("\nJúzguese que si la total inversion es mayor que el capital invertido la operación \
no se podrá realizar de forma efectiva")
print("The total Inversion in this day is " +\
    str(calculateInversionInADay(day, month)*transactionsPerDay) )
print("The accumulated capital up to this point is " \
    + str(calculateAccumulatedCapitalInaDay(day, month)))
