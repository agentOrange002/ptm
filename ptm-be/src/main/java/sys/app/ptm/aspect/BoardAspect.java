package sys.app.ptm.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.BoardDto;
import sys.app.ptm.tool.JimboyHelper;

@AllArgsConstructor
@Component
@EnableAspectJAutoProxy(proxyTargetClass=true)
@Aspect
public class BoardAspect {	
	
	private JimboyHelper helper;
	
	/*
	 * @Before("execution(public * sys.app.its.service.implementation.IssueCategoryServiceImplementation.saveCategory(..)) && args(dto,..)"
	 * ) public void beforeSavingCategory(JoinPoint pjp,IssueCategoryDto dto) throws
	 * Throwable { // log.info(" Check Save Category :" + dto +" ---- "+pjp);
	 * //String name = dto.getName(); log.info(" Check Save Category ..."); }
	 */
	
	@AfterReturning(pointcut="execution(public * sys.app.ptm.service.implementation.BoardServiceImplementation.saveBoard(..))",returning="retVal")
    public void afterSavingTeam(JoinPoint pjp,Object retVal) throws Throwable {
		// log.info(" Check Get Issue By IssueId :" + issueId +" ---- "+pjp);
		/* log.info(" Log Save Category....... "+((CategoryDto)retVal).toString()); */
		//log.info(".......................Log Board Saving Aspect.......................");
		BoardDto dto = (BoardDto) retVal;
		helper.generateBoardMembersByBoard(dto.getBoardId());			
    }
	
	@AfterReturning(pointcut="execution(public * sys.app.ptm.service.implementation.BoardServiceImplementation.payoutBoard(..))",returning="retVal")
    public void afterPayout(JoinPoint pjp,Object retVal) throws Throwable {		
		//log.info(".......................Log Board Payout Aspect.......................");
		BoardDto dto = (BoardDto) retVal;
		helper.processPayout(dto.getBoardId());			
    }

	/*-----------------------Second Process-------------------------*/
	/*
	@AfterReturning(pointcut="execution(public * sys.app.ptm.service.implementation.BoardServiceImplementation.saveBoardWeekly(..))",returning="retVal")
    public void afterSecondSavingTeam(JoinPoint pjp,Object retVal) throws Throwable {
		
		log.info(".......................Log Board Saving Aspect.......................");
		BoardDto dto = (BoardDto) retVal;
		helper.generateBoardMembersByBoardWeekly(dto.getBoardId());			
    }
	
	@AfterReturning(pointcut="execution(public * sys.app.ptm.service.implementation.BoardServiceImplementation.payoutBoardWeekly(..))",returning="retVal")
    public void afterSecondPayout(JoinPoint pjp,Object retVal) throws Throwable {		
		log.info(".......................Log Board Payout Aspect.......................");
		BoardDto dto = (BoardDto) retVal;
		helper.processPayoutWeekly(dto.getBoardId());			
    }
	*/
}
