from pydantic import BaseModel, Field
from typing import List, Optional


class LoanInput(BaseModel):
    loanAmount: Optional[float]
    interestRate: Optional[float]
    termYears: Optional[int]


from typing import Optional

class AssetInput(BaseModel):
    assetId: str
    address: Optional[str]
    gps: Optional[List[float]]
    squareFootage: Optional[int]
    bedrooms: Optional[int]
    bathrooms: Optional[float]
    rent: Optional[float]
    expenses: Optional[float]
    images: List[str]
    loan: Optional[LoanInput]



class LoanRecommendation(BaseModel):
    ltv: float
    suggestedLoanAmount: float
    downPaymentOptions: List[dict]


class ValuationData(BaseModel):
    fmv: float
    confidence: float
    sources: List[str]


class InvestmentMetrics(BaseModel):
    capRate: float
    roi: float
    depreciationAnnual: float


class LoanOutput(BaseModel):
    loanAmount: float
    monthlyPayment: float
    totalInterest: float
    recommendation: Optional[LoanRecommendation]


class ValuationResponse(BaseModel):
    assetId: str
    assetType: str = "residential_real_estate"
    valuation: ValuationData
    investmentMetrics: Optional[InvestmentMetrics]
    loan: Optional[LoanOutput]
    detectedFeatures: Optional[List[str]]
    pdfReportUrl: Optional[str]
