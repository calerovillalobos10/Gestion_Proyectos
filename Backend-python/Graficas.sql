GO
USE [db_Gestion_Proyectos]
GO
/****** Object:  StoredProcedure [dbo].[sp_graph_year_trimester_advance]    Script Date: 17/11/2021 14:10:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[sp_graph_year_trimester_advance]
(@year INT)
AS
	BEGIN
		 SET NOCOUNT ON;
		 select descripcion from tb_Trimestres t 
         inner join tb_Avances s on t.idTrimestre = s.idTrimestre
         where YEAR(fechaAvance) = @year
	END

GO
USE [db_Gestion_Proyectos]
GO
/****** Object:  StoredProcedure [dbo].[sp_graph_year_finished_solicitude]    Script Date: 17/11/2021 14:10:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[sp_graph_year_finished_solicitude]
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
USE [db_Gestion_Proyectos]
GO
/****** Object:  StoredProcedure [dbo].[sp_graph_year_changed_solicitude]    Script Date: 17/11/2021 14:10:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[sp_graph_year_changed_solicitude]
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
USE [db_Gestion_Proyectos]
GO
/****** Object:  StoredProcedure [dbo].[sp_graph_all_trimester_advance]    Script Date: 17/11/2021 14:10:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[sp_graph_all_trimester_advance]
AS
	BEGIN
		 SET NOCOUNT ON;
		 select descripcion from tb_Trimestres t 
         inner join tb_Avances s on t.idTrimestre = s.idTrimestre
	END

GO
USE [db_Gestion_Proyectos]
GO
/****** Object:  StoredProcedure [dbo].[sp_graph_all_finished_solicitude]    Script Date: 17/11/2021 14:31:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[sp_graph_all_finished_solicitude]
AS
	BEGIN
		declare @finished int = 0
		declare @unfinished int = 0
		select @finished = count(idSolicitud) from tb_Solicitudes where terminado = 0
		select @unfinished = count(idSolicitud) from tb_Solicitudes where terminado = 1
		select @finished finished , @unfinished unfinished
	END


GO
USE [db_Gestion_Proyectos]
GO
/****** Object:  StoredProcedure [dbo].[sp_graph_all_changed_solicitude]    Script Date: 17/11/2021 14:10:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[sp_graph_all_changed_solicitude]
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
