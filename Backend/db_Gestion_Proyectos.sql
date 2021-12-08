USE [db_Gestion_Proyectos]
GO
/****** Object:  User [Root]    Script Date: 4/12/2021 12:09:26 ******/
CREATE USER [Root] FOR LOGIN [Root] WITH DEFAULT_SCHEMA=[db_accessadmin]
GO
ALTER ROLE [db_owner] ADD MEMBER [Root]
GO
ALTER ROLE [db_accessadmin] ADD MEMBER [Root]
GO
ALTER ROLE [db_datareader] ADD MEMBER [Root]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [Root]
GO
/****** Object:  Table [dbo].[tb_Avances]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_Avances](
	[idAvance] [tinyint] IDENTITY(1,1) NOT NULL,
	[idTrimestre] [tinyint] NOT NULL,
	[idFuncionario_Aplicativo] [smallint] NOT NULL,
	[idSolicitud] [smallint] NOT NULL,
	[fechaAvance] [smalldatetime] NOT NULL,
	[documento] [varbinary](max) NOT NULL,
	[estado] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idAvance] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_Bitacoras]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_Bitacoras](
	[idBitacora] [int] IDENTITY(1,1) NOT NULL,
	[idTransaccion] [tinyint] NOT NULL,
	[idFuncionario_Aplicativo] [smallint] NOT NULL,
	[idAvance] [tinyint] NULL,
	[idSolicitud] [smallint] NULL,
	[fechaBitacora] [smalldatetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idBitacora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_Departamentos]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_Departamentos](
	[idDepartamento] [smallint] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](30) NOT NULL,
	[estado] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idDepartamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_Funcionarios]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_Funcionarios](
	[idFuncionario] [smallint] IDENTITY(1,1) NOT NULL,
	[idSexo] [tinyint] NOT NULL,
	[idDepartamento] [smallint] NOT NULL,
	[idTipoFuncionario] [tinyint] NOT NULL,
	[nombre] [varchar](15) NOT NULL,
	[apellido_1] [varchar](15) NOT NULL,
	[apellido_2] [varchar](15) NOT NULL,
	[fechaNacimiento] [date] NOT NULL,
	[correo] [varchar](50) NOT NULL,
	[contrasenia] [varbinary](max) NOT NULL,
	[urlFoto] [varchar](180) NOT NULL,
	[estado] [bit] NOT NULL,
	[dobleAuth] [bit] NULL,
	[secretUrl] [varchar](180) NULL,
PRIMARY KEY CLUSTERED 
(
	[idFuncionario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[correo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_Sexos]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_Sexos](
	[idSexo] [tinyint] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](15) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idSexo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_Solicitudes]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_Solicitudes](
	[idSolicitud] [smallint] IDENTITY(1,1) NOT NULL,
	[idFuncionario_Aplicativo] [smallint] NOT NULL,
	[idFuncionario_Responsable] [smallint] NOT NULL,
	[idFuncionario_Final] [smallint] NOT NULL,
	[fechaSolicitud] [smalldatetime] NOT NULL,
	[fechaInicio] [date] NOT NULL,
	[fechaFin] [date] NOT NULL,
	[estado] [bit] NOT NULL,
	[terminado] [bit] NOT NULL,
	[documentoActa] [varbinary](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[idSolicitud] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_TipoFuncionarios]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_TipoFuncionarios](
	[idTipoFuncionario] [tinyint] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](15) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idTipoFuncionario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_Transacciones]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_Transacciones](
	[idTransaccion] [tinyint] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idTransaccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_Trimestres]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_Trimestres](
	[idTrimestre] [tinyint] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idTrimestre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tb_Avances] ADD  DEFAULT ((1)) FOR [estado]
GO
ALTER TABLE [dbo].[tb_Departamentos] ADD  DEFAULT ((1)) FOR [estado]
GO
ALTER TABLE [dbo].[tb_Funcionarios] ADD  DEFAULT ((1)) FOR [estado]
GO
ALTER TABLE [dbo].[tb_Funcionarios] ADD  DEFAULT ((0)) FOR [dobleAuth]
GO
ALTER TABLE [dbo].[tb_Solicitudes] ADD  DEFAULT ((1)) FOR [estado]
GO
ALTER TABLE [dbo].[tb_Avances]  WITH CHECK ADD  CONSTRAINT [fk_Avance_Solicitud] FOREIGN KEY([idSolicitud])
REFERENCES [dbo].[tb_Solicitudes] ([idSolicitud])
GO
ALTER TABLE [dbo].[tb_Avances] CHECK CONSTRAINT [fk_Avance_Solicitud]
GO
ALTER TABLE [dbo].[tb_Avances]  WITH CHECK ADD  CONSTRAINT [fk_Avance_Trimestre] FOREIGN KEY([idTrimestre])
REFERENCES [dbo].[tb_Trimestres] ([idTrimestre])
GO
ALTER TABLE [dbo].[tb_Avances] CHECK CONSTRAINT [fk_Avance_Trimestre]
GO
ALTER TABLE [dbo].[tb_Avances]  WITH CHECK ADD  CONSTRAINT [fk_Avance_UsuarioAplicativo] FOREIGN KEY([idFuncionario_Aplicativo])
REFERENCES [dbo].[tb_Funcionarios] ([idFuncionario])
GO
ALTER TABLE [dbo].[tb_Avances] CHECK CONSTRAINT [fk_Avance_UsuarioAplicativo]
GO
ALTER TABLE [dbo].[tb_Bitacoras]  WITH CHECK ADD  CONSTRAINT [fk_Bitacora_Avance] FOREIGN KEY([idAvance])
REFERENCES [dbo].[tb_Avances] ([idAvance])
GO
ALTER TABLE [dbo].[tb_Bitacoras] CHECK CONSTRAINT [fk_Bitacora_Avance]
GO
ALTER TABLE [dbo].[tb_Bitacoras]  WITH CHECK ADD  CONSTRAINT [fk_Bitacora_FuncionarioAplicativo] FOREIGN KEY([idFuncionario_Aplicativo])
REFERENCES [dbo].[tb_Funcionarios] ([idFuncionario])
GO
ALTER TABLE [dbo].[tb_Bitacoras] CHECK CONSTRAINT [fk_Bitacora_FuncionarioAplicativo]
GO
ALTER TABLE [dbo].[tb_Bitacoras]  WITH CHECK ADD  CONSTRAINT [fk_Bitacora_Solicitud] FOREIGN KEY([idSolicitud])
REFERENCES [dbo].[tb_Solicitudes] ([idSolicitud])
GO
ALTER TABLE [dbo].[tb_Bitacoras] CHECK CONSTRAINT [fk_Bitacora_Solicitud]
GO
ALTER TABLE [dbo].[tb_Bitacoras]  WITH CHECK ADD  CONSTRAINT [fk_Bitacora_Transaccion] FOREIGN KEY([idTransaccion])
REFERENCES [dbo].[tb_Transacciones] ([idTransaccion])
GO
ALTER TABLE [dbo].[tb_Bitacoras] CHECK CONSTRAINT [fk_Bitacora_Transaccion]
GO
ALTER TABLE [dbo].[tb_Funcionarios]  WITH CHECK ADD  CONSTRAINT [fk_Funcionario_departamento] FOREIGN KEY([idDepartamento])
REFERENCES [dbo].[tb_Departamentos] ([idDepartamento])
GO
ALTER TABLE [dbo].[tb_Funcionarios] CHECK CONSTRAINT [fk_Funcionario_departamento]
GO
ALTER TABLE [dbo].[tb_Funcionarios]  WITH CHECK ADD  CONSTRAINT [fk_Funcionario_Sexo] FOREIGN KEY([idSexo])
REFERENCES [dbo].[tb_Sexos] ([idSexo])
GO
ALTER TABLE [dbo].[tb_Funcionarios] CHECK CONSTRAINT [fk_Funcionario_Sexo]
GO
ALTER TABLE [dbo].[tb_Funcionarios]  WITH CHECK ADD  CONSTRAINT [fk_Funcionario_TipoFuncionario] FOREIGN KEY([idTipoFuncionario])
REFERENCES [dbo].[tb_TipoFuncionarios] ([idTipoFuncionario])
GO
ALTER TABLE [dbo].[tb_Funcionarios] CHECK CONSTRAINT [fk_Funcionario_TipoFuncionario]
GO
ALTER TABLE [dbo].[tb_Solicitudes]  WITH CHECK ADD  CONSTRAINT [fk_FuncionarioAplicativo_Solicitud] FOREIGN KEY([idFuncionario_Aplicativo])
REFERENCES [dbo].[tb_Funcionarios] ([idFuncionario])
GO
ALTER TABLE [dbo].[tb_Solicitudes] CHECK CONSTRAINT [fk_FuncionarioAplicativo_Solicitud]
GO
ALTER TABLE [dbo].[tb_Solicitudes]  WITH CHECK ADD  CONSTRAINT [fk_FuncionarioFinal_Solicitud] FOREIGN KEY([idFuncionario_Final])
REFERENCES [dbo].[tb_Funcionarios] ([idFuncionario])
GO
ALTER TABLE [dbo].[tb_Solicitudes] CHECK CONSTRAINT [fk_FuncionarioFinal_Solicitud]
GO
ALTER TABLE [dbo].[tb_Solicitudes]  WITH CHECK ADD  CONSTRAINT [fk_FuncionarioResponsable_Solicitud] FOREIGN KEY([idFuncionario_Responsable])
REFERENCES [dbo].[tb_Funcionarios] ([idFuncionario])
GO
ALTER TABLE [dbo].[tb_Solicitudes] CHECK CONSTRAINT [fk_FuncionarioResponsable_Solicitud]
GO
/****** Object:  StoredProcedure [dbo].[sp_deleteAdvance]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_deleteAdvance] 
(
@idFuncionarioAplicativoBE SmallInt,
@idAvanceBE TinyInt
)
AS
BEGIN
	BEGIN TRANSACTION

		BEGIN TRY

			UPDATE tb_Avances SET estado = 0
			WHERE idAvance = @idAvanceBE

			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(6, @idFuncionarioAplicativoBE, @idAvanceBE, NULL, @fechaHoraActual)

			COMMIT TRANSACTION
		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_deleteDepartment]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_deleteDepartment]
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
/****** Object:  StoredProcedure [dbo].[sp_deleteFunctionary]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_deleteFunctionary]
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
/****** Object:  StoredProcedure [dbo].[sp_deleteSolicitation]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_deleteSolicitation]
(
@idFuncionarioAplicativoBE SMALLINT,
@idSolicitudBE SMALLINT
)
AS
BEGIN
	BEGIN TRANSACTION

		BEGIN TRY

			UPDATE tb_Solicitudes SET estado = 0
			WHERE idSolicitud = @idSolicitudBE

			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(2, @idFuncionarioAplicativoBE, NULL, @idSolicitudBE, @fechaHoraActual)

			COMMIT TRANSACTION
		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_finishedSolicitation]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_finishedSolicitation]
(
@idFuncionarioAplicativoBE SMALLINT,
@idSolicitudBE SMALLINT
)
AS
BEGIN
	BEGIN TRANSACTION

		BEGIN TRY

			UPDATE tb_Solicitudes SET terminado = 0
			WHERE idSolicitud = @idSolicitudBE

			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(4, @idFuncionarioAplicativoBE, NULL, @idSolicitudBE, @fechaHoraActual)

			COMMIT TRANSACTION
		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_graph_all_changed_solicitude]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_graph_all_changed_solicitude]
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
/****** Object:  StoredProcedure [dbo].[sp_graph_all_finished_solicitude]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_graph_all_finished_solicitude]
AS
	BEGIN
		declare @finished int = 0
		declare @unfinished int = 0
		select @finished = count(idSolicitud) from tb_Solicitudes where terminado = 0
		select @unfinished = count(idSolicitud) from tb_Solicitudes where terminado = 1
		select @finished finished , @unfinished unfinished
	END
GO
/****** Object:  StoredProcedure [dbo].[sp_graph_all_trimester_advance]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_graph_all_trimester_advance]
AS
	BEGIN
		 select descripcion from tb_Trimestres t 
         inner join tb_Avances s on t.idTrimestre = s.idTrimestre
	END
GO
/****** Object:  StoredProcedure [dbo].[sp_graph_year_changed_solicitude]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_graph_year_changed_solicitude]
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
/****** Object:  StoredProcedure [dbo].[sp_graph_year_finished_solicitude]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_graph_year_finished_solicitude]
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
/****** Object:  StoredProcedure [dbo].[sp_graph_year_trimester_advance]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[sp_graph_year_trimester_advance]
(@year INT)
AS
	BEGIN
		 select descripcion from tb_Trimestres t 
         inner join tb_Avances s on t.idTrimestre = s.idTrimestre
         where YEAR(fechaAvance) = @year
	END
GO
/****** Object:  StoredProcedure [dbo].[sp_insertAdvance]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_insertAdvance]
(
@idTrimestreBE TinyInt,
@idFuncionarioAplicativoBE SmallInt,
@idSolicitudBE SmallInt,
@fechaAvanceBE SmallDateTime,
@documentoBE VarBinary(MAX),
@estadoBE Bit
)
AS
BEGIN
	BEGIN TRANSACTION
	
		BEGIN TRY

			INSERT INTO tb_Avances (idTrimestre, idFuncionario_Aplicativo, idSolicitud, fechaAvance, documento, estado)
			VALUES (@idTrimestreBE, @idFuncionarioAplicativoBE, @idSolicitudBE, @fechaAvanceBE, @documentoBE, @estadoBE)
	
			DECLARE @idNuevo TINYINT
			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			SELECT @idNuevo = SCOPE_IDENTITY()
			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(5, @idFuncionarioAplicativoBE, @idNuevo, @idSolicitudBE, @fechaHoraActual)
			
			COMMIT TRANSACTION

		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_insertDepartment]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_insertDepartment]
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
/****** Object:  StoredProcedure [dbo].[sp_insertFunctionary]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_insertFunctionary]
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
/****** Object:  StoredProcedure [dbo].[sp_insertSolicitation]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_insertSolicitation]
(
@idFuncionarioAplicativoBE SMALLINT,
@idFuncionarioResponsableBE SMALLINT,
@idFuncionarioFinalBE SMALLINT,
@fechaSolicitudBE SMALLDATETIME,
@fechaInicioBE DATE,
@fechaFinBE DATE,
@documentoActaConstBE VARBINARY(MAX),
@estadoBE BIT,
@terminadoBE BIT
)
AS
BEGIN
	BEGIN TRANSACTION
	
		BEGIN TRY

			INSERT INTO tb_Solicitudes (idFuncionario_Aplicativo, idFuncionario_Responsable, idFuncionario_final, fechaSolicitud, fechaInicio, fechaFin, documentoActa, estado, terminado)
			VALUES (@idFuncionarioAplicativoBE, @idFuncionarioResponsableBE, @idFuncionarioFinalBE, @fechaSolicitudBE, @fechaInicioBE, @fechaFinBE, @documentoActaConstBE, @estadoBE, @terminadoBE)
	
			DECLARE @idNuevo TINYINT
			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			SELECT @idNuevo = SCOPE_IDENTITY()
			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(1, @idFuncionarioAplicativoBE, NULL, @idNuevo, @fechaHoraActual)
			
			COMMIT TRANSACTION

		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_listAdvance]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_listAdvance]
(
@idFuncionarioAplicativoBE SMALLINT
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    	BEGIN TRANSACTION
	
		BEGIN TRY

			-- Insert statements for procedure here
			SELECT A.idAvance AS idAvance, T.descripcion AS descripcion, 
			CONCAT(FA.nombre, +' '+ FA.apellido_1, +' '+ FA.apellido_2) AS funcionario_aplicativo,
			A.idSolicitud AS idSolicitud, format(A.fechaAvance, 'yyyy-MM-d hh:mm:ss') AS fechaAvance, 
			A.documento AS documento, A.estado AS estado
			FROM tb_Avances AS A
			inner join tb_Trimestres AS T ON A.idTrimestre = T.idTrimestre
			inner join tb_Funcionarios AS FA ON A.idFuncionario_Aplicativo = FA.idFuncionario
			WHERE A.estado != 0

			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(7, @idFuncionarioAplicativoBE, NULL, NULL, @fechaHoraActual)

			COMMIT TRANSACTION
		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_listBinnacle]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_listBinnacle]
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
GO
/****** Object:  StoredProcedure [dbo].[sp_listDepartment]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE   PROCEDURE [dbo].[sp_listDepartment]
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
/****** Object:  StoredProcedure [dbo].[sp_listFunctionary]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_listFunctionary]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT F.idFuncionario, S.descripcion AS idSexo, D.descripcion AS idDepartamento, TF.descripcion AS idTipoFuncionario, F.nombre, F.apellido_1, F.apellido_2, format(F.fechaNacimiento, 'yyyy-MM-dd') AS fechaNacimiento, F.correo, F.urlFoto
	FROM tb_Funcionarios AS F inner join tb_Sexos AS S ON F.idSexo = S.idSexo 
	inner join tb_Departamentos AS D ON F.iddepartamento = D.idDepartamento
	inner join tb_TipoFuncionarios AS TF ON F.idTipoFuncionario = TF.idTipoFuncionario
	WHERE F.estado != 0
END
GO
/****** Object:  StoredProcedure [dbo].[sp_listSolicitation]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_listSolicitation]
(
@idFuncionarioAplicativoBE SMALLINT
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	BEGIN TRANSACTION
	
		BEGIN TRY

			DECLARE @cantAvances INT = (SELECT COUNT(idAvance) from tb_Avances);

			-- Insert statements for procedure here
			SELECT S.idSolicitud AS idSolicitud, CONCAT(FA.nombre, +' '+ FA.apellido_1, +' '+ FA.apellido_2) AS funcionario_aplicativo, 
			CONCAT(FR.nombre, + ' ' + FR.apellido_1, + ' ' + FR.apellido_2) AS funcionario_responsable, 
			CONCAT(FF.nombre, + ' ' + FF.apellido_1, + ' ' + FF.apellido_2) AS funcionario_final, format(S.fechaSolicitud, 'yyyy-MM-d hh:mm:ss') AS fechaSolicitud, 
			format(S.fechaInicio, 'yyyy-MM-dd') AS fechaInicio, format(S.fechaFin, 'yyyy-MM-dd') AS fechaFin, 
			S.documentoActa AS documentoActa, S.estado AS estado, S.terminado AS terminado,  
			DATEDIFF(MONTH, fechaInicio, fechaFin)/NULLIF(@cantAvances, 0)*100 AS porcentaje
			FROM tb_Solicitudes AS S
			inner join tb_Funcionarios AS FA ON S.idFuncionario_Aplicativo = FA.idFuncionario
			inner join tb_Funcionarios AS FR ON S.idFuncionario_Aplicativo = FR.idFuncionario
			inner join tb_Funcionarios AS FF ON S.idFuncionario_Aplicativo = FF.idFuncionario
			WHERE S.estado != 0

			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(3, @idFuncionarioAplicativoBE, NULL, NULL, @fechaHoraActual)

			COMMIT TRANSACTION
		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_login]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_login]
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
	SELECT F.idFuncionario, F.nombre, F.correo, F.dobleAuth
	FROM tb_Funcionarios as F
	WHERE @correoBE = F.correo AND PWDCOMPARE(@contraseniaBE, F.contrasenia) = 1
END
GO
/****** Object:  StoredProcedure [dbo].[sp_modifyAdvance]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_modifyAdvance]
(
@idAvanceBE TinyInt,
@idTrimestreBE TinyInt,
@idFuncionarioAplicativoBE SmallInt,
@idSolicitudBE SmallInt,
@fechaAvanceBE SmallDateTime,
@documentoBE VarBinary(max),
@estadoBE Bit
)
AS
BEGIN
		BEGIN TRANSACTION
	
		BEGIN TRY

			UPDATE tb_Avances SET idTrimestre = @idTrimestreBE, idFuncionario_Aplicativo = @idFuncionarioAplicativoBE,
			idSolicitud = @idSolicitudBE, fechaAvance = @fechaAvanceBE, documento = @documentoBE, estado = @estadoBE 
			WHERE idAvance = @idAvanceBE
	
			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(8, @idFuncionarioAplicativoBE, @idAvanceBE, @idSolicitudBE, @fechaHoraActual)
			
			COMMIT TRANSACTION

		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_modifyAdvanceWithoutDocument]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_modifyAdvanceWithoutDocument]
(
@idAvanceBE TinyInt,
@idTrimestreBE TinyInt,
@idFuncionarioAplicativoBE SmallInt,
@idSolicitudBE SmallInt,
@fechaAvanceBE SmallDateTime,
@estadoBE Bit
)
AS
BEGIN
		BEGIN TRANSACTION
	
		BEGIN TRY

			UPDATE tb_Avances SET idTrimestre = @idTrimestreBE, idFuncionario_Aplicativo = @idFuncionarioAplicativoBE,
			idSolicitud = @idSolicitudBE, fechaAvance = @fechaAvanceBE, estado = @estadoBE 
			WHERE idAvance = @idAvanceBE
	
			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(8, @idFuncionarioAplicativoBE, @idAvanceBE, @idSolicitudBE, @fechaHoraActual)
			
			COMMIT TRANSACTION

		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_modifyDepartment]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_modifyDepartment]
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
/****** Object:  StoredProcedure [dbo].[sp_modifyFunctionary]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_modifyFunctionary]
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
	WHERE idFuncionario = @idFuncionarioBE
END
GO
/****** Object:  StoredProcedure [dbo].[sp_modifySolicitation]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_modifySolicitation]
(
@idSolicitudBE SMALLINT,
@idFuncionarioAplicativoBE SMALLINT,
@idFuncionarioResponsableBE SMALLINT,
@idFuncionarioFinalBE SMALLINT,
@fechaSolicitudBE SMALLDATETIME,
@fechaInicioBE DATE,
@fechaFinBE DATE,
@documentoActaConstBE VARBINARY(MAX),
@estadoBE BIT,
@terminadoBE BIT
)
AS
BEGIN
	BEGIN TRANSACTION
	
		BEGIN TRY

			
			UPDATE tb_Solicitudes SET idFuncionario_Aplicativo = @idFuncionarioAplicativoBE, idFuncionario_Responsable = @idFuncionarioResponsableBE,
			idFuncionario_Final = @idFuncionarioFinalBE, fechaSolicitud = @fechaSolicitudBE, fechaInicio = @fechaInicioBE, 
			fechaFin = @fechaFinBE, documentoActa = @documentoActaConstBE, estado = @estadoBE, terminado = @terminadoBE
			WHERE idSolicitud = @idSolicitudBE
	
			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(4, @idFuncionarioAplicativoBE, NULL, @idSolicitudBE, @fechaHoraActual)
			
			COMMIT TRANSACTION

		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END	
GO
/****** Object:  StoredProcedure [dbo].[sp_modifySolicitationWithoutDocument]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_modifySolicitationWithoutDocument]
(
@idSolicitudBE SMALLINT,
@idFuncionarioAplicativoBE SMALLINT,
@idFuncionarioResponsableBE SMALLINT,
@idFuncionarioFinalBE SMALLINT,
@fechaSolicitudBE SMALLDATETIME,
@fechaInicioBE DATE,
@fechaFinBE DATE,
@estadoBE BIT,
@terminadoBE BIT
)
AS
BEGIN
	BEGIN TRANSACTION
	
		BEGIN TRY


			UPDATE tb_Solicitudes SET idFuncionario_Aplicativo = @idFuncionarioAplicativoBE, idFuncionario_Responsable = @idFuncionarioResponsableBE,
			idFuncionario_Final = @idFuncionarioFinalBE, fechaSolicitud = @fechaSolicitudBE, fechaInicio = @fechaInicioBE, 
			fechaFin = @fechaFinBE, estado = @estadoBE, terminado = @terminadoBE

			WHERE idSolicitud = @idSolicitudBE
	
			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(4, @idFuncionarioAplicativoBE, NULL, @idSolicitudBE, @fechaHoraActual)
			
			COMMIT TRANSACTION

		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END	
GO
/****** Object:  StoredProcedure [dbo].[sp_recoverAdvanceById]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_recoverAdvanceById]
(
@idFuncionarioAplicativoBE SmallInt,
@idAvanceBE TinyInt
)
AS
BEGIN
		BEGIN TRANSACTION

		BEGIN TRY

			SELECT idAvance, idTrimestre, idFuncionario_Aplicativo, idSolicitud, fechaAvance, documento, estado
			FROM tb_Avances
			WHERE idAvance = @idAvanceBE

			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(7, @idFuncionarioAplicativoBE, @idAvanceBE, NULL, @fechaHoraActual)

			COMMIT TRANSACTION
		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_recoverDepartmentId]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_recoverDepartmentId] 
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
/****** Object:  StoredProcedure [dbo].[sp_recoverDocumentAdvanceById]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_recoverDocumentAdvanceById]
(
@idFuncionarioAplicativoBE SmallInt,
@idAvanceBE TinyInt
)
AS
BEGIN
		BEGIN TRANSACTION

		BEGIN TRY

			SELECT documento
			FROM tb_Avances
			WHERE idAvance = @idAvanceBE

			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(7, @idFuncionarioAplicativoBE, @idAvanceBE, NULL, @fechaHoraActual)

			COMMIT TRANSACTION
		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_recoverDocumentSolicitationById]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_recoverDocumentSolicitationById]
(
@idFuncionarioAplicativoBE SMALLINT,
@idSolicitudBE SMALLINT
)
AS
BEGIN
	
	BEGIN TRANSACTION

		BEGIN TRY

			SELECT documentoActa
			FROM tb_Solicitudes
			WHERE idSolicitud = @idSolicitudBE

			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(3, @idFuncionarioAplicativoBE, NULL, @idSolicitudBE, @fechaHoraActual)

			COMMIT TRANSACTION
		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_recoverFunctionaryById]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_recoverFunctionaryById] 
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
/****** Object:  StoredProcedure [dbo].[sp_recoverSolicitationById]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_recoverSolicitationById]
(
@idFuncionarioAplicativoBE SMALLINT,
@idSolicitudBE SMALLINT
)
AS
BEGIN
	
	BEGIN TRANSACTION

		BEGIN TRY

			SELECT idSolicitud, idFuncionario_Aplicativo, idFuncionario_Responsable, idFuncionario_Final, fechaSolicitud, fechaInicio, fechaFin, documentoActa, estado, terminado
			FROM tb_Solicitudes
			WHERE idSolicitud = @idSolicitudBE

			DECLARE @fechaHoraActual SMALLDATETIME = CURRENT_TIMESTAMP;

			INSERT INTO tb_Bitacoras(idTransaccion, idFuncionario_Aplicativo, idAvance, idSolicitud, fechaBitacora)
			VALUES(3, @idFuncionarioAplicativoBE, NULL, @idSolicitudBE, @fechaHoraActual)

			COMMIT TRANSACTION
		END TRY

		BEGIN CATCH

			ROLLBACK TRANSACTION
			PRINT 'Se produjo un error'
			SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
			THROW
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_recuperarSecret]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[sp_recuperarSecret]
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
/****** Object:  StoredProcedure [dbo].[sp_verifyAdvance]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_verifyAdvance]
(
@idTrimestreBE TinyInt,
@idFuncionarioAplicativoBE SmallInt,
@idSolicitudBE SmallInt,
@fechaAvanceBE SmallDateTime,
@documentoBE VarBinary(max),
@estadoBE Bit
)
AS
BEGIN
	
	UPDATE tb_Avances SET estado = 1
	WHERE idTrimestre = @idTrimestreBE AND idFuncionario_Aplicativo = @idFuncionarioAplicativoBE 
	AND idSolicitud = @idSolicitudBE AND fechaAvance = @fechaAvanceBE 
	AND documento = @documentoBE AND estado = @estadoBE
END
GO
/****** Object:  StoredProcedure [dbo].[sp_verifyDeleteDepartment]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_verifyDeleteDepartment]
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
/****** Object:  StoredProcedure [dbo].[sp_verifyDepartment]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_verifyDepartment] 
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
/****** Object:  StoredProcedure [dbo].[sp_verifyEmailFunctionary]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_verifyEmailFunctionary]
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
/****** Object:  StoredProcedure [dbo].[sp_verifyFunctionary]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_verifyFunctionary]
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
/****** Object:  StoredProcedure [dbo].[sp_verifySolicitation]    Script Date: 4/12/2021 12:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_verifySolicitation]
(
@idFuncionarioAplicativoBE SMALLINT,
@idFuncionarioResponsableBE SMALLINT,
@idFuncionarioFinalBE SMALLINT,
@fechaSolicitudBE SMALLDATETIME,
@fechaInicioBE DATE,
@fechaFinBE DATE,
@documentoActaConstBE VARBINARY(MAX),
@estadoBE BIT,
@terminadoBE BIT
)
AS
BEGIN

    -- Insert statements for procedure here
	UPDATE tb_Solicitudes SET estado = 1
	WHERE idFuncionario_Aplicativo = @idFuncionarioAplicativoBE AND idFuncionario_Responsable = @idFuncionarioResponsableBE AND idFuncionario_final = @idFuncionarioFinalBE 
	AND fechaSolicitud = @fechaSolicitudBE AND fechaInicio = @fechaInicioBE AND fechaFin = @fechaFinBE AND documentoActa = @documentoActaConstBE
	AND terminado = @terminadoBE
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE sp_completedProjects

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @totalProjects decimal(10,2) = (SELECT COUNT(idSolicitud) FROM tb_Solicitudes);
	DECLARE @completedProjects decimal(10,2) = (SELECT COUNT(idSolicitud) FROM tb_Solicitudes WHERE terminado = 0);
	DECLARE @porcentaje decimal(10,2);
	SET @porcentaje = NULLIF(@completedProjects, 0)/NULLIF(@totalProjects, 0)*100;
	RETURN @porcentaje;
END
GO
