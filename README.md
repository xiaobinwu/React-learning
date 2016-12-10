# Start for development
npm start # or
npm run serve


# Start the dev-server with the dist version
npm run serve:dist

# Just build the dist version and copy static files
npm run dist

# Run unit tests
npm test

# Lint all files in src (also automatically done AFTER tests are run)
npm run lint

# Clean up the dist directory
npm run clean

# Just copy the static assets
npm run copy

# 目前项目的组织结构
-Baza.lieBiDe.FrontEnd.Mobile
    -node_modules
    -src 所有的项目代码
        -component 组件
            -base 基础组件
                -config 基础组件依赖的配置项
                -badge 小红点和红点数字组件
                -button 按钮组件
                -contentEditable 编辑框组件（富文本最好都基于它来实现）
                -loading 加载组件
                -modal 可操作的弹窗组件（目前只能声明式调用，使用案例可以参考page组件中的getOrderButton）
                -toast 提示性弹窗组件（没有操作区域）
                -panel/tab/tabPanel 这三个为tab组件
                -stickty 固定条组件

            -page 业务组件
                -config 业务组件依赖的配置项
                -filter 筛选组件
                -avatar 头像组件
                -list 列表组件
                -listItem 单条列表 
                -dropdown 下拉组件
                -tag 标签组件
                -icon 图标组件
                -renderInBody 直接把组件渲染到Body上

                -header 首页页头
                -subHeader 带左右操作的页头
                -footer 页脚
                -nav 底部导航组件  

                -applyBanner 消息页面，申请加入公司头部组件
                -atUserBoX @用户组件
                -candidateDetail 候选人详情
                -candidateInfo 候选人简介
                -candidateItem 单条候选人
                -collapse 展开收起组件
                -feedList 动态列表
                -feedItem 单条动态
                -commentList 评论列表
                -commentItem 单条评论
                -jobfeed 职位动态
                -jobInfo 职位简介
                -jobItem 单条职位
                -joinItem 单条加入公司申请
                -timeliness 时间线
                -userInfo 用户信息
                -userSelf 用户简介
                -getJobModal 抢单弹窗
                -getOrderButton 抢单按钮组件
                -searchHeader 搜索框
                -jobSearchResults 搜索结果
                -hotSearchTags 热门搜索
                -imageContainer 查看图片大图
                -imageGallery 图片列表容器

        -config 项目构建的配置文件，目前所有的配置文件都在task当中

        -site 网站
            -lbd 猎必得移动端相关
                -global 全局样式配置
                    -vendor 
                    -base.scss 每个新创建的页面样式文件都需要引用它
                    -mixins.scss 样式mixin
                    -variables.scss 全局样式变量配置
                -static 网站需要用到的图片素材（小尺寸的图片放在这里，最后转成base64，大尺寸的图片放CDN）
                -view 所有的页面（每一个页面包括三个文件：html, scss, jsx）
                    -candidate 候选人相关页面
                    -error 报错页面
                    -job 职位相关页面
                    -landing 百度着陆页
                    -me 个人主页
                    -message 消息页面

        -utils 一些工具js
    -task 全部构建文件

# 一个标准组件的组织结构

    以下是一个有自身状态的组件(大部分组件直接写成stateless的组件，即本身不包含状态，从父组件props获取数据)

    1 class definition
        1.1 constructor
            1.1.1 event handlers
        1.2 'component' lifecycle events
        1.3 getters
        1.4 render
    2 defaultProps
    3 proptypes

    示例：

    ```
    class Person extends React.Component {
      constructor (props) {
        super(props);

        this.state = { smiling: false };

        this.handleClick = () => {
          this.setState({smiling: !this.state.smiling});
        };
      }

      componentWillMount () {
        // add event listeners
      },

      componentDidMount () {
        // React.getDOMNode()
      },

      componentWillUnmount () {
        // remove event listeners
      },

      get smilingMessage () {
        return (this.state.smiling) ? "is smiling" : "";
      }

      render () {
        return (
          <div onClick={this.handleClick}>
            {this.props.name} {this.smilingMessage}
          </div>
        );
      },
    }

    Person.defaultProps = {
      name: 'Guest'
    };

    Person.propTypes = {
      name: React.PropTypes.string
    };
    ```

