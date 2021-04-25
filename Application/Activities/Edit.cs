using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext dbcontext;
            private readonly IMapper mapper;

            public Handler(DataContext dbcontext, IMapper mapper)
            {
                this.dbcontext = dbcontext;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await dbcontext.Activities.FindAsync(request.Activity.Id);
                if(activity==null) return null;
                //activity.Title=request.Activity.Title ??=activity.Title;
                mapper.Map(request.Activity, activity);
                var result=await dbcontext.SaveChangesAsync()>0;
                if(!result) return Result<Unit>.Failure("Failed to edit activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}