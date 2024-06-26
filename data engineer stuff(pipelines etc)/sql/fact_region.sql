create table "staging".indicators_region (like public.indicators including all);

create table "staging".fact_region_stat (like public.indicators including all);

INSERT INTO "staging".indicators_region
SELECT * FROM public.indicators
WHERE country_code IN (
'AFE',
'AFW',
'ARB',
'CEB',
'CSS',
'EAP',
'EAR',
'EAS',
'ECA',
'ECS',
'EMU',
'EUU',
'FCS',
'HIC',
'HPC',
'IBD',
'IBT',
'IDA',
'IDB',
'IDX',
'LAC',
'LCN',
'LDC',
'LIC',
'LMC',
'LMY',
'LTE',
'MEA',
'MIC',
'MNA',
'NAC',
'OED',
'OSS',
'PRE',
'PSS',
'PST',
'SAS',
'SSA',
'SSF',
'SST',
'TEA',
'TEC',
'TLA',
'TMN',
'TSA',
'TSS',
'UMC',
'WLD'
);

INSERT "staging".fact_region_stat
SELECT * FROM "staging".indicators_region
WHERE indicator_code IN (
'BG.GSR.NFSV.GD.ZS',
'BM.GSR.CMCP.ZS',
'BM.GSR.GNFS.CD',
'BM.GSR.INSF.ZS',
'BM.GSR.MRCH.CD',
'BM.GSR.NFSV.CD',
'BM.GSR.TOTL.CD',
'BM.GSR.TRAN.ZS',
'BM.GSR.TRVL.ZS',
'BN.CAB.XOKA.CD',
'BN.CAB.XOKA.GD.ZS',
'BN.GSR.GNFS.CD',
'BN.GSR.MRCH.CD',
'BX.GSR.CCIS.CD',
'BX.GSR.CCIS.ZS',
'BX.GSR.CMCP.ZS',
'BX.GSR.GNFS.CD',
'BX.GSR.INSF.ZS',
'BX.GSR.MRCH.CD',
'BX.GSR.NFSV.CD',
'BX.GSR.TOTL.CD',
'BX.GSR.TRAN.ZS',
'BX.GSR.TRVL.ZS',
'DT.DOD.DSTC.XP.ZS',
'DT.DOD.PVLX.EX.ZS',
'DT.NFL.BLAT.CD',
'DT.NFL.FAOG.CD',
'DT.NFL.IAEA.CD',
'DT.NFL.IFAD.CD',
'DT.NFL.ILOG.CD',
'DT.NFL.OFFT.CD',
'DT.NFL.PROP.CD',
'DT.NFL.PRVT.CD',
'DT.NFL.UNAI.CD',
'DT.NFL.UNCF.CD',
'DT.NFL.UNCR.CD',
'DT.NFL.UNDP.CD',
'DT.NFL.UNEC.CD',
'DT.NFL.UNEP.CD',
'DT.NFL.UNFP.CD',
'DT.NFL.UNID.CD',
'DT.NFL.UNPB.CD',
'DT.NFL.UNRW.CD',
'DT.NFL.UNTA.CD',
'DT.NFL.UNWT.CD',
'DT.NFL.WFPG.CD',
'DT.NFL.WHOL.CD',
'DT.ODA.ODAT.MP.ZS',
'DT.TDS.DECT.EX.ZS',
'DT.TDS.DPPF.XP.ZS',
'DT.TDS.DPPG.XP.ZS',
'EG.IMP.CONS.ZS',
'EG.USE.COMM.GD.PP.KD',
'EG.USE.PCAP.KG.OE',
'FI.RES.TOTL.MO',
'FP.WPI.TOTL',
'GC.TAX.EXPT.CN',
'GC.TAX.EXPT.ZS',
'GC.TAX.IMPT.CN',
'GC.TAX.IMPT.ZS',
'GC.TAX.INTT.CN',
'GC.TAX.INTT.RV.ZS',
'IC.CUS.DURS.EX',
'IC.EXP.CSBC.CD',
'IC.EXP.CSDC.CD',
'IC.EXP.TMBC',
'IC.EXP.TMDC',
'IC.IMP.CSBC.CD',
'IC.IMP.CSDC.CD',
'IC.IMP.TMBC',
'IC.IMP.TMDC',
'LP.EXP.DURS.MD',
'LP.IMP.DURS.MD',
'LP.LPI.CUST.XQ',
'LP.LPI.INFR.XQ',
'LP.LPI.ITRN.XQ',
'LP.LPI.LOGS.XQ',
'LP.LPI.OVRL.XQ',
'LP.LPI.TIME.XQ',
'LP.LPI.TRAC.XQ',
'MS.MIL.MPRT.KD',
'MS.MIL.XPRT.KD',
'NE.EXP.GNFS.CD',
'NE.EXP.GNFS.CN',
'NE.EXP.GNFS.KD',
'NE.EXP.GNFS.KD.ZG',
'NE.EXP.GNFS.KN',
'NE.EXP.GNFS.ZS',
'NE.IMP.GNFS.CD',
'NE.IMP.GNFS.CN',
'NE.IMP.GNFS.KD',
'NE.IMP.GNFS.KD.ZG',
'NE.IMP.GNFS.KN',
'NE.IMP.GNFS.ZS',
'NE.RSB.GNFS.CD',
'NE.RSB.GNFS.CN',
'NE.RSB.GNFS.KN',
'NE.RSB.GNFS.ZS',
'NE.TRD.GNFS.ZS',
'NV.SRV.TOTL.CD',
'NV.SRV.TOTL.CN',
'NV.SRV.TOTL.KD',
'NV.SRV.TOTL.KD.ZG',
'NV.SRV.TOTL.KN',
'NV.SRV.TOTL.ZS',
'NY.EXP.CAPM.KN',
'NY.TTF.GNFS.KN',
'ST.INT.RCPT.CD',
'ST.INT.RCPT.XP.ZS',
'ST.INT.TVLR.CD',
'ST.INT.TVLX.CD',
'ST.INT.XPND.CD',
'ST.INT.XPND.MP.ZS',
'TG.VAL.TOTL.GD.ZS',
'TM.QTY.MRCH.XD.WD',
'TM.TAX.MANF.WM.AR.ZS',
'TM.TAX.MANF.WM.FN.ZS',
'TM.TAX.MRCH.WM.AR.ZS',
'TM.TAX.MRCH.WM.FN.ZS',
'TM.TAX.TCOM.WM.AR.ZS',
'TM.TAX.TCOM.WM.FN.ZS',
'TM.UVI.MRCH.XD.WD',
'TM.VAL.AGRI.ZS.UN',
'TM.VAL.FOOD.ZS.UN',
'TM.VAL.FUEL.ZS.UN',
'TM.VAL.ICTG.ZS.UN',
'TM.VAL.INSF.ZS.WT',
'TM.VAL.MANF.ZS.UN',
'TM.VAL.MMTL.ZS.UN',
'TM.VAL.MRCH.AL.ZS',
'TM.VAL.MRCH.CD.WT',
'TM.VAL.MRCH.HI.ZS',
'TM.VAL.MRCH.OR.ZS',
'TM.VAL.MRCH.R1.ZS',
'TM.VAL.MRCH.R2.ZS',
'TM.VAL.MRCH.R3.ZS',
'TM.VAL.MRCH.R4.ZS',
'TM.VAL.MRCH.R5.ZS',
'TM.VAL.MRCH.R6.ZS',
'TM.VAL.MRCH.RS.ZS',
'TM.VAL.MRCH.WL.CD',
'TM.VAL.MRCH.WR.ZS',
'TM.VAL.MRCH.XD.WD',
'TM.VAL.OTHR.ZS.WT',
'TM.VAL.SERV.CD.WT',
'TM.VAL.TRAN.ZS.WT',
'TM.VAL.TRVL.ZS.WT',
'TT.PRI.MRCH.XD.WD',
'TX.MNF.TECH.ZS.UN',
'TX.QTY.MRCH.XD.WD',
'TX.UVI.MRCH.XD.WD',
'TX.VAL.AGRI.ZS.UN',
'TX.VAL.FOOD.ZS.UN',
'TX.VAL.FUEL.ZS.UN',
'TX.VAL.ICTG.ZS.UN',
'TX.VAL.INSF.ZS.WT',
'TX.VAL.MANF.ZS.UN',
'TX.VAL.MMTL.ZS.UN',
'TX.VAL.MRCH.AL.ZS',
'TX.VAL.MRCH.CD.WT',
'TX.VAL.MRCH.HI.ZS',
'TX.VAL.MRCH.OR.ZS',
'TX.VAL.MRCH.R1.ZS',
'TX.VAL.MRCH.R2.ZS',
'TX.VAL.MRCH.R3.ZS',
'TX.VAL.MRCH.R4.ZS',
'TX.VAL.MRCH.R5.ZS',
'TX.VAL.MRCH.R6.ZS',
'TX.VAL.MRCH.RS.ZS',
'TX.VAL.MRCH.WL.CD',
'TX.VAL.MRCH.WR.ZS',
'TX.VAL.MRCH.XD.WD',
'TX.VAL.OTHR.ZS.WT',
'TX.VAL.SERV.CD.WT',
'TX.VAL.TECH.CD',
'TX.VAL.TECH.MF.ZS',
'TX.VAL.TRAN.ZS.WT',
'TX.VAL.TRVL.ZS.WT'
);