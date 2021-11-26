CREATE DATABASE db_Gestion_Proyectos;

USE db_Gestion_Proyectos;
GO
sp_changedbowner 'sa'
GO

CREATE TABLE tb_Sexos(
  idSexo TINYINT IDENTITY(1, 1) PRIMARY KEY,
  descripcion VARCHAR(15) NOT NULL
);

CREATE TABLE tb_Trimestres(
  idTrimestre TINYINT IDENTITY(1, 1) PRIMARY KEY,
  descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE tb_Departamentos(
  idDepartamento SMALLINT IDENTITY(1, 1) PRIMARY KEY,
  descripcion VARCHAR(30) NOT NULL,
  estado BIT DEFAULT 1 NOT NULL
);

CREATE TABLE tb_TipoFuncionarios(
  idTipoFuncionario TINYINT IDENTITY(1, 1) PRIMARY KEY,
  descripcion VARCHAR(15) NOT NULL
);

CREATE TABLE tb_Funcionarios(
  idFuncionario SMALLINT IDENTITY(1, 1) PRIMARY KEY,
  idSexo TINYINT NOT NULL,
  idDepartamento SMALLINT NOT NULL,
  idTipoFuncionario TINYINT NOT NULL,

  nombre VARCHAR(15) NOT NULL,
  apellido_1 VARCHAR(15) NOT NULL,
  apellido_2 VARCHAR(15) NOT NULL,
  fechaNacimiento DATE NOT NULL,
  correo VARCHAR(50) UNIQUE NOT NULL,
  contrasenia VARBINARY(MAX) NOT NULL,
  urlFoto VARCHAR(180) NOT NULL,
  estado BIT DEFAULT 1 NOT NULL,
  secretUrl VARCHAR(180),
  dobleAuth BIT DEFAULT 0

  CONSTRAINT fk_Funcionario_Sexo 
  FOREIGN KEY (idSexo) 
  REFERENCES tb_Sexos(idSexo),

  CONSTRAINT fk_Funcionario_departamento 
  FOREIGN KEY (iddepartamento) 
  REFERENCES tb_Departamentos(idDepartamento),

  CONSTRAINT fk_Funcionario_TipoFuncionario 
  FOREIGN KEY (idTipoFuncionario) 
  REFERENCES tb_TipoFuncionarios(idTipoFuncionario)
);

CREATE TABLE tb_Solicitudes(
  idSolicitud SMALLINT IDENTITY(1, 1) PRIMARY KEY,
  idFuncionario_Aplicativo SMALLINT NOT NULL,
  idFuncionario_Responsable SMALLINT NOT NULL,
  idFuncionario_Final SMALLINT NOT NULL,
  fechaSolicitud SMALLDATETIME NOT NULL,
  fechaInicio DATE NOT NULL,
  fechaFin DATE NOT NULL,
  documentoActa VARBINARY(MAX) NOT NULL,
  estado BIT default 1 NOT NULL,
  terminado BIT default 0 NOT NULL,
  
  CONSTRAINT fk_FuncionarioAplicativo_Solicitud 
  FOREIGN KEY (idFuncionario_Aplicativo) 
  REFERENCES tb_Funcionarios(idFuncionario),
  
  CONSTRAINT fk_FuncionarioResponsable_Solicitud 
  FOREIGN KEY (idFuncionario_Responsable) 
  REFERENCES tb_Funcionarios(idFuncionario),
  
  CONSTRAINT fk_FuncionarioFinal_Solicitud 
  FOREIGN KEY (idFuncionario_Final) 
  REFERENCES tb_Funcionarios(idFuncionario)
);

CREATE TABLE tb_Avances(
  idAvance TINYINT IDENTITY(1, 1) PRIMARY KEY,
  idTrimestre TINYINT NOT NULL,
  idFuncionario_Aplicativo SMALLINT NOT NULL,
  idSolicitud SMALLINT NOT NULL,
  fechaAvance SMALLDATETIME NOT NULL,
  documento VARBINARY(MAX) NOT NULL,
  estado BIT default 1 NOT NULL,

  CONSTRAINT fk_Avance_Trimestre 
  FOREIGN KEY (idTrimestre) 
  REFERENCES tb_Trimestres(idTrimestre),
  
  CONSTRAINT fk_Avance_Solicitud 
  FOREIGN KEY (idSolicitud) 
  REFERENCES tb_Solicitudes(idSolicitud),
  
  CONSTRAINT fk_Avance_UsuarioAplicativo 
  FOREIGN KEY (idFuncionario_Aplicativo) 
  REFERENCES tb_Funcionarios(idFuncionario)
);

CREATE TABLE tb_Transacciones(
  idTransaccion TINYINT IDENTITY(1, 1) PRIMARY KEY,
  descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE tb_Bitacoras(
  idBitacora INT IDENTITY(1, 1) PRIMARY KEY,
  idTransaccion TINYINT NOT NULL,
  idFuncionario_Aplicativo SMALLINT NOT NULL,
  idAvance TINYINT,
  idSolicitud SMALLINT NOT NULL,
  descripcion VARCHAR(150) NOT NULL,
  fechaBitacora SMALLDATETIME NOT NULL

  CONSTRAINT fk_Bitacora_Transaccion 
  FOREIGN KEY (idTransaccion) 
  REFERENCES tb_Transacciones(idTransaccion),
  
  CONSTRAINT fk_Bitacora_FuncionarioAplicativo 
  FOREIGN KEY (idFuncionario_Aplicativo) 
  REFERENCES tb_Funcionarios(idFuncionario),
  
  CONSTRAINT fk_Bitacora_Avance 
  FOREIGN KEY (idAvance) 
  REFERENCES tb_Avances(idAvance),

  CONSTRAINT fk_Bitacora_Solicitud
  FOREIGN KEY (idSolicitud) 
  REFERENCES tb_Solicitudes(idSolicitud)
);

-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE sp_login
(
@correoBE VARCHAR(50),
@contraseniaBE VARCHAR(MAX)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT F.idFuncionario, F.nombre, F.correo,F.urlFoto, F.dobleAuth
	FROM tb_Funcionarios as F
	WHERE @correoBE = F.correo AND PWDCOMPARE(@contraseniaBE, F.contrasenia) = 1
END
GO

CREATE OR ALTER PROCEDURE sp_recuperarSecret
(
@correoBE VARCHAR(50)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT F.secretUrl
	FROM tb_Funcionarios as F
	WHERE @correoBE = F.correo
END
GO

CREATE OR ALTER PROCEDURE sp_listDepartment
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT idDepartamento, descripcion, estado
	FROM tb_Departamentos
	WHERE estado != 0
END
GO

CREATE OR ALTER PROCEDURE sp_insertDepartment
	-- Add the parameters for the stored procedure here
(
@descripcionBE VARCHAR(30)
)
AS
BEGIN

    -- Insert statements for procedure here
	INSERT INTO tb_Departamentos (descripcion) values (@descripcionBE)
END
GO

CREATE OR ALTER PROCEDURE sp_recoverDepartmentId 
	-- Add the parameters for the stored procedure here
(
@idDepartamentoBE int
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT idDepartamento, descripcion, estado
	FROM tb_Departamentos
	WHERE idDepartamento = @idDepartamentoBE
END
GO

CREATE OR ALTER PROCEDURE sp_verifyDepartment
	-- Add the parameters for the stored procedure here
(
@descripcionBE VARCHAR(30)
)
AS
BEGIN

    -- Insert statements for procedure here
	UPDATE tb_Departamentos SET estado = 1 
	WHERE descripcion = @descripcionBE
END
GO

CREATE OR ALTER PROCEDURE sp_deleteDepartment
(
@idDepartmentBE int
)
AS
BEGIN

    -- Insert statements for procedure here
	UPDATE tb_Departamentos SET estado = 0
	WHERE idDepartamento = @idDepartmentBE
END
GO

CREATE OR ALTER PROCEDURE sp_modifyDepartment
(
@idDepartamentoBE int,
@descripcionBE varchar(30)
)
AS
BEGIN

    -- Insert statements for procedure here
	UPDATE tb_Departamentos SET descripcion = @descripcionBE
	WHERE idDepartamento = @idDepartamentoBE
END
GO

CREATE OR ALTER PROCEDURE sp_insertFunctionary
(
@idSexoBE tinyint,
@idDepartamentoBE smallint,
@idTipoFuncionarioBE tinyint,
@nombreBE varchar(15),
@apellido_1BE varchar(15),
@apellido_2BE varchar(15),
@fechaNacimientoBE date,
@correoBE varchar(50),
@contraseniaBE VarChar(16),
@urlFotoBE varchar(180),
@estadoBE bit,
@dobleAuthBE bit,
@secretUrlBE varchar(180)
)
AS
BEGIN

    -- Insert statements for procedure here
	INSERT INTO tb_Funcionarios(idSexo, iddepartamento, idTipoFuncionario, nombre, apellido_1, apellido_2, fechaNacimiento, correo, contrasenia, urlFoto, estado, dobleAuth, secretUrl)
	values (@idSexoBE, @idDepartamentoBE, @idTipoFuncionarioBE, @nombreBE, @apellido_1BE, @apellido_2BE, @fechaNacimientoBE, @correoBE, PWDENCRYPT(@contraseniaBE), @urlFotoBE, @estadoBE, @dobleAuthBE, @secretUrlBE)
END
GO

CREATE OR ALTER PROCEDURE sp_verifyEmailFunctionary
	-- Add the parameters for the stored procedure here
(
@correoBE varchar(50)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT correo
	fROM tb_Funcionarios
	WHERE correo = @correoBE
END
GO

CREATE OR ALTER PROCEDURE sp_verifyFunctionary
(
@idSexoBE tinyint,
@idDepartamentoBE smallint,
@idTipoFuncionarioBE tinyint,
@nombreBE varchar(15),
@apellido_1BE varchar(15),
@apellido_2BE varchar(15),
@fechaNacimientoBE date,
@correoBE varchar(50),
@contraseniaBE VarChar(16),
@urlFotoBE varchar(180)
)
AS
BEGIN

    -- Insert statements for procedure here
	UPDATE tb_Funcionarios SET estado = 1
	WHERE idSexo = @idSexoBE AND iddepartamento = @idDepartamentoBE AND idTipoFuncionario = @idTipoFuncionarioBE 
	AND nombre = @nombreBE AND apellido_1 = @apellido_1BE AND apellido_2 = @apellido_2BE AND fechaNacimiento = @fechaNacimientoBE
	AND correo = @correoBE AND PWDCOMPARE(@contraseniaBE, contrasenia) = 1 AND urlFoto = @urlFotoBE
END
GO

CREATE OR ALTER PROCEDURE sp_listFunctionary
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT F.idFuncionario, S.descripcion AS idSexo, D.descripcion AS idDepartamento, TF.descripcion AS idTipoFuncionario, F.nombre, F.apellido_1, 
	F.apellido_2, format(F.fechaNacimiento, 'yyyy-MM-dd') AS fechaNacimiento, F.correo, F.urlFoto
	FROM tb_Funcionarios AS F inner join tb_Sexos AS S ON F.idSexo = S.idSexo 
	inner join tb_Departamentos AS D ON F.iddepartamento = D.idDepartamento
	inner join tb_TipoFuncionarios AS TF ON F.idTipoFuncionario = TF.idTipoFuncionario
	WHERE F.estado != 0
END
GO

CREATE OR ALTER PROCEDURE sp_recoverFunctionaryById 
(
@idFuncionarioBE smallInt
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT idFuncionario, idSexo, iddepartamento, idTipoFuncionario, nombre, apellido_1, apellido_2, format(fechaNacimiento, 'yyyy-MM-dd') AS fechaNacimiento, correo, urlFoto
	FROM tb_Funcionarios
	WHERE idFuncionario = @idFuncionarioBE
END
GO

CREATE OR ALTER PROCEDURE sp_deleteFunctionary
(
@idFuncionarioBE smallint
)
AS
BEGIN

    -- Insert statements for procedure here
	UPDATE tb_Funcionarios SET estado = 0
	WHERE idFuncionario = @idFuncionarioBE
END
GO

CREATE OR ALTER PROCEDURE sp_modifyFunctionary
(
@idFuncionarioBE smallint,
@idSexoBE tinyint,
@idDepartamentoBE smallint,
@idTipoFuncionarioBE tinyint,
@nombreBE varchar(15),
@apellido_1BE varchar(15),
@apellido_2BE varchar(15),
@fechaNacimientoBE date,
@urlFotoBE varchar(180)
)
AS
BEGIN
    -- Insert statements for procedure here
	UPDATE tb_Funcionarios SET idSexo = @idSexoBE, iddepartamento = @idDepartamentoBE, idTipoFuncionario = @idTipoFuncionarioBE,
	nombre = @nombreBE, apellido_1 = @apellido_1BE, apellido_2 = @apellido_2BE, fechaNacimiento = @fechaNacimientoBE,
	urlFoto = @urlFotoBE
	WHERE @idFuncionarioBE = idFuncionario
END
GO

CREATE OR ALTER PROCEDURE sp_graph_all_changed_solicitude
AS
	BEGIN
	SET NOCOUNT ON;

	DECLARE @changed int  = 0
	DECLARE @total int = 0

	SELECT @total = count(s.idSolicitud)
	FROM tb_Solicitudes s 

	SELECT @changed = count(s.idSolicitud)
	FROM tb_Solicitudes s 
	inner join tb_Bitacoras b on s.idSolicitud = b.idSolicitud 
	WHERE b.idTransaccion = 4 


	SELECT (@changed * 100/@total) as changed, (@total - @changed)*100/@total as unchanged
	END
GO

CREATE OR ALTER PROCEDURE sp_graph_all_finished_solicitude
AS
	BEGIN
		declare @finished int = 0
		declare @unfinished int = 0
		select @finished = count(idSolicitud) from tb_Solicitudes where terminado = 0
		select @unfinished = count(idSolicitud) from tb_Solicitudes where terminado = 1
		select @finished finished , @unfinished unfinished
	END
GO

CREATE OR ALTER PROCEDURE sp_graph_all_trimester_advance
AS
	BEGIN
		 select descripcion from tb_Trimestres t 
         inner join tb_Avances s on t.idTrimestre = s.idTrimestre
	END
GO

CREATE OR ALTER PROCEDURE sp_graph_year_changed_solicitude
(@year INT)
AS
	BEGIN
	SET NOCOUNT ON;

	DECLARE @changed int  = 0
	DECLARE @total int = 0

	SELECT @total = count(s.idSolicitud)
	FROM tb_Solicitudes s
	WHERE YEAR(fechaSolicitud) = @year  

	SELECT @changed = count(s.idSolicitud)
	FROM tb_Solicitudes s 
	INNER JOIN tb_Bitacoras b on s.idSolicitud = b.idSolicitud 
	WHERE b.idTransaccion = 4 AND  YEAR(fechaSolicitud) = @year  

	IF @total != 0
		SELECT (@changed * 100/@total) as changed, (@total - @changed)*100/@total as unchanged
	END
GO

CREATE OR ALTER PROCEDURE sp_graph_year_finished_solicitude
(@year INT)
AS
	BEGIN
		SET NOCOUNT ON;
		declare @finished int = 0
		declare @unfinished int = 0
		select @finished = count(idSolicitud) from tb_Solicitudes where terminado = 0 and YEAR(fechaSolicitud) = @year
		select @unfinished = count(idSolicitud) from tb_Solicitudes where terminado = 1 and YEAR(fechaSolicitud) = @year
		select @finished finished , @unfinished unfinished
	END

GO

CREATE OR ALTER PROCEDURE sp_graph_year_trimester_advance
(@year INT)
AS
	BEGIN
		 select descripcion from tb_Trimestres t 
         inner join tb_Avances s on t.idTrimestre = s.idTrimestre
         where YEAR(fechaAvance) = @year
	END
GO

CREATE OR ALTER PROCEDURE sp_verifyDeleteDepartment
(
@idDepartmentBE int
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT idFuncionario
	FROM tb_Funcionarios
	WHERE idDepartamento = @idDepartmentBE
END
GO

CREATE OR ALTER PROCEDURE sp_listBinnacle
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT T.descripcion AS transaccion, F.nombre, F.apellido_1, F.apellido_1, F.apellido_2, B.idAvance AS idAvance, B.idSolicitud AS idSolicitud, format(B.fechaBitacora, 'yyyy-MM-dd') AS fechaBitacora
	FROM tb_Bitacoras AS B
	inner join tb_Transacciones AS T ON B.idTransaccion = T.idTransaccion
	inner join tb_Funcionarios AS F ON B.idFuncionario_Aplicativo = F.idFuncionario
END