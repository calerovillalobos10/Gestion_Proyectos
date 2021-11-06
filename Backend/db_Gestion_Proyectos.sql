CREATE DATABASE db_Gestion_Proyectos;

USE db_Gestion_Proyectos;
GO
sp_changedbowner 'sa'
GO

CREATE TABLE tb_Sexos(
  idSexo TINYINT IDENTITY(1, 1) PRIMARY KEY,
  descripcion VARCHAR(15) NOT NULL,
  estado BIT DEFAULT 1 NOT NULL
);

CREATE TABLE tb_Trimestres(
  idTrimestre TINYINT IDENTITY(1, 1) PRIMARY KEY,
  descripcion VARCHAR(50) NOT NULL,
  estado BIT DEFAULT 1 NOT NULL
);

CREATE TABLE tb_Departamentos(
  idDepartamento SMALLINT IDENTITY(1, 1) PRIMARY KEY,
  descripcion VARCHAR(30) NOT NULL,
  estado BIT DEFAULT 1 NOT NULL
);

CREATE TABLE tb_TipoFuncionarios(
  idTipoFuncionario TINYINT IDENTITY(1, 1) PRIMARY KEY,
  descripcion VARCHAR(15) NOT NULL,
  estado BIT DEFAULT 1 NOT NULL
);

CREATE TABLE tb_Funcionarios(
  idFuncionario SMALLINT IDENTITY(1, 1) PRIMARY KEY,
  idSexo TINYINT NOT NULL,
  iddepartamento SMALLINT NOT NULL,
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
  idAvance TINYINT NOT NULL,
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
@contraseniaBE VARBINARY(MAX)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT F.nombre, F.correo,F.urlFoto, F.dobleAuth
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

CREATE PROCEDURE sp_listDepartment
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

CREATE PROCEDURE sp_insertDepartment
	-- Add the parameters for the stored procedure here
(
@descripcionBE VARCHAR(30)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO tb_Departamentos (descripcion) values (@descripcionBE)
END
GO

CREATE PROCEDURE sp_recoverDepartmentId 
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
END
GO

CREATE PROCEDURE sp_verifyDepartment 
	-- Add the parameters for the stored procedure here
(
@descripcionBE VARCHAR(30)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT descripcion FROM tb_Departamentos WHERE descripcion = @descripcionBE
END
GO

CREATE PROCEDURE sp_deleteDepartment
(
@idDepartmentBE int
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE tb_Departamentos SET estado = 0
	WHERE idDepartamento = @idDepartmentBE
END
GO

CREATE PROCEDURE sp_modifyDepartment
(
@idDepartamentoBE int,
@descripcionBE varchar(30)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	

    -- Insert statements for procedure here
	UPDATE tb_Departamentos SET descripcion = @descripcionBE
	WHERE idDepartamento = @idDepartamentoBE
END
GO