# 使用 PropTypes 和 getDefaultProps()

    1. 一定要写PropTypes，切莫为了省事而不写
    2. 如果一个Props不是requied，一定在getDefaultProps中设置它
        
    `React.PropTypes`主要用来验证组件接收到的props是否为正确的数据类型，如果不正确，console中就会出现对应的warning。
    出于性能方面的考虑，这个API只在开发环境下使用。

    基本使用方法：

    ```
    propTypes: {
        myArray: React.PropTypes.array,
        myBool: React.PropTypes.bool,
        myFunc: React.PropTypes.func,
        myNumber: React.PropTypes.number,
        myString: React.PropTypes.string，
         
         // You can chain any of the above with `isRequired` to make sure a warning
        // is shown if the prop isn't provided.
        requiredFunc: React.PropTypes.func.isRequired
    }
    ```

    假如我们props不是以上类型，而是拥有复杂结构的对象怎么办？比如下面这个：

    ```
    {
      text: 'hello world',
      numbers: [5, 2, 7, 9],
    }
    ```

    当然，我们可以直接用`React.PropTypes.object`,但是对象内部的数据我们却无法验证。

    ```
    propTypes: {
      myObject: React.PropTypes.object,
    }
    ```

    进阶使用方法：`shape()` 和 `arrayOf()`

    ```
    propTypes: {
      myObject: React.PropTypes.shape({
        text: React.PropTypes.string,
        numbers: React.PropTypes.arrayOf(React.PropTypes.number),
      })
    }
    ```

    下面是一个更复杂的Props：

    ```
    [
      {
        name: 'Zachary He',
        age: 13,
        married: true,
      },
      {
        name: 'Alice Yo',
        name: 17,
      },
      {
        name: 'Jonyu Me',
        age: 20,
        married: false,
      }
    ]
    ```

    综合上面：

    ```
    propTypes: {
        myArray: React.PropTypes.arrayOf(
            React.propTypes.shape({
                name: React.propTypes.string.isRequired,
                age: React.propTypes.number.isRequired,
                married: React.propTypes.bool
            })
        )
    }
    ```

# 把计算和条件判断都交给 `render()` 方法

    1. 组件的state中不出现props（不得已出现的时候，要注意在lifecicle中做相应处理，案例是jobSearchResults组件）

    ```
     // BAD:
      constructor (props) {
        this.state = {
          fullName: `${props.firstName} ${props.lastName}`
        };
      }

      render () {
        var fullName = this.state.fullName;
        return (
          <div>
            <h2>{fullName}</h2>
          </div>
        );
      }
    ```

    ```
    // GOOD: 
    render () {
      var fullName = `${this.props.firstName} ${this.props.lastName}`;
    }
    ```

    当然，复杂的display logic也应该避免全堆放在render()中，因为那样可能导致整个render()方法变得臃肿，不优雅。我们可以把一些复杂的逻辑通过helper function移出去。

    ```
    // GOOD: helper function
    renderFullName () {
      return `${this.props.firstName} ${this.props.lastName}`;
    }

    render () {
      var fullName = this.renderFullName();
    }
    ```

    2. 保持state的简洁，不要出现计算得来的state

    ```
    // WRONG:
      constructor (props) {
        this.state = {
          listItems: [1, 2, 3, 4, 5, 6],
          itemsNum: this.state.listItems.length
        };
      }
      render() {
          return (
              <div>
                  <span>{this.state.itemsNum}</span>
              </div>
          )
      }
    ```
    ```
    // Right:
    render () {
      var itemsNum = this.state.listItems.length;
    }
    ```

    3. 能用三元判断符，就不用If，直接放在render()里

    ```
    // BAD: 
    renderSmilingStatement () {
        if (this.state.isSmiling) {
            return <span>is smiling</span>;
        }else {
            return '';
        }
    },

    render () {
      return <div>{this.props.name}{this.renderSmilingStatement()}</div>;
    }
    ```
    ```
    // GOOD: 
    render () {
      return (
        <div>
          {this.props.name}
          {(this.state.smiling)
            ? <span>is smiling</span>
            : null
          }
        </div>
      );
    }
    ```
    4. 布尔值都不能搞定的，交给IIFE吧
    [Immediately-invoked function expression](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)
    ```
    return (
      <section>
        <h1>Color</h1>
        <h3>Name</h3>
        <p>{this.state.color || "white"}</p>
        <h3>Hex</h3>
        <p>
          {(() => {
            switch (this.state.color) {
              case "red":   return "#FF0000";
              case "green": return "#00FF00";
              case "blue":  return "#0000FF";
              default:      return "#FFFFFF";
            }
          })()}
        </p>
      </section>
    );
    ```
    5. 不要把display logic写在`componentWillReceiveProps`或`componentWillMount`中，把它们都移到render()中去。
