
create table olap_Funcionarios_Dim(
	FuncionariosKey smallint primary key,
	[Departamento] varchar(50),
	[Sexo] varchar(50),
	[Nombre] varchar(50),
)

create table olap_Avances_Dim(
	AvancesKey tinyint primary key,
	[Funcionario] varchar(50),
	[Trimestre] varchar(50),
	[Fecha] date
)

create table olap_Bitacoras_Dim(
	BitacorasKey int primary key,
	[Funcionario] varchar(50),
	[Transaccion] varchar(50),
	[Fecha] date
)

create table olap_Time_Dim(
	[TimeKey] int primary key,
	[Month] tinyint,
	[Year] SMALLINT,
	[Quarter] tinyint
)

create table olap_Solicitudes_Fact(
	AvancesKey tinyint,
	FuncionariosKey smallint,
	BitacorasKey int,
	TimeKey int,
		
	primary key (AvancesKey, FuncionariosKey,BitacorasKey,TimeKey),


	[Estado] varchar(50),
	[Fecha Solicitud] date,
	[Fecha Inicio]date,
	[Fecha Fin]date,

  CONSTRAINT fk_Fact_Avances
  FOREIGN KEY (AvancesKey) 
  REFERENCES olap_Avances_Dim(AvancesKey),
  	
  CONSTRAINT fk_Fact_Funcionarios
  FOREIGN KEY (FuncionariosKey) 
  REFERENCES olap_Funcionarios_Dim(FuncionariosKey),
    
  CONSTRAINT fk_Fact_Bitacoras
  FOREIGN KEY (BitacorasKey) 
  REFERENCES olap_Bitacoras_Dim(BitacorasKey),

  CONSTRAINT fk_Fact_Time
  FOREIGN KEY ([TimeKey]) 
  REFERENCES olap_Time_Dim([TimeKey])
)